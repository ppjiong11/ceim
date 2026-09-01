# Deployment

The build is a folder of static files. That is the whole point: it can be served
by GitHub Pages today and moved to PolyU's own hosting later without rewriting
anything.

## GitHub Pages (current)

1. Settings → Pages → Source: **GitHub Actions**.
2. Push to `main`. `.github/workflows/deploy.yml` builds and publishes.

### ⚠️ Outstanding: transfer this repository

The repo currently sits on a **personal account** so a demo could go up quickly.
That is deliberate but temporary. Until it moves, the lab's website is a single
point of failure attached to one individual — the same problem as a lab site
living in a graduate's Wix login, just in a different wrapper.

**Before the site is announced or linked from anywhere official**, transfer it:

1. Create a GitHub Organization (free) — e.g. `changlab-polyu`.
2. Add the PI and the lab's technical contact as **owners**, not members.
3. Repo → Settings → General → Danger Zone → **Transfer ownership**.
   History, issues and stars are preserved.
4. Re-enable Pages on the transferred repo (Settings → Pages → Source: GitHub
   Actions) — Pages settings do not always survive a transfer.
5. Update the `SITE` and `BASE` repository variables to match the new URL.

Renaming the repo to `<org>.github.io` at that point gives a clean root URL and
lets `BASE` go back to `/`.

### Setting the URL

The build reads two environment variables so the source tree does not need
editing per environment. Set them under Settings → Secrets and variables →
Actions → **Variables**:

| Deployment | `SITE` | `BASE` |
|---|---|---|
| `<org>.github.io/<repo>` | `https://<org>.github.io` | `/<repo>` |
| Custom domain | `https://changlab.polyu.edu.hk` | `/` |

With no variables set, the workflow defaults to the project-page form.

## Moving to PolyU hosting later

Nothing in the code assumes GitHub. To move:

```bash
SITE=https://changlab.polyu.edu.hk BASE=/ npm run build
```

Then serve `dist/` from PolyU's central web hosting (the Linux Docker/OKD
platform) or any static host. No build step needs to run on their servers.

## Open questions for PolyU ITS

These need answering by a staff member — a non-PolyU person cannot file these
requests. Route them through the department's **Computer Liaison Officer (CLO)**,
not the IT HelpCentre directly.

1. Can the lab get its own `<name>.polyu.edu.hk` subdomain? Applications need
   authorisation from the Head of Unit, so this reaches the department chair.
2. **Is a `polyu.edu.hk` subdomain allowed to CNAME to off-campus hosting?**
   This one is decisive — if not, GitHub Pages can only ever be a staging URL
   and the real site must sit on PolyU's central hosting from launch.
3. Does the central hosting service charge the lab, and what is the process?

## Access from mainland China

GitHub Pages is unreliable from the mainland, and a custom domain does not fix
it — the CNAME still resolves to GitHub's IPs. If the lab recruits mainland
students or has mainland collaborators, test this before committing.

The fallback is PolyU's own hosting (in Hong Kong), which the build already
supports. Fonts are self-hosted rather than pulled from Google Fonts for the
same reason, so that part is already handled.
