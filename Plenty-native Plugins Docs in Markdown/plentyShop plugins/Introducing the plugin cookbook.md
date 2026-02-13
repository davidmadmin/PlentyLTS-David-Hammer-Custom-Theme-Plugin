\# plentyShop plugins → Introducing the plugin cookbook



\## Context classes



A context class generates various lists, methods, or variables based on data in the back end. The plugin \*\*plentyShop LTS\*\* uses the `CategoryController` context for this purpose.



\### Example controller from the plentyShop LTS plugin



```php

<?php



namespace Ceres\\Controllers;



use IO\\Helper\\ComponentContainer;

use IO\\Helper\\TemplateContainer;



class CategoryController extends LayoutController

{

&nbsp;   public function showCategory(

&nbsp;       string $lvl1 = null,

&nbsp;       string $lvl2 = null,

&nbsp;       string $lvl3 = null,

&nbsp;       string $lvl4 = null,

&nbsp;       string $lvl5 = null,

&nbsp;       string $lvl6 = null

&nbsp;   ):string

&nbsp;   {

&nbsp;       $templateContainer = pluginApp(TemplateContainer::class);



&nbsp;       return $templateContainer-\&gt;getOriginContent();

&nbsp;   }

}

```



With the function `showCategory()` we are able to pass data to the view. The data is accessed via Twig. To add custom data, you need to overwrite the function and customize the template. After \*\*deploying the plugin\*\* in the plentymarkets back end, your template is displayed in the browser.



\### Example context class from the plentyShop LTS plugin



```php

<?php



namespace Ceres\\Contexts;



use IO\\Helper\\ContextInterface;



class CategoryContext extends GlobalContext implements ContextInterface

{

&nbsp;   public $category;

&nbsp;   public $categoryParams = \[];



&nbsp;   public function init($params)

&nbsp;   {

&nbsp;       parent::init($params);



&nbsp;       $this-\&gt;category       = $params\['category'];

&nbsp;       $this-\&gt;categoryParams = $params;

&nbsp;   }

}

```



A context class must implement the `ContextInterface` which requires the implementation of a `init()` method. To extend the existing context of plentyShop LTS, simply overwrite the `CategoryContext.php` file in your own theme plugin. Use the following directory structure:



\*\*/src/Contexts/MyContext.php\*\*



```php

<?php



namespace Theme\\Contexts;



use IO\\Helper\\ContextInterface;



class MyContext extends GlobalContext implements ContextInterface

{

&nbsp;   public $myVariable;



&nbsp;   public function init($params)

&nbsp;   {

&nbsp;       parent::init($params);



&nbsp;       $this-\&gt;myVariable = "This is how you extend context classes.";

&nbsp;   }

}

```



The context class MyContext now extends the GlobalContext of plentyShop LTS, thereby inheriting the data that GlobalContext provides. Additionally, you are now able to transfer new data to the template via MyContext. In order to completely overwrite the context provided by plentyShop LTS, simply delete any `extends` elements in your own context.



\## Adding a custom address field



If you want to add one or multiple custom address fields to the address form of the template plugin \*\*plentyShop LTS\*\*, you can use the \*\*template container\*\* \*\*Additional address fields\*\*. Create a plugin that provides the data to be displayed in the container, e.g. with the help of this \*\*tutorial\*\*. Then add the following code to the `.twig` template:



```html

<div class="col-xs-12 col-sm-4">

&nbsp;   <div class="input-unit" data-validate="text">

&nbsp;       <input type="text" name="town" id="txtPackstationNo${\_uid}" v-model="addressData.packstationNo">

&nbsp;       <label for="txtPackstationNo${\_uid}">Packstation</label>

&nbsp;   </div>

</div>

```



In the example, we add another input field for the packstation number. Refer to the \*\*Address\*\* model to find an overview of available fields. We also want to make this field a required field and validate the input. To do so, we add `data-validate="text"` for the property of the `String` type.



You can also check out the `AddressInputGroupDE.twig` file in the \*\*plentyShop\*\* template for further reference.



\## Validating addresses in template plugins



Template plugins that want to validate address fields using the validators in \*\*IO\*\* must have a configuration file following certain rules. IO can get the configuration values set in the template plugin and validate addresses based on these settings. The easiest way to do this is to copy part of the `config.json` file of \*\*plentyShop LTS\*\* and edit the code. Then, the namespace of the template plugin must be specified in \*\*IO\*\*.



1\. Go to \*\*Plugins » Plugin overview\*\*.

2\. Click on \*\*IO\*\*.

&nbsp;  → The plugin will open.

3\. Click on \*\*Configuration\*\* in the directory tree.

&nbsp;  → The \*\*Template\*\* tab will open.

4\. Enter the namespace of your template plugin.

5\. \*\*Save\*\* the settings.



\### Example code of the configuration



```json

...



{

&nbsp;   "tab"                                   : "Checkout and My account",

&nbsp;   "key"                                   : "billing\_address.require",

&nbsp;       "label"                             : "Enable invoice address field validation",

&nbsp;       "type"                              : "multi\_select",

&nbsp;       "possibleValues"                    :

&nbsp;           {

&nbsp;               "billing\_address.name1"     : "Company",

&nbsp;               "billing\_address.vatNumber" : "VAT number",

&nbsp;               "billing\_address.birthday"  : "Date of birth",

&nbsp;               "billing\_address.name4"     : "Name affix",

&nbsp;               "billing\_address.address3"  : "Additional address 1 / Building name",

&nbsp;               "billing\_address.address4"  : "Additional address 2",

&nbsp;               "billing\_address.stateId"   : "State"



&nbsp;           },

&nbsp;       "default"                           : "billing\_address.birthday, billing\_address.name4, billing\_address.address3, billing\_address.address4"

},



...

```



