\# Vue Server-Side Rendering in plentyShop



\## Server-Side Rendering



In this chapter, you will learn about Server-Side Rendering in plentyShop and how to use SSR in your theme or plugin.



\### What is SSR?



Server-Side Rendering (SSR) is a way to prepare the markup before it is sent to your client's browser. With SSR enabled, page content is generated and served from the server instead of being assembled by Javascript in the client's browser.



\### Benefits of SSR



One of the main benefits of using SSR is performance. Because the HTML contents arrive as they appear on the page, search engine bots can easily crawl and index the page for improved SEO. SSR is also beneficial for users who don't have Javascript available on their system or chose to disable it.



\### Resources



As a first step, we recommend taking a look at the \[Vue SSR documentation](https://ssr.vuejs.org) to get familiar with the process.



You should also read the content provided by Google about \[Dynamic Rendering](https://developers.google.com/search/docs/guides/dynamic-rendering), the term they are using for SSR, and why \[search engines sometimes can't see Javascript](https://developers.google.com/search/docs/guides/javascript-seo-basics).



\### Preparing your plugin for SSR



If you are developing a third party plugin or theme and want to support SSR you need to make sure that your code meets the requirements listed in the checklist section below.



\*\*Important\*\*: When using SSR, the markup initially rendered on the server should match with the markup of the application after it is rendered on the client. Otherwise, you may get a hydration error and the whole page needs to be re-rendered on the client. One of the main sources of mismatches in the plugin codebase is server side and client side code accessing browser-related APIs, such as document or window. If possible, you should access these APIs only in beforeMount, mounted, or onMounted hooks (depending on whether you're using Options API or Composition API). More information on that topic can be found in the \[Vue documentation](https://ssr.vuejs.org/guide/universal.html#access-to-platform-specific-apis).



\## SSR Directives



As a prerequisite for working with SSR, you need to understand and use the plentyShop SSR directives. SSR directives take the form of Twig comments and must always come in pairs, i.e. there must be an opening and a closing directive. You need to add these directives to your theme, so that the SSR library knows which parts of your templates should be rendered, which scripts need to be loaded and how the content is to be rendered. The specific directives are further described in the subsections. Below you can find a more general description of how SSR directives work with plentyShop.



\### Registering templates



The `SSR:app` directive signifies the boundaries of your Vue application. The SSR library takes all contents between the opening and closing SSR:app directive and uses this as the template for rendering. This means that you need to place your `\&lt;div id="vue-app"\&gt;` element and anything within it between the SSR:app directives.



In plentyShop LTS, the SSR:app directive is placed in the `PageDesign.twig` template, which contains the body of all plentyShop LTS pages:



```twig

\&lt;!-- SSR:app() --\&gt;

\&lt;div id="vue-app"\&gt;

&nbsp;   {% include getPartial('header') %}

&nbsp;   {% include getPartial('page-design') %}

&nbsp;   {% include getPartial('footer') %}

\&lt;/div\&gt;

\&lt;!-- /SSR --\&gt;

```



Important: SSR directives must not be nested.



\### Registering entry scripts



The `SSR:entry` directive denotes the entry scripts of your application. SSR library requires at least one `SSR:entry` directive to be present in your templates. In plentyShop LTS, the directive is also placed in the `PageDesign.twig` file, directly after the closing SSR:app directive:



```twig

\&lt;!-- SSR:entry({{ urls.jsBundles }}) --\&gt;

{% for scriptUrl in urls.jsBundles %}

&nbsp;   \&lt;script src="{{ scriptUrl }}"\&gt;\&lt;/script\&gt;

{% endfor %}

\&lt;!-- /SSR --\&gt;

```



Important: The path must point to the absolute file path, which means that you cannot use relative paths (such as `./resources/js/...`) but need to use absolute URL paths (such as `https://cdn02.plentymarkets.com/...`). The `urls.jsBundles` object automatically provides the fully qualified URL to the script bundle.



\### Registering global variables



The `SSR:globals` directive registers global variables and makes them available to the SSR process. These are basically all variables you need for server-side rendering and the data you provide via `App.config`.



In plentyShop LTS, the SSR:globals directive is also placed in the `PageDesign.twig` template. The directive contains all the data from the `TemplateContainer` object, encoded as JSON, in addition to all data defined with `App.config`:



```twig

\&lt;!-- SSR:globals({{ TemplateContainer.getContext() | json\_encode | raw }}) --\&gt;

\&lt;script\&gt;

&nbsp;   App = {

&nbsp;       config: {{ ceresConfig | json\_encode | raw }},

&nbsp;       urls: {{ urls | json\_encode | raw }},

&nbsp;       // ...

&nbsp;   };

\&lt;/script\&gt;

\&lt;!-- /SSR --\&gt;

```



\## Improving page performance with preload



In this section, we will demonstrate how to improve page performance in plentyShop LTS with the preload option using an image widget as an example. The concept detailed in this section can also be transferred to other resources that you want to prioritize loading, such as scripts, fonts, CSS, etc.



To improve the loading times of your pages, you can preload resources. For the purpose of this guide, we will use an image as an example. Preloading improves \*\*Largest Contentful Paint\*\* (LCP) times, a metric that is especially important for SEO. Generally, preload should only be used for resources that are important for the initial page load.



\### Implementing PHP code



In order to add preload to a widget, you need to edit the widget's PHP class. First, you need to add a new setting as part of the `getSettings()` function. In the following example, this is a checkbox setting:



```php

createCheckbox("preloadImage")

&nbsp;   -\&gt;withName("Widget.preloadImageLabel")

&nbsp;   -\&gt;withTooltip("Widget.preloadImageTooltip")

```



As you can see, the function has a name and a tooltip but unlike most other settings, no default value. This means the checkbox is deactivated by default and only selected images are loaded if lazy loading is not active. The setting includes all the usual suspects: the interactive element, the title, and the tooltip.



\### Implementing Twig code



After you've added the setting to the PHP class, it is time to add the relevant Twig code to the widget. First, make sure to access the settings you just added:



```twig

{% set preloadImage     = widget.settings.preloadImage.mobile %}

```



In a next step, it is important that you set the URL of the image with `Twig.set` in the Twig builder because you will need the image URL in the subsequent step.



```twig

{{ Twig.set("imageUrl", "" | json\_encode) }}

```



Finally, add a conditional if construction and use `Twig.print` to hand over the image URL you set before. While most image formats are automatically recognized as the \*\*image type\*\* (namely PNG, JPG, JPEG, WEBP, and GIF), you should still include `'image'` in case another format is used.



```twig

{% if preloadImage %}

&nbsp;   {{ Twig.print("add\_asset(imageUrl,'image')") }}

{% endif %}

```



And that's it. If you would like to take a look at how team plentyShop implemented preloading in their widgets, feel free to check out the open source code of the \[\*\*background image widget\*\*](https://github.com/plentymarkets/plugin-ceres/pull/2802/files#diff-bd9967b42e5604fbd1cc0034b2ed9fbc4bb18113880fe371167076f046aee956), \[\*\*image box widget\*\*](https://github.com/plentymarkets/plugin-ceres/pull/2802/files#diff-9f438954b9f177761379a8b382eea014077ec743060583796ac4f9aaed3d3003) (which was used as the basis of this guide), or the \[\*\*image carousel widget\*\*](https://github.com/plentymarkets/plugin-ceres/pull/2802/files#diff-43b0576fe9cb61d0343a4aa220f562347c237717821f276ab632973e3970ec96).



\## SSR Troubleshooting



In this section, we will look at a number of common problems, which can appear in combination with Server-side Rendering, and how to solve them.



\### How can I check if a page was successfully rendered on the server?



For this, you should inspect the source code of the page before it is processed by Javascript. To do that, open the source code of the page in the browser or disable the execution of Javascript. Now the structure of the document should look like this:



```html

\&lt;html\&gt;

&nbsp; \&lt;head\&gt;...\&lt;/head\&gt;

&nbsp; \&lt;body\&gt;

&nbsp;   \&lt;div id="vue-app"\&gt;

&nbsp;     Serverside rendered markup

&nbsp;   \&lt;/div\&gt;

&nbsp;   \&lt;script id="ssr-script-container"\&gt;

&nbsp;     \&lt;div id="vue-app"\&gt;

&nbsp;       Raw markup before rendering

&nbsp;     \&lt;/div\&gt;

&nbsp;   \&lt;/script\&gt;

&nbsp; \&lt;/body\&gt;

\&lt;/html\&gt;

```



Make sure to inspect the markup above the `ssr-script-container` and not its contents because it contains the markup of your app before it is rendered. This content is used by the browser to render the app again and apply dynamic functions to the server-side rendered markup. This process is called \*\*hydration\*\*.



\### Server-side errors



These errors may occur while rendering your Vue.js application on the server. In preview mode they will be forwarded to the browser; in productive mode, they are only written to the log and the frontend will fall back to client-side rendering.



\### No app factory provided



There is no Javascript that exports a `createApp()` function. By default, this is done by the ceres-server.js from the plentyShop LTS plugin.



You should check if:



`\&lt;!-- SSR:entry(…) -→` is included anywhere in your template (by default, this is placed in PageDesign.twig).



If you provide your own Javascript bundles, make sure it exports a `createApp()` function in the „commonjs2" 3 format.



\### Directive not closed correctly: Found ‚SSR:abc()' before closing ‚SSR:xyz()'.



The SSR directives could not be parsed correctly. The parser detects a directive before the previous one was closed with `\&lt;!-- /SSR -→`.



You should check if:



\- All directives are closed correctly.

\- Directives are not nested. Consider imported Twig templates here as well.



\### Cannot load module: path/to/script.js



Your Javascript is trying to import an external script that doesn't exist on the server.



You should check if:



\- The imported file is located in your plugin directory.

\- The importedf file is not excluded for the upload to your PlentyONE system, e.g. in the node\_modules directory.



\### TypeError: Cannot read property ‚globals' of undefined



The rendering process cannot read a registered entry module correctly.



You should check if:



\- All modules registered via `\&lt;!-- SSR:entry() -→` exist and do not contain any syntax errors.

\- All registered modules are using the format commonjs2 1.



\### Error creating app



An error occured while importing all registered scripts. This happens before the rendering of your components (see „Error compiling template"). See appended error message and the logs for details.



\### Error compiling template



An error occured while compiling the contents of the vue-app element. See appended error message and the logs for details.



\### Vue SSR is not available



The required resources are not available on your server. Please contact us in the forum.



\### Client-side errors



These errors occur in the client after rendering the Vue.js application on the server successfully. They are logged to the Javascript console in the developer tools of your browser.



\### The client-side rendered virtual DOM tree is not matching server-rendered content.



When providing server-side rendered markup, Vue.js renders the app again in the client/browser and tries to inject interactive parts of the application into the server-side rendered markup. To do this, the markup that is provided by the server needs to match to the rendered markup of the client. Otherwise, Vue has to do a full client-side render so the application is still usable, but there is no benefit in the performance anymore. Normally this error appears together with a warning that includes the list of DOM elements provided by the server and the list of virtual nodes created by Vue.js while rendering the application in the client.



You should check if:



\- You have conditional elements with `v-if` or `v-for` that are handled in different ways on the server or on the client.

\- You are injecting asynchronous components into a slot. There is a bug in Vue.js that leads to asynchronous components (not loaded by the main Javascript bundle but in separate chunks) producing hydration errors when the are placed into slots. The recommended workaround is to wrap the component in any HTML tag:



Instead of using this:



```vue

\&lt;template #before-price\&gt;

&nbsp; \&lt;my-async-component\&gt;\&lt;/my-async-component\&gt;

\&lt;/template\&gt;

```



you can try wrapping it like this:



```vue

\&lt;template #before-price\&gt;

&nbsp; \&lt;div\&gt;\&lt;my-async-component\&gt;\&lt;/my-async-component\&gt;\&lt;/div\&gt;

\&lt;/template\&gt;

```



\## Checklist



If you are a developer implementing SSR in a theme or plugin, you should go through the checklist below and make sure your code checks all the boxes. The most common SSR errors arise if one of the following guidelines is not adhered to:



\- \[ ] Have you added the necessary SSR directives outlined \[\*\*above\*\*](https://developers.plentymarkets.com/en-gb/developers/main/plentyshop-plugins/ceres-SSR.html#ssr-directives)?

\- \[ ] Did you make sure you only included markup and no logic in the `created()` hook, as specified in the \[\*\*Vue documentation\*\*](https://ssr.vuejs.org/guide/universal.html#component-lifecycle-hooks)?

\- \[ ] Are all of your HTML tags closed properly?

\- \[ ] Did you make sure that your HTML code is valid?

\- \[ ] Does the code run without any SSR errors in the log?

