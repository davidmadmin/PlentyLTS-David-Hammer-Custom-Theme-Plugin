# Plugin basics → Data storage → Storing data in a plugin database

## Introduction

This guide teaches you how to store data in a plugin database.

## What you will learn

\- How to use migrations to set up a database and create tables

\- How to use repositories to access and modify the data in your database

\- How to use contracts to access the functionality of a repository in your plugin code

\- How to use controllers to execute the functionality provided by a repository

\- How to create routes for your controllers

\- How to design a simple UI and logic for your plugin

## Requirements

This guide builds on our [Hello World example plugin](https://github.com/plentymarkets/plugin-hello-world). Download the Hello World plugin, change the name to ToDoList and follow this guide.

You need access to a plentymarkets system to deploy the plugin.

## Step 1: Creating a migration

Create the file `CreateToDoTable.php`in the`src/Migrations` folder.

### ToDoList/src/Migrations/CreateToDoTable.php

```php
<?php

namespace ToDoList\\Migrations;

use ToDoList\\Models\\ToDo;

use Plenty\\Modules\\Plugin\\DataBase\\Contracts\\Migrate;

class CreateToDoTable

{

    public function run(Migrate $migrate)

    {

        $migrate->createTable(ToDo::class);

    }

}
```

The `run()`method is executed when deploying the plugin. In our`run()`method, we use the`createTable()`method of the`Migrate` contract to create a new table based on the model that we specify.

## Step 2: Creating a model

Create the file `ToDo.php`in the`src/Models` folder.

### ToDoList/src/Models/ToDo.php

```php
<?php

namespace ToDoList\\Models;

use Plenty\\Modules\\Plugin\\DataBase\\Contracts\\Model;

class ToDo extends Model

{

    public $id              = 0;

    public $taskDescription = "";

    public $isDone          = false;

    public function getTableName(): string

    {

        return 'ToDoList::ToDo';

    }

}
```

Our model extends the `Model`contract and defines 3 properties that will be saved as columns in the data base:`id`, `taskDescription`and`isDone`. The `getTableName()` method specifies the name of the table.

## Step 3: Creating a repository

Create the file `ToDoRepository.php`in the`src/Repositories` folder.

### ToDoList/src/Repositories/ToDoRepository.php

```php
<?php

namespace ToDoList\\Repositories;

use ToDoList\\Models\\ToDo;

use Plenty\\Modules\\Plugin\\DataBase\\Contracts\\DataBase;

class ToDoRepository

{

    private $database;

    public function __construct(DataBase $database)

    {

        $this->database = $database;

    }

    public function getToDoList(): array

    {

        return $this->database->query(ToDo::class)->get();

    }

    public function createTask(array $data): ToDo

    {

        $todo = pluginApp(ToDo::class);

        $todo->taskDescription  = $data['taskDescription'];

        $todo->isDone           = false;

        $this->database->save($todo);

        return $todo;

    }

    public function updateTask($id)

    {

        $todo = $this->database->find(ToDo::class, $id);

        if($todo instanceof ToDo) {

            $todo->isDone = true;

            $this->database->save($todo);

            return $todo;

        }

    }

    public function deleteTask($id)

    {

        $todo = $this->database->find(ToDo::class, $id);

        if($todo instanceof ToDo) {

            $this->database->delete($todo);

            return $todo;

        }

    }

}
```

Our repository defines 4 methods:

\- `getToDoList()` uses a query to get all existing entries from the database and returns the result as an array.

\- `createTask()`receives data via the`$data` parameter and creates a new To Do list entry.

\- `updateTask()`receives an`$id`via the parameter, finds the entry with that ID and updates the`isDone` status.

\- `deleteTask()`receives an`$id` via the parameter, finds the entry with that ID and deletes it from the database.

## Step 4: Creating a contract

Create the file `ToDoRepositoryContract.php`in the`src/Contracts` folder.

### ToDoList/src/Contracts/ToDoRepositoryContract.php

```php
<?php

namespace ToDoList\\Contracts;

use ToDoList\\Models\\ToDo;

interface ToDoRepositoryContract

{

    public function getToDoList(): array;

    public function createTask(array $data): ToDo;

    public function updateTask($id);

    public function deleteTask($id);

}
```

The repository contract is an interface that lists the same methods as the repository.

## Step 5: Registering the service provider

Edit the `ToDoListServiceProvider.php`file in the`src/Providers` folder.

### ToDoList/src/Providers/ToDoListServiceProvider.php

```php
<?php

namespace ToDoList\\Providers;

use Plenty\\Plugin\\ServiceProvider;

use ToDoList\\Contracts\\ToDoRepositoryContract;

use ToDoList\\Repositories\\ToDoRepository;

class ToDoListServiceProvider extends ServiceProvider

{

    public function register()

    {

        $this->getApplication()->register(ToDoListRouteServiceProvider::class);

        $this->getApplication()->bind(ToDoRepositoryContract::class, ToDoRepository::class);

    }

}
```

In the service provider, we register the route service provider and bind the repository contract to the repository.

## Step 6: Creating a controller

Create the file `ContentController.php`in the`src/Controllers` folder.

### ToDoList/src/Controllers/ContentController.php

```php
<?php

namespace ToDoList\\Controllers;

use Plenty\\Plugin\\Controller;

use Plenty\\Plugin\\Templates\\Twig;

use ToDoList\\Contracts\\ToDoRepositoryContract;

use Plenty\\Plugin\\Http\\Request;

class ContentController extends Controller

{

    public function showToDoList(Twig $twig, ToDoRepositoryContract $toDoRepo): string

    {

        $toDoList = $toDoRepo->getToDoList();

        $templateData = array("tasks" => $toDoList);

        return $twig->render('ToDoList::content.ToDoList', $templateData);

    }

    public function createTask(Request $request, ToDoRepositoryContract $toDoRepo): string

    {

        $data = $request->all();

        $newTask = $toDoRepo->createTask($data);

        return json_encode($newTask);

    }

    public function updateTask(ToDoRepositoryContract $toDoRepo, int $id): string

    {

        $updateTask = $toDoRepo->updateTask($id);

        return json_encode($updateTask);

    }

    public function deleteTask(ToDoRepositoryContract $toDoRepo, int $id): string

    {

        $deleteTask = $toDoRepo->deleteTask($id);

        return json_encode($deleteTask);

    }

}
```

The controller has 4 public methods:

\- `showToDoList()` gets the list of all tasks and renders the Twig template.

\- `createTask()` receives the request data and creates a new task.

\- `updateTask()` receives an ID and updates the task status.

\- `deleteTask()` receives an ID and deletes the task.

## Step 7: Creating routes

Create the file `ToDoListRouteServiceProvider.php`in the`src/Providers` folder.

### ToDoList/src/Providers/ToDoListRouteServiceProvider.php

```php
<?php

namespace ToDoList\\Providers;

use Plenty\\Plugin\\RouteServiceProvider;

use Plenty\\Plugin\\Routing\\Router;

class ToDoListRouteServiceProvider extends RouteServiceProvider

{

    public function map(Router $router)

    {

        $router->get('todo', 'ToDoList\\Controllers\\ContentController@showToDoList');

        $router->post('todo', 'ToDoList\\Controllers\\ContentController@createTask');

        $router->put('todo/{id}', 'ToDoList\\Controllers\\ContentController@updateTask');

        $router->delete('todo/{id}', 'ToDoList\\Controllers\\ContentController@deleteTask');

    }

}
```

We define 4 routes that link to the controller methods.

## Step 8: Designing the UI

Create the following files:

### ToDoList/resources/views/content/ToDoList.twig

```twig
<!DOCTYPE html>

<html lang="en">

<head>

    <meta charset="utf-8">

    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>To Do List</title>

    <link rel="stylesheet" href="{{ plugin_path('ToDoList') }}/css/main.css">

    <link href='https://fonts.googleapis.com/css?family=Amatic+SC:700|Open+Sans:400' rel='stylesheet' type='text/css'>

    <script src="https://code.jquery.com/jquery-2.2.4.min.js"></script>

</head>

<body>

    <div class="list">

        <h1 class="header">To Do List</h1>

        <ul class="tasks">

            {% if tasks is not null %}

                {% for task in tasks %}

                    <li>

                        <span class="task {% if task.isDone == 1 %} done {% endif %}">{{ task.taskDescription }}</span>

                        {% if task.isDone == 1 %}

                            <button id="{{ task.id }}" class="delete-button">Delete from list</button>

                        {% else %}

                            <button id="{{ task.id }}" class="done-button">Mark as done</button>

                        {% endif %}

                    </li>

                {% endfor %}

            {% endif %}

        </ul>

        <!-- Text field and submit button -->

        <div class="task-add">

            <input type="text" name="taskDescription" placeholder="Enter a new task here." class="input" autocomplete="off">

            <input type="submit" id="addTask" value="Add" class="submit">

        </div>

    </div>

    <!-- Enable adding, updating and deleting tasks in the To Do list without reloading the page -->

    <script src="{{ plugin_path('ToDoList') }}/js/todo.js"></script>

</body>

</html>
```

### ToDoList/resources/css/main.css

```css
/* General styling */

body {

    background-color: #F8F8F8;

}

body,

input,

button{

    font:1em "Open Sans", sans-serif;

    color: #4D4E53;

}

a {

    text-decoration: none;

    border-bottom: 1px dashed #4D4E53;

}

/* List */

.list {

    background-color:#fff;

    margin:20px auto;

    width:100%;

    max-width:500px;

    padding:20px;

    border-radius:2px;

    box-shadow:3px 3px 0 rgba(0, 0, 0, .1);

    box-sizing:border-box;

}

.list .header {

    font-family: "Amatic SC", cursive;

    margin:0 0 10px 0;

}

/* Tasks */

.tasks {

    margin: 0;

    padding:0;

    list-style-type: none;

}

.tasks .task.done {

    text-decoration:line-through;

}

.tasks li,

.task-add .input{

    border:0;

    border-bottom:1px dashed #ccc;

    padding: 15px 0;

}

/* Input field */

.input:focus {

    outline:none;

}

.input {

    width:100%;

}

/* Done button \& Delete button*/

.tasks .done-button {

    display:inline-block;

    font-size:0.8em;

    background-color: #5d9c67;

    color:#000;

    padding:3px 6px;

    border:0;

    opacity:0.4;

}

.tasks .delete-button {

    display:inline-block;

    font-size:0.8em;

    background-color: #77525c;

    color:#000;

    padding:3px 6px;

    border:0;

    opacity:0.4;

}

.tasks li:hover .done-button,

.tasks li:hover .delete-button {

    opacity:1;

    cursor:pointer;

}

/* Submit button */

.submit {

    background-color:#fff;

    padding: 5px 10px;

    border:1px solid #ddd;

    width:100%;

    margin-top:10px;

    box-shadow: 3px 3px 0 #ddd;

}

.submit:hover {

    cursor:pointer;

    background-color:#ddd;

    color: #fff;

    box-shadow: 3px 3px 0 #ccc;

}
```

### ToDoList/resources/js/todo.js

```javascript
// Add a new task to the To Do list when clicking on the submit button

$('#addTask').click(function(){

    var nameInput = $("[name='taskDescription']");

    var data = {

        'taskDescription': nameInput.val()

    };

    $.ajax({

        type: "POST",

        url: "/todo",

        data: data,

        success: function(data)

        {

            var data = jQuery.parseJSON( data );

            $("ul.tasks").append('' +

                '<li>' +

                '   <span class="task">' + data.taskDescription + '</span> ' +

                '   <button id="' + data.id + '"class="done-button">Mark as done</button>' +

                '</li>');

            nameInput.val("");

        },

        error: function(data)

        {

            alert("ERROR");

        }

    });

});

// Update the status of an existing task in the To Do list and mark it as done when clicking on the Mark as done button

$(document).on('click', 'button.done-button', function(e) {

    var button = this;

    var id = button.id;

    $.ajax({

        type: "PUT",

        url: "/todo/" + id,

        success: function(data)

        {

            var data = jQuery.parseJSON( data );

            if(data.isDone)

            {

                $("#" + id).removeClass("done-button").addClass("delete-button").html("Delete from list");

                $("#" + id).prev().addClass("done");

            }

            else

            {

                alert("ERROR");

            }

        },

        error: function(data)

        {

            alert("ERROR");

        }

    });

});

// Delete a task from the To Do list when clicking on the Delete from list button

$(document).on('click', 'button.delete-button', function(e) {

    var button = this;

    var id = button.id;

    $.ajax({

        type: "DELETE",

        url: "/todo/" + id,

        success: function(data)

        {

            $("#" + id).parent().remove();

        },

        error: function(data)

        {

            alert("ERROR");

        }

    });

});
```

## All tasks are done

After creating the plugin, add it to the PlentyONE inbox and deploy it. To display the To Do list, open a new browser tab and type in your domain adding `/todo` at the end. Have fun with your new plugin!
