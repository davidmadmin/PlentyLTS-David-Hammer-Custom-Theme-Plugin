\# Plugin basics → Data storage → Database storage



\## Introduction



plentymarkets offers two methods of storing data: database storage and memory storage. We recommend using database storage if you intend to store large amounts of data for a long time.



For an overview of what tables are available to plugins in plentymarkets, refer to our \*\*Plugin interface documentation\*\*.



\## Creating a new datatable



To create a datatable, you have to create a new model with data fields and database attributes. This model represents the database and is structured as a PHP class.



All database models are stored in the `src/models` directory of your plugin. Each database has its own PHP class file.



\### Example model



\*\*PluginDirectory/src/Models/MyModel.php\*\*



```php

<?php

namespace PluginDirectory\\Models;



use Plenty\\Modules\\Plugin\\DataBase\\Contracts\\Model;



/\*\*

\* Class MyModel

\*

\* @property int     $id

\* @property string  $name

\*/

class MyModel extends Model

{

&nbsp;   public $id = 0;

&nbsp;   public $name = '';



&nbsp;   /\*\*

&nbsp;   \* @return string

&nbsp;   \*/

&nbsp;   public function getTableName(): string

&nbsp;   {

&nbsp;       return 'PluginDirectory::MyModel';

&nbsp;   }

}

```



The `getTableName()` method determines the name of the table in the database.



\### Primary keys



A primary key is an attribute of your database that allows you to identify an entry uniquely. By default, this is the `id`. If the primary key is an integer and should auto-increment, you can use the default and don't have to define anything. If you want to use a different primary key or use a key that doesn't auto-increment, you have to define the primary key.



\*\*PluginDirectory/src/Models/MyModel.php\*\*



```php

<?php

namespace PluginDirectory\\Models;



use Plenty\\Modules\\Plugin\\DataBase\\Contracts\\Model;



/\*\*

\* Class MyModel

\*

\* @property string     $name

\*/

class MyModel extends Model

{

&nbsp;   public    $name                     = '';

&nbsp;   protected $primaryKeyFieldName      = 'name';

&nbsp;   protected $primaryKeyFieldType      = 'string';

&nbsp;   protected $autoIncrementPrimaryKey  = 'false';



&nbsp;   /\*\*

&nbsp;   \* @return string

&nbsp;   \*/

&nbsp;   public function getTableName(): string

&nbsp;   {

&nbsp;       return 'PluginDirectory::MyModel';

&nbsp;   }

}

```



\### Foreign keys



You can declare any attribute of your database as a foreign key. Foreign keys allow you to reference your data from a different datatable and ensure it remains consistent across tables.



For example, if you reference the PlentyONE `Plenty\\Modules\\Account\\Contact\\Model` and a contact is deleted from this table, it is automatically deleted from your datatable, too.



\*\*PluginDirectory/src/Models/MyModel.php\*\*



```php

<?php

namespace PluginDirectory\\Models;



use Plenty\\Modules\\Plugin\\DataBase\\Contracts\\Model;



/\*\*

\* Class MyModel

\*

\* @property int     $id

\* @property int     $contactId

\* @Relation(model="Plenty\\Modules\\Account\\Contact\\Models\\Contact", name="my\_model\_contact\_id\_fk", attribute="id", column="contactId", onUpdate="Cascade", onDelete="Cascade")

\*/

class MyModel extends Model

{

&nbsp;   public $id              = 0;

&nbsp;   public $contactId       = 0;



&nbsp;   /\*\*

&nbsp;       \* @return string

&nbsp;       \*/

&nbsp;   public function getTableName(): string

&nbsp;   {

&nbsp;       return 'PluginDirectory'::MyModel;

&nbsp;   }

}

```



You can declare a key as foreign key in the class annotations like in the example above.



\### Nullable attributes



There may be cases where you don't have values for all attributes of a datatable entry. One way to handle these cases is to use dummy values. For example, you could fill all string attributes without value with an empty string, or designate a negative number for missing integers.



A better way of accounting for missing values is to declare an attribute as nullable. This means that instead of using a placeholder for a missing value, all missing values become `NULL`.



\*\*PluginDirectory/src/Models/MyModel.php\*\*



```php

<?php

namespace PluginDirectory\\Models;



use Plenty\\Modules\\Plugin\\DataBase\\Contracts\\Model;



/\*\*

\* Class MyModel

\*

\* @property int $id;

\* @property int $contactId;

\* @property int $age;

\* @property string $email;

\*

\* @Nullable(columns={"age","email"})

\*/



class MyModel extends Model

{

&nbsp;   public $id = 0;

&nbsp;   public $contactId = 0;

&nbsp;   public $age = 0;

&nbsp;   public $email = '';



&nbsp;   public function getTableName()

&nbsp;   {

&nbsp;       return 'PluginDirectory'::MyModel;

&nbsp;   }

}

```



