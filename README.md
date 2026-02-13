# PlentyShop LTS Custom Theme Plugin – Hammer Shops

Dieses Repository **ist** das PlentyShop-LTS-Theme-Plugin. Es baut die Header- und Footer-Strukturen der Hammer-Shops (FH & SH) neu auf und erweitert/überschreibt bestehende Ceres-Templates gezielt.

## Zielsetzung
- Vollständiger Neuaufbau von Header und Footer auf Basis von plentyShop LTS (Ceres).
- Saubere Integration in bestehende Ceres-Templates ohne direkte Core-Änderungen.
- Einheitliche Anpassung beider Shops (FH & SH).

## Bezug zu plentyShop LTS (Ceres)
- **Ceres-Repository:** https://github.com/plentymarkets/plugin-ceres.git
- **Quell-Repo für bestehende Frontend-Snippets:** https://github.com/davidmadmin/Custom-CSS-JS-im-Frontend-Hammer-Shops
- **Empfehlung:** Klone Ceres parallel in `plentyshop-lts/`, um Twig-, Vue- und SCSS-Strukturen nachzuschlagen.
- **Empfehlung (Snippets):** Nutze das Frontend-Snippet-Repo als primäre Referenz für CSS-/JS-Fragmente, die bereits in den Live-Shops laufen, und überführe sie sauber in dieses Theme-Plugin.
- **Verknüpfung:** Custom CSS/JS muss auf vorhandene Ceres-Strukturen aufsetzen. Prüfe IDs, Klassen, Slots und Komponenten vor Änderungen.
- **Priorität:** Header- und Footer-Rebuilds haben Vorrang. Zusätzliche Features nur, wenn sie kompatibel sind.

## Shops, Namen und Abkürzungen
- **FH** = **FENSTER-HAMMER** (`fenster-hammer.de`)
- **SH** = **SCHRAUBEN-HAMMER** (`schrauben-hammer.de`)

## Technologiestack (plentyShop LTS 5.0.78)
**Core & Laufzeit**
- PHP: `^7.3 || ^8.0`
- Ceres/IO: `5.0.78`
- Node.js: `14` (npm 6)

**Frontend-Libraries (Auszug)**
- Vue `^2.6.12`, Vuex `^3.3.0`, Bootstrap `4.4.1`, jQuery `^3.5.1`
- Popper `^1.16.1`, core-js `^3.6.5`, dayjs `^1.8.26`

**Build & QA (Auszug)**
- Webpack `^4.43.0`, Babel `^7.10.5`, Sass `^1.49.9`
- Stylelint `^14.16.1`, ESLint `^6.8.0`, Cypress `^8.5.0`

## Daten & Schnittstellen
- **REST-API:** https://developers.plentymarkets.com/en-gb/plentymarkets-rest-api/index.html
- **IO-Plugin:** https://github.com/plentymarkets/plugin-io
- **Ceres:** https://github.com/plentymarkets/plugin-ceres

Nutze IO/REST primär bei Datenflüssen oder Logikänderungen. Für reine CSS/HTML-Änderungen reicht meist der Strukturabgleich mit Ceres.

## Stil- und Strukturvorgaben
- Verwende klare, dokumentierte HTML-Strukturen. Inline-CSS ist erlaubt, aber ohne Skripte.
- JavaScript-Erweiterungen sollen vorhandene Ceres-Hooks nutzen; vermeide doppelte Event-Listener.
- Beide Shops (FH & SH) müssen synchron angepasst werden.
- Verwende stets **relative Pfade** für Shop-Links (z. B. `/start`).
- **CDN-Rewrite:**
  - FH: `//cdn02.plentymarkets.com/nteqnk1xxnkn` → `//bilder.fenster-hammer.de`
  - SH: `//cdn02.plentymarkets.com/nteqnk1xxnkn` → `//bilder.schrauben-hammer.de`
- Nutze die **Du-Form** und schreibe **Du/Dir/Dich/Dein** immer groß.
- **Wunschliste/Merkliste/wishlist** sind synonym; in der Kundenkommunikation ausschließlich **„Merkliste“** verwenden.

## Workflow für neue Styling-/JS-Anforderungen
Wenn Du neue Anforderungen für Styling, JavaScript-Funktionen oder zusätzliche Frontend-Features umsetzt, arbeite in dieser Reihenfolge:

1. Prüfe im Repo `Custom-CSS-JS-im-Frontend-Hammer-Shops`, ob es bereits produktiv erprobte CSS-/JS-Fragmente für die gewünschte Funktion gibt.
2. Überführe relevante Fragmente in dieses Theme-Plugin und passe sie an die aktuelle Ceres-/Plugin-Struktur an (IDs, Klassen, Hooks, Komponenten).
3. Stelle sicher, dass die Umsetzung in beiden Shops (FH/SH) funktioniert und keine bestehende Funktionalität beschädigt.
4. Bevorzuge eine gleichwertige oder technisch bessere Umsetzung gegenüber 1:1-Kopien, solange das Ergebnis kompatibel bleibt.

## Empfohlene Plugin-Struktur (Beispiel)
```
/
├── plugin.json
├── src/
│   ├── Providers/
│   │   └── ThemeServiceProvider.php
│   └── Containers/
│       └── ThemeContainer.php
└── resources/
    ├── css/
    │   └── main.css
    └── views/
        └── content/
            └── Theme.twig
```

## Ignore-Dateien für PlentyLTS
Damit PlentyLTS beim Upload nur relevante Plugin-Dateien berücksichtigt, nutzt dieses Repo eine `plenty.ignore`. Lege dort alle Dateien ab, die nicht Teil des Plugins sein sollen (z. B. interne Notizen, lokale Build-Artefakte oder Doku-Entwürfe).

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
