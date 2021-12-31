# play-marin

website for Play Marin

# Develop

```
├── .github
│   └── workflows
├── cms
│   ├── api
│   └── components
├── frontend
│   └── src
│       ├── components
│       └── pages
└──         └── index.tsx
```

Content is managed via [strapi](https://strapi.io/), a headless CMS for Javascript - see `./cms` directory.

Frontend website built with [next.js](https://nextjs.org/) (react) - see `./frontend` directory.

See README files in both cms and frontend directories for local development.


# Deploy

Merging code to the default `main` branch triggers [GitHub actions](https://github.com/loc/play-marin/actions) to deploy the cms and frontend directories.

