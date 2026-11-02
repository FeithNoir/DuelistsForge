# Modelos y datos

La convención es estable en todo `core/`:

| Qué es                | Nombre                               | Archivo          |
| --------------------- | ------------------------------------ | ---------------- |
| Unión de ids          | sufijo `Id` (`CardFrameId`)          | `*.model.ts`     |
| Objeto de dominio     | sustantivo (`CardDraft`, `CardView`) | `*.model.ts`     |
| Catálogo inmutable    | `MAYÚSCULAS` (`CARD_FRAMES`)         | `*.data.ts`      |
| Función pura          | verbo (`buildCardView`)              | `core/card/*.ts` |
| Reglas del formulario | `cardDraftSchema`                    | `core/forms/`    |

`CardDraft` es lo que editas. `CardView` es lo que se pinta: nombre localizado si el campo está vacío, estrellas recortadas a 12, glifo de atributo y URL del arte.

Los ids de marco y de atributo salen de arreglos `as const`. El detalle (`labelKey`, `group`, glifo) es un `Record` que debe cubrir todos los ids. Si agregas un id y olvidas la fila, TypeScript no compila.

Los textos viven en `Messages`. `TRANSLATIONS` es `Record<LocaleId, Messages>`, así que inglés y español tienen las mismas llaves.

El arte vacío es `public/art/placeholder.svg` (dibujo original). Los nueve caracteres de atributo no son imágenes: son texto, dibujados con un subset de Noto Sans JP. La licencia está en `src/fonts/OFL.txt`.
