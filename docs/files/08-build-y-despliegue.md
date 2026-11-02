# Build y despliegue

```bash
npm run build
```

La salida queda en `dist/duelists-forge/browser`. html2canvas es CommonJS y se carga solo al descargar; está declarado en `allowedCommonJsDependencies` para que el build no avise. El presupuesto de estilo por componente sigue en 8 kB: el CSS está partido entre cascarón, editor y carta.

## Vercel (plan gratis)

`vercel.json` reescribe cualquier ruta a `index.html`. Con una sola ruta no es estrictamente necesario, y sí lo es cuando agregues otra.

```bash
npm i -g vercel
vercel
```

El directorio de salida es `dist/duelists-forge/browser`. El comando de build es `npm run build`.

## GitHub Pages

El repositorio se llama `DuelistsForge`, así que la base no es `/`.

```bash
npm run build:gh-pages
npx angular-cli-ghpages --dir=dist/duelists-forge/browser
```

`build:gh-pages` ejecuta `ng build --base-href /DuelistsForge/`. Las URLs de arte y de fuente son relativas al CSS o a `<base href>`, así que el placeholder y el subset tipográfico resuelven dentro del subdirectorio del proyecto.

En el repositorio: Settings → Pages → rama `gh-pages`.
