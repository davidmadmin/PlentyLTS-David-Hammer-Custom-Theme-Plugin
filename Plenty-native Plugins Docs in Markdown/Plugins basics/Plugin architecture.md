# Plugin architecture

To avoid unexpected behaviour and ensure that your plugins run smoothly, your plugins have to adhere to the structure detailed below.

## Plugin structure

For plugins to run smoothly, they have to be structured in a certain way. This section details the required structure. It's important that you stick to this structure to avoid unexpected behaviour.

### _Plugin file structure_

```text
PluginDirectory/

    │

    ├── meta/

    │

    ├── resources/

    │

    ├── src/

    │

    ├── tests/

    │

    ├── ui/

    │

    ├── config.json

    │

    ├── contentWidgets.json

    │

    ├── marketplace.json

    │

    ├── plugin.json

    │

    ├── ui.json

    │

    └── README.md
```

| Directory/File | Description |

|----------------|-------------|

| meta/ | Contains information for the end user. **[For further information, see below.](https://developers.plentymarkets.com/en-gb/developers/main/plugin-architecture.html#_meta_files)** |

| resources/ | Contains supplementary, non-executable files. **[For further information, see below.](https://developers.plentymarkets.com/en-gb/developers/main/plugin-architecture.html#_resources_files)** |

| src/ | Contains the source code of the plugin. PlentyONE plugins use PHP 8.0. |

| tests/ | Contains the test suite of the plugin. |

| ui/ | Contains back end views. |

| config.json | Provides options to the end user for configuring the plugin. |

| contentWidgets.json | Provides information for making the plugin available in ShopBuilder. |

| marketplace.json | Provides information for offering the plugin on plentyMarketplace. |

| plugin.json | Provides the definition of the plugin. For more information, see the **[Plugin definition](https://developers.plentymarkets.com/en-gb/developers/main/plugin-definition.html)** page. |

| ui.json | Provides entry points for back end views. PlentyONE back end UIs use AngularJS. |

| README.md | Provides information for the developer. |

The `plugin.json` is always required. Depending on the type of plugin you want to develop, other parts of the structure may or may not be required. For example, you cannot provide a UI in the PlentyONE back end without the relevant views and entry points. For detailed information on when different parts of the structure are required, refer to the relevant sections of the documentation.

## Meta files

Meta files contain information that is primarily relevant for the end user. You may find this information less relevant when developing a plugin for yourself. Nevertheless, it's of vital importance if you plan on distributing your plugin to others.

### _Meta files_

```text
PluginDirectory/

    └── meta/

        │

        ├── images/

        │

        └── documents/
```

| Directory | Description |

|-----------|-------------|

| images/ | Plugin icons, author icons, and preview images. PlentyONE uses these images when displaying the plugin in the back end and on plentyMarketplace. |

| documents/ | Documents relevant for using the plugin. This includes a user guide, changelog and support contact information. You have to supply all documents in German and English. Other languages are optional. |

## Resources files

Resources are supplemental files, such as templates, scripts and images. These resources are available on the app path of the plugin. When deploying the plugin, the resources are published independently and don't undergo a code check. This means that during development with plentyDevTool, it's possible to publish modified resources at a faster rate than source code.

### _Resources files_

```text
PluginDirectory/

    │

    └── resources/

        │

        ├── css/

        │

        ├── documents/

        │

        ├── images/

        │

        ├── js/

        │

        ├── lang/

        │

        ├── scss/

        │

        └── views/
```

| Directory | Description |

|-----------|-------------|

| css/ | Contains CSS files. |

| documents/ | Contains fonts, PDF files, or other static content. |

| images/ | Contains images to render in views. |

| js/ | Contains JavaScript files. May contain subfolders to organise different types of scripts. |

| lang/ | Contains translation files. When using texts, German and English translations are required. Other languages are optional. |

| scss/ | Contains SCSS files. If you use SCSS for styling, you need a script for generating the corresponding CSS files. |

| views/ | Contains templates for shop pages. The default plentyShop uses TWIG and Vue.js. You can organise your views in subfolders for better readability. |

## Integration of plugins in plentymarkets

When you add a plugin to plentymarkets, PlentyONE can access the plugin in one of the following ways:

\- **Routes**: You can add new routes, either to your shop or the PlentyONE back end. The plugin executes functionality when the route is called.

  For example, the **[IO plugin](https://github.com/plentymarkets/plugin-io/blob/stable/src/Providers/IORouteServiceProvider.php)** registers all the routes for the basic plentyShop.

\- **Events**: Plugins can listen to pre-defined events. When the PlentyONE system dispatches an event, the plugin executes its functionality.

  For example, the plugin build dispatches an `AfterBuildPlugins` event. A plugin can listen to this event and react to it to, say, re-generate ShopBuilder contents. For more information on the available events, refer to the **[plugin interface documentation](https://developers.plentymarkets.com/en-gb/developers/main/plugin-architecture.html#stable7@plugin-interface:ROOT:Account.adoc)**.

\- **Cron jobs**: Cron jobs execute plugin functionality in certain time intervals. This is useful for recurring actions that aren't tied to a specific event.

  For example, plugins that connect PlentyONE to marketplaces use crons to regularly import orders from the marketplace.
