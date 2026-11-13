# Pruebas y calidad

El runner es el de Angular 22: Vitest con jsdom, vía `ng test`. El script `npm test` pasa `--watch=false` para que termine en CI.

| Spec                             | Qué fija                                                   |
| -------------------------------- | ---------------------------------------------------------- |
| `build-card-view.spec.ts`        | Textos por idioma, estrellas, hechizo y trampa, tope de 12 |
| `card-file-name.spec.ts`         | Nombre del PNG                                             |
| `catalogs.data.spec.ts`          | Ids únicos y textos sin vacíos                             |
| `locale.service.spec.ts`         | Toggle en/es                                               |
| `card-forge.service.spec.ts`     | Formulario, campos ocultos, arte aparte                    |
| `artwork-reader.service.spec.ts` | Tipo y tamaño del archivo                                  |
| `card-editor.spec.ts`            | La trampa esconde el nivel                                 |
| `card-preview.spec.ts`           | Clic y Enter giran la carta                                |
| `forge.spec.ts`                  | Editor y preview juntos                                    |
| `app.spec.ts`                    | Ruta perezosa y cambio de idioma                           |

TypeScript está en modo `strict`, con `strictTemplates`. ESLint es flat config (`eslint.config.js`) con `angular-eslint` 22 y `eslint-config-prettier` al final para no pelearse con Prettier. Prettier ya viene en el `ng new` de Angular 22; las plantillas usan `parser: angular`.

```bash
npm test
npm run lint
npm run build
```
