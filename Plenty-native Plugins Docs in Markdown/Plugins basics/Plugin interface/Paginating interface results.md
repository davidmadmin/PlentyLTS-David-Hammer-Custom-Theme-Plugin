# Paginating interface results

When working with the plugin interface, you can paginate the results of your queries, depending on the repository and query in question. This provides you with the results from the repository in a **Collection**. It also gives you access to various helper classes.

Use pagination to get the data for only a single page. You can also utilize it in searches and filters that account for some set of accepted criteria. Finally, you can pass the query results to the UI and display them across multiple pages.

For more information on whether a query offers paginated results, check the respective interface documentation.

## Important parameters

The key parameter for paginating data is `$itemsPerPage`. This parameter determines how many results are displayed on a single page. Combined with the total number of results, it is possible to determine the total number of pages and the current page. On this basis, the query data is paginated automatically. The `$page` parameter allows you to list all results on a given page.

Some queries may also provide parameters for sorting and filtering the result.

## Basic queries

This section shows some basic queries for paginating results. All examples on this page use the following generic method as basis:

```text
public query(array $columns = [], int $page = 1, int $itemsPerPage = 25, array $filters = [], string $sortBy, string $sortOrder):void
```

| **Parameter**|**Explanation** |

|---|---|

| `$columns` | The columns to retrieve. |

| `$page` | The page number of the results to retrieve. |

| `$itemsPerPage` | The number of items to list on one page. |

| `$filters` | Optional. Filters to restrict the query result. |

| `$sortBy` | Optional. Column by which to sort the results. |

| `$sortOrder`| Optional. Determines how to order the results. Either`desc`for descending or`asc` for ascending. |

After calling the method, it's possible to list results on the current page or check if there are more results after the current page:

***MyQuery.php***

```text
<?php

use Plenty\\Modules\\Module\\ServiceProvider\\Contracts;

$paginatedResponse = $repositoryContract -> query($columns, $page, $itemsPerPage);

$resultsCollectionForCurrentPage = $paginatedResponse -> getResult();

$totalNumberOfResults = $paginatedResponse -> getTotalCount();
```

|  |  |

|---|---|

|  | Returns an instance of paginated results. |

|  | Gets the collection of the response for the current search. The collection is in the form of the repository specific model. The collection includes as many models as specified in $itemsPerPage or all models if $itemsPerPage is higher than the maximum number of models available. |

|  | Checks if this is the last page of results. Can be used to navigate the paginated response. As long as isLastPage() returns false, `getResult()` can be called again in a loop. |

Besides `isLastPage()`, there are **several more methods** available to make navigating the result pages easier.

## Manipulating the results

Once you have retrieved the data from the repository, you may want to manipulate it. If you want to display the results in a UI afterwards, it is important that you keep the form of your `paginatedResponse`. To do this, get the results of the current page, manipulate the data, and save this manipulated data.

***MyQuery.php***

```text
<?php

use Plenty\\Modules\\Module\\ServiceProvider\\Contracts;

$paginatedResponse = $repositoryContract -> query($columns, $page, $itemsPerPage);

$resultsCollectionForCurrentPage = $paginatedResponse -> getResult();

$totalNumberOfResults = $paginatedResponse -> getTotalCount();

// Manipulates the data.

$results = $paginatedResponse -> getResult();

foreach ($results as $index => $result) {

}

$paginatedResponse -> setResult($results);
```

|  |  |

|---|---|

|  | Manipulates the data. |

|  | Manipulate the result. |

Note that you cannot change the total number of results this way.

## Displaying the results

If you want to display your query results in a UI, you need to convert them to JSON. To convert your paginated response to JSON, use the `toArray()`and`toJson()`methods.`toArray()` will convert the response to the following form:

```text
[

    'page'

    'totalsCount'

    'isLastPage'

    'entries'

    'lastPageNumber'

    'firstOnPage'

    'lastOnPage'

    'itemsPerPage'

];
```

Using `toJson()`, you can convert the array to JSON.

The following example uses the `query`method defined above and assumes the associated repository contains the two columns`id`and`name`. It lists the results in a UI and allows for sorting by ID and filtering by name.

***MyQueryController.php***

```text
Unresolved include directive in modules/plugin-interface/pages/interface-results-pagination.adoc - include::example$MyQueryController.php.php[]
```

|  |  |

|---|---|

|  | Manipulates the data. |

|  | Manipulates the result. |
