# Plugin basics → Plugin definition

## Overview

The plugin definition file specifies the core metadata of your plugin. It's called `plugin.json` and has to be located in the root folder of your plugin. It's required for PlentyONE to recognize and run your plugin.

The file contains values describing your plugin. Some of these values are required, others are optional. In the following sections, you'll find a complete list of all available values.

## name

### Required

*Possible values:* string

The technical name of the plugin. The plugin name should reflect the plugin's purpose. It's displayed in the PlentyONE back end and on plentyMarketplace.

## namespace

### Required

*Possible values:* string

Specifies the root namespace of the plugin. The namespace has to be identical to the value specified in the source code. The namespace can theoretically be any string. However, if you want to publish your plugin on plentyMarketplace, the namespace has to be different from all other plugins available.

## type

### Required

*Possible values:* string

The type of the plugin. The type should reflect the plugin's purpose. It's displayed in the back end, but has no other purpose.

The following types are available:

| **Type**|**Explanation** |

|---|---|

| `backend` | Provides a UI in the PlentyONE back end for displaying information. |

| `export` | Adds an additional export format. |

| `general` | Serves as a fallback you can use in case the plugin doesn't fit any of the other types. |

| `integration` | Extends the functionality of PlentyONE . |

| `payment` | Adds an additional payment method. |

| `shipping` | Adds an additional shipping provider. |

| `template` | Provides views in the shop front end. These views can either supplement or replace the default plentyShop. |

| `theme` | Provides styling for template plugins, including the default plentyShop. |

| `widget` | Extends the functionality of plentyShop. Widgets may or may not be compatible with ShopBuilder. |

## version

### Required

*Possible values:* string

The current version of the plugin. PlentyONE plugins use semantic versioning. This means the version format is MAJOR.MINOR.PATCH.

As you're making changes to your plugin, you should increase the version to reflect the nature of the changes. Increasing the version is required when updating the plugin on plentyMarketplace. For a guideline on when to increment which version, refer to the table below.

| **Version**|**Explanation** |

|---|---|

| MAJOR | The update isn't backwards compatible. |

| MINOR | The update is backwards compatible. The update adds new functionality. |

| PATCH | The update is backwards compatible. The update fixes a bug. |

For further information and more specific use cases, refer to the **[complete semantic versioning guide](https://semver.org/)**.

## require

*Possible values:* array or object

Specifies other plugins that have to be present in the plugin set for the plugin to run properly. This value isn't required, but provides useful information to the user.

PlentyONE plugins use semantic versioning. This means you should specify requirements in a MAJOR.MINOR.PATCH format. It's possible to use operators for specifying multiple versions efficiently. The following operators are available:

\- `>`

\- `>=`

\- `<`

\- `<=`

\- `!=`

\- `~`

The tilde operator (`~`) describes a range in-between two versions. It's essentially a short-hand form for combining the operators `>=`and`<`. For example, requiring the version `~1.2.3`is the same as requiring any version between 1.2.3 and 1.3.0. In this example, the required version has a non-zero digit in the "fix" position. This means that the upper boundary is determined by the next highest minor version. If the requirement is`~1.2.0`, the upper boundary is determined by the next highest major version.

## platform

*Possible values:* array or object

Specifies on which PHP version the plugin runs properly. This value isn't required, but provides useful information to the user.

The following operators are available:

\- `>`

\- `>=`

\- `<`

\- `<=`

\- `!=`

\- `~`

The tilde operator (`~`) describes a range in-between two versions. It's essentially a short-hand form for combining the operators `>=`and`<`. For example, requiring the version `~7.3` is the same as requiring any version between 7.3 and 8.0. In this example, the required version has a non-zero digit in the "minor" position. This means that the upper boundary is determined by the next highest major version.

## isClosedSource

*Default:* `false`

*Possible values:* `true`, `false`

Determines if the plugin source code is visible in the PlentyONE back end when installing the plugin from plentyMarketplace. The source code is always visible when installing the plugin via Git. It's also possible to download open source marketplace plugins with plentyDevTool and view the source code this way.

## description

### Required

*Possible values:* any string

The description of the plugin. This description is displayed in the PlentyONE back end.

## author

### Required

*Possible values:* any string

The author of the plugin. The author name is displayed in the PlentyONE back end and on plentyMarketplace.

## email

*Possible values:* any string

The email address of the author. If you provide an email address, it's displayed as contact information in the PlentyONE back end.

## phone

*Possible values:* any string

The phone number of the author. If you provide a phone number, it's displayed as contact information in the PlentyONE back end.

## authorIcon

### Required

*Possible values:* any string

The file name of the author icon. The file has to be stored in the `meta/images` folder.

## pluginIcon

### Required

*Possible values:* any string

The file name of the plugin icon. The file has to be stored in the `meta/images` folder.

## serviceProvider

*Possible values:* any string

Specifies the path to the service provider of the plugin. PlentyONE calls this service provider to register and run the plugin.

## containers

*Possible values:* array

Specifies an array of container objects the plugin provides. Template plugins can use containers to provide additional space on shop pages. Other plugins can provide data to inject content into the containers. New content either replaces or supplements existing content.

## dataProviders

*Possible values:* array

Specifies an array of data provider objects the plugin provides. The data provided by the plugin can be linked to a container. New content either replaces or supplements existing content.

## dependencies

*Possible values:* array

Specifies an array of dependencies to external software development kits (SDKs). An SDK is a package of software components. You can use these packages to access functionality without implementing it in your own plugin. PlentyONE only accepts packages published on **[Packagist](https://packagist.org/)**.

## runOnBuild

*Possible values:* array

Specifies an array of classes for PlentyONE to execute when deploying the plugin. Use these classes to run migrations. You have to use migrations when creating, updating or deleting database tables.
