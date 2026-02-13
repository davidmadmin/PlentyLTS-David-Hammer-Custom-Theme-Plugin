\# Template overview



The plentyShop LTS plugin offers flexible and customisable templates for building an online store. The template system uses Twig and Vue.js, organised into different folders with specific functionalities.



\## Folders in the plentyShop LTS plugin



\### Namespaces



This section describes the \*\*src\*\* folder and its sub-folders.



\#### Controllers



Controllers respond to HTTP requests and return either Twig templates or REST responses. Controllers are registered in the `IORouteServiceProvider.php` file. In the example below, the `showLogin` method of `LoginController.php` is executed when a user opens the `/login` page.



\*\*IO/src/Providers/IORouteServiceProvider.php\*\*



```php

<?php



namespace IO\\Providers;



use Plenty\\Plugin\\RouteServiceProvider;

use Plenty\\Plugin\\Routing\\Router;

use Plenty\\Plugin\\Routing\\ApiRouter;

use Plenty\\Plugin\\Templates\\Twig;



class IORouteServiceProvider extends RouteServiceProvider

{

&nbsp;   public function map(Router $router, ApiRouter $api)

&nbsp;   {

&nbsp;     ...

&nbsp;     $router->get('login', 'IO\\Controllers\\LoginController@showLogin');

&nbsp;     ...

&nbsp;   }

}

```



\#### Services



Services contain the methods for processing data between the user and PlentyONE that can be used by controllers, REST and Twig templates. In the example below, `BasketService.php` contains the `getBasket()` method, which is used in `BasketResource.php`.



\*\*IO/src/Services/BasketService.php\*\*



```php

...

/\*\*

&nbsp;\* Return basket as array

&nbsp;\* @return Basket

&nbsp;\*/

public function getBasket():Basket

{

&nbsp;   return $this->basketRepository->load();

}

...

```



\*\*IO/src/Api/Resources/BasketResource.php\*\*



```php

<?php



namespace IO\\Api\\Resources;



use Symfony\\Component\\HttpFoundation\\Response as BaseResponse;

use Plenty\\Plugin\\Http\\Response;

use Plenty\\Plugin\\Http\\Request;

use IO\\Api\\ApiResource;

use IO\\Api\\ApiResponse;

use IO\\Api\\ResponseCode;

use IO\\Services\\BasketService;



class BasketResource extends ApiResource

{

&nbsp;   private $basketService;



&nbsp;   public function \_\_construct(Request $request, ApiResponse $response, BasketService $basketService)

&nbsp;   {

&nbsp;       parent::\_\_construct($request, $response);

&nbsp;       $this->basketService = $basketService;

&nbsp;   }



&nbsp;   public function index():BaseResponse

&nbsp;   {

&nbsp;       $basket = $this->basketService->getBasket();

&nbsp;       return $this->response->create($basket, ResponseCode::OK);

&nbsp;   }

}

```



\## Design features



We will explain the design structure of a plugin based on the \*\*resources\*\* folder of the PlentyONE plentyShop LTS plugin and its sub-folders.



\### CSS



The \*\*css\*\* folder contains the CSS files based on \*\*Bootstrap 4\*\*.



\### Documents



The \*\*documents\*\* folder contains fonts, pdf-files and other document resources.



\### Images



Images, such as the company logo, are stored in the \*\*images\*\* folder.



\### JS



This is the folder for JavaScript files. The \*\*js\*\* folder contains the \*\*dist\*\* and \*\*src\*\* sub-folders. The source files are organised in the \*\*src\*\* folder. These source files are required for building `plugin-ceres-app.js` - the main JavaScript file, which is included in `PageDesign.twig`.



\*\*Ceres/resources/views/PageDesign.twig\*\*



```twig

<script src="{{ plugin\_path('Ceres') }}/js/dist/plugin-ceres-app.js"></script>

```



