\# Plugin basics → Data storage → Storing data in a plugin database



\## Introduction



This guide teaches you how to store data in a plugin database.



\## What you will learn



\- How to use migrations to set up a database and create tables

\- How to use repositories to access and modify the data in your database

\- How to use contracts to access the functionality of a repository in your plugin code

\- How to use controllers to execute the functionality provided by a repository

\- How to create routes for your controllers

\- How to design a simple UI and logic for your plugin



\## Requirements



This guide builds on our \[Hello World example plugin](https://github.com/plentymarkets/plugin-hello-world). Download the Hello World plugin, change the name to ToDoList and follow this guide.



You need access to a plentymarkets system to deploy the plugin.



\## Step 1: Creating a migration



Create the file `CreateToDoTable.php` in the `src/Migrations` folder.



\*\*ToDoList/src/Migrations/CreateToDoTable.php\*\*



```php

<?php



namespace ToDoList\\Migrations;



use ToDoList\\Models\\ToDo;

use Plenty\\Modules\\Plugin\\DataBase\\Contracts\\Migrate;



class CreateToDoTable

{

&nbsp;   public function run(Migrate $migrate)

&nbsp;   {

&nbsp;       $migrate->createTable(ToDo::class);

&nbsp;   }

}

```



The `run()` method is executed when deploying the plugin. In our `run()` method, we use the `createTable()` method of the `Migrate` contract to create a new table based on the model that we specify.



\## Step 2: Creating a model



Create the file `ToDo.php` in the `src/Models` folder.



\*\*ToDoList/src/Models/ToDo.php\*\*



```php

<?php



namespace ToDoList\\Models;



use Plenty\\Modules\\Plugin\\DataBase\\Contracts\\Model;



class ToDo extends Model

{

&nbsp;   public $id              = 0;

&nbsp;   public $taskDescription = "";

&nbsp;   public $isDone          = false;



&nbsp;   public function getTableName(): string

&nbsp;   {

&nbsp;       return 'ToDoList::ToDo';

&nbsp;   }

}

```



Our model extends the `Model` contract and defines 3 properties that will be saved as columns in the data base: `id`, `taskDescription` and `isDone`. The `getTableName()` method specifies the name of the table.



\## Step 3: Creating a repository



Create the file `ToDoRepository.php` in the `src/Repositories` folder.



\*\*ToDoList/src/Repositories/ToDoRepository.php\*\*



```php

<?php



namespace ToDoList\\Repositories;



use ToDoList\\Models\\ToDo;

use Plenty\\Modules\\Plugin\\DataBase\\Contracts\\DataBase;



class ToDoRepository

{

&nbsp;   private $database;



&nbsp;   public function \_\_construct(DataBase $database)

&nbsp;   {

&nbsp;       $this->database = $database;

&nbsp;   }



&nbsp;   public function getToDoList(): array

&nbsp;   {

&nbsp;       return $this->database->query(ToDo::class)->get();

&nbsp;   }



&nbsp;   public function createTask(array $data): ToDo

&nbsp;   {

&nbsp;       $todo = pluginApp(ToDo::class);



&nbsp;       $todo->taskDescription  = $data\['taskDescription'];

&nbsp;       $todo->isDone           = false;



&nbsp;       $this->database->save($todo);



&nbsp;       return $todo;

&nbsp;   }



&nbsp;   public function updateTask($id)

&nbsp;   {

&nbsp;       $todo = $this->database->find(ToDo::class, $id);



&nbsp;       if($todo instanceof ToDo) {

&nbsp;           $todo->isDone = true;

&nbsp;           $this->database->save($todo);

&nbsp;           return $todo;

&nbsp;       }

&nbsp;   }



&nbsp;   public function deleteTask($id)

&nbsp;   {

&nbsp;       $todo = $this->database->find(ToDo::class, $id);



&nbsp;       if($todo instanceof ToDo) {

&nbsp;           $this->database->delete($todo);

&nbsp;           return $todo;

&nbsp;       }

&nbsp;   }

}

```



Our repository defines 4 methods:



\- `getToDoList()` uses a query to get all existing entries from the database and returns the result as an array.

\- `createTask()` receives data via the `$data` parameter and creates a new To Do list entry.

\- `updateTask()` receives an `$id` via the parameter, finds the entry with that ID and updates the `isDone` status.

\- `deleteTask()` receives an `$id` via the parameter, finds the entry with that ID and deletes it from the database.



\## Step 4: Creating a contract



Create the file `ToDoRepositoryContract.php` in the `src/Contracts` folder.



\*\*ToDoList/src/Contracts/ToDoRepositoryContract.php\*\*



```php

<?php



namespace ToDoList\\Contracts;



use ToDoList\\Models\\ToDo;



interface ToDoRepositoryContract

{

&nbsp;   public function getToDoList(): array;



&nbsp;   public function createTask(array $data): ToDo;



&nbsp;   public function updateTask($id);



&nbsp;   public function deleteTask($id);

}

```



The repository contract is an interface that lists the same methods as the repository.



\## Step 5: Registering the service provider



Edit the `ToDoListServiceProvider.php` file in the `src/Providers` folder.



\*\*ToDoList/src/Providers/ToDoListServiceProvider.php\*\*



```php

<?php



namespace ToDoList\\Providers;



use Plenty\\Plugin\\ServiceProvider;

use ToDoList\\Contracts\\ToDoRepositoryContract;

use ToDoList\\Repositories\\ToDoRepository;



class ToDoListServiceProvider extends ServiceProvider

{

&nbsp;   public function register()

&nbsp;   {

&nbsp;       $this->getApplication()->register(ToDoListRouteServiceProvider::class);

&nbsp;       $this->getApplication()->bind(ToDoRepositoryContract::class, ToDoRepository::class);

&nbsp;   }

}

```



In the service provider, we register the route service provider and bind the repository contract to the repository.



\## Step 6: Creating a controller



Create the file `ContentController.php` in the `src/Controllers` folder.



\*\*ToDoList/src/Controllers/ContentController.php\*\*



```php

<?php



namespace ToDoList\\Controllers;



use Plenty\\Plugin\\Controller;

use Plenty\\Plugin\\Templates\\Twig;

use ToDoList\\Contracts\\ToDoRepositoryContract;

use Plenty\\Plugin\\Http\\Request;



class ContentController extends Controller

{

&nbsp;   public function showToDoList(Twig $twig, ToDoRepositoryContract $toDoRepo): string

&nbsp;   {

&nbsp;       $toDoList = $toDoRepo->getToDoList();

&nbsp;       $templateData = array("tasks" => $toDoList);

&nbsp;       return $twig->render('ToDoList::content.ToDoList', $templateData);

&nbsp;   }



&nbsp;   public function createTask(Request $request, ToDoRepositoryContract $toDoRepo): string

&nbsp;   {

&nbsp;       $data = $request->all();

&nbsp;       $newTask = $toDoRepo->createTask($data);

&nbsp;       return json\_encode($newTask);

&nbsp;   }



&nbsp;   public function updateTask(ToDoRepositoryContract $toDoRepo, int $id): string

&nbsp;   {

&nbsp;       $updateTask = $toDoRepo->updateTask($id);

&nbsp;       return json\_encode($updateTask);

&nbsp;   }



&nbsp;   public function deleteTask(ToDoRepositoryContract $toDoRepo, int $id): string

&nbsp;   {

&nbsp;       $deleteTask = $toDoRepo->deleteTask($id);

&nbsp;       return json\_encode($deleteTask);

&nbsp;   }

}

```



The controller has 4 public methods:



\- `showToDoList()` gets the list of all tasks and renders the Twig template.

\- `createTask()` receives the request data and creates a new task.

\- `updateTask()` receives an ID and updates the task status.

\- `deleteTask()` receives an ID and deletes the task.



\## Step 7: Creating routes



Create the file `ToDoListRouteServiceProvider.php` in the `src/Providers` folder.



\*\*ToDoList/src/Providers/ToDoListRouteServiceProvider.php\*\*



```php

<?php



namespace ToDoList\\Providers;



use Plenty\\Plugin\\RouteServiceProvider;

use Plenty\\Plugin\\Routing\\Router;



class ToDoListRouteServiceProvider extends RouteServiceProvider

{

&nbsp;   public function map(Router $router)

&nbsp;   {

&nbsp;       $router->get('todo', 'ToDoList\\Controllers\\ContentController@showToDoList');

&nbsp;       $router->post('todo', 'ToDoList\\Controllers\\ContentController@createTask');

&nbsp;       $router->put('todo/{id}', 'ToDoList\\Controllers\\ContentController@updateTask');

&nbsp;       $router->delete('todo/{id}', 'ToDoList\\Controllers\\ContentController@deleteTask');

&nbsp;   }

}

```



We define 4 routes that link to the controller methods.



\## Step 8: Designing the UI



Create the following files:



\*\*ToDoList/resources/views/content/ToDoList.twig\*\*



```twig

<!DOCTYPE html>

<html lang="en">

<head>

&nbsp;   <meta charset="utf-8">

&nbsp;   <meta name="viewport" content="width=device-width, initial-scale=1">

&nbsp;   <title>To Do List</title>



&nbsp;   <link rel="stylesheet" href="{{ plugin\_path('ToDoList') }}/css/main.css">

&nbsp;   <link href='https://fonts.googleapis.com/css?family=Amatic+SC:700|Open+Sans:400' rel='stylesheet' type='text/css'>



&nbsp;   <script src="https://code.jquery.com/jquery-2.2.4.min.js"></script>

</head>

<body>

&nbsp;   <div class="list">

&nbsp;       <h1 class="header">To Do List</h1>



&nbsp;       <ul class="tasks">

&nbsp;           {% if tasks is not null %}

&nbsp;               {% for task in tasks %}

&nbsp;                   <li>

&nbsp;                       <span class="task {% if task.isDone == 1 %} done {% endif %}">{{ task.taskDescription }}</span>

&nbsp;                       {% if task.isDone == 1 %}

&nbsp;                           <button id="{{ task.id }}" class="delete-button">Delete from list</button>

&nbsp;                       {% else %}

&nbsp;                           <button id="{{ task.id }}" class="done-button">Mark as done</button>

&nbsp;                       {% endif %}

&nbsp;                   </li>

&nbsp;               {% endfor %}

&nbsp;           {% endif %}

&nbsp;       </ul>



&nbsp;       <!-- Text field and submit button -->

&nbsp;       <div class="task-add">

&nbsp;           <input type="text" name="taskDescription" placeholder="Enter a new task here." class="input" autocomplete="off">

&nbsp;           <input type="submit" id="addTask" value="Add" class="submit">

&nbsp;       </div>

&nbsp;   </div>



&nbsp;   <!-- Enable adding, updating and deleting tasks in the To Do list without reloading the page -->

&nbsp;   <script src="{{ plugin\_path('ToDoList') }}/js/todo.js"></script>

</body>

</html>

```



\*\*ToDoList/resources/css/main.css\*\*



```css

/\* General styling \*/

body {

&nbsp;   background-color: #F8F8F8;

}



body,

input,

button{

&nbsp;   font:1em "Open Sans", sans-serif;

&nbsp;   color: #4D4E53;

}



a {

&nbsp;   text-decoration: none;

&nbsp;   border-bottom: 1px dashed #4D4E53;

}



/\* List \*/

.list {

&nbsp;   background-color:#fff;

&nbsp;   margin:20px auto;

&nbsp;   width:100%;

&nbsp;   max-width:500px;

&nbsp;   padding:20px;

&nbsp;   border-radius:2px;

&nbsp;   box-shadow:3px 3px 0 rgba(0, 0, 0, .1);

&nbsp;   box-sizing:border-box;

}



.list .header {

&nbsp;   font-family: "Amatic SC", cursive;

&nbsp;   margin:0 0 10px 0;

}



/\* Tasks \*/

.tasks {

&nbsp;   margin: 0;

&nbsp;   padding:0;

&nbsp;   list-style-type: none;

}



.tasks .task.done {

&nbsp;   text-decoration:line-through;

}



.tasks li,

.task-add .input{

&nbsp;   border:0;

&nbsp;   border-bottom:1px dashed #ccc;

&nbsp;   padding: 15px 0;

}



/\* Input field \*/

.input:focus {

&nbsp;   outline:none;

}



.input {

&nbsp;   width:100%;

}



/\* Done button \& Delete button\*/

.tasks .done-button {

&nbsp;   display:inline-block;

&nbsp;   font-size:0.8em;

&nbsp;   background-color: #5d9c67;

&nbsp;   color:#000;

&nbsp;   padding:3px 6px;

&nbsp;   border:0;

&nbsp;   opacity:0.4;

}



.tasks .delete-button {

&nbsp;   display:inline-block;

&nbsp;   font-size:0.8em;

&nbsp;   background-color: #77525c;

&nbsp;   color:#000;

&nbsp;   padding:3px 6px;

&nbsp;   border:0;

&nbsp;   opacity:0.4;

}



.tasks li:hover .done-button,

.tasks li:hover .delete-button {

&nbsp;   opacity:1;

&nbsp;   cursor:pointer;

}



/\* Submit button \*/

.submit {

&nbsp;   background-color:#fff;

&nbsp;   padding: 5px 10px;

&nbsp;   border:1px solid #ddd;

&nbsp;   width:100%;

&nbsp;   margin-top:10px;

&nbsp;   box-shadow: 3px 3px 0 #ddd;

}



.submit:hover {

&nbsp;   cursor:pointer;

&nbsp;   background-color:#ddd;

&nbsp;   color: #fff;

&nbsp;   box-shadow: 3px 3px 0 #ccc;

}

```



\*\*ToDoList/resources/js/todo.js\*\*



```javascript

// Add a new task to the To Do list when clicking on the submit button

$('#addTask').click(function(){

&nbsp;   var nameInput = $("\[name='taskDescription']");

&nbsp;   var data = {

&nbsp;       'taskDescription': nameInput.val()

&nbsp;   };

&nbsp;   $.ajax({

&nbsp;       type: "POST",

&nbsp;       url: "/todo",

&nbsp;       data: data,

&nbsp;       success: function(data)

&nbsp;       {

&nbsp;           var data = jQuery.parseJSON( data );

&nbsp;           $("ul.tasks").append('' +

&nbsp;               '<li>' +

&nbsp;               '   <span class="task">' + data.taskDescription + '</span> ' +

&nbsp;               '   <button id="' + data.id + '"class="done-button">Mark as done</button>' +

&nbsp;               '</li>');

&nbsp;           nameInput.val("");

&nbsp;       },

&nbsp;       error: function(data)

&nbsp;       {

&nbsp;           alert("ERROR");

&nbsp;       }

&nbsp;   });

});



// Update the status of an existing task in the To Do list and mark it as done when clicking on the Mark as done button

$(document).on('click', 'button.done-button', function(e) {

&nbsp;   var button = this;

&nbsp;   var id = button.id;

&nbsp;   $.ajax({

&nbsp;       type: "PUT",

&nbsp;       url: "/todo/" + id,

&nbsp;       success: function(data)

&nbsp;       {

&nbsp;           var data = jQuery.parseJSON( data );

&nbsp;           if(data.isDone)

&nbsp;           {

&nbsp;               $("#" + id).removeClass("done-button").addClass("delete-button").html("Delete from list");

&nbsp;               $("#" + id).prev().addClass("done");

&nbsp;           }

&nbsp;           else

&nbsp;           {

&nbsp;               alert("ERROR");

&nbsp;           }

&nbsp;       },

&nbsp;       error: function(data)

&nbsp;       {

&nbsp;           alert("ERROR");

&nbsp;       }

&nbsp;   });

});



// Delete a task from the To Do list when clicking on the Delete from list button

$(document).on('click', 'button.delete-button', function(e) {

&nbsp;   var button = this;

&nbsp;   var id = button.id;

&nbsp;   $.ajax({

&nbsp;       type: "DELETE",

&nbsp;       url: "/todo/" + id,

&nbsp;       success: function(data)

&nbsp;       {

&nbsp;           $("#" + id).parent().remove();

&nbsp;       },

&nbsp;       error: function(data)

&nbsp;       {

&nbsp;           alert("ERROR");

&nbsp;       }

&nbsp;   });

});

```



\## All tasks are done



After creating the plugin, add it to the PlentyONE inbox and deploy it. To display the To Do list, open a new browser tab and type in your domain adding `/todo` at the end. Have fun with your new plugin!