The values specified under `possibleValues` will be validated with the help of the `BillingAddressValidator` of \*\*IO\*\*.



\### Example code of the validator



```php

<?php



namespace IO\\Validators\\Customer;



use Plenty\\Validation\\Validator;

use IO\\Services\\TemplateConfigService;



class BillingAddressValidator extends Validator

{

&nbsp;   private $requiredFields;



&nbsp;   public function defineAttributes()

&nbsp;   {

&nbsp;       /\*\*

&nbsp;        \* @var TemplateConfigService $templateConfigService

&nbsp;        \*/

&nbsp;       $templateConfigService = pluginApp(TemplateConfigService::class);

&nbsp;       $requiredFieldsString  = $templateConfigService-\&gt;get('billing\_address.require');

&nbsp;       $this-\&gt;requiredFields  = explode(', ', $requiredFieldsString);

&nbsp;       foreach ($this-\&gt;requiredFields as $key =\&gt; $value)

&nbsp;       {

&nbsp;           $this-\&gt;requiredFields\[$key] = str\_replace('billing\_address.', '', $value);

&nbsp;       }



&nbsp;       $this-\&gt;addString('name2',      true);

&nbsp;       $this-\&gt;addString('name3',      true);

&nbsp;       $this-\&gt;addString('address1',   true);

&nbsp;       $this-\&gt;addString('address2',   true);

&nbsp;       $this-\&gt;addString('postalCode', true);

&nbsp;       $this-\&gt;addString('town',       true);



&nbsp;       if(count($this-\&gt;requiredFields))

&nbsp;       {

&nbsp;           $this-\&gt;addString('name1',     $this-\&gt;isRequired('name1'));

&nbsp;           $this-\&gt;addString('vatNumber', $this-\&gt;isRequired('vatNumber'));

&nbsp;           $this-\&gt;addString('birthday',  $this-\&gt;isRequired('birthday'));

&nbsp;           $this-\&gt;addString('name4',     $this-\&gt;isRequired('name4'));

&nbsp;           $this-\&gt;addString('address3',  $this-\&gt;isRequired('address3'));

&nbsp;           $this-\&gt;addString('address4',  $this-\&gt;isRequired('address4'));

&nbsp;           $this-\&gt;addString('stateId',  $this-\&gt;isRequired('stateId'));

&nbsp;       }

&nbsp;   }



&nbsp;   private function isRequired($fieldName)

&nbsp;   {

&nbsp;       return in\_array($fieldName, $this-\&gt;requiredFields);

&nbsp;   }

}

```



\## Disabling lazy loading in plentyShop LTS item lists



If you want to disable the lazy load function in \*\*plentyShop LTS\*\* item lists, simply add a line of code to the `<category-image-carousel>` block:



```html

<category-image-carousel template="#vue-category-image-carousel"

&nbsp;   :image-urls="itemData.images | itemImages imageUrlAccessor"

&nbsp;   :alt-text="texts | itemName {{ configItemName }}"

&nbsp;   :item-url="itemData | itemURL"

&nbsp;   :show-dots="{{ config("Ceres.item.category\_show\_dots") | json\_encode() }}"

&nbsp;   :show-nav="{{ config("Ceres.item.category\_show\_nav") | json\_encode() }}"

&nbsp;   :disable-lazy-load="true">

</category-image-carousel>

```



The line `:disable-lazy-load="true"` has been added.



\## Adding a custom value to the item sorting



If you want to add one or multiple custom sorting values to the item sorting drop-down menu of the template plugin \*\*plentyShop LTS\*\*, add the following code in the service provider of your plugin:



```php

<?php



namespace Feedback\\Providers;



...



use Plenty\\Plugin\\Events\\Dispatcher;



/\*\*

&nbsp;\* @param Dispatcher $dispatcher

&nbsp;\*/

public function boot(Dispatcher $dispatcher)

{

&nbsp;   // Add sorting by customer reviews

&nbsp;   $dispatcher-\&gt;listen('IO.initAdditionalSorting', function (ItemService $itemService) {



&nbsp;       // addAdditionalItemSorting(field name, translation key)

&nbsp;       $itemService-\&gt;addAdditionalItemSorting('item.feedbackDecimal\_desc', 'Feedback::Feedback.customerReviews');

&nbsp;   });

}

```



In the example, we add another value for sorting items by customer reviews. Simply add an `Event dispatcher` which listens to the `itemService` of the plugin \*\*IO\*\*. For adding a new value, the `field name` and translation must be provided.



\## Adding cache busting in plentyShop LTS



We created the new helper PHP class BuildHash.php. This class serves to create a hash, which is renewed every time the plugin set is built. That way, the cache can be reset when the plugins are assembled. The global context class in plentyShop LTS (`/src/Contexts/GlobalContexts.php`) provides the global variable `buildHash`, which can be used as a GET parameter. The "buildHash" variable can also be used as a suffix for ressource URLs for Javascript, CSS, image ressources, etc. which makes it possible that these ressources are removed from the cache when the plugins are saved and published again.