The sub-folders \*\*app\*\* and \*\*libraries\*\* are located in \*\*src\*\*. All Vue.js components are saved in \*\*app/components\*\*. Related Twig templates can be found in the \*\*resources/views/templates\*\* folder. Custom Vue.js directives, e.g. the `Logout.js`, can be found in the \*\*app/directives\*\* folders.



\*\*Ceres/resources/js/src/app/directives/Logout.js\*\*



```javascript

var ApiService          = require('services/ApiService');

var NotificationService = require('services/NotificationService');



Vue.directive('logout', function ()

{

&nbsp; $(this.el).click(

&nbsp;   function (e)

&nbsp;   {

&nbsp;     ApiService.post("/rest/account/logout")

&nbsp;     .done(

&nbsp;       function(response)

&nbsp;       {

&nbsp;         NotificationService.success('Sie wurden erfolgreich ausgeloggt.').closeAfter(3000);

&nbsp;       }

&nbsp;     );

&nbsp;     e.preventDefault();

&nbsp;   }.bind(this));

});

```



Services are saved in the \*\*app/services\*\* folder, e.g. the `ApiService.js` service for sending REST calls.



\*\*Ceres/resources/js/src/app/services/ApiService.js\*\*



```javascript

var NotificationService = require('services/NotificationService');

var WaitScreenService = require('services/WaitScreenService');



module.exports = (function($) {

&nbsp;   var \_token;



&nbsp;   return {

&nbsp;       get:    \_get,

&nbsp;       put:    \_put,

&nbsp;       post:   \_post,

&nbsp;       delete: \_delete,

&nbsp;       send:   \_send,

&nbsp;       setToken: \_setToken,

&nbsp;       getToken: \_getToken

&nbsp;   };



&nbsp;   function \_get( url, data, config )

&nbsp;   {

&nbsp;       config = config || {};

&nbsp;       config.method = 'GET';

&nbsp;       return \_send( url, data, config );

&nbsp;   }

&nbsp;   ...

}

```



\### Lang



The \*\*lang\*\* folder contains sub-folders for translations in different languages. Translated strings for the plentyShop LTS design are saved in key-value pairs in the `Template.properties` file. Keys have prefixes that help you associating the keys with the respective templates:



| Prefix | Description |

|--------|-------------|

| \*\*basket\*\* | Template texts for templates in the \*\*resources/views/Basket\*\* folder and sub-folders |

| \*\*acc\*\* | Template texts for templates in the \*\*resources/views/MyAccount\*\* and \*\*resources/views/Customer\*\* folders and sub-folders |

| \*\*itemCategory\*\* | Template texts for templates in the \*\*resources/views/Category\*\* folder and sub-folders |

| \*\*item\*\* | Template texts for templates in the \*\*resources/views/Item\*\* folder and sub-folders |

| \*\*variation\*\* | Template texts for templates in the \*\*resources/views/Item\*\* folder and sub-folders |

| \*\*general\*\* | Overall template texts used in multiple templates |

| \*\*address\*\* | Template texts for templates in the \*\*resources/views/Customer\*\* folder and sub-folders |

| \*\*order\*\* | Template texts for templates in the \*\*resources/views/MyAccount\*\* and \*\*resources/views/Checkout\*\* folders and sub-folders |



In addition to the \*\*resources/lang\*\* folder, another \*\*lang\*\* folder can be found under \*\*resources/js/lang\*\* containing sub-folders with `.js` files in the respective languages. These files are built with the `build:lang` gulp task.



\### SCSS



In this folder, the `Ceres.scss` file imports all the other SCSS files stored in sub-folders. A grunt task generates the `plugin-ceres.css` file that can be found in the \*\*resources/css\*\* folder.



\### Views



The \*\*views\*\* folder contains the `PageDesign.twig` file - the basic framework for your online store. Static content pages, such as the login page, are organised in sub-folders with the related `twig` files. Vue.js related template files are organised into multiple sub-folders within the \*\*Templates\*\* folder. These files are necessary for rendering dynamic content of the Vue.js components stored in the folder \*\*resources/js/src/app/components\*\*.

