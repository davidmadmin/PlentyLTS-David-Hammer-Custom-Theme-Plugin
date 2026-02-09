# PlentyShop LTS Custom Theme Plugin Guide (Improved)

> **Purpose**: Convert a copy‑pasted ChatGPT research response into a clean, human‑readable **and** machine‑readable Markdown guide for building a **PlentyShop LTS theme plugin** that overrides/extends Ceres (PlentyShop LTS) styles and templates.

---

## Table of Contents

1. [Overview](#overview)
2. [Core Concepts](#core-concepts)
3. [Plugin Structure](#plugin-structure)
4. [Minimal Implementation (Examples)](#minimal-implementation-examples)
5. [Integrating Existing Code](#integrating-existing-code)
6. [Performance Improvements (Fonts & Assets)](#performance-improvements-fonts--assets)
7. [Deployment & Activation](#deployment--activation)
8. [Testing Checklist](#testing-checklist)
9. [Maintenance Tips](#maintenance-tips)
10. [Making the Theme Configurable](#making-the-theme-configurable)
11. [Original Question Context](#original-question-context)

---

## Overview

PlentyShop LTS (formerly **Ceres**) supports **theme plugins** that let you **override CSS and Twig templates** without touching core files. These plugins can be deployed once, then activated/deactivated as needed. The general idea:

- **Your CSS overrides the base theme** wherever you define styles.
- **Unchanged classes fall back to the base theme**, so you only replace what you need.
- **Twig overrides or container injections** let you replace or augment HTML safely.

---

## Core Concepts

### 1) Template Containers (Hook Points)
PlentyShop LTS provides ~70 containers throughout the storefront (header, footer, product pages, cart, checkout, etc.). Theme plugins typically use:

- **`Template.Style`** for injecting CSS into the `<head>`.
- Additional containers for targeted HTML or script inserts.

Use containers for **small changes**; use template overrides for **large layout changes**.

### 2) Plugin Priority
To ensure your theme overrides apply correctly, set plugin priority **between** Ceres and IO:

- Example: **Ceres = 997**, **Theme = 998**, **IO = 999**.

---

## Plugin Structure

Minimal theme plugin layout:

```
MyTheme/
├── plugin.json
├── src/
│   ├── Providers/
│   │   └── MyThemeServiceProvider.php
│   └── Containers/
│       └── MyThemeContainer.php
└── resources/
    ├── css/
    │   └── main.css
    └── views/
        └── content/
            └── Theme.twig
```

---

## Minimal Implementation (Examples)

### 1) `plugin.json`

```json
{
  "name": "MyTheme",
  "namespace": "MyTheme",
  "type": "theme",
  "version": "1.0.0",
  "description": "Custom theme for PlentyShop LTS",
  "author": "Your Name",
  "serviceProvider": "MyTheme\\Providers\\MyThemeServiceProvider",
  "containers": [
    {
      "key": "Template.Style",
      "name": "Template: Style",
      "description": "Add style via theme plugin"
    }
  ],
  "dataProviders": [
    {
      "key": "MyTheme\\Containers\\MyThemeContainer",
      "name": "MyTheme Style",
      "description": "Inject theme CSS into Template.Style container"
    }
  ]
}
```

### 2) Service Provider (Template Overrides)

```php
use Plenty\Modules\Webshop\Template\Providers\TemplateServiceProvider;

class MyThemeServiceProvider extends TemplateServiceProvider
{
    public function boot()
    {
        $this->overrideTemplate(
            'Ceres::PageDesign.Partials.Header.Header',
            'MyTheme::PageDesign.Partials.Header.Header'
        );

        $this->overrideTemplate(
            'Ceres::PageDesign.Partials.Footer',
            'MyTheme::PageDesign.Partials.Footer'
        );
    }
}
```

### 3) Container to Inject CSS

```php
namespace MyTheme\Containers;

use Plenty\Plugin\Templates\Twig;

class MyThemeContainer
{
    public function call(Twig $twig): string
    {
        return $twig->render('MyTheme::content.Theme');
    }
}
```

### 4) Theme Twig (`resources/views/content/Theme.twig`)

```twig
<link rel="stylesheet" href="{{ plugin_path('MyTheme') }}/css/main.css" />
```

---

## Integrating Existing Code

Organize your theme to mirror the default Ceres structure. This keeps overrides easier to maintain and update.

### Header & Footer

- **Full override** if markup changes are significant.
- **Container injection** for small additions (e.g., banners or extra links).

### Product Detail Page (Single Item)

Options:

1. **Full override**: Replace `Ceres::Item.SingleItem`.
2. **Partial override**: Replace a component like `Item/Components/VariationImageList.twig`.
3. **Container injection**: Use hooks like `SingleItem.AfterPrice` for small additions.

### Basket (Cart)

- **CSS-only** changes are best if the layout is mostly intact.
- For major layout changes, override `Ceres::Basket.Basket`.
- Use container hooks (e.g., `BasketTotals.BeforeTotalSum`) for smaller inserts.

### Checkout

- Prefer **CSS-only** changes.
- Use granular containers for targeted content: `Checkout.BeforePaymentList`, `Checkout.AfterBasketTotals`, etc.
- Override templates only if you must rebuild layout.

---

## Performance Improvements (Fonts & Assets)

### Avoid `@import` for Fonts
`@import` delays font loading. Prefer `<link>` in the `<head>`:

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=YourFont:wght@400;700&display=swap" />
```

### Where to Put Font Links

1. **Best**: Override the head template and insert early.
2. **Alternative**: Add in the `Template.Style` container (still works, but loads slightly later).

### Consolidate CSS

- Use SCSS with partials (e.g., `_header.scss`, `_checkout.scss`).
- Compile to **one** `main.css` to reduce HTTP requests.

---

## Deployment & Activation

1. **Add theme plugin** to the plugin set.
2. **Set priority** between Ceres and IO.
3. **Link containers**:
   - Link your theme provider to `Template.Style`.
   - Link any other custom providers you created.
4. **Deploy** and refresh the storefront.

---

## Testing Checklist

- **Homepage**: Header/footer display correctly.
- **Category pages**: Grid and layout remain responsive.
- **Product detail page**: Variations, price, and galleries work.
- **Basket**: Add/remove items and update quantities.
- **Checkout**: Full flow from address to order confirmation.
- **Cross‑browser**: Chrome, Firefox, Safari, mobile.
- **Performance**: Fonts and CSS load early and quickly.

---

## Maintenance Tips

- **Never modify core Ceres directly**.
- Keep overrides **modular** and **minimized**.
- Track changes with **Git**.
- Re‑diff your overrides after Ceres updates.
- Prefer **containers + CSS** for small changes.

---

## Making the Theme Configurable

To let shop admins adjust **primary colors** (brand color, background, font color) from the Plentymarkets backend, define **plugin configuration fields** and then read those values in Twig via `plugin_config()`.

### 1) Define Configuration Fields

Create a `config.json` (or `config.yaml`) at the plugin root and define color fields. For example:

```json
{
  "settings": [
    {
      "key": "brandColor",
      "type": "color",
      "label": "Brand color",
      "default": "#ff6600"
    },
    {
      "key": "backgroundColor",
      "type": "color",
      "label": "Background color",
      "default": "#ffffff"
    },
    {
      "key": "fontColor",
      "type": "color",
      "label": "Font color",
      "default": "#1a1a1a"
    }
  ]
}
```

> Depending on your PlentyShop LTS version, the exact schema may differ slightly. The key point is to **define settings** in a config file so the backend UI can render editable fields (color pickers, text fields, etc.).

### 2) Access Values in Twig

Use `plugin_config()` to read the values from your theme Twig:

```twig
{% set brandColor = plugin_config('MyTheme.brandColor') ?? '#ff6600' %}
{% set backgroundColor = plugin_config('MyTheme.backgroundColor') ?? '#ffffff' %}
{% set fontColor = plugin_config('MyTheme.fontColor') ?? '#1a1a1a' %}
```

### 3) Apply Values Dynamically

There are multiple approaches; choose the one that best fits your workflow:

**Option A: Inline `<style>` with CSS variables (recommended)**

```twig
<style>
  :root {
    --brand-color: {{ brandColor }};
    --background-color: {{ backgroundColor }};
    --font-color: {{ fontColor }};
  }
</style>
```

Then in your main CSS:

```css
body {
  background: var(--background-color);
  color: var(--font-color);
}

.btn-primary {
  background: var(--brand-color);
}
```

**Option B: Twig-based stylesheet output**

Create a Twig stylesheet, e.g. `resources/views/content/ThemeColors.twig`:

```twig
body {
  background: {{ backgroundColor }};
  color: {{ fontColor }};
}
.btn-primary {
  background: {{ brandColor }};
}
```

Then render it inside a `<style>` tag in your `Theme.twig`:

```twig
<style>
  {{ include('MyTheme::content.ThemeColors') }}
</style>
```

**Option C: Inline styles on specific elements**

```twig
<button class="btn-primary" style="background: {{ brandColor }};">
  Buy now
</button>
```

### 4) Optional: SCSS Preprocessing Tradeoffs

If you rely heavily on SCSS, you have two main options:

- **Compile SCSS at build time** (fast at runtime, but config changes require rebuild/deploy).
- **Use runtime CSS variables** (no rebuild needed, but you lose some SCSS-only features for dynamic values).

In most cases, **CSS variables + Twig injection** provide the best balance of flexibility and maintainability when theme settings must change via the backend UI.

---

## Original Question Context

> **Question asked in the original ChatGPT conversation:**
> 
> *“Could I configure this plugin to be configurable so that the main colours, for example, could be edited?”*

If this is still a requirement, the usual approach is to add **plugin configuration options** and compile or inject CSS variables accordingly (e.g., storing color values in config and writing them to CSS custom properties or a generated stylesheet).
