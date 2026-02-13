\# plentyShop plugins → plentyShop LTS → plentyShop LTS Overview



\*\*URL:\*\* https://developers.plentymarkets.com/en-gb/developers/main/plentyshop-plugins/ceres-5-update.html



---



\## Introduction



With plentyShop LTS, we set the foundation for the future of our online store. As the official successor to plentyShop 4, plentyShop LTS introduces numerous changes and new features, not only to modernise our online store, but also to make it more user-friendly for you as developers.



\*\*Note:\*\*



Due to the comprehensive changes to our online store, plentyShop LTS is not backwards compatible. In consequence, updating your current plugins is highly recommended.



---



\## New features



plentyShop LTS introduces multiple new features. You can add custom styles or custom scripts via the ShopBuilder, or use the new loading animation offered by plentyShop LTS. In addition, the overhaul to the CSS and JavaScript of our online store considerably improves the performance of your plugin.



\### Loading animations



Loading animations have already been a part of our online store before, but were displayed each time a new page was loaded. For plentyShop LTS, we changed the area in which the loading animation appears. Instead of displaying the animation each time a page is loaded, the loading animations now only appears in containers, such as the shopping cart, the single item view, or category pages. By omitting the page loading animation, the loading process of your online store is noticeably faster.



\### Adding styles and scripts to the ShopBuilder



For plentyShop LTS, you can add your own code to each ShopBuilder preset or the entire online store, thus facilitating the customisation of plentyShop LTS to your liking.



In ShopBuilder, you can access custom code editing via the burger menu at the top left under the option "Custom code". In the subsequent view, you can add custom styles or custom scripts for the preset or you can add your code to the entire online store:



The code fields for "Custom styles" and "Custom scripts" support syntax highlighting. Keep in mind that you need to enclose your code in the appropriate tags, i.e. `<script>` for JavaScript and `<style>` for CSS.



---



\## Changes to JavaScript for performance optimisation



With the release of plentyShop LTS, we overhauled a number of JS files to improve the performance of the online store. As a result, the bundle size and number of bundles have been reduced, which in turn leads to the online store loading faster. In order to accomplish this, we needed to make several changes, which affect the way you develop your plugins. In the following, we will detail the most important changes to help you adapt your plugins for plentyShop LTS.



\### Switching to Vue 3



For plentyShop LTS, we switched from Vue 2 to Vue 3. This enables the integration of a number of new functionalities and improves the performance of your online store. The switch to Vue 3 should not entail any changes to your plugin, even though your plugin's code is technically using an older version of Vue now. In the future, you should develop your plugins according to the guidelines for Vue 3.



Read the official migration guide from the Vue.js documentation below to familiarise yourself with the changes.



