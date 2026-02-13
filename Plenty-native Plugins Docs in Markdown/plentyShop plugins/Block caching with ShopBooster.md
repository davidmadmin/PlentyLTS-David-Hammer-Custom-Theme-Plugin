\# Block caching with ShopBooster 3.0



With ShopBooster 3.0 you can wrap individual parts of a page in smaller blocks that will be cached independently from each other. This makes it possible to reuse these blocks on other pages. If a block is invalidated on one page, it also invalidates the same block on other pages.



\## Mark cache blocks



The ShopBooster provides a new Twig tag called `cacheblock` to wrap these cache blocks in your templates:



```twig

<div>

&nbsp;   {% cacheblock %}

&nbsp;       <header>...</header>

&nbsp;   {% endcacheblock %}



&nbsp;   <hr>



&nbsp;   {% cacheblock %}

&nbsp;       <footer>...</footer>

&nbsp;   {% endcacheblock %}

</div>

```



Each cache block will internally be identified by its contained Twig markup. So using the exact same markup in different places will produce the same block.



\## Automatically assign tags depending on used variables



PlentyONE will add tags automatically when accessing related data. When loading the category tree, for example, PlentyONE will internally add corresponding tags. Because some of these data are loaded globally in the context classes of your template, you do not want these tags to be added in the moment the data are loaded, but when the data are used inside of a Twig template. To do so, you can create a taggable variable in your context class:



```php

class MyContext implements ContextInterface

{

&nbsp; public function init($params)

&nbsp; {

&nbsp;   /\*\* @var CacheTagRepositoryContract $cacheTagRepository \*/

&nbsp;   $cacheTagRepository = pluginApp(CacheTagRepositoryContract::class);



&nbsp;   /\*\* @var CategoryService $categoryService \*/

&nbsp;   $categoryService = pluginApp(CategoryService::class);



&nbsp;   // ...



&nbsp;   $this->categories = $cacheTagRepository->makeTaggable('categories', function() use ($categoryService) {

&nbsp;     // tags added inside "getNavigationTree()" will not be added right now but when accessing "categories" in any twig template

&nbsp;     return $categoryService->getNavigationTree();

&nbsp;   }, "DATATYPE");

&nbsp; }

}

```



For "Datatype", you should include the parameter "item" as a string if you want to make a variable taggable that includes any item data. Currently, "item" is the only datatype the ShopBooster uses as a parameter. If the variable you want to make taggable does not include item data, you can omit the datatype parameter.



```twig

<div>

&nbsp; {% cacheblock %}

&nbsp;   {# accessing "categories" will add all related tags to the surrounding cache block #}

&nbsp;   {% for category in categories %}

&nbsp;     {{ category.id }}

&nbsp;   {% endfor %}

&nbsp; {% endcacheblock %}

</div>

```



\## Pass tags from the parent context to cache blocks



Internally, cache tags are assigned if related data are accessed, e.g. the plugin config. In most cases, this happens in a very early stage, e.g. when resolving the controller or the context data. In these cases, the cache tags are assigned to the page document. But the related data can also affect the content of a cache block; this means you want to refresh the block content if the related data has changed. To do so, you can pass cache tags from the outer context, e.g. the page document, to a cache block:



```twig

{% cacheblock use "pluginConfig" %}

&nbsp; // template of the block accesses some plugin configurations

{% endcacheblock %}

```



All tags starting with "pluginConfig" will be passed from the page document to the cache block document. Therefore, invalidating cache entries by the tag "pluginConfig" will affect the page document and the cache block.



\### Pass multiple tags to cache blocks



You can pass multiple tags separated by a `,`. You can pass static strings, variables, or methods returning a tag. It is also possible to pass variables or methods returning an array of tags to be passed to the cache block:



```twig

{% variationTag = "variation.123" %}

{% cacheblock use "pluginConfig", variationTag, services.category.getCurrentCategory().id == 42 ? 'variation.456' : '' %}

&nbsp; // ...

{% endcacheblock %}

```



\## Using the plentyShop LTS cache blocks in your own theme



In this section you will learn how to integrate the cache blocks of default plentyShops in your custom themes. The plentyShop LTS cache blocks are only of interest to you if your theme overwrites the \*\*PageDesign.twig\*\*. If you are using the default PageDesign, you don't need to make any additional adjustments to use the LTS cache blocks.



The plentyShop LTS page design designates 2 seperate cache blocks: the \*\*Header\*\* and the \*\*Footer\*\* blocks. Once these two parts of the page design are defined as cache blocks, a third block consisting of the body emerges automatically. However, the body is not distinctly marked as a cache block.



\### Footer



The integration of the plentyShop LTS footer is quite simple. In the \*\*PageDesign.Twig\*\* of plentyShop LTS, you can find cache block directive for the footer in line 71:



```twig

{% cacheblock %}

&nbsp;       {% include getPartial('footer') %}

&nbsp;       {% block PartialFooter %}{% endblock %}

{% endcacheblock %}

```



Of course, you might need to change the name of the partial to which your refer here, depending on how your theme is structured. The `cacheblock` directive suffices to desigante the footer as an individual cache block.



\### Header



The integration of the header cache block is similar to the footer block outlined above. However, there is an additional tag that you need to add to the cache block directive. Have a look at how the header cache block is included in the \*\*page design of plentyshop LTS\*\*.



```twig

{% cacheblock use "category.tree" %}

&nbsp;   {% set headerContainer = LayoutContainer.show("Ceres::Header") | trim %}

&nbsp;   {% if headerContainer is empty %}

&nbsp;       {% include "Ceres::PageDesign.Partials.Header.DefaultHeader" %}

&nbsp;   {% else %}

&nbsp;   <header id="page-header">

&nbsp;       <div class="container-max">

&nbsp;           <div class="row flex-row-reverse position-relative">

&nbsp;               <div id="page-header-parent" class="col-12 header-container" data-header-offset>

&nbsp;                   {{ headerContainer | raw }}

&nbsp;               </div>

&nbsp;           </div>

&nbsp;       </div>

&nbsp;   </header>

&nbsp;   {% endif %}

{% endcacheblock %}

```



Again, your header partial is referenced between the `{% cacheblock %}` and `{% endcacheblock %}` tags. Notice how the opening tag also includes the directive `use "category.tree"`. This states that the header cache block is to be tagged with the type category tree.



This is necessary because the PlentyONE blog plugin might interfere otherwise. The blog could potentially provide a second header that includes only blog categories in its navigation. This means that, depending on what was accessed and thereby written into the cache first, the plentyShop navigation in the header could only display blog categories and vice versa.



To preclude this behaviour, be sure to add the `use "category.tree"` to the cache block directive.



\### Context classes



Of course, overwriting the page design template in plentyShop LTS is not the only adjustment to a theme that could be relevant for cache blocks.



plentyShop LTS includes 3 context classes that use the cache tag repository and are necessary for the proper functioning of cache blocks in your plentyShop:



\- \*\*GlobalContext\*\*

\- \*\*ItemListContext\*\*

\- \*\*BlogContext\*\*



If you overwrite any of these context classes, be sure to wrap the call of the category tree into the `makeTaggable` directive. The links above redirect directly to the relevant line within the context classes.

