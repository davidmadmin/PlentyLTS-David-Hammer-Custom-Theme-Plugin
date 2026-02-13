\# plentyShop plugins → Themes



\## Introduction



plentyShop LTS is a template plugin for the Ceres online store, used to individualise design and layout.



A theme contains at least the following folders and files:



\### Files and folders



```

ExampleTheme/

├── meta/

│   ├── documents/

│   │   └── user\_guide\_en.md // Markdown file containing information on the plugin (optional)

│   └── images/

│       ├── icon\_author\_md.png

│       ├── icon\_author\_sm.png

│       ├── icon\_plugin\_md.png

│       ├── icon\_plugin\_sm.png

│       ├── icon\_plugin\_xs.png

│       └── preview\_0.png // A preview image of the theme

├── resources/

│   ├── css/ // SCSS files

│   │   └── main.scss

│   ├── images/ // Images contained in the theme

│   └── views/ // Contains the theme's Twig templates

│       └── PageDesign/

│           └── PageDesign.twig

├── src/ // PHP source files

├── plugin.json // The plugin.json file

└── config.json // Config entries (optional)

```



\### Templates



\- Basket

\- Basket.twig

\- Cancellation form

\- CancellationForm.twig

\- Category view

\- CategoryView.twig

\- Category/Item

\- CategoryItem

\- Checkout

\- Checkout.twig

\- Guest

\- Guest.twig

\- Homepage

\- HomePage.twig

\- Item list view

\- ItemListView.twig

\- Customer login

\- Login.twig

\- My account

\- MyAccount.twig

\- Order confirmation

\- OrderConfirmation.twig

\- Page design

\- PageDesign.twig

\- Customer registration

\- Register.twig

\- Single item view

\- SingleItem.twig

\- Static pages

\- CancellationRights.twig

\- ItemNotFound.twig

\- LegalDisclosure.twig

\- PageNotFound.twig

\- PrivacyPolicy.twig

\- TermsAndConditions.twig



\## Templates and their components



| Template | Description |

|----------|-------------|

| Basket | The template for the shopping cart of your online store. It can be found in the \*\*Basket\*\* sub-folder. This template includes the following components: • BasketList • BasketTotals • Coupon |

| CancellationForm | The template for the cancellation form of your online store. It can be found in the \*\*Checkout\*\* sub-folder. This template includes the following components: • AddressSelect • Coupon • BasketTotals |

| CategoryItem | The template for the category view of your online store. It can be found in the \*\*Category/Item\*\* sub-folder. |

| Checkout | The template for the checkout of your online store. It can be found in the \*\*Checkout\*\* sub-folder. This template includes the following components: • AddressSelect • PaymentProviderSelect • ShippingProfileSelect • PlaceOrder • Coupon • BasketList • BasketTotals |

| Guest | The template for guest orders. It can be found in the \*\*Customer\*\* sub-folder. This template includes the following components: • Registration |

| HomePage | The template for the homepage of your online store. It can be found in the \*\*Homepage\*\* sub-folder. |

| ItemListView | The template for the item list view of your online store. It can be found in the \*\*ItemList\*\* sub-folder. This template includes the following components: • ItemList • ItemsPerPage • ItemListSorting • Pagination • LoadingAnimation |

| Login | The template for customer login. It can be found in the \*\*Customer\*\* sub-folder. |

| MyAccount | The template for the \*\*My Account\*\* page of your online store. It can be found in the \*\*MyAccount\*\* sub-folder. This template includes the following components: • AddressSelect • AccountSettings • OrderHistory • BankDataSelect • OrderDetails |

| OrderConfirmation | The template for the order confirmation page. It can be found in the \*\*Checkout\*\* sub-folder. This template includes the following components: • OrderDetails |

| PageDesign | The general template for your online store. It can be found in the \*\*PageDesign\*\* sub-folder. This template includes the following partials and components • Notifications • BasketPreview • Login • Registration • AddItemToBasketOverlay • Head • Header • Footer |

| Register | The template for customer registration. It can be found in the \*\*Customer\*\* sub-folder. This template includes the following components: • Registration |

| SingleItem | The template for the single item view of your online store. It can be found in the \*\*SingleItem\*\* sub-folder. This template includes the following components: • VariationSelect • VariationImageList • AddItemToBasket |

| CancellationRights | The cancellation rights of your online store. It can be found in the \*\*StaticPages\*\* sub-folder. |

| ItemNotFound | The \*\*Item not found\*\* page of your online store. It can be found in the \*\*StaticPages\*\* sub-folder. |

