# Plugin basics → Plugin configuration → How to create a plugin assistant

## Assistant structure

For plentymarkets assistants there is a standard structure that you need to comply with in order to register an assistant successfully and display it in the back end.

### Key

The `key` property is the assistant's unique identifier. It's used to identify an assistant, translate it and link the data source or the settings handler to it.

Accepted type: string

**Rule**: Must be unique. No two assistants can have the same key.

Example: `'key' => 'plenty-assistant-my-assistant-key',`

### Name

The `name` property is the assistant's name. It's also displayed in the navigation bar and as the page title. It's translatable.

Accepted type: string

Example: `'name' => 'PlentyAssistant::MyAssistantName',`

### Relevant properties

The `relevantProperties` property is an **optional** array of key =\> value pairs. See the list below. Each key represents a property that is automatically added to all data and form objects. You can access these in your own components.

Accepted type: string

Example: `'relevantProperties' => []`

### Mandatory properties

\- `plenty_id` (integer) =\> plenty ID value. _This is added automatically._

\- `language` (string) =\> the interface language of the user (e.g. "de", "en"). _This is added automatically._

### List of available properties you can add

\- `salesMethodId` =\> plenty ID value or array of IDs.

\- `webstoreId` =\> webstore ID value or array of IDs.

\- `clientId` =\> client ID value or array of IDs.

\- `shippingProfileId` =\> shipping profile ID value or array of IDs.

\- `referrerId` =\> referrer ID value or array of IDs.

\- `warehouseId` =\> warehouse ID value or array of IDs.

\- `countryId` =\> country ID value or array of IDs.

Example:

```text
'relevantProperties' => [

    'webstoreId' => 0,

    'referrerId' => 1,

]
```

### Settings handler class

