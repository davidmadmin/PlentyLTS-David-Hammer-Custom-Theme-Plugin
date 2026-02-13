# Plugin basics → How to integrate an SDK

## Introduction

This guide will walk you through the steps to integrate an SDK into your plentymarkets plugin. We will be using Packagist, a popular package repository for PHP, to search for and display packages.

## Prerequisites

\- Basic knowledge of PHP, Twig, JavaScript, and CSS

\- A plentymarkets plugin project set up

## Step 1: Install the SDK

First, you need to install the Packagist SDK. Add the following line to your `composer.json` file:

```json
"require": {

    "spatie/packagist-api": "^2.0"

}
```

Then run `composer install` to install the package.

## Step 2: Create the Content Controller

Create a new controller class that will handle the logic for searching packages:

```php
<?php

namespace HelloWorld\\Controllers;

use Plenty\\Plugin\\Controller;

use Plenty\\Plugin\\Templates\\Twig;

use Packagist\\Api\\Client;

class ContentController extends Controller

{

    public function showHelloWorld(Twig $twig): string

    {

        $client = new Client();

        $packagistResult = [];

        if (isset($_GET['search'])) {

            $searchTerm = urldecode($_GET['search']);

            $packagistResult = $client->search($searchTerm, ['type' => 'library']);

        }

        return $twig->render('HelloWorld::content.hello-world', [

            "packagistResult" => $packagistResult

        ]);

    }

}
```

### Key points:

\- Line 1-5: Standard PHP class declaration with necessary imports

\- Line 11: Create a new Packagist client instance

\- Line 14-16: Check if a search parameter exists and perform the search

\- Line 19-21: Render the Twig template with the search results

## Step 3: Create the Twig Template

Create a Twig template file at `resources/views/content/hello-world.twig`:

```twig
<!DOCTYPE html>

<html lang="en">

<head>

    <meta charset="UTF-8">

    <title>Hello World</title>

    <link rel="stylesheet" href="{{ plugin_path('HelloWorld') }}/css/fancy.css">

    <script src="{{ plugin_path('HelloWorld') }}/js/buttonlistener.js"></script>

</head>

<body>

<div class="wrap">

    <div class="search">

        <input id="searchTerm" type="text" class="searchTerm" placeholder="What packages are you looking for?">

        <button id="searchButton" type="submit" class="searchButton">

            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1"

                 id="Layer_1" x="0px" y="0px" width="25px" height="25px" viewBox="0 0 122.879 119.799"

                 enable-background="new 0 0 122.879 119.799" xml:space="preserve"><g>

                    <path d="M49.988,0h0.016v0.007C63.803,0.011,76.298,5.608,85.34,14.652c9.027,9.031,14.619,21.515,14.628,35.303h0.007v0.033v0.04 h-0.007c-0.005,5.557-0.917,10.905-2.594,15.892c-0.281,0.837-0.575,1.641-0.877,2.409v0.007c-1.446,3.66-3.315,7.12-5.547,10.307 l29.082,26.139l0.018,0.016l0.157,0.146l0.011,0.011c1.642,1.563,2.536,3.656,2.649,5.78c0.11,2.1-0.543,4.248-1.979,5.971 l-0.011,0.016l-0.175,0.203l-0.035,0.035l-0.146,0.16l-0.016,0.021c-1.565,1.642-3.654,2.534-5.78,2.646 c-2.097,0.111-4.247-0.54-5.971-1.978l-0.015-0.011l-0.204-0.175l-0.029-0.024L78.761,90.865c-0.88,0.62-1.778,1.209-2.687,1.765 c-1.233,0.755-2.51,1.466-3.813,2.115c-6.699,3.342-14.269,5.222-22.272,5.222v0.007h-0.016v-0.007 c-13.799-0.004-26.296-5.601-35.338-14.645C5.605,76.291,0.016,63.805,0.007,50.021H0v-0.033v-0.016h0.007 c0.004-13.799,5.601-26.296,14.645-35.338C23.683,5.608,36.167,0.016,49.955,0.007V0H49.988L49.988,0z M50.004,11.21v0.007h-0.016 h-0.033V11.21c-10.686,0.007-20.372,4.35-27.384,11.359C15.56,29.578,11.213,39.274,11.21,49.973h0.007v0.016v0.033H11.21 c0.007,10.686,4.347,20.367,11.359,27.381c7.009,7.012,16.705,11.359,27.403,11.361v-0.007h0.016h0.033v0.007 c10.686-0.007,20.368-4.348,27.382-11.359c7.011-7.009,11.358-16.702,11.36-27.4h-0.006v-0.016v-0.033h0.006 c-0.006-10.686-4.35-20.372-11.358-27.384C70.396,15.56,60.703,11.213,50.004,11.21L50.004,11.21z"/>

                </g></svg>

        </button>

    </div>

</div>

<p>{{ packagistResult.total }} Results</p>

<ul>

    {% for packagistItem in packagistResult.results %}

        {% set counter = ( counter | default(0) ) + 1 %}

        <li style="--animation-order: {{ counter }}"><a href="{{ packagistItem.repository }} " target="_blank"><span

                        class="align-left">{{ packagistItem.name }}</span> <span

                        class="align-right">💾 {{ packagistItem.downloads }} ⭐️ {{ packagistItem.favers }}</span></a></li>

    {% else %}

        <li>No entries</li>

    {% endfor %}

</ul>

</body>
```

