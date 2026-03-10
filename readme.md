# Bobby Roe dot com

My personal / Business site.

Live site: [bobbyroe.com](http://bobbyroe.com/)

![image](./RB-Logo-512.jpg)

## Run Locally

This project is a static site (no build step required).  
Serve the repository root with a local HTTP server:

```bash
cd /Users/roebobby/code/bobbyroe.com
python3 -m http.server 4173
```

Then open:

`http://localhost:4173`

Do not open `index.html` directly as a `file://` URL. Use a local server so module imports and assets load correctly.

## Browser Requirements

The current app bootstraps with Three.js WebGPU capability checks.

- Recommended: a browser with WebGPU enabled (latest Chrome/Edge recommended).
- If WebGPU is unavailable, the app will show a browser support message and stop rendering.