The `settingsHandlerClass` property is **mandatory if you have a finalisation step**. It points to a PHP class that handles the assistant data when the assistant is finalised. Read more about how to create a settings handler and what you need to take into account in the [Settings handler](#settings-handler) section.

Accepted type: string

Example: `'settingsHandlerClass' => MyAssistantSettingsHandler::class,`

### Data source

The `dataSource` property is **optional**. It points to a PHP class that provides all the data that your assistant needs. Read more about how to create a data source and what you need to take into account in the [Data sources](#data-sources) section.

Accepted type: string

Example: `'dataSource' => MyAssistantDataSource::class,`

### Action handler

The `actionHandler` property is **optional**. It points to a PHP class that can handle specific actions. Read more about how to create an action handler and what you need to take into account in the [Action handler](#action-handler) section.

Accepted type: string

Example: `'actionHandler' => MyAssistantActionHandler::class,`

### Translation namespace

The `translationNamespace` property is the plugin namespace or module name that is used for translating your assistant. Read more about translating your assistant in the [Assistant translations](#assistant-translations) section.

Accepted type: string

Example: `'translationNamespace' => 'MyPlugin',`

### Translatable properties

The properties `name`, `shortDescription`, and `description` are translatable strings. In your translation files you need to add keys and values that you can then use in the structure. Have a look at the [Assistant translations](#assistant-translations) section for more details.

### Short description

The `shortDescription` property is a **brief** summary of the assistant's purpose.

Accepted type: string

Example: `'shortDescription' => 'PlentyAssistant::MyAssistantShortDescription',`

### Description

The `description` property is a detailed explanation of the assistant's functionality.

Accepted type: string

Example: `'description' => 'PlentyAssistant::MyAssistantDescription',`

### Icon path

The `iconPath` property defines the location of the assistant icon. You can use your own SVG icon. The path is relative to your plugin folder or absolute.

Accepted type: string

Example: `'iconPath' => __DIR__.'/../../images/my-icon.svg',`

### Keywords

The `keywords` property is an **optional** array of relevant keywords for search purposes.

Accepted type: array

Example: `'keywords' => ['customer', 'registration', 'account'],`

### Priority

The `priority` property is **optional**. It determines the order in which assistants are displayed. A lower number means higher priority.

Accepted type: integer

Example: `'priority' => 1000,`

**Rule**: Must be greater than 0.

### Options

The `options` property is **optional**. It allows the assistant to have several independent instances for different configurations. Options can be created, renamed, duplicated, and deleted by users.

Accepted type: associative array

Example:

```text
'options' => [

    'config' => [

        'iconPath' => __DIR__.'/../../images/my-option-icon.svg',

        'allowDelete' => true,

        'allowDuplicate' => true,

        'allowRename' => true

    ]

]
```

**config** keys:

\- `iconPath` (string) – path to an SVG icon for the option.

\- `allowDelete` (boolean) – whether users can delete options.

\- `allowDuplicate` (boolean) – whether users can duplicate options.

\- `allowRename` (boolean) – whether users can rename options.

### Topics

The `topics` property is **optional**. Topics enable categories inside an assistant, allowing users to jump to different sections from an overview.

Accepted type: array

Example:

```text
'topics' => [

    [

        'key' => 'first-topic',

        'title' => 'PlentyAssistant::FirstTopicTitle',

        'description' => 'PlentyAssistant::FirstTopicDescription',

        'priority' => 999,

    ]

]
```

### Mandatory keys:

\- `key` (string) – Unique topic identifier.

\- `title` (string) – Translatable topic name.

\- `description` (string) – Translatable topic explanation.

\- `priority` (integer) – Display order.

### Steps

The `steps` property is **mandatory**. Steps define the form fields and structure of the assistant.

Accepted type: associative array

Example:

```text
'steps' => [

    'stepGeneral' => [

        'title' => 'PlentyAssistant::StepGeneralTitle',

        'description' => 'PlentyAssistant::StepGeneralDescription',

        'condition' => '',

        'validationClass' => MyAssistantGeneralValidation::class,

        'loadClass' => MyAssistantGeneralLoad::class,

        'sections' => []

    ]

]
```

### Mandatory keys:

\- `title` (string) – Translatable step title.

\- `sections` (array) – Contains form sections and fields.

### Optional keys:

\- `description` (string) – Translatable explanation.

\- `showFullscreen` (boolean) – Display step in fullscreen mode.

\- `condition` (string) – JavaScript-like expression to show or hide the step.

\- `validationClass` (string) – Class to validate data.

\- `loadClass` (string) – Class to load or modify data.

\- `topic` (string) – Links step to a topic.

### Sections

Sections organize fields within a step.

Example:

```text
'sections' => [

    [

        'title' => 'PlentyAssistant::SectionTitle',

        'description' => 'PlentyAssistant::SectionDescription',

        'condition' => '',

        'form' => []

    ]

]
```

### Mandatory keys:

\- `form` (array) – Contains form fields.

### Optional keys:

\- `title` (string) – Translatable section title.

\- `description` (string) – Translatable section description.

\- `condition` (string) – JavaScript-like expression.

### Form

Form fields are the actual inputs users interact with.

Example:

```text
'form' => [

    'username' => [

        'type' => 'text',

        'defaultValue' => '',

        'required' => true,

        'options' => [

            'name' => 'PlentyAssistant::UsernameLabel'

        ]

    ]

]
```

### Mandatory keys:

\- `type` (string) – Field type (text, select, checkbox, etc.).

### Common optional keys:

\- `defaultValue` – Default field value.

\- `required` (boolean) – Whether the field is mandatory.

\- `options` (array) – Additional configuration.

### Common options:

\- `name` (string) – Translatable field label.

\- `tooltipText` (string) – Translatable tooltip.

## Finalisation

Finalisation is the last step where you define what happens after the user completes the assistant.

### Finalisation step

Add a finalisation step in your structure:

```text
'stepFinalise' => [

    'title' => 'PlentyAssistant::StepFinaliseTitle',

    'description' => 'PlentyAssistant::StepFinaliseDescription',

    'finalisation' => true,

    'sections' => [

        [

            'title' => 'PlentyAssistant::FinalisationSectionTitle',

            'description' => 'PlentyAssistant::FinalisationSectionDescription',

        ]

    ]

]
```

### Mandatory key:

\- `finalisation`(boolean) – Must be set to`true`.

## Settings handler

The settings handler processes data when the assistant is finalised.

### How to create a settings handler

1\. Create a class that extends `BaseSettingsHandler`.

```php
   use Plenty\\Modules\\Wizard\\Services\\SettingsHandlers\\BaseSettingsHandler;
```

2\. Create a `public function handle(array $data)` and add your functionality.

   This method receives the assistant data and should process it accordingly.

### How to use a settings handler

In your assistant's structure:

```php
'settingsHandlerClass' => YourSettingsHandler::class,
```

## Data sources

Data sources provide and manage the data that populates your assistant.

### How to create a data source

1\. Create a class that extends `BaseWizardDataSource`.

```php
   use Plenty\\Modules\\Wizard\\Services\\DataSources\\BaseWizardDataSource;
```

2\. Create a `public function getIdentifiers()` and add your functionality to it.

   → This method should return an array of option identifiers.

### How to use a data source

In your assistant's structure use the following:

In a **plugin**: `"dataSource" => "<namespace>\\YourDataSource",`

### Getting started with data sources

In a **plugin**: `updateDataOption()`method's`$data` parameter must be of the type array even though it's not enforced in BaseWizardDataSource. This will be fixed in a future release. Before you start developing your own data source please make sure you have a look at the example and understand what is the purpose of each method.

To see the example assistant in the UI you need to register it. Uncomment the registration of **custom-data-source**in**WizardServiceProvider.php**.

### What happens in the background

Before you start developing your data source, there are some features already developed to ease your work.

The data source will already have:

\- A string property `$wizardKey` which will have the value set to your assistant's key.

\- An array property `$dataStructure` which will have the 'wizardKey' and 'data' keys predefined.

**wizardKey**: your assistant's key

**data**: the data object which you will build. By default it's empty.

On `updateDataOption()` the data is already modified and validated according to your step settings.

### How data should be built before returning it

The `$dataStructure`'s data property is built differently depending on what you need to display. You can use the class property `$dataStructure` in order to prefill. Keep in mind that **['data'] must be an object**, because the UI handles it this way.

_**data-structure-optionid.ts**_

```php
$dataStructure = $this->dataStructure;

$dataStructure['data']->{optionId} = [

  'formKey' => 'value',

      'formKey2' => 'value'

];
```

Or because in plugins you can't use dynamic variables.

_**data-structure-object.ts**_

```php
$dataStructure['data'] = (object)[

  'optionId' => [

'formKey' => 'value',

          'formKey2' => 'value'

],...

];
```

With the methods **create**, **get**, **update**and**delete**you manipulate the entire data for all options.**delete** should not return anything. For this reason, the returned `$dataStructure` should look like this:

_**manipulate-data-all-options.ts**_

```php
$dataStructure = [

     'wizardKey' => 'your-wizard-key', // Added automatically

     'data' => (object)[

         'optionId' => [

             'formKey' => 'value',

             'formKey2' => 'value'

         ],

         'optionId2' => [

             'formKey' => 'value',

             'formKey2' => 'value'

         ]

     ]

];
```

An assistant without options will still have a default option with the key "default".

_**data-structure-default-key.ts**_

```text
Unresolved include directive in modules/plugin-configuration/pages/how-to-plugin-assistant.adoc - include::data-structure-default-key.ts[]
```

With the methods **createDataOption**, **getByOptionId**, **updateDataOption**and**deleteDataOption**you manipulate the data for a single option.**deleteDataOption** should not return anything. This is why the returned `$dataStructure` should look like this:

_**manipulate-data-single-option.ts**_

```php
$dataStructure = [

     'wizardKey' => 'your-wizard-key', // Added automatically

     'data' => (object)[

         'formKey' => 'value',

         'formKey2' => 'value'

     ]

];
```

The method `getIdentifiers`should return an array of optionIds`['optionId', 'optionId2', 'optionId3',… ]`. The method `finalize` should not return anything. It's called right before the settings handler.

### Screen by screen guide

For more information about what each method should return, see above.

\- When you access **Setup » Assistants** `getIdentifiers` is called.

\- When you enter an assistant to see its options `get` is called.

\- When you click on the menu of an option and delete it, `deleteDataOption` is called.

\- When you enter an option or an assistant without options to access the form, `getByOptionId` is called.

\- When you click on "Next", the data is modified and validated according to the step settings. `updateDataOption` is called.

\- When you click on "Finalise", the data is modified and validated according to the step settings. `updateDataOption`is called.`finalize` is called. The data is then passed to the assistant's **settings handler**.

## Assistant groups

Groups are optional for assistants. The purpose of groups is to group assistants by topic.

### How to create groups

1\. Create a class that extends "WizardFolderProvider".

```php
   use Plenty\\Modules\\Wizard\\Services\\WizardFolderProvider;
```

2\. Create a `protected function folders()` and add your functionality to it.

   → This method should return an associative array.

_**protected-function-folders.ts**_

```text
Unresolved include directive in modules/plugin-configuration/pages/how-to-plugin-assistant.adoc - include::protected-function-folders.ts[]
```

Explanation:

\- 'Egg #1' and 'Egg #2' are children to 'Hen'.

\- 'Hen' is a child to 'Chicken coup'.

This will create a hierarchy that looks like this: Chicken coup ⇒ Hen ⇒ Egg #1 ⇒ Egg #2

Working example: **namespace** Plenty\\Modules\\Wizard\\Wizards\\CustomDataSourceExample\\Folders\\CustomDataSourceFolders

### How to register groups

\- In a module, in its Module**ServiceProvider**:

```php
  use Plenty\\Modules\\Wizard\\Contracts\\WizardContainerContract;

  use <namespace>\\YourFolderClass;
```

\- In `boot()` method:

```php
  boot(WizardContainerContract $wizardContainerContract)

  $wizardContainerContract->registerFolders(YourFolderClass::class);
```

\- In a plugin, in its Plugin**ServiceProvider**:

```php
  use Plenty\\Modules\\Wizard\\Contracts\\WizardContainerContract;

  use <namespace>\\YourFolderClass;
```

\- In `boot()` method:

```php
  pluginApp(WizardContainerContract::class)->registerFolders(YourFolderClass::class);
```

### How to translate groups

In order for translations to work, the group must have the key "translationNamespace".

Example: "**translationNamespace**" => "**module_wizard**"

Assign the translatable properties to keys that are set in your translation files.

Example: "**name**" => "**FileName.folderName**", "**shortDescription**" => "**FileName.folderDescription**",

For more details on how translations work have a look at the [**Assistant translations**](https://developers.plentymarkets.com/en-gb/developers/main/plugin-configuration/how-to-plugin-assistant.html#assistant-translations) section.
