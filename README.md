# Choose the Surprise 💖

Static romantic interactive website inspired by the supplied reference video.

## Run locally

```bash
python3 -m http.server 8080
```

Open http://localhost:8080

## Deploy to Vercel

Konfigurasi sudah disiapkan di `vercel.json` (situs statis, tanpa build) dan `.vercelignore`
(file Docker, referensi desain, dan audio `.mp3` asli tidak ikut ter-upload).

Lewat GitHub (disarankan):

1. `git add -A && git commit -m "Siapkan deploy Vercel" && git push origin main`
2. Buka https://vercel.com/new → **Import** repository `surprise_web`.
3. Biarkan pengaturan apa adanya (Framework Preset: **Other**, Build Command & Output Directory dibaca dari `vercel.json`) → **Deploy**.
4. Setiap `git push` ke `main` otomatis deploy ulang.

Lewat CLI:

```bash
npm i -g vercel
vercel login
vercel          # deploy preview
vercel --prod   # deploy production
```

## Deploy to GitHub Pages

Push the files to a repository, then enable **Settings → Pages → Deploy from branch → main → / (root)**.

## Customize

- Change texts in `index.html`.
- Change colors and responsive styling in `style.css`.
- Change interactions in `script.js`.
- Media ada di `media/` (`journey/`, `moments/`, `audio/`). Gunakan nama file tanpa spasi dan huruf besar/kecil yang sama persis dengan di `index.html` — server Vercel membedakan huruf besar/kecil.
- Replace emoji placeholders with your own photos.
