\# How to create presets for the ShopBuilder



This tutorial will teach you how to create your own presets for the ShopBuilder. The ShopBuilder provides three default presets: one for the body of the homepage, for the header and the footer. Each of these comes with preconfigured widgets; the default header, for instance, already includes the top bar, the category navigation and the breadcrumb navigation. Users can select from a set of presets when opening the ShopBuilder and adding a new page; there, presets can be selected from the preset drop-down list.



You can create own presets to use them in the ShopBuilder, for example if you want to maintain the same structure for your homepage but change item lists and image carousels for various seasonal events. In that case, you can simply rely on your own presets, thereby saving time and effort.



\## ShopBuilder.json



The preset information is stored in the `shopBuilder.json` file. There, the `presets` object contains one array each for the header, the footer and the content, i.e. the page body. In each array, you can specify as many presets as you require.



The key-value pair for each preset entry consists of the \*\*label\*\* and the \*\*presetClass\*\*.



The preset's `label` references an entry in the Widgets.properties file located in the resources/lang folder, which provides the name of the preset that is displayed in the frontend. Please note that the name of the plugin providing the preset is appended in brackets after the label in the frontend, e.g. "Default header (plentyShop LTS)".



The `presetClass` value indicates a path to the pertinent PHP class located in the Ceres/Widgets/Presets folder, which specifies the widgets and contains the settings of your preset. Please note that the path needs to include double backslashes, e.g. `Ceres\\\\Widgets\\\\Presets\\\\DefaultHeaderPreset`.



Below, you can see what the PHP class for the plentyShop LTS default header looks like.



\## Code example for the plentyShop LTS default header



\*\*\*src/Widgets/Presets/DefaultHeaderPreset.php\*\*\*



```php

<?php



namespace Ceres\\Widgets\\Presets;



use Ceres\\Config\\CeresConfig;

use Ceres\\Widgets\\Helper\\PresetHelper;

use Plenty\\Modules\\ShopBuilder\\Contracts\\ContentPreset;

use Plenty\\Plugin\\Application;



class DefaultHeaderPreset implements ContentPreset

{

&nbsp;   /\*\*

&nbsp;    \* Get the widget configurations of the presets to be assigned to the created content.

&nbsp;    \*

&nbsp;    \* @return mixed

&nbsp;    \*/

&nbsp;   public function getWidgets()

&nbsp;   {

&nbsp;       /\*\* @var CeresConfig $config \*/

&nbsp;       $config = pluginApp(CeresConfig::class);



&nbsp;       /\*\* @var PresetHelper $preset \*/

&nbsp;       $preset = pluginApp(PresetHelper::class);



&nbsp;       $preset->createWidget("Ceres::TopBarWidget")

&nbsp;           ->withSetting("isFixed", $config->header->fixedNavBar)

&nbsp;           ->withSetting("searchStyle", "onDemand")

&nbsp;           ->withSetting("enableLogin", true)

&nbsp;           ->withSetting("enableRegistration", true)

&nbsp;           ->withSetting("enableLanguageSelect", true)

&nbsp;           ->withSetting("enableShippingCountrySelect", true)

&nbsp;           ->withSetting("enableCurrencySelect", true)

&nbsp;           ->withSetting("enableWishList", true)

&nbsp;           ->withSetting("enableBasketPreview", true)

&nbsp;           ->withSetting("basketValues", $config->header->basketValues)

&nbsp;           ->withSetting("showItemImages", false)

&nbsp;           ->withSetting("forwardToSingleItem", $config->search->forwardToSingleItem);



&nbsp;       $companyLogo = $config->header->companyLogo;

&nbsp;       if ( strpos($companyLogo, 'http') !== 0 \&\& strpos($companyLogo, 'layout/') !== 0 )

&nbsp;       {

&nbsp;           $companyLogo = pluginApp(Application::class)->getUrlPath('Ceres') . '/' . $companyLogo;

&nbsp;       }



&nbsp;       $preset->createWidget("Ceres::NavigationWidget")

&nbsp;           ->withSetting("isFixed", $config->header->fixedNavBar)

&nbsp;           ->withSetting("navigationStyle", $config->header->megamenuLevels > 1 ? "megaMenu" : "normal")

&nbsp;           ->withSetting("megaMenuLevels", $config->header->megamenuLevels)

&nbsp;           ->withSetting("megaMenuMaxItems.stage1", $config->header->megamenuItemsStage1)

&nbsp;           ->withSetting("megaMenuMaxItems.stage2", $config->header->megamenuItemsStage2)

&nbsp;           ->withSetting("megaMenuMaxItems.stage3", $config->header->megamenuItemsStage3)

&nbsp;           ->withSetting("companyLogoUrl", $companyLogo);



&nbsp;       $preset->createWidget("Ceres::BreadcrumbWidget")

&nbsp;           ->withSetting("isFixed", false)

&nbsp;           ->withSetting("showOnHomepage", false)

&nbsp;           ->withSetting("showOnMyAccount", false)

&nbsp;           ->withSetting("showOnCheckout", false)

&nbsp;           ->withSetting("showOnContentCategory", false);



&nbsp;       return $preset->toArray();

&nbsp;   }

}

```



| | \*\*\*Explanation\*\*\* The code example above is taken from the PHP class for the plentyShop LTS default header. The three instances of `$preset→createWidget` specify which widgets are preconfigured for the header preset. In this case these are the top bar, the category navigation and the breadcrumb navigation. Underneath each instance of `$preset→createWidget`, the `→withSetting` directive specifies the default values of the individual widget settings as configured for the preset. |



The line `$preset = pluginApp(PresetHelper::class);` accesses the plentyShop LTS helper class for presets, which is located in the Widgets/Helper folder.

