# Cómo extenderla

## Un marco nuevo

Un monstruo de ritual no necesita otro componente. Hay que tocar cuatro sitios que el tipo ya exige:

1. `CARD_FRAME_IDS` en `card-frame.model.ts`.
2. La fila en `CARD_FRAME_DETAILS` (`group: 'monster'`).
3. La llave `optMonsterRitual` en `Messages` y en los dos idiomas.
4. Una regla `.card-front[data-frame='monster-ritual']` en `card-preview.css`.

`isMonsterFrame` mira `group`, no el prefijo del id. Con `group: 'monster'` aparecen atributo, nivel y estrellas. Un hechizo nuevo usaría `group: 'spell'` y el esquema lo escondería solo.

El `Record<CardFrameId, …>` y el spec de catálogos fallan si te salta un paso. Esa es la red.

## Qué no mezclar

- Otro idioma: una entrada en `LOCALE_IDS` y en `TRANSLATIONS`.
- Otro atributo: `ATTRIBUTE_IDS`, glifo, etiqueta y el subset de la fuente si el carácter es nuevo.
- Persistir mazos: un servicio nuevo que lea `draft()` y escriba en `localStorage`. No lo pongas dentro de `buildCardView`.
