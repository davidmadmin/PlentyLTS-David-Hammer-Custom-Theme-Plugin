# How to create a back end UI

## Prerequisites

Before you can start developing back end UIs with Angular, you need to satisfy the following requirements:

- Installed Node.js Version 18+ (current LTS)
- Basic understanding of Angular and TypeScript
- Familiarity with REST calls

## Setting up your development environment

To set up your development environment, you need to install the plugin Template Terra Basic from Github. To do so, proceed as follows:

1. In your browser, open [Github](https://github.com/plentymarkets/plugin-terra-basic).
2. Click on **Code**.
3. Copy the **HTTPS** link of the repository.
4. Open a terminal.
5. Navigate to the directory where you want the cloned directory to be made.
6. Enter `git clone` and paste the URL you copied in step 3.
7. Press **Enter**.
   → Your local clone is created.
8. Enter `cd plugin-terra-basic`.
9. Enter `npm install`.
   → The node modules are installed.
10. Enter `npm start`.
    → The `plugin-terra-basic`starts on`localhost:3002`.

Your setup is now complete and you can start developing your plugin.

## Adding your first table

The Terra-Components library provides you with a material table component that you can use in your Angular application. For a quick start, a table is already included in the plugin template. For more information on how to add a table to your application, refer to the [Terra-Components documentation](https://plentymarkets.github.io/terra-components/#/app/table-docs) or view the table setup in the `table` folder.

### Creating an interface

To work with TypeScript properly, you should create an interface to define the type of data used by your table. The following code sample is the interface for a list of contacts:

### src/app/interfaces/contact.interface.ts

```typescript
export interface ContactInterface {
    id: number;
    number: string;
    externalId: string;
    typeId: number;
    firstName: string;
    lastName: string;
    gender: string;
    formOfAddress: string;
    newsletterAllowanceAt: string;
    classId: number;
    blocked: number;
    rating: number;
    bookAccount: string;
    lang: string;
    referrerId: number;
    plentyId: number;
    userId: number;
    birthdayAt: string;
    lastLoginAt: string;
    lastLoginAtTimestamp: number;
    createdAt: string;
    updatedAt: string;
}
```

### Creating your service

To receive data from the back end, you need to create a service that can send REST calls. The plugin template comes with an example in the `src/app/services`folder. It already contains the`contact.service.ts`file. To create a new service you can use`ng generate service`and then enter`services/contact` when prompted for a name, or by creating it manually. When using the generate option, you will also be provided with a spec file which you can use to create tests.

### src/app/services/contact.service.ts

```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ContactInterface } from '../interfaces/contact.interface';
import { Observable } from 'rxjs/internal/Observable';
import { createHttpParams, TerraPagerInterface } from '@plentymarkets/terra-components';

@Injectable()
export class ContactService {
    private readonly url: string = 'http://master.login.plentymarkets.com/rest/accounts/contacts';

    constructor(private http: HttpClient) {}

    public getContacts(requestParams: any): Observable<TerraPagerInterface<ContactInterface>> {
        return this.http.get<TerraPagerInterface<ContactInterface>>(this.url, {
            params: createHttpParams(requestParams)
        });
    }
}
```

To use the service and be able to send REST calls, you need to get an authentication token. To do so, proceed as follows:

1. Log in to your PlentyONE system.
2. Open your browser dev tools.
3. Right click and click on `Inspect`.
4. Go to `Application`.
5. Open `Local Storage`.
6. Click on your connection example: **<http://master.login.plentymarkets.com>**.
   → This will open a list where you can copy the `accessToken`.
7. Open `plugin-terra-basic.component.ts`and go to`line 17`.
8. Paste the copied token into the `accessToken` variable.
   **Tip:** To avoid errors while accessing the `accessToken`, use the [Allow-Control-Allow-Origin plugin](https://developers.plentymarkets.com/en-gb/developers/main/back-end-ui/how-to-back-end-ui.html#_enabling_cross_origin).
   → You are ready to use the service.

> **Token changes when login expires**
> Note that the token will change every time your login session expires. This means you may have to repeat this step several times during the course of development.

### Linking your service to the module

If you used the generate option, the service should be added to the module automatically. If not, you may need to add it to the `NgModule` manually.

### src/app/plugin-terra-basic.module.ts

```typescript
import {
    APP_INITIALIZER,
    NgModule
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PluginTerraBasicComponent } from './plugin-terra-basic.component';
import { StartComponent } from './views/start/start.component';
import { HttpModule } from '@angular/http';
import {
    L10nLoader,
    TranslationModule
} from 'angular-l10n';
import { FormsModule } from '@angular/forms';
import { l10nConfig } from './core/localization/l10n.config';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import {
    appRoutingProviders,
    routing
} from './plugin-terra-basic.routing';
import { StartViewComponent } from './views/start-view.component';
import { RouterViewComponent } from './views/router/router-view.component';
import { MainMenuComponent } from './views/menu/main-menu.component';
import {
    httpInterceptorProviders,
    TerraComponentsModule,
    TerraNodeTreeConfig
} from '@plentymarkets/terra-components';
import { TableComponent } from './views/example/overview/table/table.component';
import { FilterComponent } from './views/example/overview/filter/filter.component';
import { OverviewViewComponent } from './views/example/overview/overview-view.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslationProvider } from './core/localization/translation-provider';
import { BasicTableService } from './services/basic-table.service';
import { ExampleViewComponent } from './views/example/example-view.component';
import { ContactService } from './services/contact.service'; // 1

@NgModule({
    imports:      [
        BrowserModule,
        BrowserAnimationsModule,
        HttpModule,
        FormsModule,
        HttpClientModule,
        TranslationModule.forRoot(l10nConfig, { translationProvider: TranslationProvider }),
        RouterModule.forRoot([]),
        TerraComponentsModule,
        routing
    ],
    declarations: [
        PluginTerraBasicComponent,
        RouterViewComponent,
        MainMenuComponent,
        StartViewComponent,
        StartComponent,
        TableComponent,
        FilterComponent,
        OverviewViewComponent,
        ExampleViewComponent
    ],
    providers:    [
        {
            provide:    APP_INITIALIZER,
            useFactory: initL10n,
            deps:       [L10nLoader],
            multi:      true
        },
        httpInterceptorProviders,
        appRoutingProviders,
        TerraNodeTreeConfig,
        BasicTableService,
        ContactService, // 2
    ],
    bootstrap:    [
        PluginTerraBasicComponent
    ]
})
export class PluginTerraBasicModule
{
    constructor(public l10nLoader:L10nLoader)
    {
        this.l10nLoader.load();
    }
}

function initL10n(l10nLoader:L10nLoader):Function
{
    return ():Promise<void> => l10nLoader.load();
}
```

1. Import the service.
2. Add the service to providers.

### Using the DataSource for the Plugin Terra-Basic

The Terra-Components provide you with the base class of a fully functional DataSource that can be used in the DataSource for your table. It's called **TerraTableDataSource**. To use it, proceed as follows:

1. Provide a generic type for it.
2. Inject the service from which you will get the data in your created data-sources constructor.
3. In the request method of your DataSource, return an observable of the type **TerraPagerInterface**<type specified for the DataSource> if you want a paginated result or just of the generic type which emits your data.
   → Later, you can use this DataSource in your mat-table to display your data.

An example is provided in the plugin Terra-Basic:

### src/app/views/example/overview/table/contacts-data-source.ts

```typescript
import { RequestParameterInterface, TerraPagerInterface, TerraTableDataSource } from '@plentymarkets/terra-components';
import { ContactInterface } from '../../../../interfaces/contact.interface';
import { Observable } from 'rxjs';
import { ContactService } from '../../../../services/contact.service';

export class ContactsDataSource extends TerraTableDataSource<ContactInterface> {
    constructor(private contactService: ContactService) {
        super();
    }

    public request(requestParams: RequestParameterInterface): Observable<TerraPagerInterface<ContactInterface>> {
        return this.contactService.getContacts(requestParams);
    }
}
```

## Enabling cross origin

If you get errors due to cross origin resource sharing, you need to allow it by using a plugin. For example the **Allow-Control-Allow-Origin** in Chrome. Activate the plugin and allow all resources from your test system domain.

### Figure 2. Enable cross origin

At this point of the how-to guide, your Angular UI should look like this:

### Figure 3. Plugin Terra-Basic

## Disabling back end caching

To disable caching in the PlentyONE back end, carry out the following steps:

1. Go to **Setup » Settings » Developer**.
2. In the **Run backend without PHP-OPcache** section, switch on the toggle.
   → The cache is disabled.

A red label in the bottom left corner indicates that the cache is disabled. To enable caching again, switch off the toggle or hover over the label and click on **Close**.

## Find out more

If you want to find out more, refer to the information listed below.

- Download or clone the complete plugin guide at [Github](https://github.com/plentymarkets/plugin-terra-basic).
- Find a public repository with a [plugin written in Angular](https://github.com/plentymarkets/plugin-etsy-ui). You can find the corresponding `ui.json` in the main [Etsy plugin](https://github.com/plentymarkets/plugin-etsy).
