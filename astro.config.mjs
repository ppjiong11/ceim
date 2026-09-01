// @ts-check
import { defineConfig } from 'astro/config';

// SITE / BASE are read from the environment so the same source tree can be
// deployed to GitHub Pages, to a polyu.edu.hk subdomain, or to PolyU's OKD
// hosting without editing this file. See DEPLOY.md.
//
//   Custom domain / org root :  SITE=https://changlab.polyu.edu.hk   BASE=/
//   Project page             :  SITE=https://<org>.github.io          BASE=/<repo>
const SITE = process.env.SITE ?? 'https://example.github.io';
const BASE = process.env.BASE ?? '/';

export default defineConfig({
  site: SITE,
  base: BASE,
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  markdown: {
    shikiConfig: { theme: 'github-light', wrap: true },
  },
});
