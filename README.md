# FILM LAB — Digital Film Studies

A calm, tactile digital darkroom web application for discovering authentic analog-inspired film looks, comparing before and after, and creating film-style photographs directly in your browser.

- **56 Analog Film Looks**: 32 Classic recipes + 24 1998 CAM compact-camera looks
- **Zero Server Footprint**: 100% client-side HTML5 Canvas 2D image processing
- **Private by Design**: User photos never leave the browser
- **Zero External Dependencies**: Pure native JavaScript, CSS, and HTML5

---

## Static Deployment

FILM LAB requires:
- **No database**
- **No backend / server**
- **No environment variables**
- **No build command**

The production application is served directly from the root directory.

### Deploying to Cloudflare Pages (Recommended)

1. Push this repository to GitHub or GitLab.
2. In the [Cloudflare Dashboard](https://dash.cloudflare.com/), navigate to **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
3. Select this repository.
4. Set the build configuration:
   - **Framework preset**: `None`
   - **Build command**: *(Leave blank)*
   - **Build output directory**: `.` (Root)
5. Click **Save and Deploy**.

### Deploying to Vercel

1. Push this repository to GitHub.
2. Import the repository in the [Vercel Dashboard](https://vercel.com/new).
3. Set the build configuration:
   - **Framework Preset**: `Other`
   - **Build Command**: *(Leave blank)*
   - **Output Directory**: `.` (Root)
4. Click **Deploy**.

---

## Local Development

Run any static HTTP file server from the project root:

```bash
# Using Node.js
npx serve .

# Or using Python
python -m http.server 3000
```

Open `http://localhost:3000/` in any modern web browser.