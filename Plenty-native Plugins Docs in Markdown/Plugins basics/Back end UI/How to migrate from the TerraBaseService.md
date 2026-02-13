# How to migrate from the TerraBaseService

> The Terra-Components have been deprecated and will no longer be maintained. Although you can still work with them, we recommend using **Material components** instead.

The **TerraBaseService**is only available up to version 5.0.0 of the Terra-Components. The following paragraphs will offer a step-by-step guide on how to replace the deprecated**TerraBaseService**as well as angular's http package (@angular/http) with the functionality mostly provided by angular's**HttpClient** (@angular/common/http).

In addition to this document, we highly recommend to read **angular's complete guide** on the usage of the HttpClient.

## Steps

1\. Remove or replace the extension to **TerraBaseService**.

- In case you are not using any caching functionality such as handleLocalDataModelGet, remove the complete extension.

- In case you are using any caching functionality, please replace **TerraBaseService**with**ModelCache**.

     This class is a one-to-one replacement for all the caching functionality originally provided by the **TerraBaseService**.

2\. Remove all occurrences of this.setAuthorization() method calls. Authorisation is now handled automatically using an **HttpInterceptor**. **Important**: Setting the headers in the request's options can be omitted in most of the cases since all mandatory information are added automatically! If you explicitly need to modify the headers of the request, please review **these information** beforehand.

3\. Remove injection of the **TerraLoadingSpinnerService**. Another **HttpInterceptor** now takes care of starting and stopping the loading spinner.

4\. Replace occurrences of the class **Http** *(@angular/http)* with **HttpClient** *(@angular/common/http)*.

5\. Create a private readonly property named url to provide the URL to the rest endpoint previously passed as third argument to the constructor of the **TerraBaseService**, e.g.

```text
   private readonly url:string = '/rest/webstores';
```

6\. Remove the call to the base class's constructor aka super(), as long as you are not using any caching functionality.

   Your service's constructor should now look similar to the following

```text
   constructor(private http:HttpClient) {}
```

7\. Remove all calls to this.mapRequest(). Parsing the data to a JSON-Object is now automatically handled by the HttpClient itself.

   If the body of your request's response should not be parsed to a JSON-Object, please see **this page** for further instruction.

8\. Type your responses by passing a type to the HttpClient method's type parameter, e.g.

```text
   this.http.get< PluginSetInterface>(this.url + '/' + webstoreId + '/plugin_set')
```

   For more details see **this page**.

9\. Replace occurences of the this.createUrlSearchParams() method calls with calls to the new utility function createHttpParams() provided by *@plentymarkets/terra-components*. Make sure to pass the instance of **HttpParams**to the params property of the request's option. For simple use cases, please consider using angular's build in ways to append query strings to the URL (see**this page**).

For more specific use cases or advanced usages, either see the **advanced usage section** of angular's official guide covering the HttpClient or get in touch with one of the members of the terra team.
