# Deployment

The build is a folder of static files. That is the whole point: it can be served
by GitHub Pages today and moved to PolyU's own hosting later without rewriting
anything.

## GitHub Pages (current)

1. Create the repository **under a GitHub Organization, not a personal account.**
   Add the PI as an owner. Otherwise the site becomes a single point of failure
   attached to one person's account — the same problem as a lab site living in a
   graduate's Wix login.
2. Settings → Pages → Source: **GitHub Actions**.
3. Push to `main`. `.github/workflows/deploy.yml` builds and publishes.

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
