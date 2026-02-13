\# Memory storage



You can use the plugin model to \*\*store data in a MySQL database\*\*. But, there may be cases where you only want to store data in memory, without using a datatable. You can achieve this by using so-called accessors and mutators. This page describes how to define accessors and mutators, as well as how to cast attributes to convert them to common data types.



Take care when defining which fields to enter into a database. Otherwise you might expect some data to be stored when, in reality, it's not.



\## Using attributes



You can declare an attribute as a non-table attribute to make it volatile. This means the data is only stored for as long as the plugin is executed. The system executes a plugin during a cron job or when one of the plugin's routes is called.



Note that you can only handle `public` fields this way. Attributes defined as `private` or `protected` cannot be stored in the database at all. If you want to access and modify them, use \*\*getters and setters\*\* instead.



\*\*\*PluginNameSpace/src/Models/MyModel.php\*\*\*



```

&nbsp;       <?php

&nbsp;       namespace MyPlugin\\Model;



&nbsp;       use Plenty\\Modules\\Plugin\\DataBase\\Contracts\\Model;



&nbsp;       /\*\*

&nbsp;        \* Class MyCustomPersonModel

&nbsp;        \*

&nbsp;        \* @property int $id;

&nbsp;        \* @property string $firstName;

&nbsp;        \* @property string $lastName;

&nbsp;        \*

&nbsp;        \* @property bool $isParent;

&nbsp;        \* @property int $childId;

&nbsp;        \*

&nbsp;        \* @NonTableAttribute(columns={"isParent","childId"})

&nbsp;        \*/



&nbsp;       class MyCustomPersonModel extends Model

&nbsp;       {

&nbsp;           public $id = 0;

&nbsp;           public $firstName;

&nbsp;           public $lastName;



&nbsp;           public $isParent;

&nbsp;           public $childId;



&nbsp;           public function getTableName()

&nbsp;           {

&nbsp;               return 'my\_custom\_person\_model';

&nbsp;           }

&nbsp;       }



&nbsp;       // Directly access public fields not stored in a database

&nbsp;       $person = pluginApp(MyCustomPersonModel::class);



&nbsp;       $person->isParent = true;

&nbsp;       $person->childId = 123;



&nbsp;       $child = $person->childId;

```



The example above defines three fields that are stored in the database: `$id`, `$firstName` and `lastName`. At the same time, it uses the `@NonTableAttribute` declaration to define two more fields that are not stored in the database: `$isParent` and `$child`. The `@NonTableAttribute` declaration accepts an array, so you can list any number of attributes in one go.



Access fields not stored in the database using the `pluginApp`.



\## Using getters and setters



Getters and setters are an alternative to non-table attributes. Use them when working with `private` and `protected` attributes.



The following example shows the same model as the non-table attributes example in the previous section, but makes the `$isChild` and `parentId` attributes `private`.



\*\*\*PluginNameSpace/src/Models/MyModel.php\*\*\*



```

&nbsp;       <?php

&nbsp;       namespace MyPlugin\\Model;



&nbsp;       use Plenty\\Modules\\Plugin\\DataBase\\Contracts\\Model;



&nbsp;       /\*\*

&nbsp;        \* Class MyCustomPersonModel

&nbsp;        \*

&nbsp;        \* @property int $id;

&nbsp;        \* @property string $firstName;

&nbsp;        \* @property string $lastName;

&nbsp;        \*

&nbsp;        \* @property bool $isParent;

&nbsp;        \* @property int $childId;

&nbsp;        \*

&nbsp;        \* @NonTableAttribute(columns={"isParent","childId"})

&nbsp;        \*/



&nbsp;       class MyCustomPersonModel extends Model

&nbsp;       {

&nbsp;           public $id = 0;

&nbsp;           public $firstName;

&nbsp;           public $lastName;



&nbsp;           /\*\* @var bool $isChild \*/

&nbsp;           private $isChild;



&nbsp;           /\*\* @var int $parentId \*/

&nbsp;           private $parentId;



&nbsp;           public function setParent(int $parentId) {

&nbsp;               $this->isChild = true;

&nbsp;               $this->parentId = $parentId;

&nbsp;           }



&nbsp;           public function isChild()

&nbsp;           {

&nbsp;               return $this->isChild;

&nbsp;           }



&nbsp;           public function getParent()

&nbsp;           {

&nbsp;               return $this->parentId;

&nbsp;           }



&nbsp;           public function getTableName()

&nbsp;           {

&nbsp;               return 'my\_custom\_person\_model';

&nbsp;           }

&nbsp;       }



&nbsp;       // Access fields

&nbsp;       $person2 = pluginApp(MyCustomPersonModel::class);

&nbsp;       $person2 -> setParent(321);

&nbsp;       $isChild = $person2 -> isChild();

&nbsp;       if ($isChild) {

&nbsp;           $parentId = $person2 -> getParent();

&nbsp;       }

```



This time, you need to use `setParent` and `getParent` to handle the fields.



\## Attribute casting



The model's `$casts` property lets you convert attributes to common data types. The `$casts` property is an array. The array consists of key-value pairs. The key is the name of the attribute you want to cast. The value is the type you want to cast the field to.



The following cast types are supported:



\- `array`

\- `boolean`

\- `collection`

\- `date`

\- `datetime`

\- `decimal:<digits>` - Digits is the number of decimal digits.

\- `double`

\- `double`

\- `float`

\- `integer`

\- `object`

\- `real`

\- `string`

\- `timestamp`



The following example shows how to cast attributes.



\*\*\*PluginNameSpace/src/Models/MyModel.php\*\*\*



```

&nbsp;       <?php

&nbsp;       use Plenty\\Modules\\Plugin\\DataBase\\Contracts\\Model;



&nbsp;       class MyModel extends Model

&nbsp;       {

&nbsp;           public function \_\_construct()

&nbsp;           {

&nbsp;               $this->casts = \[

&nbsp;                   'intAtt' => 'int',

&nbsp;                   'floatAtt' => 'float',

&nbsp;                   'stringAtt' => 'string',

&nbsp;                   'boolAtt' => 'boolean',

&nbsp;                   'objAtt' => 'object',

&nbsp;                   'arrAtt' => 'array',

&nbsp;                   'collAtt' => 'collection',

&nbsp;                   'dateAtt' => 'date',

&nbsp;                   'dateTimeAtt' => 'datetime',

&nbsp;                   'timeStampAtt' => 'timestamp',

&nbsp;               ];

&nbsp;           }

&nbsp;       }

```

