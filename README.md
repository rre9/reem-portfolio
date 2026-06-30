# Reem Nawaf Aslami — Portfolio

Premium professional portfolio for **Reem Nawaf Aslami**, Full-Stack Software Engineer.

## Stack

- Static HTML / CSS / JavaScript (no build step)
- Bilingual: Arabic (RTL) & English (LTR)
- Data-driven sections via `data/*.js`

## Local development

From the `reem-portfolio` folder:

```bash
# Python
python -m http.server 8080

# Node (npx)
npx serve .
```

Open `http://localhost:8080`

## Deploy

Upload the contents of the `reem-portfolio` folder to your host (Netlify, GitHub Pages, etc.). Ensure the site root points to this folder.

## CV file

Place your PDF at:

```
reem-portfolio/Reem-Nawaf-Aslami-CV.pdf
```

## Backup branch

Original site preserved on branch: `portfolio-redesign-backup`

## Structure

```
reem-portfolio/
├── data/           # Content (experiences, projects, skills, …)
├── js/             # render.js, app.js
├── index.html
└── style.css
```
