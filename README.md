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
4. Der Container-Link liefert CSS **und** die konfigurierbaren CSS-Variablen/Fonteinbindung, damit Änderungen aus `config.json` direkt greifen.
5. Danach Header/Footer- und Shop-spezifische Erweiterungen (FH/SH) iterativ aufbauen.

## Container-Verknüpfungen in Plenty Plugins (inkl. Default-Container)

Container-Verknüpfungen bedeuten in PlentyONE/plentyShop: Du verbindest den Output eines DataProviders (bei uns: `HammerTheme\\Containers\\HammerThemeContainer`) mit einer konkreten Einhängeposition im Ceres-Template. Dadurch entscheidet der Container, **wo** der zurückgegebene Twig-Output gerendert wird.

Technisch ist das die Verknüpfung zwischen:
- **DataProvider** in `plugin.json` (liefert Markup), und
- **Layout-Container** in Ceres (bestimmt Position/Zeitpunkt der Ausgabe).

### Was ist ein „Default-Container“?

Ein **Default-Container** ist die optionale Eigenschaft `defaultLayoutContainer` im jeweiligen DataProvider in `plugin.json`. Wenn gesetzt, kann Plenty den DataProvider beim Verknüpfen direkt an diesen vorgeschlagenen Container hängen.

Wichtig für dieses Plugin:
- Aktuell ist in `plugin.json` **kein** `defaultLayoutContainer` gesetzt.
- Das heißt: Die Verknüpfung passiert derzeit manuell im Plugin-Set unter **Container-Verknüpfungen**.
- Falls Du die manuelle Arbeit reduzieren willst, kannst Du später z. B. `"defaultLayoutContainer": "Ceres::Template.Style"` ergänzen.

### Welche Container brauchen wir für dieses Plugin aktuell?

Der DataProvider **Hammer Theme Base Container** rendert derzeit nur:
- `<link rel="stylesheet" .../css/main.css>`
- Theme-Variablen/Fonteinbindung via Twig-Include.

Daher gilt aktuell:
- **Erforderlich:** `Ceres::Template.Style`
- **Nicht erforderlich (derzeit):** `Ceres::Script.Loader` (nur sinnvoll, wenn dieser DataProvider auch `<script>`-Output liefern soll)

Hinweis: Wenn derselbe DataProvider gleichzeitig an `Template.Style` **und** `Script.Loader` hängt, wird sein Output zweimal ausgegeben. Da unser Output aktuell style-lastig ist, ist die saubere Ziel-Verknüpfung primär `Template.Style`.

### Erklärung der in Deinem Screenshot sichtbaren Container-Optionen

Die folgende Liste erklärt die sichtbaren Einträge aus der Ceres-Containerauswahl:

#### `Ceres::Template.Style`
- Globaler Style-Container für CSS/Style-Markup.
- Geeignet für Theme-CSS und globale CSS-Variablen.
- **Für unser Plugin aktuell der wichtigste Container.**

#### `Ceres::Script.Loader`
- Globaler Container zum Laden von Script-Markup.
- Typisch für `<script>`-Includes oder Inline-JS (wenn nötig).
- Für den aktuellen Base-DataProvider nur dann sinnvoll, wenn JS darüber ausgeliefert wird.

#### `Category item list: Before prices container`
- Einhängepunkt in Kategorie-Listing-Kacheln **vor** der Preisausgabe.
- Nützlich für Labels/Badges/Hinweise vor Preisblöcken.

#### `Category item list: After prices container`
- Einhängepunkt in Kategorie-Listing-Kacheln **nach** der Preisausgabe.
- Nützlich für zusätzliche Hinweise (z. B. Liefer-/Serviceinfos).

#### `Category item list: Container below side navigation`
- Container unterhalb der Seiten-/Kategorie-Navigation im Listing.
- Nützlich für Banner, Teaser oder Info-Boxen im Kategorie-Layout.

#### `Checkout: Address field container`
- Einhängepunkt im Adressbereich des Checkouts.
- Typisch für zusätzliche Felder/Hinweise (abhängig von Checkout-Flow).

#### `Checkout: Before invoice address`
- Ausgabe **vor** dem Rechnungsadress-Block.
- Für Hinweise, zusätzliche UI-Elemente oder Validierungsinformationen.

#### `Checkout: After invoice address`
- Ausgabe **nach** dem Rechnungsadress-Block.
- Für ergänzende Erklärungen/Infoboxen.

#### `Checkout: Before shipping address`
- Ausgabe **vor** dem Lieferadress-Block.
- Nützlich für Kontextinfos oder Zusatzoptionen.

#### `Checkout: After shipping address`
- Ausgabe **nach** dem Lieferadress-Block.
- Nützlich für Folgeschritte/Erklärungen.

#### `Checkout: Before shipping method`
- Ausgabe **vor** der Versandart-Auswahl.
- Geeignet für Versandhinweise oder Einschränkungen.

#### `Checkout: After shipping method`
- Ausgabe **nach** der Versandart-Auswahl.
- Geeignet für ergänzende Versandinformationen.

#### `Checkout: Before payment method`
- Ausgabe **vor** der Zahlungsart-Auswahl.
- Sinnvoll für Zahlungsbedingungen/Informationsblöcke.

