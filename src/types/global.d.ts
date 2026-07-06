// Allows side-effect imports of raw CSS files (e.g. `import "aos/dist/aos.css";`)
// without TypeScript complaining that it can't find type declarations for them.
// Next.js's own webpack/turbopack loader handles these imports at build time —
// this file just satisfies the TypeScript type checker (tsc), which has no
// built-in knowledge of CSS imports.

declare module "*.css";