# AGENTS.md

## Zweck
Dieses Repository **ist** das PlentyShop-LTS-Theme-Plugin. Es baut die Header- und Footer-Strukturen der Hammer-Shops (FH & SH) neu auf und erweitert/überschreibt bestehende Ceres-Templates gezielt.

## Geltungsbereich
Diese Anweisungen gelten für das gesamte Repository.

## Arbeitsregeln

### Bezug zu plentyShop LTS (Ceres)
- **Ceres-Repository:** https://github.com/plentymarkets/plugin-ceres.git
- **IO-Plugin:** https://github.com/plentymarkets/plugin-io
- **Quell-Repo für bestehende Frontend-Snippets:** https://github.com/davidmadmin/Custom-CSS-JS-im-Frontend-Hammer-Shops
- **Plenty Native Docs (lokal):** `Plenty-native Plugins Docs in Markdown/`
- **Empfehlung:** Klone Ceres parallel in `plentyshop-lts/`, um Twig-, Vue- und SCSS-Strukturen nachzuschlagen.
- **Empfehlung (Snippets):** Nutze das Frontend-Snippet-Repo als primäre Referenz für bestehende CSS-/JS-Logik, die bereits live in den Shops läuft, und überführe die relevanten Fragmente strukturiert in dieses Theme-Plugin.
- **Verknüpfung:** Anpassungen greifen in bestehende Ceres-Templates. Prüfe vor Änderungen IDs, Klassen, Slots und Komponenten, damit Custom CSS/JS sauber aufsetzt.
- **Priorität:** Header- und Footer-Rebuilds haben Vorrang. Zusätzliche Features (z. B. Countdown, Progressbars) nur, wenn sie mit dem neuen Aufbau kompatibel sind.

### Shops, Namen und Abkürzungen
- **FH** = **FENSTER-HAMMER** (`fenster-hammer.de`)
- **SH** = **SCHRAUBEN-HAMMER** (`schrauben-hammer.de`)

### Technologiestack (plentyShop LTS 5.0.78)
- **PHP:** ^7.3 || ^8.0
- **Ceres / IO:** 5.0.78
- **Node.js:** 14 (npm 6)
- **Frontend-Libs (Auszug):** Vue 2.6, Vuex 3.3, Bootstrap 4.4, jQuery 3.5, Popper 1.16, core-js 3.6, dayjs 1.8
- **Tooling (Auszug):** Webpack 4.43, Babel 7.10, Sass 1.49, Stylelint 14.16, ESLint 6.8, Cypress 8.5

### Daten & Schnittstellen
- **REST-API:** https://developers.plentymarkets.com/en-gb/plentymarkets-rest-api/index.html
- **IO-Plugin:** https://github.com/plentymarkets/plugin-io
- **Ceres:** https://github.com/plentymarkets/plugin-ceres
- Prüfe IO/REST nur, wenn Datenflüsse oder Logik betroffen sind. Für reine CSS/HTML-Änderungen genügt meist ein Strukturcheck in Ceres.

### First-Party-Dokumentation als Source of Truth
- Die Markdown-Dateien im Ordner `Plenty-native Plugins Docs in Markdown/` inklusive aller Unterordner sind die primäre, verbindliche Entscheidungsgrundlage für Plugin-Setup, ShopBuilder-Widgets, plentyShop-LTS-Aspekte und angrenzende Themen.
- Suche bei fachlichen oder technischen Fragen immer zuerst in diesem Ordner und richte Umsetzung sowie Empfehlungen danach aus.
- Die bestehenden Leitlinien in diesem AGENTS-Dokument bleiben bestehen; bei Überschneidungen oder Unklarheiten hat die lokale First-Party-Dokumentation Vorrang.
- Wenn die lokale Dokumentation keine eindeutige Aussage enthält, nutze Ceres- und IO-Repository als ergänzende Referenz.

### Stil- und Strukturvorgaben
- Verwende klare, dokumentierte HTML-Strukturen. Inline-CSS ist erlaubt, darf aber keine Skripte enthalten.
- JavaScript-Erweiterungen sollen vorhandene Ceres-Hooks nutzen. Vermeide doppelte Event-Listener.
- Beide Shops (FH & SH) müssen synchron angepasst werden. Änderungen dürfen den jeweils anderen Shop nicht beschädigen.
- Verwende für Shop-Links immer **relative Pfade** (z. B. `/start`).
- **CDN-Rewrite-Regel:**
  - FH: `//cdn02.plentymarkets.com/nteqnk1xxnkn` → `//bilder.fenster-hammer.de`
  - SH: `//cdn02.plentymarkets.com/nteqnk1xxnkn` → `//bilder.schrauben-hammer.de`
- Halte README und Dokumentation aktuell, wenn Du neue Features oder Abhängigkeiten ergänzt.
- Nutze die **Du-Form** und schreibe **Du/Dir/Dich/Dein** immer groß.
- **Wunschliste/Merkliste/wishlist** sind synonym; in der Kundenkommunikation ausschließlich **„Merkliste“** verwenden.

### Umsetzungs-Workflow für neue Styling-/JS-Anforderungen
- Wenn Du eine neue Anforderung für Styling, JS-Funktionalität oder Add-on-Features umsetzt, prüfe zuerst im Repo `Custom-CSS-JS-im-Frontend-Hammer-Shops`, ob bereits passende, produktiv erprobte Fragmente vorhanden sind.
- Übernimm diese Fragmente nicht blind, sondern passe sie an die Struktur und Hooks dieses Theme-Plugins sowie an aktuelle Ceres-Gegebenheiten an.
- Ziel ist funktionale Parität (oder eine technisch bessere, kompatible Umsetzung), ohne bestehende Shop-Funktionen in FH/SH zu beschädigen.

### Aktuelle Repo-Struktur (Referenz)
- `Header/HTML`, `Header/CSS`, `Header/JS`: Header-Snippets pro Shop.
- `Footer/HTML`: Footer-Snippets pro Shop.
- `Components/HTML`: Wiederverwendbare HTML-Komponenten.
- `Produktdetailseiten/HTML`, `Produktdetailseiten/CSS`, `Produktdetailseiten/JS`: PDP-Snippets pro Shop.
- `Checkout/CSS`, `Checkout/JS`: Checkout-Anpassungen pro Shop.
- `Global/JS`: Globale JS-Snippets inkl. Head-Skripte und GTM.
- `Kontaktseiten/HTML`: Statische Kontaktseiten.
- `Base CSS/CSS`: Basis-Styles pro Shop.
- `Documentation/`: Zusatzdokumentation.
- `Custom CSS/`: Platzhalter für zusätzliche CSS-Ablagen.

## Commit Message Convention (Conventional Commits)
Format:
```
<type>(optional scope): short, imperative description
```
Regeln:
- Präsens, Imperativ („add“, nicht „added“).
- Beschreibung unter ~72 Zeichen.
- Kein Großbuchstabe am Anfang der Beschreibung.
- Kein Punkt am Ende.
- Nur **ein** Type pro Commit.

Erlaubte Types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`.