\*\*\[Consult the Vue 3 migration guide](https://v3-migration.vuejs.org/)\*\*



\### Changes to the compilation process



For plentyShop LTS, we retired the `resources/js/dist` folder, in which the compiled scripts and entry points were saved. We replaced this folder with a build folder inside the plugin folder. All scripts relevant to the online store are compiled into the `build` folder and are managed by the build process.



In the plugin's file structure, the `resources/js/dist` folder structure now looks like this: `./plugin name/build`.



\### Globally overwriting components



In the past, it was possible to overwrite ShopBuilder widgets globally via the event listener. With plentyShop LTS and ShopBuilder 5.7.0, you no longer require the EventListener to overwrite a component. Follow the example below to see how to implement this in your plugin:



In your plugin's service provider, use the `override` function to globally overwrite your desired component. The component you want to override is indicated in the `key` parameter, while `value` represents the new component. In the example below, the value of the new component here is indicated with the placeholder #other-comp.



For overwriting components globally for the entire online store, you need to set the type of the script tag as "x/template", specify which component you want to overwrite in the `data-component` property, and include your content in the script tags. Take a look at the example below:



```

<script type="x/template" data-component="basket-preview">

&nbsp;   <div>

&nbsp;       ${  }

&nbsp;   </div>

</script>

```



---



\## Code splitting in plentyShop LTS



In the past, if you wanted to include additional Javascript or CSS styles in your plugin, one possibility was to add it via the existing `Script.AfterScriptsLoaded` and `Template.Style` \*\*\[template containers](https://developers.plentymarkets.com/en-gb/developers/main/plentyshop-plugins/template-containers.html)\*\*. As a result, the added JS and CSS were loaded in the entire online store, negatively impacting its performance.



As a consequence, we added 4 new template containers, which serve to only load scripts and styles where they are actually needed. You should make use of these whenever you want to add JS or CSS via your plugin, that is only needed in a particular area of the online store.



The plentyShop LTS homepage still uses the aforementioned `Script.AfterScriptsLoaded` and `Template.Style` template containers. The two containers `SingleItem.AfterScriptsLoaded` and `SingleItem.Styles` have been exclusively added to incorporate scripts and styles in the single item view. The two containers `Checkout.AfterScriptsLoaded` and `Checkout.Styles` have been added to incorporate scripts and styles in the checkout as well as on other pages that are not SEO-relevant, such as content pages, the my account area, and the basket.



For each script or style you want to add to plentyShop LTS, you should first evaluate in which areas of the online store it is needed and incorporate it accordingly.



\### Adding a script to the SingleItem.AfterScriptsLoaded container



In this example, our theme plugin wants to add a different image carousel to the single item view. The script for the image carousel will only be needed in one specific area of the online store and can therefore be integrated via the `SingleItem.AfterScriptsLoaded` template container.



The plugin.json file of your plugin contains, among other things, the specified template container for your data providers. The code example below shows the data provider object that contains the path the MyCarousel PHP class and the designated default template container, also called a layout container. As you can see, we specified `SingleItem.AfterScriptsLoaded` as the default container, since we want our carousel script to be included in the single item view. If you want to include Javascript in the checkout, the process is analogous to the one described here.



\*\*\_MyCarousel/plugin.json\_\*\*



```

"dataProviders": \[

&nbsp;   {

&nbsp;   "key"           :"MyCarousel\\\\Providers\\\\MyCarouselCodeProvider",

&nbsp;   "name"          :"My Carousel",

&nbsp;   "description"   :"Includes the code for a different image carousel for the single item.",

&nbsp;   "defaultLayoutContainer": "Ceres::SingleItem.AfterScriptsLoaded"

&nbsp;   }

]

```



In the MyCarousel code provider, we need to refer to the Twig file containing the script for the carousel we want to implement.



\*\*\_MyCarousel/src/Providers/MyCarouselCodeProvider.php\_\*\*



```

<?php



namespace MyCarousel\\Providers;



use Plenty\\Plugin\\Templates\\Twig;



class MyCarouselCodeProvider

{

&nbsp;   public function call( Twig $twig)

&nbsp;   {

&nbsp;       return $twig->render('MyCarousel::MyCarouselCode');

&nbsp;   }

}

```



Lastly, the Twig file `MyCarouselCode.twig`, to which the PHP class is referring for the render function, includes a single script, which contains the script we want to include in the specified template container.



```

<script src="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js"></script>

```



---



\## IO facet extension container



As per usual, a new IO version accompanies the release of plentyShop LTS. If you are an external developer and want to integrate an additional facet into the online store, the latest version of IO facilitates the process for you.



We moved to `facetExtension` from IO to the PlentyONE core functionality, thereby eliminating the need to listen to a specific event, in order to load the added facet at the right moment. Take a look how the facet extension worked in the past:



```

$dispatcher->listen(

&nbsp;           'IO.initFacetExtensions',

&nbsp;           function ($event) {

$facetExtensionContainer = pluginApp(FacetExtensionContainer::class);

&nbsp;       $facetExtensionContainer->addFacetExtension(pluginApp(CategoryFacet::class));



&nbsp;       }

&nbsp;   );

```



By moving the facet extension logic to the core functionality, there's no more need for the first part of the code snippet, in which you would have listened to the specific event of the facet extension. Take a look at the same process from above, but simplified for IO v5:



```

$facetExtensionContainer = pluginApp(FacetExtensionContainer::class);

&nbsp;       $facetExtensionContainer->addFacetExtension(pluginApp(CategoryFacet::class));

```



---



\## Overwriting result fields



Similar to the facet extension container detailed above, we relocated the logic for overwriting result fields to the PlentyONE core, thereby removing the need to listen to a specific event in order to overwrite the result fields.



Take a look how overwriting result fields worked in the past:



```

$dispatcher->listen( 'IO.ResultFields.\*', function(ResultFieldTemplate $container) {

&nbsp;   $container->setTemplates(\[

&nbsp;               ResultFieldTemplate::TEMPLATE\_BASKET\_ITEM => 'MyPlugin::ResultFields.BasketItem'

&nbsp;               ]);

}, self::PRIORITY);

```



By moving the logic to the core, there's no more need for the first part of the code snippet, in which you would have listened to the specific event of the IO result fields. Take a look at the same process from above, but simplified for IO v5:



```

$container = pluginApp(ResultFieldTemplate::class);

$container->setTemplate(ResultFieldTemplate::TEMPLATE\_BASKET\_ITEM,'MyPlugin::ResultFields.BasketItem');

```



Be sure to include the following line in the service provider of your plugin, so that the \*\*ResultFieldTemplate\*\* helper is properly integrated:



```

use Plenty\\Modules\\Webshop\\ItemSearch\\Helpers:ResultFieldTemplate

```



---



\## SCSS changes



In the frame of performance optimisation, a number of obsolete SCSS variables have been replaced. The table below lists all replacements:



| \*\*Previous SCSS variable\*\* | \*\*New SCSS variable\*\* |

|---|---|

| $gray-lightest | $gray-100 |

| $gray-lighter2 | $gray-200 |

| $gray-lighter | $gray-300 |

| $gray-light | $gray-500 |

| $gray | $gray-600 |

| $gray-dark | $gray-700 |

| $gray-darker | $gray-900 |

| $brand-primary | $primary |

| $brand-secondary | $secondary |

| $brand-info | $info |

| $brand-success | $success |

| $brand-warning | $warning |

| $brand-danger | $danger |



---



\## CSS changes



For plentyShop LTS, a lot has changed in terms of CSS styles. We removed obsolete classes that hadn't been used for some time, we removed duplicate content, and integrated the existing Bootstrap classes to a larger degree. The changes are too extensive to list on this page. Below, you can find a link to the complete CSS changes for plentyShop LTS.



\*\*\[See all changed CSS classes](https://developers.plentymarkets.com/en-gb/developers/main/plentyshop-plugins/ceres-5-update.html#plentyshop-plugins:ceres-5-style-changes.adoc)\*\*



---



\## Template changes



For plentyShop LTS, many templates received on overhaul to improve the performance of the online store. Since these changes are too extensive to be listed on this page, you can find a link to the template changes below.



\*\*\[See all changed templates](https://developers.plentymarkets.com/en-gb/developers/main/plentyshop-plugins/ceres-5-update.html#plentyshop-plugins:reference-ceres-5-template-changes.adoc)\*\*

