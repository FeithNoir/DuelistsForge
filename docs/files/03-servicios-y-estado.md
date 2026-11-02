# Servicios y estado

Hay cuatro servicios, todos con `@Service()` (singleton de Angular 22, el reemplazo habitual de `@Injectable({ providedIn: 'root' })`):

| Servicio               | Estado que posee                    | Efecto                                    |
| ---------------------- | ----------------------------------- | ----------------------------------------- |
| `LocaleService`        | `locale`                            | Catálogo de textos                        |
| `CardForgeService`     | `draft`, `artworkUrl`, `editorForm` | `view` calculada                          |
| `ArtworkReaderService` | ninguno                             | Lee un `File` a data URL                  |
| `CardExportService`    | ninguno                             | PNG con html2canvas, cargado al descargar |

`editorForm = form(this.draft, cardDraftSchema)` usa el signal del borrador como única fuente. Lo que el usuario escribe en un `[formField]` actualiza `draft` y, en el mismo ciclo, `view()`.

La imagen no entra al formulario: un data URL grande no aporta validación. `setArtwork` la guarda al lado.

El esquema esconde atributo, nivel y raza cuando el marco no es de monstruo. Un campo oculto no invalida el formulario, así que una carta mágica sigue siendo válida aunque el nivel haya quedado en 0.

```mermaid
sequenceDiagram
  participant Editor
  participant Form as editorForm
  participant Draft as draft signal
  participant View as view computed
  participant Preview
  Editor->>Form: el usuario cambia el nombre
  Form->>Draft: escribe el modelo
  Draft->>View: se recalcula
  View->>Preview: la plantilla lee view()
```
