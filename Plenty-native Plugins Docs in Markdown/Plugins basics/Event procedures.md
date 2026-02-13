\# Event Procedures



Event procedures are triggered on certain events if the given filters apply. This tutorial will show you how to add custom event procedures and filters with a plugin. To achieve this, excerpts of a small plugin with the name `ProcedurePlugin` will be shown and explained.



\## Procedures



This chapter will show you how to add a custom procedure. A procedure is the part of an event procedure that will be executed if filters apply. The example procedure here will set the status of an order to 3.



\### Registering the procedure



The procedure has to be registered in the `boot` method of a service provider of the plugin by using `EventProceduresService`.



\*\*\*ProcedurePlugin\\Providers\\ProcedurePluginServiceProvider.php\*\*\*



```php

<?php

namespace ProcedurePlugin\\Providers;



use Plenty\\Plugin\\ServiceProvider;

use Plenty\\Modules\\EventProcedures\\Services\\EventProceduresService;

use Plenty\\Modules\\EventProcedures\\Services\\Entries\\ProcedureEntry;

use ProcedurePlugin\\EventProcedures\\Procedures;



class ProcedurePluginServiceProvider extends ServiceProvider

{

&nbsp;   /\*\*

&nbsp;    \* @param EventProceduresService $eventProceduresService

&nbsp;    \* @return void

&nbsp;    \*/

&nbsp;   public function boot(EventProceduresService $eventProceduresService)

&nbsp;   {

&nbsp;       $eventProceduresService->registerProcedure(

&nbsp;           'setStatus',

&nbsp;           ProcedureEntry::EVENT\_TYPE\_ORDER,

&nbsp;           \['de' => 'Setze Status auf 3', 'en' => 'Set status to 3'],

&nbsp;           Procedures::class . '@setStatus'

&nbsp;       );

&nbsp;   }

}

```



You need the following four parameters to register a procedure:



\- module name

\- event type

\- array of filter names

\- class name



The first parameter of the `registerProcedure` method is the module name. You can choose the name freely. The event type is the second parameter. In this example the type is `EVENT\_TYPE\_ORDER`. This way the procedure will be available for order related event procedures.



The third parameter is an array with the translations of the filter name. The name will be displayed in the UI and has to be provided in German and English. The fourth parameter that must be specified is a class name. The class name specifies the method that will be called when the procedure is executed. The class name must be fully qualified.



A method name can be provided by separating it with an '@'. If no method is provided, the default method `execute` will be used.



\### Defining the action



Define the procedures in the class that you specified at the registration.



\*\*\*ProcedurePlugin\\EventProcedures\\Procedures.php\*\*\*



```php

<?php

namespace ProcedurePlugin\\EventProcedures;



use Plenty\\Modules\\EventProcedures\\Events\\EventProceduresTriggered;

use Plenty\\Modules\\Order\\Contracts\\OrderRepositoryContract;



class Procedures

{

&nbsp;   /\*\*

&nbsp;    \* @param EventProceduresTriggered $event

&nbsp;    \* @return void

&nbsp;    \*/

&nbsp;   public function setStatus(EventProceduresTriggered $event)

&nbsp;   {

&nbsp;       $order = $event->getOrder();

&nbsp;       $orderRepository = pluginApp(OrderRepositoryContract::class);

&nbsp;       $orderRepository->updateOrder(\['statusId' => 3], $order->id);

&nbsp;   }

}

```



> The method does not have a return statement. You can retrieve the affected order by adding a parameter and calling the `getOrder` method. You need to declare the type of the parameter that you add as `EventProceduresTriggered`.



\## Filters



This chapter will show you how to add a custom filter. You can use filters to define under which circumstances an event procedure will be executed. The filter in our example will check if the order is locked.



\### Registering the filter



The filter has to be registered in the `boot` method of a service provider of the plugin by using `EventProceduresService`.



\*\*\*ProcedurePlugin\\Providers\\ProcedurePluginServiceProvider\*\*\*



```php

<?php

namespace ProcedurePlugin\\Providers;



use Plenty\\Plugin\\ServiceProvider;

use Plenty\\Modules\\EventProcedures\\Services\\EventProceduresService;

use Plenty\\Modules\\EventProcedures\\Services\\Entries\\ProcedureEntry;

use ProcedurePlugin\\EventProcedures\\Filters;



class ProcedurePluginServiceProvider extends ServiceProvider

{

&nbsp;   /\*\*

&nbsp;    \* @param EventProceduresService $eventProceduresService

&nbsp;    \* @return void

&nbsp;    \*/

&nbsp;   public function boot(EventProceduresService $eventProceduresService)

&nbsp;   {

&nbsp;       $eventProceduresService->registerFilter(

&nbsp;           'orderLocked',

&nbsp;           ProcedureEntry::EVENT\_TYPE\_ORDER,

&nbsp;           \['de' => 'Auftrag ist gesperrt', 'en' => 'Order is locked'],

&nbsp;           Filters::class . '@orderLocked'

&nbsp;       );

&nbsp;   }

}

```



> The parameters for registering a filter are the same as for registering a procedure. The following four parameters are needed:

> - module name

> - event type

> - array of filter names

> - class name

> 

> The last parameter is the name of the class with your filter logic. If no method name is provided, the default method `accept` will be used.



\### Defining the filter logic



Define the filter logic in the class that you specified at the registration.



\*\*\*ProcedurePlugin\\EventProcedures\\Filters.php\*\*\*



```php

<?php

namespace ProcedurePlugin\\EventProcedures;



use Plenty\\Modules\\EventProcedures\\Events\\EventProceduresTriggered;



class Filters

{

&nbsp;   /\*\*

&nbsp;    \* @param EventProceduresTriggered $event

&nbsp;    \* @return boolean

&nbsp;    \*/

&nbsp;   public function orderLocked(EventProceduresTriggered $event)

&nbsp;   {

&nbsp;       return $event->getOrder()->lockStatus != 'unlocked';

&nbsp;   }

}

```



> The method has to return a boolean. When true is returned, the filter applies. Otherwise the filter does not apply. The affected order can be retrieved again. To retrieve the order again you need to declare the type of the parameter as `EventProceduresTriggered` and call the `getOrder` method.

