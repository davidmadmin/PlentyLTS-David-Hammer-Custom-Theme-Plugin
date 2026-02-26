# PlentyShop LTS Custom Theme Plugin – Hammer Shops

Dieses Repository **ist** das PlentyShop-LTS-Theme-Plugin. Es baut die Header- und Footer-Strukturen der Hammer-Shops (FH & SH) neu auf und erweitert/überschreibt bestehende Ceres-Templates gezielt.

## Zielsetzung
- Vollständiger Neuaufbau von Header und Footer auf Basis von plentyShop LTS (Ceres).
- Saubere Integration in bestehende Ceres-Templates ohne direkte Core-Änderungen.
- Einheitliche Anpassung beider Shops (FH & SH).

## Basisstatus (aktueller Stand)
Die minimale, lauffähige Plugin-Basis ist angelegt:
- `plugin.json` mit vollständigen Kern-Metadaten, ServiceProvider und DataProvider.
- `config.json` mit einer initialen Basis-Konfiguration (inkl. konfigurierbarer Primärfarbe als HEX-Wert).
- `src/Providers/` und `src/Containers/` mit minimaler PHP-Struktur.
- `resources/` für Twig, CSS, JavaScript und Übersetzungen (DE/EN).
- `meta/images/` mit angebundenen Bildern für Plugin- und Author-Icon.
- `meta/documents/` mit Benutzerhandbuch, Changelog und Support-Kontakt (DE/EN).

## Shops, Namen und Abkürzungen
- **FH** = **FENSTER-HAMMER** (`fenster-hammer.de`)
- **SH** = **SCHRAUBEN-HAMMER** (`schrauben-hammer.de`)

## Technologiestack (plentyShop LTS 5.0.78)
**Core & Laufzeit**
- PHP: `^7.3 || ^8.0`
- Ceres/IO: `5.0.78`
- Node.js: `14` (npm 6)

## Plugin-Struktur (Basis)
```text
/
├── plugin.json
├── config.json
├── marketplace.json
├── meta/
│   ├── documents/
│   └── images/
├── src/
│   ├── Providers/
│   └── Containers/
└── resources/
    ├── css/
    ├── js/
    ├── lang/
    │   ├── de/
    │   └── en/
    └── views/
        ├── PageDesign/
        │   ├── PageDesign.twig
        │   └── Includes/
        └── content/
```

## Nutzung der Basisstruktur
1. Plugin im Plugin-Set installieren.
2. Plugin-Set speichern und bereitstellen.
3. In den Container-Links den DataProvider **Hammer Theme Base Container** verknüpfen.
4. Der Container-Link zeigt nur den Provider-Output; Preis-Font kommt über Theme/PageDesign oder einen dedizierten Style-Provider.
5. Danach Header/Footer- und Shop-spezifische Erweiterungen (FH/SH) iterativ aufbauen.

## Bezug zu plentyShop LTS (Ceres)
- **Ceres-Repository:** https://github.com/plentymarkets/plugin-ceres.git
- **IO-Plugin:** https://github.com/plentymarkets/plugin-io
- **Quell-Repo für bestehende Frontend-Snippets:** https://github.com/davidmadmin/Custom-CSS-JS-im-Frontend-Hammer-Shops

## Ignore-Dateien für PlentyLTS
Damit PlentyLTS beim Upload nur relevante Plugin-Dateien berücksichtigt, nutzt dieses Repo eine `plenty.ignore`.


## Hinweis zu Bilddateien
Die Plugin-Bilder in `meta/images/` sind bereits mit `plugin.json` verbunden. Details zur Zuordnung findest Du in `meta/images/README.md`.

## Custom price font
- Lege die Preis-Schriftdateien in `resources/fonts/` ab (aktuell `Industry-Demi.woff2` und `Industry-Demi.woff` als `Industry-Demi`).
- Die Fallback-Kette steuerst Du über `--hammer-price-font` in `resources/css/main.scss` (wird nach `css/main.css` kompiliert/gespiegelt).
- Für zukünftige Preis-Komponenten erweiterst Du den Block `/* price font override */` in `resources/css/main.scss`, damit nur Preistexte überschrieben werden.
- In der Standard-plentyShop-LTS-Integration lädt `css/main.css` nach den Ceres-Basis-Styles; dadurch gewinnt die Preis-Schrift im Cascade-Order gegenüber den Ceres-Defaults, wo kein höher spezifischer Selector greift.
- Der Container-Link zeigt nur den Provider-Output. Die Preis-Font bindest Du daher ueber Theme/PageDesign oder einen dedizierten Style-Provider ein.
