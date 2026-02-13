\# How to migrate from the splitView



\## Introduction



Since the inception of the new angular backend, the splitView has been the go-to solution when we needed a way to facilitate navigation between a number of related views. Over time, this way of navigation handling has become bloated and increasingly difficult to implement and maintain. With the new angular based routing we created a lightweight and easy to implement solution to replace it. This guide will provide you with step-by-step instructions on replacing old splitView routing with our new angular routing solution. To do so, you need the Terra-Components version 3.0.0 or higher.



\## Further reading



\- \[\*\*My first Angular plugin tutorial\*\*](https://developers.plentymarkets.com/tutorials/angular-plugin)

\- \[\*\*Provide an Angular UI for a plugin tutorial\*\*](https://developers.plentymarkets.com/tutorials/angular-ui)



\## Step by step to angular routing



1\. As a first step, we take a look at the routing config. Since there are no routes available to lead us past the overview (filter table) yet, we need to define additional routes for those views previously reachable through the splitView. Create a new file \*.routing.ts (next to your module and/or entry component) which exports a constant defining all the routes and register those routes by assigning it to the children property of the base route of your UI. In the permissions object, leave the policy property as empty string to make the route only visible to admin users. If `isStatic:true` is set, the route is visible to every user. Set a policy string to make the route only visible for a specific policy.



```

{

&nbsp;       path:        'settings/properties/configuration',

&nbsp;       component:   PropertiesComponent,

&nbsp;       data:        {

&nbsp;          permissions: {

&nbsp;           policy: ''

&nbsp;       },

&nbsp;          label:       'properties.configuration',

&nbsp;          isHidden:    true

&nbsp;       },

&nbsp;       children: propertyConfigurationRoutes,

&nbsp;       canActivate: GUARDS

},

```



```

export const propertyConfigurationRoutes:TerraRoutes = \[

&nbsp;  {

&nbsp;      path:       '',

&nbsp;      pathMatch:  'full',

&nbsp;      redirectTo: 'overview',

&nbsp;      data:       {

&nbsp;          label:       'properties.modules.filters',

&nbsp;          permissions: {

&nbsp;              isStatic:  true

&nbsp;          },

&nbsp;          isHidden:    true

&nbsp;      }

&nbsp;  },

&nbsp;  {

&nbsp;      path:      'overview',

&nbsp;      component: PropertiesOverviewComponent,

&nbsp;      data:      {

&nbsp;          label:       'properties.modules.table',

&nbsp;          permissions: {

&nbsp;               policy: ''

&nbsp;          },

&nbsp;          isHidden:    true

&nbsp;      }

&nbsp;  },

&nbsp;  {

&nbsp;      path:      'overview/new',

&nbsp;      component: PropertiesAddViewComponent,

&nbsp;      data:      {

&nbsp;          label:       'properties.modules.createProperty',

&nbsp;          permissions: {

&nbsp;               policy: ''

&nbsp;          },

&nbsp;          isHidden:    true

&nbsp;      },

&nbsp;      resolve: {

&nbsp;          destinations: PropertyDestinationsResolver

&nbsp;      }

&nbsp;  },

&nbsp;  {

&nbsp;      path:       'overview/:propertyId',

&nbsp;      pathMatch:  'full',

&nbsp;      redirectTo: 'overview/:propertyId/general',

&nbsp;      data:       {

&nbsp;          label:       (translation:TranslationService, params:Params, data:Data):string =>

&nbsp;                       {

&nbsp;                           let lang:string = localStorage.getItem('plentymarkets\_lang\_');

&nbsp;                           return SystemPropertyHelper.getPropertyNameWithId(data.property as PropertyInterface, lang);

&nbsp;                       },

&nbsp;          permissions: {

&nbsp;               policy: ''

&nbsp;          },

&nbsp;          isHidden:    true

&nbsp;      },

&nbsp;      resolve:    {

&nbsp;          property: PropertyResolver

&nbsp;      }

&nbsp;  }

```



2\. For our 'entry-point' or base route, we adjust the entry component so that it holds our breadcrumbs and router-outlet, e.g. `properties.component.html`.



```

&nbsp;   <terra-breadcrumbs></terra-breadcrumbs>

&nbsp;   <div class="outlet-container">

&nbsp;      <router-outlet></router-outlet>

&nbsp;   </div>

```



For more information about the router-outlet see \[\*\*this page\*\*](https://angular.io/api/router/RouterOutlet).



3\. Instead of directly routing to the old components, we create some new view-components which take care of things like asynchronous data loading, breadcrumbs handling and routing.



\*\*What is async?\*\*



For more information see \[\*\*this page\*\*](https://angular.io/api/common/AsyncPipe).



\*\*Why View-Components?\*\*



View-Components are used to allow usual components to work in a specific context. Components are supposed to only display data and contain a small amount of logic that is directly related to the data displayed, such as saving the shown data. View-Components on the contrary can handle specific tasks that depend on the context in which the component is used. For example, you should be able to use an address-component in various places in PlentyONE to display or edit address data. But when it comes to routing, you may want to navigate to different URLs when the address is saved or deleted. This is what the View-Component can take care of, what the component itself is not supposed to do.



4\. Now we need to remove all the references to the old splitView handling from our components and replace them by code that uses our new routing approach.

&nbsp;  1. SplitView-Params become Inputs.

&nbsp;  2. Instead of adding views to our splitConfig, we navigate to the Views routes directly.

&nbsp;  3. removeView becomes closeBreadcrumb/reset component data.



```

&nbsp;   @Component({

&nbsp;     selector: 'terra-properties-add-view',

&nbsp;     template: `

&nbsp;                   <ng-container \*ngIf="data$ | async as data">

&nbsp;                       <terra-settings-properties-add

&nbsp;                           \[destinations]="data.destinations"

&nbsp;                           (propertyCreated)="onPropertyCreation($event)">

&nbsp;                       </terra-settings-properties-add>

&nbsp;                   </ng-container>`

&nbsp;  })

&nbsp;  export class PropertiesAddViewComponent

&nbsp;  {

&nbsp;     protected data$:Observable<Data>;



&nbsp;     constructor(private route:ActivatedRoute,

&nbsp;                 private router:Router,

&nbsp;                 private propertiesComponent:PropertiesComponent)

&nbsp;     {

&nbsp;         this.data$ = this.route.data;

&nbsp;     }



&nbsp;     protected onPropertyCreation(property:PropertyInterface):void

&nbsp;     {

&nbsp;  this.propertiesComponent.breadcrumbsService.closeBreadcrumbByUrl('/' + this.route.snapshot.url.join('/'));

&nbsp;         this.router.navigate(\['../', property.id], {relativeTo: this.route});

&nbsp;     }

&nbsp;  }

```



5\. Make sure to implement ngOnChanges where Inputs can change (especially for components that are loaded on parameterised routes) and remember that the view needs to be updated.



```

public ngOnChanges(changes:SimpleChanges):void

{

&nbsp;  if(changes.hasOwnProperty('property'))

&nbsp;  {

&nbsp;      this.updateFormFields();

&nbsp;  }



&nbsp;  if(changes.hasOwnProperty('destination'))

&nbsp;  {

&nbsp;      this.propertyOptionsConfig = this.propertyDynamicViewService.processOptionsConfig(this.destination);

&nbsp;  }



&nbsp;  if(changes.hasOwnProperty('options'))

&nbsp;  {

&nbsp;      this.propertyOptionsData = this.propertyDynamicViewService.updateSelectedOptions(this.propertyOptionsConfig, this.options);

&nbsp;      this.propertyOptionsConfig = this.propertyDynamicViewService.setupOptionsId(this.propertyOptionsConfig, this.options);

&nbsp;  }

}

```



6\. Since we are directly routing to views now, we don't need any submodules. All the components, services (including resolvers) and modules we declared/imported into our submodules can be moved into our main 'feature' module and the submodules can be removed.



7\. The filter and table component which we previously displayed by adding them to our splitView-Config when loading the properties-configuration route now need their own view component to be displayed. Inside this component, we use the TerraTwoColumn component and the attributes 'left' and 'right' to designate the two components that we want to be shown next to each other and to position them.



```

&nbsp;   @Component({

&nbsp;      selector: 'terra-properties-overview',

&nbsp;      template: `

&nbsp;                    <terra-2-col>

&nbsp;                        <terra-settings-properties-filter left></terra-settings-properties-filter>

&nbsp;                        <terra-settings-properties-table right></terra-settings-properties-table>

&nbsp;                    </terra-2-col>`

&nbsp;   })

&nbsp;   export class PropertiesOverviewComponent

&nbsp;   {

&nbsp;   }

```



8\. Now we can set up our resolvers to load preloadable data like countries, user roles and similar static data that we will require in our views and to load the view specific data when we route to one of our views.



```

&nbsp;   @Injectable()

&nbsp;   export class PropertyResolver implements Resolve<PropertyInterface>

&nbsp;   {

&nbsp;      constructor(private propertiesService:PropertiesService)

&nbsp;      {

&nbsp;      }



&nbsp;      public resolve(route:ActivatedRouteSnapshot):Observable<PropertyInterface>

&nbsp;      {

&nbsp;          let propertyId:number = +route.params\['propertyId'];



&nbsp;          if(isNullOrUndefined(propertyId) || isNaN(propertyId))

&nbsp;          {

&nbsp;              return;

&nbsp;          }



&nbsp;          return this.propertiesService.getProperty(propertyId);

&nbsp;      }

&nbsp;   }

```



9\. Although our views are now working as they should, there are still some artifacts of the old SplitView-routing that we need to get rid of. Components that still extend the MultiSplitViewBaseComponent need to be changed and logic that is based on methods inherited from it (translation, error messages) has to be refactored to work without it. You can either change the extension to TerraAlertBase or remove the extension if you are not using any of the alert handling methods like handleMessage. Moreover, configs need to be replaced (see below).



```

&nbsp;   export class SomeComponent extends TerraAlertBase

&nbsp;   {

&nbsp;      constructor(translation:TranslationService)

&nbsp;      {

&nbsp;          super(translation);

&nbsp;      }



&nbsp;      private someFunction():void

&nbsp;      {

&nbsp;          this.handleMessage(this.translation.translate('test'));

&nbsp;      }

&nbsp;   }

```



\## Improve code quality



After migrating from splitView to angular routing, it is possible to further optimize the code:



1\. Replace for and for-of loops with for-each loops to improve readability and reduce the risk of one-off errors.

2\. Remove unused properties, methods and imports.

3\. Replace unneeded \*.config.ts files. If you used config files to synchronize data between two components in splitView, consider replacing them with direct component communication using Inputs and Outputs.

