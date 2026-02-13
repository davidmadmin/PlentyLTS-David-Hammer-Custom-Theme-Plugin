\# Logging guide



If there's a problem with your plugin, it's useful to have some indicators in place that help you locate the cause of the problem. You can achieve this by implementing logs. You can also use logs to provide the user with other useful information.



Logs are written to the \*\*Data log\*\*. For further information on configuration and search options, refer to the \[\*\*Data log\*\*](https://knowledge.plentymarkets.com/en/data/datalog) page of the PlentyONE manual.



In the case of a plugin, the \*\*Integration\*\* is the namespace of the plugin. The \*\*Identifier\*\* is the function that implements the logging.



\## Logging



Logs are registered in a `ServiceProvider`. Once registered, they can be called on in a `Controller`.



The `ServiceProvider` has to import and use the `Plenty\\Log\\Services\\ReferenceContainer` service. You should also import and use `Plenty\\Log\\Exceptions\\ReferenceTypeException` to catch exceptions on registration.



\*\*\*PluginNameSpace/src/Providers/MyServiceProvider.php\*\*\*



```php

<?php

namespace PluginNameSpace\\Providers;



use Plenty\\Plugin\\ServiceProvider;

use Plenty\\Log\\Services\\ReferenceContainer;

use Plenty\\Log\\Exceptions\\ReferenceTypeException;



class MyServiceProvider extends ServiceProvider

{



&nbsp;   public function register()

&nbsp;   {



&nbsp;   }





&nbsp;   public function boot(ReferenceContainer $referenceContainer)

&nbsp;   {

&nbsp;       // Register reference types for logs.

&nbsp;       try

&nbsp;       {

&nbsp;           $referenceContainer->add(\[ 'myLogReference' => 'myLogReference' ]); // reference is optional

&nbsp;       }

&nbsp;       catch(ReferenceTypeException $ex)

&nbsp;       {



&nbsp;       }

&nbsp;   }

}

```



After registering the reference, you can call on it in a `Controller`. The `Controller` has to import and use `Plenty\\Plugin\\Log\\Loggable`.



\*\*\*PluginNameSpace/src/Providers/MyController.php\*\*\*



```php

<?php

namespace PluginNameSpace\\Providers;



use Plenty\\Plugin\\Controller;

use Plenty\\Plugin\\Log\\Loggable;



class MyController extends Controller

{

&nbsp;   use Loggable;



&nbsp;   public function doSomething ()

&nbsp;   {

&nbsp;       $myBusinessAction->doSomething();



&nbsp;       $this

&nbsp;           ->getLogger('MyController\_doSomething')

&nbsp;           ->logLevel('PluginNameSpace::message', \[additionalInformation]); // additional information is optional

&nbsp;           ->setReferenceType('myLogReference') // optional

&nbsp;           ->setReferenceValue($myBusinessAction->getActionId()) // optional

&nbsp;   }

}

```



Each log has the following properties:



| \*\*Property\*\* | \*\*Description\*\* |

|---|---|

| Log level | The level associated with the log. The following levels are available, in order of severity from highest to lowest:<br>• `emergency`: The system is unusable.<br>• `alert`: Requires immediate action.<br>• `critical`: Requires action.<br>• `error`: Runtime error that doesn't require immediate action, but should be monitored.<br>• `warning`: Exceptional occurrences not associated with an error.<br>• `notice`: Noteworthy, but regular events.<br>• `info`: Regular information.<br>• `debug`: Detailed debug information.<br>• `report`: Regular process information. For further details, see the \[\*\*Reporting\*\*](https://developers.plentymarkets.com/en-gb/developers/main/data-log-overview.html#\_reporting) section.<br>Report information, as well as the log levels `error` and above are activated by default. Other log levels have to be activated in the log settings. required |

| Message | Detailed information on the logged event. For the log levels `warning` and below, the message has to be \[\*\*available in English\*\*](https://developers.plentymarkets.com/en-gb/developers/main/data-log-overview.html#ROOT:multilingualism.adoc) \[\*\*\*and\*\*\*](https://developers.plentymarkets.com/en-gb/developers/main/data-log-overview.html#ROOT:multilingualism.adoc) \[\*\*German\*\*](https://developers.plentymarkets.com/en-gb/developers/main/data-log-overview.html#ROOT:multilingualism.adoc). required |

| `setReferenceType` | Provides a filter option for log entries. Has to be unique. |

| `setReferenceValue` | Provides a second level filter option for a reference type, for example a specific ID.<br>== Reporting<br>Reporting is a special form of logging used for providing information about expected events. For example, you can inform the user every time at the end of every order import process how many new orders were imported or skipped.<br>Reporting is implemented similarly to logging. The only difference is that the `Controller` imports and uses `Plenty\\Plugin\\Log\\Reportable` instead of `Plenty\\Plugin\\Log\\Loggable`.<br>`report` level logs are activated in the data log by default. |

