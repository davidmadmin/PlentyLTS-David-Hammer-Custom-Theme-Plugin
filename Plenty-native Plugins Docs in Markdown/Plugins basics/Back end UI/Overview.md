# Angular back end UI

| | The Terra-Components and the Plugin Terra-Basic have been deprecated and will no longer be maintained. Although you can still work with them, we recommend using [Material components](https://material.angular.io/) instead. |

|---|---|

This page gives an introduction to back end UIs and its components.

First of all, some basics about Angular and its usage in plentymarkets:

\- All PlentyONE UIs are Angular UIs.

\- At the moment, we are using version 12.

\- Angular is a Javascript framework for creating web, desktop and mobile applications.

\- To develop Angular applications, you have to know Typescript, HTML and CSS.

\- Angular applications use components.

\- These components define different areas in the UI, where you can display static content or provide user inputs.

If you're not familiar with Angular yet and want to find out more, refer to the [Angular documentation](https://angular.io/).

## Back end menu information

All information about the back end menu entries is saved in a `ui.json` file. This file defines the entry points for the plugin. Views are then available at the respective menus.

The following example shows a basic `ui.json`:

### _ui.json_

```text
{

 "defaultEntryPoint": "index.html",

 "namespace": "MyPlugin",

 "menuEntries": [

   {

     "label": "Settings",

     "menu": "settings/orders/myplugin",

     "urlKey": "basic-settings",

     "entryPoint": "index.html?action=basic-settings"

   },

   {

     "label": "Address settings",

     "menu": "settings/orders/myplugin",

     "urlKey": "address-settings",

     "entryPoint": "index.html?action=address-settings"

   },

   {

     "label": "Shipping settings",

     "menu": "settings/orders/myplugin",

     "urlKey": "shipping-settings",

     "entryPoint": "index.html?action=shipping-settings"

   }

 ]

}
```

## Plugin menu entries

The following table lists the specific properties of your plugin's menu entries.

Required All entries listed below are mandatory.

| **Property**|**Explanation** |

|---|---|

| **defaultEntryPoint** | The default entry point of your plugin |

| **namespace** | The namespace of your plugin |

| **menuEntries** | The menu entries of your plugin.<br>The following information is saved for a menu entry:<br>• `label`: PlentyONE displays the label as menu entry in the back end.<br><br>• `menu`: The menu the plugin accesses via an entry point.<br><br>• `urlKey`: The route for the view in our PlentyONE back end, e.g. <http://your-plentystore.co.uk/plenty/ui-backend/start/hello-world>.<br>**_Note:_** The URL key of the plugin may not contain any special characters except for hyphens.<br>• `entryPoint`: The entry point of your plugin<br><br>• `icon`: The icon for the menu entry in the system tree. If no icon is specified, the standard plugin icon is displayed. To not display any icon, use `"icon": "none"`. Find a list of all icons on the [Terra icons](https://developers.plentymarkets.com/en-gb/developers/main/back-end-ui/overview.html#terra-icons.adoc) page. |

## Integrating plugins into the back end

It is possible to seamlessly integrate your plugin into the PlentyONE back end. You can use entry points to add your plugin to the top navigation bar or routes to add it to the navigation tree of the **Setup** menu.

### Menu entry points

Back end views can be integrated in the PlentyONE main menu. For a list of all menus that can be accessed by a plugin via entry points, refer to the [Menu entry points](https://developers.plentymarkets.com/en-gb/developers/main/back-end-ui/reference-menu-entry-points.html) page.

### Routes in the system tree

The Terra system tree offers plugin developers the opportunity to register their plugin behind a route. In doing so, the plugin becomes accessible in the system tree like a regular part of Terra. For a list of all available routes that can be accessed by plugins, refer to the [Routes in the system tree](https://developers.plentymarkets.com/en-gb/developers/main/back-end-ui/reference-routes-system-tree.html) page. For instructions on how to register your plugin, refer to the [back end UI guide](https://developers.plentymarkets.com/en-gb/developers/main/back-end-ui/how-to-back-end-ui.html#code-uijson).

| | **_Format for system tree path_**<br>Note that all routes need an introducing `system`. Older routes beginning with `settings` will be mapped to match the new format. Since the new menu item for the system tree was renamed to 'Setup', the new full system tree path also starts with 'Setup'. |

|---|---|

### Plugin positioning

In addition to inserting plugins as desired in menus under **Setup**, it is also possible to determine their position depending on their route. If you use a route that's not mentioned in the [routes reference](https://developers.plentymarkets.com/en-gb/developers/main/back-end-ui/reference-routes-system-tree.html), a parent node is created with the specified name. It appears underneath the actual entry. In case there are several entries whose last part of the route is identical, they are inserted underneath this part of the route. Thus, only the position of the first entry is considered.