You can declare an attribute as nullable by using the `@Nullable` declaration like in the example above. This declaration accepts an array, so you can list any number of attributes in one go.



For further information on how to query data in a datatable, see our \*\*Plugin interface documentation\*\*.



\### Indexes



Indexes can significantly improve the performance of database queries by allowing the database system to find rows matching specific column values more quickly. You define an index using the `@Index` annotation within the main class docblock of your model.



\*\*PluginDirectory/src/Models/MyModel.php\*\*



```php

<?php

namespace PluginDirectory\\Models;



use Plenty\\Modules\\Plugin\\DataBase\\Contracts\\Model;



/\*\*

\* Class MyModel

\*

\* @property int     $id

\* @property string  $name // Assuming 'name' is a property in your model

\* @property int     $contactId

\*

\* @Index(columns={"name"}, name="UniqueName", isUnique="true")

\*/

class MyModel extends Model

{

&nbsp;   public $id        = 0;

&nbsp;   public $name      = ''; // Property for the index

&nbsp;   public $contactId = 0;



&nbsp;   /\*\*

&nbsp;   \* @return string

&nbsp;   \*/

&nbsp;   public function getTableName(): string

&nbsp;   {

&nbsp;       return 'PluginDirectory::MyModel';

&nbsp;   }

}

```



The `@Index` annotation accepts the following parameters:



\*\*`columns`\*\* (Required) An array of strings specifying the column names to include in the index. You can include multiple column names (e.g., `{"col1", "col2"}`) to create a composite index.



\*\*`name`\*\* (Optional) A string specifying the desired name for the index in the database. If omitted, a name might be automatically generated based on the table and column names. Providing a specific name can be helpful for clarity or managing constraints.



\*\*`isUnique`\*\* (Optional) A string (`"true"` or `"false"`) indicating whether the index should enforce a uniqueness constraint.

\- If set to `"true"`, the database will prevent inserting or updating rows where the value (or combination of values for composite indexes) in the specified column(s) already exists in another row.

\- Defaults to `"false"` if not specified.



Indexes are crucial for optimizing read operations but note that they can slightly slow down write operations as the index also needs to be updated. Use them judiciously on columns frequently used in search conditions or for enforcing uniqueness.



\### Non-table attributes



In addition to attributes without values, you may have some attributes you don't want to enter into your table at all. This makes them volatile, meaning they're only stored for as long as the plugin is active.



To achieve this, you can declare an attribute as a non-table attribute.



\*\*PluginDirectory/src/Models/MyModel.php\*\*



```php

<?php

namespace PluginDirectory\\Models;



use Plenty\\Modules\\Plugin\\DataBase\\Contracts\\Model;



/\*\*

\* Class MySecondModel

\*

\* @property int $id;

\* @property int $contactId;

\* @property int $age;

\*

\* @NonTableAttribute(columns={"contactId", age"})

\*/

class MySecondModel extends Model

{

public $id = 0;

public $contactId = 0;

public $age = 0;



public function getTableName()

{

&nbsp;   return 'MigrateExample::MySecondModel';

}

}

```



You can declare attributes as non-table attributes using the `@NonTableAttribute` declaration like in the example above. This declaration accepts an array, so you can list any number of attributes in one go.



For further information on how to handle non-table attributes, see our \*\*corresponding documentation\*\*.



\## Migrating the datatable



To create, update or delete a datatable, you have to run a migration. For this, you have to define the migration in a new class and declare that it should be run when the plugin is deployed, using the plugin JSON.



\### Plugin JSON



The plugin JSON determines which migrations are run on deploy. You can define the migrations you want to run with the `runOnBuild` property. This property accepts an array as value. The value includes the paths of all migrations you want to run, separated by comma.



```json

"runOnBuild":\["PluginDirectory\\\\Migrations\\\\CreateNewTable"]

```



\### Migration



Migrations use the model defining the data structure and the `Plenty\\Modules\\Plugin\\DataBase\\Contracts\\Migrate` class.



\*\*PluginDirectory/src/Models/MyModel.php\*\*



```php

<?php

namespace PluginNameSpace\\Migrations;



use PluginNameSpace\\Models\\MyModel;

use Plenty\\Modules\\Plugin\\DataBase\\Contracts\\Migrate;



/\*\*

\* Class CreateNewTable

\*/

class CreateNewTable

{

&nbsp;   /\*\*

&nbsp;   \* @param Migrate $migrate

&nbsp;   \*/

&nbsp;   public function run(Migrate $migrate)

&nbsp;   {

&nbsp;       $migrate->createTable(MyModel::class);

&nbsp;   }

}

```



You can create, update, or delete tables this way.



| Function | Description |

|----------|-------------|

| `$createTable()` | Creates a new table. The same table can only be created once this way. To modify the table after the first deploy, update it. |

| `$updateTable()` | Updates an existing table. Requires a separate migration. |

| `$deleteTable()` | Deletes a table |

