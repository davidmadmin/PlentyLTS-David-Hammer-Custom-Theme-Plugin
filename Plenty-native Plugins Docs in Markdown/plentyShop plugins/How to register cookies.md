\# plentyShop plugins → How to register cookies



\## Cookies in plentyShop LTS



The plentyShop LTS consent tool allows customers to decide which cookies they want to accept in your online store. To do this, you have to register new cookies as consents. Cookies can either be grouped with each other or be declared as ungrouped.



\### Necessity



In many countries, the use of cookies on websites is subject to certain legal obligations. In Germany, for example, these obligations are set out in the Telemedia Act (Telemediengesetz, TMG). Website operators are usually obliged to inform users about which cookies they use and to obtain their consent for the use of non-essential cookies.



In some cases, it is also necessary to obtain the consent of the user before the cookie is actually set. Here, too, we aim to provide all technical means to meet these requirements.



\### Data protection



For the cookies we register, we can specify which data they store and collect, how long this data is stored, and to which providers it is transmitted. This information is necessary so that users can make informed decisions about which cookies they want to accept.



\## Registering cookies



To register a cookie, you have to use the \*\*ConsentRepositoryContract\*\*. You can register consents and consent groups in the boot method of the ServiceProvider of your plugin. Have a look at our example:



```php

public function boot(Twig $twig, Dispatcher $eventDispatcher)

{

&nbsp;   /\*\* @var ConsentRepositoryContract $consentRepository \*/

&nbsp;   $consentRepository = pluginApp(ConsentRepositoryContract::class);

&nbsp;   

&nbsp;   $consentRepository->registerConsent(

&nbsp;       'googleAnalytics',

&nbsp;       'GoogleAnalytics::GoogleAnalytics.consentLabel',

&nbsp;       \[

&nbsp;           'description' => 'GoogleAnalytics::GoogleAnalytics.consentDescription',

&nbsp;           'provider' => 'GoogleAnalytics::GoogleAnalytics.consentProvider',

&nbsp;           'lifespan' => 'GoogleAnalytics::GoogleAnalytics.consentLifespan',

&nbsp;           'policyUrl' => 'GoogleAnalytics::GoogleAnalytics.consentPolicyUrl',

&nbsp;           'group' => 'tracking',

&nbsp;           'necessary' => false,

&nbsp;           'isOptOut' => false,

&nbsp;           'cookieNames' => \['\_ga', '\_gid', '\_gat']

&nbsp;       ]

&nbsp;   );

}

```



\### Registering consent groups



To register a consent group, you have to use the \*\*registerConsentGroup()\*\* function of the ConsentRepositoryContract. The function takes the following parameters:



| Parameter | Description |

|-----------|-------------|

| key | A string that identifies the consent group and is used as a reference for its member consents. |

| label | A string that contains the heading of the consent group. |

| description | A string that contains the description of the consent group. |

| necessary | A boolean that, if set to true, marks the whole consent group as necessary. |

| position | This option is a number which serves to sort multiple consent groups according to the numerical values stored here. |



\### Registering individual cookies



To register an individual cookie, you have to use the \*\*registerConsent()\*\* function of the ConsentRepositoryContract. The function takes the following parameters:



| Parameter | Description |

|-----------|-------------|

| key | A string that identifies the cookie and is used as a reference. |

| label | A string that contains the heading of the consent. |

| description | A string that contains the description of the consent. |

| necessary | A boolean that, if set to true, marks the cookie as necessary. |

| cookieNames | An array of strings that contains the actual names of the cookies that are stored in the browser. |

| position | This option is a number which serves to sort multiple consents according to the numerical values stored here. |

| provider | A string that contains the cookie's provider. |

| lifespan | A string that informs users about how long the cookie is stored. |

| policyUrl | A string that contains the URL to an external privacy policy. |

| group | A string that contains the consent group this cookie is part of. |

| isOptOut | A boolean that, if set to true, consents to the use of the cookie by default. |



\## Checking for user consent



The consent repository contract provides multiple functions via which you can assess the status of consents and consent groups. These are:



| Function | Description |

|----------|-------------|

| getConsentGroups() | This function gets all available consent groups, including all individual consents within, and returns them as a collection. |

| hasResponse() | This function returns a boolean that indicates whether or not a user has previously agreed or denied any cookie on the website. |

| setResponse($key, $isConsented = false) | This function sets the response for a consent or a group of consents. The `$key` parameter takes on the identifying key of the consent group and the consent you want to set, e.g. "group.consent". Use "ungrouped.consent" for consents that are not part of a consent group. You can check all consents of a group at once by using \*\*as the key, e.g. \*\*`group.\*`. The `$isConsented` parameter is a boolean that is true if the user has accepted the referenced consent or group of consents. |

| isConsented($key) | This functions assesses whether the user has accepted a particular consent or group of consents, returning a boolean. The `$key` parameter takes on the identifying key of the consent group and the consent you want to set, e.g. "group.consent". Use "ungrouped.consent" for consents that are not part of a consent group. You can check all consents of a group at once by using \*\*as the key, e.g. \*\*`group.\*`. |



\## Cookies registered in plentyShop LTS



In plentyShop LTS, we have already established 4 groups of consents, the unique key of which are \*\*necessary\*\*, \*\*tracking\*\*, \*\*marketing\*\* and \*\*media\*\*. The necessary group contains three registered consents: The consent cookie, which stores which cookies the user consented to, the session cookie, which contains information regarding the user's behaviour on the website, and the CSRF cookie, which protects the website from cross-site request forgery attacks. Users cannot decline these consents, since they are declared as necessary, i.e. they are essential in ensuring smooth operation of the online store.



