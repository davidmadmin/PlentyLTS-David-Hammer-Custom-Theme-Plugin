# User guide: HammerTheme

## Purpose
This plugin provides the base structure for the Hammer shops' plentyShop LTS theme.

## Installation
1. Install the plugin in your plugin set.
2. Save and deploy the plugin set.
3. Link the data provider **Hammer Theme Base Container** to the container **`Ceres::Template.Style`** in container links.
4. The data provider already defines `defaultLayoutContainer: "Ceres::Template.Style"` for faster correct assignment.

## Configuration
- **Theme root CSS class** (`theme.baseClass`): Defines the wrapper base class.
- Header JavaScript is loaded in `resources/views/PageDesign/PageDesign.twig` via `{{ plugin_path('HammerTheme') }}/resources/js/main.js`.

## Support
For support information, check `meta/documents/support_contact_en.md`.
