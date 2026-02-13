\# Plugin configuration



The plugin configuration provides:



\- versioning to ensure backwards compatibility

\- multilingualism

\- unlimited menu nesting levels

\- new configuration field types

\- structured definitions of your configuration and configuration fields



\## Format of the plugin configuration file



Each configuration needs the following properties:



\*\*\*PluginXY/config.json\*\*\*



```json

{

&nbsp; "formatVersion": 1,

&nbsp; "menu": {

&nbsp;    "global": {

&nbsp;       "label": "Config.global",

&nbsp;       "fullWidth": true,

&nbsp;       "formFields": {

&nbsp;          "global.headerLogo": {

&nbsp;             "type": "inputFile",

&nbsp;             "required": true,

&nbsp;             "label": "Config.globalHeaderLogoLabel",

&nbsp;             "options": {

&nbsp;                "tooltip": "Config.globalHeaderLogoTooltip",

&nbsp;                "defaultValue": ""

&nbsp;             }

&nbsp;          },

&nbsp;          "global.category": {

&nbsp;             "type": "categoryPicker",

&nbsp;             "required": true,

&nbsp;             "label": "Config.globalCategoryLabel",

&nbsp;             "options": {

&nbsp;                "tooltip": "Config.globalCategoryTooltip",

&nbsp;                "defaultValue": ""

&nbsp;             }

&nbsp;          },

&nbsp;          "global.container": {

&nbsp;             "type": "verticalContainer",

&nbsp;             "label": "Config.globalContainerLabel",

&nbsp;             "options": {

&nbsp;                "containerEntries":

&nbsp;                {

&nbsp;                   "global.container.apiKey": {

&nbsp;                      "type": "inputText",

&nbsp;                      "label": "Config.globalContainerApiKeyLabel",

&nbsp;                      "required": false

&nbsp;                   }

&nbsp;                }

&nbsp;             }

&nbsp;          }

&nbsp;       }

&nbsp;    },

&nbsp;    "additional": {

&nbsp;       "label": "Config.additionalSettings",

&nbsp;       "menu": {

&nbsp;          "languages": {

&nbsp;             "label": "Config.additionalSettingsLanguagesLabel",

&nbsp;             "formFields": {

&nbsp;                "additional.languages.supportedLanguages": {

&nbsp;                   "type": "multiCheckBox",

&nbsp;                   "required": false,

&nbsp;                   "label": "Config.additionalSettingsSupportedLanguagesLabel",

&nbsp;                   "options": {

&nbsp;                      "tooltip": "Config.additionalSettingsSupportedLanguagesTooltip",

&nbsp;                      "defaultValue": "de, en",

&nbsp;                      "checkBoxValues": \[

&nbsp;                         {

&nbsp;                            "value": "de",

&nbsp;                            "caption":"Config.languageGerman"

&nbsp;                         },

&nbsp;                         {

&nbsp;                            "value": "en",

&nbsp;                            "caption": "Config.languageEnglish"

&nbsp;                         },

&nbsp;                         {

&nbsp;                            "value": "fr",

&nbsp;                            "caption": "Config.languageFrench"

&nbsp;                         },

&nbsp;                         {

&nbsp;                            "value": "es",

&nbsp;                            "caption": "Config.languageSpanish"

&nbsp;                         }

&nbsp;                      ]

&nbsp;                   }

&nbsp;                }

&nbsp;             }

&nbsp;          },

&nbsp;          "moreSettings": {

&nbsp;             "label": "Config.additionalSettingsMoreLabel",

&nbsp;             "formFields": {

&nbsp;                "additional.more.fulfillmentClient": {

&nbsp;                   "type": "selectBox",

&nbsp;                   "required": false,

&nbsp;                   "label": "Config.additionalSettingsMoreFulfillmentClientLabel",

&nbsp;                   "options": {

&nbsp;                      "tooltip": "Config.additionalSettingsMoreFulfillmentClientTooltip",

&nbsp;                      "defaultValue": "dhl",

&nbsp;                      "selectBoxValues": \[

&nbsp;                         {

&nbsp;                            "value": "dhl",

&nbsp;                            "caption": "Config.fulfillmentDHL"

&nbsp;                         },

&nbsp;                         {

&nbsp;                            "value": "ups",

&nbsp;                            "caption": "Config.fulfillmentUPS"

&nbsp;                         },

&nbsp;                         {

&nbsp;                            "value": "hermes",

&nbsp;                            "caption": "Config.fulfillmentHermes"

&nbsp;                         },

&nbsp;                         {

&nbsp;                            "value": "dpd",

&nbsp;                            "caption": "Config.fulfillmentDPD"

&nbsp;                         }

&nbsp;                      ]

&nbsp;                   }

&nbsp;                }

&nbsp;             }

&nbsp;          }

&nbsp;       }

&nbsp;    }

&nbsp; }

}

```



The key `menu` states whether the following value is interpreted as a menu entry. A menu entry must have a `label` property and can have another `menu` or `formFields` or a `fullWidth` property. With another `menu` property, a new menu level is created. With `fullWidth` set to `true`, the configuration is rendered with 100% width. Default value for `fullWidth` is `false`.



The `formFields` property must be an object containing all the form fields to be shown when clicking on the related menu entry. Every key in this object corresponds to the configuration field's key defined by the plugin. A form field has the following properties:



\- `type`

\- `required`

\- `scss`

\- `label`

\- `options`



If the `scss` property is set to `true`, any scss files contained in the resources/css folder are compiled automatically during plugin build.



The options property can include more properties that are optional, e.g.:



\- `tooltip`

\- `defaultValue`

\- `checkBoxValues`

\- `selectBoxValues`

\- `containerEntries`



The following types are available:



\- `inputFile`

\- `inputText`

\- `inputTextArea`

\- `inputNumber`

\- `inputDouble`

\- `categoryPicker`

\- `colorPicker`

\- `datePicker`

\- `checkBox`

\- `selectBox`

\- `multiCheckBox`

\- `verticalContainer`

\- `horizontalContainer`



Vertical and horizontal containers offer more flexibility for the layout of the configuration view. In a specific menu entry, form fields can be grouped in vertical and horizontal containers. Next to the `label` property the `options.containerEntries` property must be set. The `containerEntries` property contains the form fields that should be grouped in the corresponding container.



\### Password input



You can use an `inputText` for passwords by adding the `isPassword` option.



```json

"type": "inputText",

"options": {

&nbsp;   "isPassword": true

}

```



\### Default values of the picker elements



The various picker elements use the following default values:



\- `categoryPicker`: the id of the proposed category

\- `colorPicker`: the color code in hex format as string, e.g. "#ffffff"

\- `datePicker`: the date in RFC2822 or ISO 8601 date format (with time) as string



\### Accessing plugin options from PhpClass.php



```php

// access configuration from PHP

function getTitle(ConfigRepository $config):string

&nbsp;   {

&nbsp;       if( $config->get('MyPlugin.show\_title') == "1" )

&nbsp;           {

&nbsp;               return $config->get('MyPlugin.title\_text');

&nbsp;                   }

&nbsp;                       else

&nbsp;                   {

&nbsp;               return "";

&nbsp;           }

&nbsp;   }

```



\### Accessing plugin options from Template.twig



```twig

{% if config('MyPlugin.show\_title') == "1" %}

&nbsp;   <h1>{{ config('MyPlugin.title\_text') }}</h1>

{% endif %}

```