The consent group \*\*tracking\*\* contains cookies that pertain to statistics and website use. GoogleAnalytics, for instance, would be registered in this group of consents.



The consent group \*\*marketing\*\* contains cookies that help taylor the user's online experience to their tastes, for instance by providing the user with customised advertisements. plentyShop LTS does not register any marketing cookies out of the box.



The \*\*media\*\* consent group serves to display contents by external media, such as Vimeo links. plentyShop LTS registers the GoogleMaps cookie in this consent group.



\## Loading scripts after cookie consent



If you are a plugin developer that wants to register cookies with the consent interface, it is important that you change the script type from \*\*"text/javascript"\*\* to \*\*"text/plain"\*\*. Additionally, you will have to specify the attribute `data-cookie-consent` in the script tag, including the corresponding cookie. That way, the script is loaded automatically as soon as the visitor consents to the cookie. Have a look at how this has been implemented in the GoogleAnalytics plugin:



```html

<script type="text/plain" data-cookie-consent="{{ config('GoogleAnalytics.consentGroup') }}.googleAnalytics">

```



\## Registering the GoogleAnalytics cookie in your theme



(This section was updated on 6 May 2021 to account for the added callback function. However, the former way of registering cookies is still functional.) If you are using plentyShop LTS in combination with a theme plugin and have integrated the functionality for the GoogleAnalytics cookie plugin within your own theme, you will have to make a few adjustments, so that you can continue using your theme in combination with the consent interface provided by plentyShop LTS. The easiest way is to register a GoogleAnalytics cookie in the service provider of your plugin, which you can see in the example below. Note that the all of the values are required.



```php

public function register()

{

&nbsp;   /\*\* @var ConsentRepositoryContract $consentRepository \*/

&nbsp;   $consentRepository = pluginApp(ConsentRepositoryContract::class);

&nbsp;   $consentRepository->registerConsent(

&nbsp;       'googleAnalytics',

&nbsp;       'GoogleAnalytics::MyThemePlugin.consentLabel',

&nbsp;       function() {

&nbsp;           /\*\* @var ConfigRepository $config \*/

&nbsp;           $config = pluginApp(ConfigRepository::class);

&nbsp;           return  \[

&nbsp;               'description' => 'GoogleAnalytics::GoogleAnalytics.consentDescription',

&nbsp;               'provider' => 'GoogleAnalytics::GoogleAnalytics.consentProvider',

&nbsp;               'lifespan' => 'GoogleAnalytics::GoogleAnalytics.consentLifespan',

&nbsp;               'policyUrl' => 'GoogleAnalytics::GoogleAnalytics.consentPolicyUrl',

&nbsp;               'group' => $config->get('GoogleAnalytics.consentGroup', 'tracking'),

&nbsp;               'necessary' => $config->get('GoogleAnalytics.consentNecessary') === 'true',

&nbsp;               'isOptOut' => $config->get('GoogleAnalytics.consentOptOut') === 'true',

&nbsp;               'cookieNames' => \['\_ga', '\_gid', '\_gat']

&nbsp;           ];

&nbsp;       }

&nbsp;   );

}

```



\*\*Explanation:\*\* Here, the function registers a GoogleAnalytics cookie with the ConsentRepositoryContract. The values for description, provider, etc. are keys taken from .properties file of your plugin, so that these values can be multilingual. However, it is possible to specify these as strings. The key \*\*cookieNames\*\* contains the names of the three GoogleAnalytics cookies necessary to maintain tracking functionality. It is important that these names are correct. Make sure to replace "MyThemePlugin" with the name of your theme.



\## Summary: Using the consent tool in the online store



The consent solution for plentyShop sits at the intersection of multiple moving parts that need to interact in order to provide the full functionality. There are three basic components:



The first is the central data management via the system-internal interface. PlentyONE provides interfaces via the plugin API that serve to store cookies and their descriptions, as has been outlined above. Initially, registering cookies via this interface has no effects. For processing or evaluating the data in the online store, the Twig function `get\_consent\_scripts()` provides a script, which can be integrated into the online store template. You can use the function parameter to determine whether unaccepted cookies should be blocked or not. Blocking cookies automatically works, so that external plugins or code snippets (e.g. by tracking providers) do not need to be adjusted.



The second component is the display in the online shop. Registered entries can be displayed in the online store via the ShopBuilder cookie bar widget or via third party plugins, such as the \*\*CookieBar\*\*. Once displayed in the online store, users can use the tool to manage their cookies. For this purpose, plugins can gather all information about cookies that have been registered in the system via corresponding interfaces and display this information accordingly.



The third component is the execution of scripts that require cookies in order to function properly. If cookies are blocked by the system, errors may occur for scripts that are executed before the user has accepted the necessary cookies. Plugins that integrate scripts in the online store have the possibility to only execute them after the cookies have been accepted. In contrast to blocked cookies, you have to adjust the corresponding plugins. We described the process above.



\## Using Google Analytics for tracking



Google Analytics uses cookies to identify a visitor during their time in the online store. If this cookie is blocked, all page accesses will be interpreted as individual user sessions, since it is no longer possible to assign the visitor to the accesses over multiple pages. That is why the script that submits data to Google Analytics is only executed after the user has given their consent, as long as the setting \*\*Block unaccepted cookies\*\* is active. In this case, no tracking data is submitted to Google until the user accepts the cookie.



If the setting \*\*Block unaccepted cookies\*\* is inactive, the script is executed upon page access and regardless of the user's consent. This distinction of cases is integrated into the Google Analytics plugin. If the GA tracking code is integrated into the system via a custom theme plugin or another third party plugin, the correct evaluation of the script at this point has to be verified.