#### `Checkout: After payment method`
- Ausgabe **nach** der Zahlungsart-Auswahl.
- Sinnvoll für Ergänzungen (z. B. Sicherheit/Abwicklung).

#### `Checkout: Before basket totals`
- Ausgabe **vor** Summenbereich (Zwischensumme/Gesamtsumme).
- Für erklärende Texte oder Kostenhinweise.

#### `Checkout: After basket totals`
- Ausgabe **nach** Summenbereich.
- Für zusätzliche Pflichtinfos oder Trust-Hinweise.

#### `Checkout: Before "Order now" button`
- Ausgabe direkt **vor** dem „Jetzt bestellen“-Button.
- Kritischer Bereich für Rechtstexte und finale Hinweise.

#### `Checkout: After "Order now" button`
- Ausgabe direkt **nach** dem „Jetzt bestellen“-Button.
- Eher für ergänzende Hinweise; Usability sorgfältig prüfen.

#### `Checkout: Opt-ins`
- Bereich für Opt-ins im Checkout (z. B. Einwilligungen/Checkboxen).
- Einsatz nur mit klarer rechtlicher/fachlicher Abstimmung.

#### `Checkout: After scripts loaded`
- Script-orientierter Container nach Laden der Checkout-Skripte.
- Geeignet für Checkout-spezifisches JavaScript.

#### `Checkout: Override "Order now" button (deprecated)`
- Veralteter Override-Container zum Ersetzen des Bestellbuttons.
- **Nicht neu verwenden**; nur bei Legacy-Setups relevant.

#### `Checkout: Override address controls (deprecated)`
- Veralteter Override-Container für Adress-Controls.
- **Nicht neu verwenden**; modernere Container bevorzugen.

### Empfohlene Praxis für dieses Repository

- Für den Basis-Container in diesem Repo derzeit auf `Ceres::Template.Style` fokussieren.
- Checkout-/Kategorie-Container nur dann belegen, wenn Du gezielt dortige Features einführst.
- Deprecated-Container nicht für neue Implementierungen nutzen.
- Wenn künftig separate JS-DataProvider dazukommen, kann ein eigener DataProvider mit passendem `defaultLayoutContainer` (`Ceres::Script.Loader` oder checkout-/pdp-spezifische Container) sinnvoll sein.


## Plugin-Konfiguration (Preisdarstellung)
- **Primärfarbe** nutzt nun einen Color-Picker und erwartet ein gültiges HEX-Format mit `#` (z. B. `#31a5f0`).
- **PDP Preis H1 Schriftgröße** ist neu und standardmäßig auf `1.4rem` gesetzt; Du kannst hier z. B. `1.2rem`, `22px` oder `110%` eintragen.
- Ungültige Werte bei der PDP-Preis-H1-Schriftgröße werden im Twig-Fallback automatisch auf `1.4rem` zurückgesetzt.

## Bezug zu plentyShop LTS (Ceres)
- **Ceres-Repository:** https://github.com/plentymarkets/plugin-ceres.git
- **IO-Plugin:** https://github.com/plentymarkets/plugin-io
- **Quell-Repo für bestehende Frontend-Snippets:** https://github.com/davidmadmin/Custom-CSS-JS-im-Frontend-Hammer-Shops

## Ignore-Dateien für PlentyLTS
Damit PlentyLTS beim Upload nur relevante Plugin-Dateien berücksichtigt, nutzt dieses Repo eine `plenty.ignore`.


## Hinweis zu Bilddateien
Die Plugin-Bilder in `meta/images/` sind bereits mit `plugin.json` verbunden. Details zur Zuordnung findest Du in `meta/images/README.md`.

## Custom price font
- Lege die Preis-Schriftdateien in `resources/documents/` ab (aktuell `Industry-Demi.woff2` und `Industry-Demi.woff` als `Industry-Demi`).
- Die Fallback-Kette steuerst Du über `--hammer-price-font` in `resources/css/main.scss` (wird nach `css/main.css` kompiliert/gespiegelt).
- Für zukünftige Preis-Komponenten erweiterst Du den Block `/* price font override */` in `resources/css/main.scss`, damit nur Preistexte überschrieben werden.
- In der Standard-plentyShop-LTS-Integration lädt `css/main.css` nach den Ceres-Basis-Styles; dadurch gewinnt die Preis-Schrift im Cascade-Order gegenüber den Ceres-Defaults, wo kein höher spezifischer Selector greift.
- Die Font wird über eine Twig-`@font-face`-Definition aus `documents/` mit absolutem `plugin_path` eingebunden, damit Browser die WOFF-Dateien ohne 403 laden.


## ShopBuilder-Header-Widget
- Das komplette Header-Markup ist als ShopBuilder-Widget `HammerTheme::HeaderWidget` (Label: **David's Custom Header**) registriert.
- Du kannst das Widget im Header-Bereich platzieren und den **Logo-Zielpfad** pro Widget-Instanz konfigurieren.
- Welches Header-Layout gerendert wird (FH oder SH), steuerst Du ausschließlich über die Plugin-Konfiguration **Header-Layout** (`theme.headerLayout`).
- Die Domain wird für die Header-Auswahl nicht mehr ausgewertet.
