# Platzhalter: Bilder bitte lokal ergänzen

> TODO (manuell): In diesem Ordner fehlen absichtlich die finalen Bilddateien,
> weil Binärdateien aktuell nicht zuverlässig über den ChatGPT-Codex-PR-Flow
> bereitgestellt werden.

Bitte füge die folgenden Dateien manuell hinzu:

- `icon_author_xs.png`
- `icon_author_sm.png`
- `icon_author_md.png`
- `icon_plugin_xs.png`
- `icon_plugin_sm.png`
- `icon_plugin_md.png`
- `preview_0.png`

## So fügst Du die Dateien hinzu
1. Lege die finalen PNG-Dateien mit exakt den oben genannten Dateinamen in `meta/images/` ab.
2. Prüfe, dass `plugin.json` weiterhin auf die korrekten Dateinamen zeigt:
   - `authorIcon`
   - `pluginIcon`
3. Committe die Dateien danach direkt im Repository, z. B.:
   ```bash
   git add meta/images/*.png
   git commit -m "chore(meta): add final plugin and author icons"
   ```

## Hinweis
Bis die finalen Dateien vorhanden sind, kann die Darstellung der Plugin-/Author-Icons
im plenty Back end eingeschränkt sein.
