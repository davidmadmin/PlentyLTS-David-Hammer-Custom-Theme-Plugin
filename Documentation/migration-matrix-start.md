# Startmatrix: Migration der Snippets ins HammerTheme-Plugin

Diese Startmatrix gibt Dir einen konkreten, priorisierten Migrationsplan mit Fokus auf Header/Footer zuerst, danach PDP und Checkout. Jede Zeile ist so formuliert, dass Du die Migration in kleinen, testbaren Schritten umsetzen kannst.

## Nutzung

- Priorität zuerst nach **P1 → P2 → P3** abarbeiten.
- Pro Zeile immer erst **Ceres-Struktur prüfen**, dann migrieren, dann gegen **FH und SH** validieren.
- Bei Kundenkommunikation im Frontend immer **„Merkliste“** verwenden.
- Interne Shop-Links als **relative Pfade** belassen (z. B. `/kontakt`).

## Matrix (24 konkrete Startzeilen)

| ID | Prio | Bereich | Shop | Quelle (Original-Repo) | Ziel (Plugin-Repo) | Code-Typ | Einbindung/Hooks | Konkrete Transformationsregeln | Risiko | Abnahmekriterien (DoD) |
|---|---|---|---|---|---|---|---|---|---|---|
| HDR-FH-001 | P1 | Header | FH | `Header/HTML/FH - Header.html` | `resources/views/PageDesign/Includes/Header/FH.twig` (neu) | HTML/Twig | Include aus `PageDesign.twig` im Header-Container | Ceres-Variablen (`basket`, `wishListCount`) behalten; interne Links relativ; Texte auf „Merkliste“ prüfen | hoch | Header rendert vollständig; Basket-/Merkliste-Zähler korrekt; keine Twig-Fehler |
| HDR-SH-001 | P1 | Header | SH | `Header/HTML/SH - Header.html` | `resources/views/PageDesign/Includes/Header/SH.twig` (neu) | HTML/Twig | Include aus `PageDesign.twig` im Header-Container | SH-spezifische Klassen/Attribute erhalten; interne Links relativ; SH-Branding beibehalten | hoch | SH-Header vollständig; Navigation + Suche + Kontobereich funktionieren |
| HDR-BOTH-001 | P1 | Header | beide | `Header/HTML/FH - Header.html`, `Header/HTML/SH - Header.html` | `resources/views/PageDesign/Includes/Header/HeaderRouter.twig` (neu) | Twig | Router-Include entscheidet FH/SH anhand Mandant/Domain | Fallback-Logik definieren, damit nie leerer Header entsteht | hoch | FH und SH bekommen jeweils richtigen Header, kein Cross-Shop-Mix |
| HDR-FH-002 | P1 | Header | FH | `Header/CSS/FH - Header.css` | `resources/css/partials/_header-fh.scss` (neu) + Import in `main.scss` | CSS→SCSS | Laden über bestehendes `main.css` | Selektoren unter `.fh-header` scopen; unnötige `!important` abbauen; Variablen zentralisieren | mittel | Desktop/Mobile ohne Layout-Brüche; keine ungewollten globalen Überschreibungen |
| HDR-SH-002 | P1 | Header | SH | `Header/CSS/SH - Header.css` | `resources/css/partials/_header-sh.scss` (neu) + Import in `main.scss` | CSS→SCSS | Laden über bestehendes `main.css` | Selektoren unter `.sh-header` scopen; SH-Farbwerte als CSS-Variablen | mittel | SH-Header visuell korrekt; FH bleibt unverändert |
| HDR-FH-003 | P1 | Header | FH | `Header/JS/FH - Header.js` | `resources/js/modules/header-fh.js` (neu) + Import in `main.js` | JS | Footer-Script in `PartialFooter` | Ready-Wrapper vereinheitlichen; doppelte Listener verhindern; Menu-Toggle idempotent | hoch | Konto-/Merkliste-Menü öffnen/schließen stabil; Escape + Outside-Click funktionieren |
| HDR-SH-003 | P1 | Header | SH | `Header/JS/SH - Header.js` | `resources/js/modules/header-sh.js` (neu) + Import in `main.js` | JS | Footer-Script in `PartialFooter` | SH-spezifische Hooks beibehalten; Observer nur wenn nötig aktivieren | hoch | SH-Menüs stabil; keine doppelten Observer/Listener nach Ajax-Updates |
| HDR-BOTH-002 | P1 | Header | beide | `Header/JS/FH - Header.js`, `Header/JS/SH - Header.js` | `resources/js/modules/core/on-ready.js` (neu) | JS | Von allen Modulen genutzt | Einheitlichen `onReady`-Helper einführen statt Duplikate | mittel | Initialisierung läuft genau 1x pro Modul |
| FTR-FH-001 | P1 | Footer | FH | `Footer/HTML/FH-Footer.html` | `resources/views/PageDesign/Includes/Footer/FH.twig` (neu) | HTML/Twig | Include im Footer-Bereich | Interne Links relativ halten; externe Social-Links mit `rel="noopener"` | niedrig | Footer-Spalten + Links vollständig; keine fehlerhaften Ziele |
| FTR-SH-001 | P1 | Footer | SH | `Footer/HTML/SH-Footer.html` | `resources/views/PageDesign/Includes/Footer/SH.twig` (neu) | HTML/Twig | Include im Footer-Bereich | SH-Linkstruktur/Branding konsistent übernehmen | niedrig | SH-Footer vollständig; keine regressiven Änderungen an FH |
| FTR-BOTH-001 | P1 | Footer | beide | `Footer/HTML/FH-Footer.html`, `Footer/HTML/SH-Footer.html` | `resources/views/PageDesign/Includes/Footer/FooterRouter.twig` (neu) | Twig | Router-Include entscheidet FH/SH | Fallback für unbekannte Mandanten hinzufügen | mittel | Immer valider Footer sichtbar |
| PDP-FH-001 | P2 | PDP | FH | `Produktdetailseiten/HTML/FH - Produktdetail.html` | `resources/views/PageDesign/Includes/PDP/FH.twig` (neu) | HTML/Twig | PDP-spezifischer Include nur auf Artikelseite | Bestehende Ceres-Container prüfen, damit keine doppelten Elemente entstehen | hoch | PDP-FH zeigt Zusatzblöcke korrekt; Kauf-Panel bleibt funktionsfähig |
| PDP-SH-001 | P2 | PDP | SH | `Produktdetailseiten/HTML/SH - Produktdetail.html` | `resources/views/PageDesign/Includes/PDP/SH.twig` (neu) | HTML/Twig | PDP-spezifischer Include nur auf Artikelseite | SH-Variantenlogik nicht brechen; IDs/Klassen mit Ceres abgleichen | hoch | PDP-SH korrekt; Variantenwahl und ATC ohne Fehler |
| PDP-FH-002 | P2 | PDP | FH | `Produktdetailseiten/CSS/FH - Produktdetail.css` | `resources/css/partials/_pdp-fh.scss` (neu) | CSS→SCSS | Import in `main.scss` | Selektoren auf PDP scopen; Verfügbarkeitsstyles übernehmen | mittel | Verfügbarkeits- und Kaufpanel-Styles sichtbar, keine globalen Side-Effects |
| PDP-SH-002 | P2 | PDP | SH | `Produktdetailseiten/CSS/SH - Produktdetail.css` | `resources/css/partials/_pdp-sh.scss` (neu) | CSS→SCSS | Import in `main.scss` | SH-Farb-/Abstandsregeln sauber kapseln | mittel | SH-PDP visuell konsistent, FH bleibt stabil |
| PDP-FH-003 | P2 | PDP | FH | `Produktdetailseiten/JS/FH - Produktdetail.js` | `resources/js/modules/pdp-fh.js` (neu) | JS | global laden, aber Guard nur auf PDP | Nur auf PDP initialisieren; Observer sparsam | mittel | PDP-Skripte laufen nur dort; keine Console-Fehler |
| PDP-SH-003 | P2 | PDP | SH | `Produktdetailseiten/JS/SH - Produktdetail.js` | `resources/js/modules/pdp-sh.js` (neu) | JS | global laden, aber Guard nur auf PDP | SH-Logik nur bei passenden DOM-Hooks aktivieren | mittel | SH-PDP-Interaktionen intakt; keine doppelten Events |
| CKO-FH-001 | P2 | Checkout | FH | `Checkout/CSS/FH - Checkout.css` | `resources/css/partials/_checkout-fh.scss` (neu) | CSS→SCSS | Import in `main.scss` | Checkout-seitig auf Container scopen, damit globale Seiten unberührt bleiben | mittel | Checkout FH optisch korrekt, keine Kassen-Regression |
| CKO-SH-001 | P2 | Checkout | SH | `Checkout/CSS/SH - Checkout.css` | `resources/css/partials/_checkout-sh.scss` (neu) | CSS→SCSS | Import in `main.scss` | SH-Checkout-Regeln separieren | mittel | SH Checkout korrekt, FH unverändert |
| CKO-FH-002 | P2 | Checkout | FH | `Checkout/JS/FH - Checkout.js` | `resources/js/modules/checkout-fh.js` (neu) | JS | global laden mit Checkout-Guard | Versandicon-Replacement idempotent machen; MutationObserver mit Debounce | hoch | Icons werden genau 1x ersetzt; Checkout bedienbar |
| CKO-SH-002 | P2 | Checkout | SH | `Checkout/JS/SH - Checkout.js` | `resources/js/modules/checkout-sh.js` (neu) | JS | global laden mit Checkout-Guard | SH-Versandprofile prüfen; Selektoren robust halten | hoch | SH-Icons korrekt; keine Performance-Einbrüche |
| GLB-FH-001 | P3 | Global | FH | `Global/JS/FH - JS im Head.js` | `resources/views/PageDesign/Includes/Head.twig` + `resources/js/modules/global-fh-head.js` | JS | Head-include + Modul | Head-Code nur für nötige Features; Consent-APIs defensiv prüfen | mittel | Head-Features laufen ohne Blockieren des Renderings |
| GLB-SH-001 | P3 | Global | SH | `Global/JS/SH - JS im Head.js` | `resources/views/PageDesign/Includes/Head.twig` + `resources/js/modules/global-sh-head.js` | JS | Head-include + Modul | Cookie-Settings-Hook und Account-Navigation entkoppeln | mittel | Cookie-Layer-Trigger + Account-Nav stabil |
| GLB-BOTH-001 | P3 | Global | beide | `Global/JS/GTM Snippets/Legal-Table-of-Contents.js` | `resources/js/modules/legal-toc.js` (neu) | JS | nur auf Rechtstextseiten initialisieren | H1/H2/H3-Parsing nur bei Mehrfachvorkommen; idempotent rendern | niedrig | TOC wird nur auf passenden Seiten erzeugt |
| CMP-BOTH-001 | P3 | Components | beide | `Components/HTML/*Custom-Slider*.html` | `resources/views/PageDesign/Includes/Components/StartSlider*.twig` (neu) | HTML/Twig | In Startseiten-Container einbinden | Slider-Markup mit bestehendem JS/CSS synchronisieren | hoch | Slider + Overlay + Navigation in FH/SH funktionsgleich |

## Empfohlene Reihenfolge für die Umsetzung

1. **P1 Header/Footer vollständig** (Router + HTML + CSS + JS).
2. **P2 PDP/Checkout** inklusive Guard-Logik in JS.
3. **P3 Global/Components** und optionale Features.

## Minimale Prüf-Checkliste pro Zeile

- Twig rendert ohne Fehler.
- Keine doppelten Event-Listener nach Re-Render/Ajax.
- FH und SH sind beide funktionsfähig.
- Interne Links sind relativ.
- Kundennahe Texte verwenden „Merkliste“.