| LegalDisclosure | The legal disclosure of your online store. It can be found in the \*\*StaticPages\*\* sub-folder. |

| PageNotFound | The \*\*Page not found\*\* page. It can be found in the \*\*StaticPages\*\* sub-folder. |

| PrivacyPolicy | The privacy policy of your online store. It can be found in the \*\*StaticPages\*\* sub-folder. |

| TermsAndConditions | The general terms and conditions of your online store. It can be found in the \*\*StaticPages\*\* sub-folder. |



\## Updating themes to plentyShop LTS



For the latest major version plentyShop LTS, we reworked the file structure of many components. In the past, components usually consisted of 2 files: a TWIG file and a Javascript file. In order to improve maintainability and performance, these files have mostly been combined into single Vue.js components, which we call single file components, or SFC for short. These changes necessitate adjustments on part of theme developers. In this chapter you will learn which changes have been made to the components and what you need to watch out for when developing themes.



\### Structure of single file components



The components have been redesigned to combine the Twig and JS files into one. Therefore, the single file components now consist of two sections, the \*\*template\*\* section, which contains the content that used to be in the Twig file, and the \*\*script\*\* section, which contains the Javascript part. There are slight changes to how the syntax works for these two sections:



\### Template section of single file components



The interpolation has been changed in the `template` section. Instead of using the dollar sign and curly brackets (e.g. `${ country.currLangName }`), you now need to use double curly brackets instead (e.g. `{{ country.currLangName}}`).



You can no longer use the instance variable `$this` in the component. You can no longer include Twig syntax in the component. If you want to include Twig content, you need to import it as a property. You can no longer access the window.app object like before.



Instead, we added the variable `$ceres` which contains the content of what formerly was the window.app object.



We also added the variable `$translate` to access multilingualism keys via the translation service.



\### Script section of single file components



In the script section, the syntax remains largely the same. There are, however, two exceptions:



In order to access the window.app object in the script section, use the variable `this.$ceres`.



In order to access the translation service in the script section, use `this.$translate`



\### Helper components: Intersect and Lazy Load



We added two helper components that facilitate performance improvements: the intersect component and the lazy load component. Via these helper components, it is possible to equip individual components with lazy loading/lazy mounting.



Using the lazy loading helper component, the embedded component is only loaded when the lazy loaded component enters the visible area in the online store. With the help of the intersect component, the embedded component is always loaded, but is only mounted and rendered when the intersect component enters the visible area in the online store.



Both helper components (\*\*Intersect.vue\*\* and \*\*LazyLoad.vue\*\*) are located in the plentyShop LTS plugin under `ressources/js/app/components/common`.



Below you will find two code snippets, the first of which illustrates the use of the lazy-load component and the second of which illustrates how to use the intersect component.



```html

<lazy-load component="component-to-load">

&nbsp;   <component-to-load>

&nbsp;   </component-to-load>

</lazy-load>

```



```html

<intersect>

&nbsp;   {# content to not load #}

&nbsp;   <category-item></category-item>



&nbsp;   {# display while not loaded / when to load #}

&nbsp;   <template #loading>

&nbsp;       <div class="category-item-placeholder w-100 invisible">

&nbsp;           <a href="{{ Twig.print("item.data | itemURL(buildUrlWithVariationId | json\_encode)") }}" class="small">

&nbsp;               <i class="fa fa-image"></i>

&nbsp;               <span>{{ Twig.print("item.data | itemName") }}</span>

&nbsp;           </a>

&nbsp;       </div>

&nbsp;   </template>

</intersect>

```



Here, the div in the template section includes a placeholder that is visible while the component is not yet visible.



\### Overwriting single file components



If you want to overwrite plentyShop LTS single file components, there are two ways you could go about. One is to individually overwrite the component whenever it is called upon. This gives you more flexibility when it comes to which instance of a component you want to override. The other method is to overwrite a component globally, so that every instance of the component will be replaced by your content.



Take a look at how individual components can be overridden:



```html

<category-item template-override="#other-comp"></category-item>

```



Here, the `template-override` property determines that the current component `<category-item>` is overridden by another component, which here is indicated with the placeholde #other-comp.



For overwriting components globally for the entire online store, you need to set the type of the script tag as "x/template", specify which component you want to overwrite in the `data-component` property and include your content in the script tags. Take a look at the example below:



```html

<script type="x/template" data-component="basket-preview">

&nbsp;   <div>

&nbsp;       ${  }

&nbsp;   </div>

</script>

```

