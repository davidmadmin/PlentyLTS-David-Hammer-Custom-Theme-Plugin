\# Defining dropzones for ShopBuilder contents



We added the possibility to compartmentalise ShopBuilder contents into smaller sections that can be edited individually, which we labeled "dropzones". For this purpose, we added the new parameter `$dropzone` to the function `shop\_builder\_category\_template($categoryId, $contentType, $dropzone)`.



The function serves to load ShopBuilder contents for specified categories. The $dropzone parameter is the parameter via which theme developers can label individual sections of the page. Take a look at the example below:



\## Defining dropzones



```

<div class="top">

&nbsp;   {{ shop\_builder\_category\_template(42, "content", "top") }}

</div>



<div class="main">

&nbsp;   {{ shop\_builder\_category\_template(42, "content", "main") }}

</div>



<div class="footer">

&nbsp;   {{ shop\_builder\_category\_template(42, "content", "bottom") }}

</div>

```



\*\*\_Explanation\_\*\*

Here, the theme defines three separate sections , labeled "top", "main" and "footer", respectively. The Twig function takes on the category ID, in this case 42, the type of content, and a unique identifier for each dropzone.



Regardless of the number of dropzones the ShopBuilder content is divided into, the end user of the ShopBuilder is still only editing a single content, which here is split into three separate sections. The developer of the theme can choose freely, in which parts of the template they display these sections.



In the past, static contents were output with the help of layout containers. We added the new Twig function `shop\_builder\_template($containerName, $contentType, $dropzone)`. This function works analogously to the one detailed above. Instead of a category ID, however, the function takes on a layout container as parameter, for instance "Ceres::Header" or "Ceres::Footer".



\## Example of implementing dropzones



In the following example, the user wants to establish 2 dropzones for the ShopBuilder in their theme. The goal is to create 2 dropzones of equal size next to each other. For this, the user's theme extends the `page-design` partial and includes new elements in the page body. The theme sets two dropzones as variables, one for the left column and one for the right column. The content type of both dropzones is specified as \*\*content\*\*.



The layout of the dropzones is controlled by the arrangement of the divs: The row class is used in the enveloping div to determine that both dropzones are to be arranged next to one another. Each dropzone is placed within their own div with a specified column class. The code snippet also includes an if condition.



It is thereby possible to include content around and in between the specified dropzones, for instance by adding another div with the column class between the left and right dropzone. That way, it is possible to construct ShopBuilder pages, in which certain parts can be edited, while other parts remain the same.



```

{% extends getPartial('page-design') %}



{% block PageBody %}



&nbsp;   {% set shopBuilderTemplate = shop\_builder\_category\_template(category.id) %}

&nbsp;   {% set ShopBuilderTemplateSide = shop\_builder\_category\_template(category.id, "content", "side") %}



&nbsp;   {% if shopBuilderTemplate | trim is not empty %}

&nbsp;       <div class="container-max">

&nbsp;           <div class="row">

&nbsp;               <div class="col">

&nbsp;                   {{ shopBuilderTemplate | raw }}

&nbsp;               </div>

&nbsp;               <div class="col">

&nbsp;                   {{ ShopBuilderTemplateSide | raw}}

&nbsp;               </div>

&nbsp;           </div>

&nbsp;       </div>

&nbsp;   {% else %}

&nbsp;       {% include category\_template( category.id, lang, webstoreConfig.webstoreId) ignore missing %}

&nbsp;   {% endif %}

{% endblock %}

```



The image below shows the resulting arrangement of the dropzones in ShopBuilder:



\## Implementing dropzones in the single item view



In plentyShop, the single item page is one single Vue component. In order to make item data accessible from within item widgets, ShopBuilder contents need to be injected into this component using \[\*\*slots\*\*](https://vuejs.org/v2/guide/components-slots.html) instead of inserting them in the component template directly.



In the \[\*\*default plentyShop LTS template for single item views\*\*](https://github.com/plentymarkets/plugin-ceres/blob/stable/resources/views/Item/SingleItemWrapper.twig#L105-L118), the ShopBuilder content is injected as one default slot:



```

<single-item

&nbsp;	...

&nbsp;	v-slot="slotProps">



&nbsp;	{% set currentCategory = services.category.getCurrentCategory() %}

&nbsp;	{{ shop\_builder\_category\_template(currentCategory.id, "singleitem") | raw }}



</single-item>

```



If you want to provide multiple dropzones, you need to inclue \[\*\*named slots\*\*](https://vuejs.org/v2/guide/components-slots.html#Named-Slots), inside the single item component. In the example below, the named slots are `default-dropzone` and `second-dropzone`:



```

<single-item ...>



&nbsp;	{% set currentCategory = services.category.getCurrentCategory() %}



&nbsp;	<template #default-dropzone v-slot="slotProps">

&nbsp;		{{ shop\_builder\_category\_template(currentCategory.id, "singleitem") | raw }}

&nbsp;	</template>



&nbsp;	<template #second-dropzone v-slot="slotProps">

&nbsp;		{{ shop\_builder\_category\_template(currentCategory.id, "singleitem", "second-dropzone") | raw }}

&nbsp;	</template>



</single-item>

```



The `slot-prop` attribute was moved from the `<single-item>` tag to every `<template>` tag!



The provided slots can be used anywhere in the template of the Vue component, but needs to be wrapped in any block element:



```

<script type="x/template" data-component="single-item">

<div>

&nbsp;	<slot :getDataField="getDataField" :getFilteredDataField="getFilteredDataField">

&nbsp;		<div class="single container-max page-content">

&nbsp;			...

&nbsp;			<div>

&nbsp;				<slot name="default-dropzone"></slot>

&nbsp;			</div>



&nbsp;			...

&nbsp;			<article>

&nbsp;				<!-- DON'T: Slots providing a dropzone cannot have any sibling elements! -->

&nbsp;				<p>This is not allowed!</p>

&nbsp;				<slot name="second-dropzone"></slot>

&nbsp;			</article>



&nbsp;			...

&nbsp;			<span class="d-block">

&nbsp;				<!-- DON'T: This will cause errors on item widgets since they cannot access item data even if it might work with static widgets. -->

&nbsp;				{% set currentCategory = services.category.getCurrentCategory() %}

&nbsp;				{{ shop\_builder\_category\_template(currentCategory.id, "singleitem", "third-dropzone") | raw }}

&nbsp;		</div>

&nbsp;	</slot>

</div>

</script>

```



The example above includes two erroneous injections: The `<p>` tag embedded in the `<article>` tag will lead to errors because it is included as a sibling element to the slot that includes a dropzone. In the `<span>` tag below, the dropzone has been injected without using a slot. While this is possible for static widget data, it will lead to errors where dynamic item data is concernerd. You should refrain from using either of these ways of injecting your dropzones!

