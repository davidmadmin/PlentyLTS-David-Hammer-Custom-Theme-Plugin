\# Plugin basics → Data log → How to log events



\## Introduction



plentymarkets offers multiple methods of logging events. We can write log messages, add reference types and values or add additional information. The plentymarkets log functionality is based on the \[Monolog library](https://packagist.org/packages/monolog/monolog).



In this tutorial, we show 2 traits that enable us to log plugin events: `Loggable` and `Reportable`. Both traits offer easy access to the plentymarkets log functions and are explained in detail below.



\## Using the Loggable trait



To log events, add the \*\*Loggable trait\*\* to a file. The Loggable trait is available in the `Plenty\\Plugin\\Log` namespace.



\*\*\_ToDoList/src/Migrations/CreateToDoTable.php\_\*\*



```php

<?php



namespace ToDoList\\Migrations;



use ToDoList\\Models\\ToDo;

use Plenty\\Modules\\Plugin\\DataBase\\Contracts\\Migrate;

use Plenty\\Plugin\\Log\\Loggable;



/\*\*

&nbsp;\* Class CreateToDoTable

&nbsp;\*/

class CreateToDoTable

{

&nbsp;   use Loggable;



&nbsp;   /\*\*

&nbsp;    \* @param Migrate $migrate

&nbsp;    \*/

&nbsp;   public function run(Migrate $migrate)

&nbsp;   {

&nbsp;       $migrate->createTable(ToDo::class);



&nbsp;       $this->getLogger(\_\_METHOD\_\_)->info('ToDoList::migration.tableCreated', \[

&nbsp;           'table' => 'toDo'

&nbsp;       ]);

&nbsp;   }

}

```



We use the `Loggable` trait at the start of our class declaration. To write log entries, we use a method from the trait at the end of the migration.



After creating the table, we write a log entry. The `getLogger` method has a parameter to set the log's identifier. The identifier can be any string and distinguishes different logs from the same plugin. If no identifier is specified as a parameter, a generic identifier is created using the `\_\_METHOD\_\_` magic constant. `\_\_METHOD\_\_` returns the class and method name where it is called. In this case, `ToDoList\\Migrations\\CreateToDoTable::run`.



Once you have accessed the logger, you can choose the log level; above, we chose the \*\*info\*\* level. Then enter the log code as a parameter. We use `ToDoList::migration.tableCreated`, which references the `tableCreated` key in the `migrations.properties` file in the `resources/lang/en` and `resources/lang/de` folders.



\*\*\_ToDoList/resources/lang/en/migrations.properties\_\*\*



```

tableCreated="Created table \[1]"

createToDoInformation="User \[1] created a to do."

```



\*\*\_ToDoList/resources/lang/de/migrations.properties\_\*\*



```

tableCreated="Tabelle \[1] erstellt."

createToDoInformation="Benutzer \[1] hat ein To-Do erstellt."

```



These files are language files for the log functionality. You have to add a file for every language you want to have available in the back end.



After specifying the log code, you can provide additional information in an array. In the example, the keyword \*\*table\*\* and its value, \*\*toDo\*\*, are stored. The second line of your log entry, \*\*Additional info\*\*, in the back end, will contain this information.



\*\*\_ToDoList/src/Providers/ToDoListServiceProvider.php\_\*\*



```php

<?php



namespace ToDoList\\Providers;



use Plenty\\Plugin\\ServiceProvider;

use ToDoList\\Contracts\\ToDoRepositoryContract;

use ToDoList\\Repositories\\ToDoRepository;

use Plenty\\Modules\\EventProcedures\\Services\\EventProceduresService;

use Plenty\\Modules\\EventProcedures\\Services\\Entries\\ProcedureEntry;

use Plenty\\Plugin\\Log\\Loggable;



class ToDoListServiceProvider extends ServiceProvider

{

&nbsp;   use Loggable;



&nbsp;   /\*\*

&nbsp;    \* Register the service provider.

&nbsp;    \*/

&nbsp;   public function register()

&nbsp;   {

&nbsp;       $this->getApplication()->register(ToDoListRouteServiceProvider::class);

&nbsp;       $this->getApplication()->bind(ToDoRepositoryContract::class, ToDoRepository::class);

&nbsp;   }



&nbsp;   /\*\*

&nbsp;    \* Boot additional services.

&nbsp;    \* @param EventProceduresService $eventProceduresService

&nbsp;    \*/

&nbsp;   public function boot(EventProceduresService $eventProceduresService)

&nbsp;   {

&nbsp;       try {

&nbsp;           $eventProceduresService->registerProcedure(

&nbsp;               'ToDoList',

&nbsp;               ProcedureEntry::EVENT\_TYPE\_ORDER,

&nbsp;               \[

&nbsp;                   'de' => 'Ein neues ToDo für diesen Auftrag anlegen',

&nbsp;                   'en' => 'Create a new ToDo for this order'

&nbsp;               ],

&nbsp;               '\\ToDoList\\Procedures\\CreateToDoFromOrder@run'

&nbsp;           );



&nbsp;           $this->getLogger("ToDoList\_eventProcedure\_Booted")

&nbsp;               ->setReferenceType("eventProcedureType")

&nbsp;               ->setReferenceValue(ProcedureEntry::EVENT\_TYPE\_ORDER)

&nbsp;               ->report('ToDoList::migration.eventProcedureBooted');

&nbsp;       } catch (\\Exception $e) {

&nbsp;           $this->getLogger("ToDoList\_eventProcedure\_exception")

&nbsp;               ->error("ToDoList::migration.eventProcedureException", \[

&nbsp;                   'exceptionMessage' => $e->getMessage(),

&nbsp;                   'exceptionCode' => $e->getCode()

&nbsp;               ]);

&nbsp;       }

&nbsp;   }

}

```



The example of a service provider shows how you can use the reference container. Entries stored in this container can be viewed later on in the back end in the log overview. The entry is not linked to the actual entry in the database itself, but it functions as a means of sorting logs to gain a better overview.



The `setReferenceType` method is used to store a reference type and the `setReferenceValue` method to store the corresponding reference value in the reference container. In our example, this is the event procedure type, which we entered when we registered the event procedure. Once stored, these references can be queried later in the back end.



\*\*\_ToDoList/src/Controllers/ContentController.php\_\*\*



```php

<?php



namespace ToDoList\\Controllers;



use Plenty\\Plugin\\Controller;

use Plenty\\Plugin\\Http\\Request;

use Plenty\\Plugin\\Templates\\Twig;

use ToDoList\\Contracts\\ToDoRepositoryContract;

use Plenty\\Plugin\\Log\\Loggable;



/\*\*

&nbsp;\* Class ContentController

&nbsp;\* @package ToDoList\\Controllers

&nbsp;\*/

class ContentController extends Controller

{

&nbsp;   use Loggable;



&nbsp;   /\*\*

&nbsp;    \* @param Twig                   $twig

&nbsp;    \* @param ToDoRepositoryContract $toDoRepo

&nbsp;    \* @return string

&nbsp;    \*/

&nbsp;   public function showToDos(Twig $twig, ToDoRepositoryContract $toDoRepo): string

&nbsp;   {

&nbsp;       $toDoList = $toDoRepo->getToDoList();

&nbsp;       $templateData = array("todo" => $toDoList);

&nbsp;       return $twig->render('ToDoList::content.ToDoList', $templateData);

&nbsp;   }



&nbsp;   /\*\*

&nbsp;    \* @param int                    $id

&nbsp;    \* @param ToDoRepositoryContract $toDoRepo

&nbsp;    \* @return string

&nbsp;    \*/

&nbsp;   public function showToDo(int $id, ToDoRepositoryContract $toDoRepo): string

&nbsp;   {

&nbsp;       $toDo = $toDoRepo->findTask($id);

&nbsp;       $templateData = array("id" => $id, "todo" => $toDo);

&nbsp;       return json\_encode($templateData);

&nbsp;   }



&nbsp;   /\*\*

&nbsp;    \* @param  \\Plenty\\Plugin\\Http\\Request $request

&nbsp;    \* @param ToDoRepositoryContract       $toDoRepo

&nbsp;    \* @return string

&nbsp;    \*/

&nbsp;   public function createToDo(Request $request, ToDoRepositoryContract $toDoRepo): string

&nbsp;   {

&nbsp;       $newToDo = $toDoRepo->createTask($request->all());



&nbsp;       $this->getLogger('ContentController\_createToDo')

&nbsp;           ->setReferenceType('toDoId')

&nbsp;           ->setReferenceValue($newToDo->id)

&nbsp;           ->info('ToDoList::migration.createToDoInformation', \['userId' => $newToDo->userId ]);



&nbsp;       return json\_encode($newToDo);

&nbsp;   }



&nbsp;   /\*\*

&nbsp;    \* @param int                    $id

&nbsp;    \* @param ToDoRepositoryContract $toDoRepo

&nbsp;    \* @return string

&nbsp;    \*/

&nbsp;   public function updateToDo(int $id, ToDoRepositoryContract $toDoRepo): string

&nbsp;   {

&nbsp;       $updateToDo = $toDoRepo->updateTask($id);

&nbsp;       return json\_encode($updateToDo);

&nbsp;   }



&nbsp;   /\*\*

&nbsp;    \* @param int                    $id

&nbsp;    \* @param ToDoRepositoryContract $toDoRepo

&nbsp;    \* @return string

&nbsp;    \*/

&nbsp;   public function deleteToDo(int $id, ToDoRepositoryContract $toDoRepo): string

&nbsp;   {

&nbsp;       $deleteToDo = $toDoRepo->deleteTask($id);

&nbsp;       return json\_encode($deleteToDo);

&nbsp;   }

}

```



We use the the Loggable class as in the `CreateToDoTable.php` file. To ensure that we log the creation of the to do, we have to enter the code in the `createToDo`, after the task has been created, but before the return. As above, enter the identifier or a magic method. Set the reference type and value as in the service provider - in this case, the ID of the to do - and store both in the reference container. Choose a different log level, e.g. \*\*info\*\*. You can offer additional information in an array; in this example, we provide the `userId` of the task creator.



\*\*Conditions for log messages to be displayed\*\*



Log messages have to fulfill certain conditions to be shown to the customer in the PlentyONE back end:



\- Log codes must have translations. If no translation is provided the log message will be ignored.

\- Log codes must be activated in the \*\*Log\*\* settings back end. Logs that are not activated will be ignored.

\- The above conditions do not apply if the log level is set to `error`, `critical`, `alert` or `emergency`



\## Using the Reportable trait



There are certain cases where we need to display logs even if they are not activated in the Log settings back end, e.g. at the end of every order import process to let users know how many new orders were imported or skipped.



For these cases we use the `Reportable` trait. This one is similar to the `Loggable` trait described above.



\*\*\_ToDoList/src/Controllers/ContentController.php\_\*\*



```php

<?php



namespace ToDoList\\Controllers;



use Plenty\\Plugin\\Controller;

use Plenty\\Plugin\\Http\\Request;

use Plenty\\Plugin\\Templates\\Twig;

use ToDoList\\Contracts\\ToDoRepositoryContract;

use Plenty\\Plugin\\Log\\Reportable;



/\*\*

&nbsp;\* Class ContentController

&nbsp;\* @package ToDoList\\Controllers

&nbsp;\*/

class ContentController extends Controller

{

&nbsp;   use Reportable;



&nbsp;   ...



&nbsp;   /\*\*

&nbsp;    \* @param  \\Plenty\\Plugin\\Http\\Request $request

&nbsp;    \* @param ToDoRepositoryContract       $toDoRepo

&nbsp;    \* @return string

&nbsp;    \*/

&nbsp;   public function createToDo(Request $request, ToDoRepositoryContract $toDoRepo): string

&nbsp;   {

&nbsp;       $newToDo = $toDoRepo->createTask($request->all());



&nbsp;       $this-report('ContentController\_createToDo', 'ToDoList::migration.createToDoInformation', \['userId' => $newToDo->userId ], \['toDoId' => $newToDo->id]);



&nbsp;       return json\_encode($newToDo);

&nbsp;   }



&nbsp;   ...

}

```



\## See what you did there



To see the log functionality at work, you have to go to your PlentyONE back end. There, you go through the following steps:



1\. Go to \*\*Data exchange » Log\*\*.

2\. Click on \*\*Configure\*\*.

&nbsp;  → The log configuration window will open.

3\. Select the ToDoList plugin.

4\. Select a time from the \*\*Duration\*\* drop-down menu.

&nbsp;  → This is the time for which the plugin will be logged.

5\. Select a log level from the \*\*Log level\*\* drop-down menu.

6\. \*\*Save\*\* the settings.



In choosing a log level, you set the minimum level to be triggered; any higher level occurrence will be triggered as well. If you choose \*\*debug\*\*, the lowest level, every event that occurs will also be logged. If you choose \*\*critical\*\*, only \*\*critical\*\*, \*\*alert\*\*, and \*\*emergency\*\* will be logged. You can find a detailed description \[\*\*here\*\*](https://laravel.com/docs/5.3/errors#log-severity-levels).



Finally, you can log your newly created tasks in your back end.



1\. Enter \[`http://your-plentystore.co.uk/todo`](http://your-plentystore.co.uk/todo) in your browser to open the ToDoList plugin.

2\. Enter one or more tasks.

3\. Return to your PlentyONE back end.

4\. Go to \*\*Data exchange » Log\*\*.

&nbsp;  → Find the logs to the tasks you just created.



\## Log structure



This code shows the Loggable trait in the `ContentController.php` file.



\*\*\_ToDoList/src/Controllers/ContentController\_\*\*



```php

$this

&nbsp;   ->getLogger('ContentController\_createToDo')

&nbsp;   ->setReferenceType('toDoId')

&nbsp;   ->setReferenceValue($newToDo->id)

&nbsp;   ->info('ToDoList::migration.createToDoInformation', \['userId' => $newToDo->userId ]);

```



The following table contains explanations of the individual code elements.



| \*\*Element\*\* | \*\*Description\*\* |

|---|---|

| \*\*Integration key\*\* | The Loggable trait automatically identifies the plugin it is used in and displays the namespace under \*\*Configure\*\* and \*\*Integration\*\* in the menu \*\*Data exchange » Log\*\* in the PlentyONE back end. |

| \*\*Identifier\*\* | The identifier will be shown under \*\*Identifier\*\* in the menu \*\*Data exchange » Log\*\* in the PlentyONE back end. In our example, it is `ContentController\_createToDo`. |

| \*\*Reference type (optional)\*\* | This part has to be clearly defined and as specific as possible to avoid doublings. In case of a doubling, the `try` and `catch` method in the ServiceProvider will throw an exception. We chose `toDoId`. |

| \*\*Reference value (optional)\*\* | Add the specific value for the reference type, In our example, we store the ID of the new task using `$newToDo→id`. |

| \*\*Debug level\*\* | The chosen debug level, in our example `info`. |

| \*\*Code\*\* | This element uses the key-value pairs from the `migrations.properties` file, in this example, the `createToDoInformation` key. It is shown under \*\*Code\*\* in the PlentyONE back end. |

| \*\*Additional information (optional)\*\* | After the code element, you can add further information. In this example, we have chosen `\['userId' ⇒ $newToDo→userId ]` to get the ID of the user who created the to do task. |



\## Available log levels



In this table, find all the available log levels and explanations of the individual level.



| \*\*Level\*\* | \*\*Description\*\* |

|---|---|

| `report` | Report information. Will always be logged without prior log key activation. |

| `debug` | Detailed debug information |

| `info` | Interesting events |

| `notice` | Normal but significant events |

| `warning` | Exceptional occurrences that are not errors |

| `error` | Runtime errors that do not require immediate action but should typically be logged and monitored |

| `critical` | Critical conditions |

| `alert` | Action must be taken immediately |

| `emergency` | System is unusable |