### Key points:

\- Line 6: Add CSS by providing the path using `plugin_path('HelloWorld')`

\- Line 7: Add custom JavaScript the same way

\- Line 10-13: Add an input searchbar and search button with an SVG icon

\- Line 27: Set up a counter for CSS animation, incrementing by one for each list item

\- Line 29: Add `--animation-order`as a style to every`<li>` element for staggered animation

## Step 4: Add CSS Animation

Create the CSS file at `resources/css/fancy.css`:

```css
li {

    animation-name: animateIn;

    animation-duration: 350ms;

    animation-delay: calc(var(--animation-order) * 50ms + var(--animation-order) * var(--animation-order) * 5ms );

    animation-fill-mode: both;

    animation-timing-function: ease-in-out;

}

@keyframes animateIn {

    0% {

        opacity: 0;

        transform: scale(0.6) translateY(-8px);

    }

    100% {

        opacity: 1;

    }

}
```

### Key points:

\- Line 2: Define the animation type for `<li>` elements

\- Line 4: Use `--animation-order` to delay results with 50ms base + increasing delay for nice staggered effect

\- Line 9-17: Animation function that starts with opacity 0 and smaller scale, ending at full opacity

## Step 5: Add JavaScript Event Listeners

Create the JavaScript file at `resources/js/buttonlistener.js`:

```javascript
document.addEventListener('DOMContentLoaded', function () {

    console.log('document is ready. I can sleep now');

    let search = (new URL(document.location)).searchParams.get("search");

    document.getElementById("searchTerm").value = search ? decodeURI(search) : "";

    document.getElementById("searchButton").addEventListener("click", function () {

        let url = (new URL(document.location));

        let search_params = (new URL(document.location)).searchParams;

        let search_val = document.getElementById("searchTerm").value;

        search_params.set('search', encodeURI(search_val));

        url.search = search_params.toString();

        url = url.toString();

        window.location.href = url;

    });

});
```

### Key points:

\- Line 1: Add listener to check when DOMContent is loaded

\- Line 4: Set input field value to current searchTerm or empty string

\- Line 6: EventListener for search button click

\- Line 8: Get current search parameter from URL

\- Line 10: Set `search` parameter to encoded value (excluding special characters for valid URL)

\- Line 13: Set newly created URL as browser window URL to start search

## Conclusion

Have fun creating new plugins and improving the experience of your customers!
