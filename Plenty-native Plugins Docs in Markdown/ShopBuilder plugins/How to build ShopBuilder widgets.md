# ShopBuilder plugins → How to build ShopBuilder widgets

## Introduction

This guide teaches you how to build widgets for plentyShop LTS. You will create a widget that can be integrated into the ShopBuilder and placed on ShopBuilder contents. Additionally, you will learn how to implement presets that make your widgets available in the header and footer as well as on the homepage.

### Requirements

To develop ShopBuilder widgets, you need:

\- A plugin in which you can integrate the widget. See [Creating a plugin](https://developers.plentymarkets.com/en-gb/developers/main/getting-started/creating-a-plugin.html) to learn how to set up a plugin from scratch.

\- Basic knowledge of **Vue.js**.

\- The plentyShop LTS plugin, from which you will have to include data for your widget.

## Widget basics

ShopBuilder widgets essentially consist of three components:

1\. A **JSON configuration file** that registers the widget

2\. A **PHP class** that provides data for the Vue component

3\. A **Vue component** that specifies the widget's appearance

### The JSON configuration

First, create a `shopBuilder.json` file. This file serves to register the widgets that you build and includes information concerning their display in the back end, as well as certain restrictions that prevent ShopBuilder contents from breaking.

### Example: shopBuilder.json

```json
{

    "widgets": [

        {

            "identifier": "Ceres::BackgroundWidget",

            "label": "Widget.backgroundLabel",

            "previewImageUrl": "/images/preview/background-preview.svg",

            "type": "structure",

            "categories": ["structure"],

            "position": 100,

            "allowedNestingTypes": [],

            "nestingDepth": 1

        }

    ]

}
```

#### Explanation

The JSON file above registers a widget. The widget is identified via a unique identifier. Here, the identifier is composed of the plugin name and the widget name. The label is a key for the multilingualism system and serves to give a name to the widget in the ShopBuilder. The previewImageUrl specifies a path to an image that is displayed in the ShopBuilder interface. The type of the widget specifies that this widget is a structure widget; other types include "static", "default" and "text".

### The PHP class

The PHP class provides data for the Vue component to be displayed in the back end and in the front end of the online store. Below, you find an example of the PHP class for the background widget displayed above.

### Example: BackgroundWidget.php

```php
<?php

namespace Ceres\\Widgets\\Common;

use Ceres\\Widgets\\Helper\\BaseWidget;

class BackgroundWidget extends BaseWidget

{

    protected $template = "Ceres::Widgets.Common.BackgroundWidget";

}
```

#### Explanation

The class for the background widget is located in the `src/Widgets/Common` folder of the plentyShop LTS plugin. The background widget does not require much configuration, since it only serves to wrap other widgets in a coloured container.

### The Vue component

The Vue component specifies the appearance of the widget, so that it is rendered on the ShopBuilder content and in the online store.

### Example: BackgroundWidget.vue

```vue
<template>

    <div class="widget widget-background"

         :class="'widget-' + (widget.settings.customClass.mobile || 'bg-white')">

        <slot></slot>

    </div>

</template>

<script>

export default {

    props: {

        widget: Object

    }

}

</script>
```

#### Explanation

The Vue component above displays a simple div container. The class of the container depends on the setting `widget.settings.customClass.mobile`. In the ShopBuilder, users can select different background colours for the widget via a dropdown menu. The `<slot></slot>` element is a placeholder for child widgets that can be placed inside the background widget.

## Widget settings

Widgets can be configured via settings. These settings are specified in the `shopBuilder.json` file and can be edited by users in the ShopBuilder interface.

### Example: Text widget settings

```json
{

    "settings": {

        "text": {

            "type": "text",

            "required": true,

            "defaultValue": ""

        },

        "spacing": {

            "type": "spacing",

            "required": false,

            "defaultValue": null

        },

        "customClass": {

            "type": "text",

            "required": false,

            "defaultValue": ""

        }

    }

}
```

## Presets

Presets are pre-configured widgets that are automatically placed on certain ShopBuilder contents, such as the header, footer or homepage. Presets make it easier for users to get started with the ShopBuilder by providing them with a basic layout.

### Creating a preset

To create a preset, you need to create a PHP class that extends the `PresetContract` class. Below, you find an example of the preset for the plentyShop LTS default header.

### Example: DefaultHeaderPreset.php

```php
<?php

namespace Ceres\\Config\\Presets;

use Ceres\\Config\\CeresConfig;

use IO\\Extensions\\Constants\\ShopUrls;

use IO\\Helper\\RouteConfig;

use Plenty\\Modules\\ShopBuilder\\Contracts\\ContentPreset;

use Plenty\\Modules\\ShopBuilder\\Helpers\\PresetHelper;

use Plenty\\Plugin\\Application;

class DefaultHeaderPreset implements ContentPreset

{

    public function getWidgets()

    {

        /** @var CeresConfig $config */

        $config = pluginApp(CeresConfig::class);

        /** @var PresetHelper $preset */

        $preset = pluginApp(PresetHelper::class);

        $preset->createWidget("Ceres::TopBarWidget")

            ->withSetting("isFixed", $config->header->fixedNavBar)

            ->withSetting("searchStyle", "onDemand")

            ->withSetting("enableLogin", true)

            ->withSetting("enableRegistration", true)

            ->withSetting("enableLanguageSelect", true)

            ->withSetting("enableShippingCountrySelect", true)

            ->withSetting("enableCurrencySelect", true)

            ->withSetting("enableWishList", true)

            ->withSetting("enableBasketPreview", true)

            ->withSetting("basketValues", $config->header->basketValues)

            ->withSetting("showItemImages", false)

            ->withSetting("forwardToSingleItem", $config->search->forwardToSingleItem);

        $companyLogo = $config->header->companyLogo;

        if ( strpos($companyLogo, 'http') !== 0 \&\& strpos($companyLogo, 'layout/') !== 0 )

        {

            $companyLogo = pluginApp(Application::class)->getUrlPath('Ceres') . '/' . $companyLogo;

        }

        $preset->createWidget("Ceres::NavigationWidget")

            ->withSetting("isFixed", $config->header->fixedNavBar)

            ->withSetting("navigationStyle", $config->header->megamenuLevels > 1 ? "megaMenu" : "normal")

            ->withSetting("megaMenuLevels", $config->header->megamenuLevels)

            ->withSetting("megaMenuMaxItems.stage1", $config->header->megamenuItemsStage1)

            ->withSetting("megaMenuMaxItems.stage2", $config->header->megamenuItemsStage2)

            ->withSetting("megaMenuMaxItems.stage3", $config->header->megamenuItemsStage3)

            ->withSetting("companyLogoUrl", $companyLogo);

        $preset->createWidget("Ceres::BreadcrumbWidget")

            ->withSetting("isFixed", false)

            ->withSetting("showOnHomepage", false)

            ->withSetting("showOnMyAccount", false)

            ->withSetting("showOnCheckout", false)

            ->withSetting("showOnContentCategory", false);

        return $preset->toArray();

    }

}
```

#### Explanation

The code example above is taken from the PHP class for the plentyShop LTS default header. The three instances of `$preset→createWidget`specify which widgets are preconfigured for the header preset. In this case these are the top bar, the category navigation and the breadcrumb navigation. Underneath each instance of`$preset→createWidget`, the `→withSetting` directive specifies the default values of the individual widget settings as configured for the preset.

The line `$preset = pluginApp(PresetHelper::class);` accesses the plentyShop LTS helper class for presets, which is located in the Widgets/Helper folder.

## The data field picker

Beginning with the release of Ceres v4.3, you will be able to implement so-called data field pickers into your widgets. Data fields are individual variables that can be placed inside widgets to access particular item data. The **text widget** of the ShopBuilder, for instance, makes it possible for users to add fields such as the manufacturing country or the item's barcode to the item view. Any widget that supports inline editing can potentially access the data field picker. The fields are made available to users through a navigation tree on the left of the editor interface in the ShopBuilder.

### shopBuilder.json configuration

We added an object to the shopBuilder.json in the plentyShop LTS plugin, namely the "dataFieldProviders". So far, we have only included a data field provider for item data fields for the single item view, which is specified below as the **singleitem** key-value pair and its corresponding path in the plugin. The key "singleitem" here corresponds to the "allowedTypes" object in the shopbuilder.json; the item data field picker is only available for widgets that support inline editing that are placed on ShopBuilder contents of the type "singleitem".

```json
"dataFieldProviders": {

    "singleitem": "Ceres\\\\ShopBuilder\\\\DataFieldProvider\\\\Item\\\\ItemDataFieldProvider"

}
```

### ItemDataFieldProvider.php

The **ItemDataFieldProvider** that is referenced here is a PHP class. In essence, this class only registers a number of child providers, all of which provide a subset of item data to be used in the ShopBuilder.

### src/ShopBuilder/DataFieldProvider/Item/ItemDataFieldProvider.php

```php
<?php

namespace Ceres\\ShopBuilder\\DataFieldProvider\\Item;

use Plenty\\Modules\\ShopBuilder\\Providers\\DataFieldProvider;

class ItemDataFieldProvider extends DataFieldProvider

{

    function register()

    {

        $this->addChildProvider("Ceres::Widget.dataFieldItemGlobal", ItemGlobalDataFieldProvider::class);

        $this->addChildProvider("Ceres::Widget.dataFieldVariationGlobal", VariationGlobalDataFieldProvider::class);

        $this->addChildProvider("Ceres::Widget.dataFieldAvailability", AvailabilityDataFieldProvider::class);

        $this->addChildProvider("Ceres::Widget.dataFieldManufacturer", ManufacturerDataFieldProvider::class);

        $this->addChildProvider("Ceres::Widget.dataFieldBarcodes", BarcodeListDataFieldProvider::class);

        $this->addChildProvider("Ceres::Widget.dataFieldUnits", UnitDataFieldProvider::class);

        $this->addChildProvider("Ceres::Widget.dataFieldTexts", TextsDataFieldProvider::class);

    }

}
```

#### Explanation

In the provider's code above, you can see that the ItemDataFieldProvider registers 7 children in order to implement data fields pertaining to global item data, variation-specific data, availability, manufacturer, barcodes, units and item texts.

### Data field structure

The nested providers are located in the **src/ShopBuilder/DataFieldProvider/Item** folder. Each of these PHP classes provides a specific subset of (in this case) item data. The data fields added by the provider consist of three parameters: an identifier, a label and an expression.

\- **Identifier**: A unique name that is specified for each field, which serves to make it possible to conclusively identify the field, even if the label has been changed by the user.

\- **Label**: The data field's name as specified in the multilingualism interface. The labels of the data fields are taken from the Widget.properties file under /resources/lang/de/Widget.properties.

\- **Expression**: The field's item-specific value that is calculated in the online store.

### Example: VariationGlobalDataFieldProvider

### src/ShopBuilder/DataFieldProvider/Item/VariationGlobalDataFieldProvider.php

```php
<?php

namespace Ceres\\ShopBuilder\\DataFieldProvider\\Item;

use Plenty\\Modules\\ShopBuilder\\Providers\\DataFieldProvider;

class VariationGlobalDataFieldProvider extends DataFieldProvider

{

    function register()

    {

        $this->addField("name", "Ceres::Widget.dataFieldVariationGlobalName", "");

        $this->addField("number", "Ceres::Widget.dataFieldVariationGlobalNumber", "");

        $this->addField("numberExternal", "Ceres::Widget.dataFieldVariationGlobalNumberExternal", "");

        $this->addField("model", "Ceres::Widget.dataFieldVariationGlobalModel", "");

        $this->addField("position", "Ceres::Widget.dataFieldVariationGlobalPosition", "");

    }

}
```

#### Explanation

This nested provider registers five distinct data fields, namely the variation's name, the variation number, the external variation number, the model and the variation position. Each added field specifies the three parameters identifier, label and expression.

### Search keywords

In the DataFieldProvider classes it is also possible to specify keywords within the register() method. These keywords are considered by the data field search in the back end. The link between the data field and the keyword list is established via the "identifier" of the data field.

Every keyword can either be a single word, a list of words separated by commas or a translation key. In the case of a translation key it is worth noting that the translation itself can contain single words or lists of words separated by commas. The search is not case-sensitive.

```php
use Plenty\\Modules\\ShopBuilder\\Providers\\DataFieldProvider;

class MyDataFieldProvider extends DataFieldProvider

{

    public function register()

    {

        $this->addField("myField", "...", "...");

        $this->addSearchKeywords(

            "myField",

            [

                "Keyword A",

                "Keyword B, Keyword C",

                "Ceres::Widget.myDataFieldKeywords"

            ]

        );

    }

}
```
