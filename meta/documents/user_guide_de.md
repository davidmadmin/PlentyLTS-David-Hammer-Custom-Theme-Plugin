# Benutzerhandbuch: HammerTheme

## Zweck
Dieses Plugin stellt die Basisstruktur fuer das PlentyShop-LTS-Theme der Hammer-Shops bereit.

## Installation
1. Plugin in Dein Plugin-Set installieren.
2. Plugin-Set speichern und bereitstellen.
3. In den Container-Links den DataProvider **Hammer Theme Base Container** mit dem Container **`Ceres::Template.Style`** verknuepfen.
4. Der DataProvider ist bereits mit `defaultLayoutContainer: "Ceres::Template.Style"` vorbelegt, damit Du die Standard-Zuordnung direkt nutzen kannst.
5. Der Container-Link zeigt den Provider-Output; Preis-Font kommt ueber Theme/PageDesign oder einen dedizierten Style-Provider.

## Konfiguration
- Dieser DataProvider ist als Style-Provider gedacht und gibt nur das Stylesheet-Markup aus.
- Das Header-JavaScript wird über `resources/views/PageDesign/PageDesign.twig` mit `{{ plugin_path('HammerTheme') }}/resources/js/main.js` eingebunden.
- Fuer die Preis-Font-Einbindung nutze Theme/PageDesign oder einen dedizierten Style-Provider.

## Support
Bei Fragen nutze bitte die in `meta/documents/support_contact_de.md` hinterlegten Kontaktdaten.
