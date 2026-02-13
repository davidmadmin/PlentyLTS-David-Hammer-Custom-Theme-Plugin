\# SASS compilation



> Sass is a stylesheet language that's compiled to CSS. It allows you to use variables, nested rules, mixins, functions, and more, all with a fully CSS-compatible syntax. Sass helps keep large stylesheets well-organized and makes it easy to share design within and across projects.



— sass-lang.com



PlentyONE supports SASS in plugins. You can use either SASS or SCSS. The syntax is different, but they're \*\*\[compatible with each other](https://sass-lang.com/documentation/syntax#scss)\*\*. If you use SASS in your plugin, you have two ways of compiling it into CSS:



\- Before the plugin build, for example via \*\*\[Webpack](https://webpack.js.org/)\*\* (\[Precompilation](#precompilation), uses \*\*\[Node Sass](https://www.npmjs.com/package/node-sass)\*\*)

\- During the plugin build (\[Build compilation](#build-compilation), uses \*\*\[Dart Sass](https://sass-lang.com/dart-sass)\*\*)



The recommended way differs depending on your use case. This page discusses both options based on the implementation in the \*\*\[plentyShop LTS plugin repository](https://github.com/plentymarkets/plugin-ceres)\*\*.



\## General setup



Much of the setup stays the same, no matter which option you use. The following tree shows the parts of a plugin's file structure that are relevant to SASS compilation.



\*\*\_Plugin file structure\_\*\*



```

PluginDirectory/

&nbsp;   │

&nbsp;   ├── resources/

&nbsp;   │   │

&nbsp;   │   ├── css/

&nbsp;   │   │

&nbsp;   │   └── scss/

&nbsp;   │

&nbsp;   ├── src/

&nbsp;   │

&nbsp;   ├── tools/

&nbsp;   │

&nbsp;   ├── package.json

&nbsp;   |

&nbsp;   └── plugin.json

```



Regardless of when you compile your SASS, one important concept is that the plugin build only cares about the `css` directory. This means that you can use the `scss` directory to write your SASS, but to apply the styling to your shop, you have to include either compiled CSS or processed SASS in the `css` folder. To process SASS, you can use a script. For details, refer to the \[Build compilation](#build-compilation) section.



\### Available scripts



To compile SASS and prepare files for compilation by the plugin build, plentyShop LTS supplies the following scripts:



\*\*\_package.json\_\*\*



```

&nbsp;     "build": "npm run build:prod \&\& npm run build:dev",

&nbsp;     "build:dev": "webpack --progress",

&nbsp;     "build:prod": "webpack --env.prod --progress",

&nbsp;     "prebuild": "npm run build:sass-vendor",

```



Once you've installed the packages with `npm install`, you can run the scripts with `npm run build`. The build script in turn triggers the other scripts. Note that this script runs both compilation options. You can either modify the scripts according to your needs or ignore part of the output.



\## Precompilation



Use precompilation if you're confident that everyone who modifies the styling has basic programming knowledge and access to the code of the plugin. In other words, everyone who needs to change any SASS, changes and compiles the plugin directly. The benefit of this approach is that you can compile SASS on demand when there are changes and not every time you build your plugin set. This speeds up the deployment process.



One way of precompiling SASS is to use Webpack. The plentyShop LTS plugin includes a \*\*\[Webpack configuration for compiling SASS](https://github.com/plentymarkets/plugin-ceres/blob/stable/tools/webpack/styles.config.js)\*\*. To adapt this configuration for your own plugin, you have to update the `entry` points:



\*\*\_styles.config.js\_\*\*



```

&nbsp;       entry: {

&nbsp;           base: "./resources/scss/base.scss",

&nbsp;           checkout: "./resources/scss/checkout.scss",

&nbsp;           icons: "./resources/scss/icons.scss",

&nbsp;           shopbuilder: "./resources/scss/shopbuilder.scss"

&nbsp;       },

```



Each SASS file you want to compile is its own entry.



You can also configure the output file name to use a different prefix. By the default, the file prefix is `ceres-`.



```

&nbsp;       plugins: \[

&nbsp;           new FixStyleOnlyEntriesPlugin(),

&nbsp;           new MiniCssExtractPlugin({

&nbsp;               filename: "../../css/ceres-\[name]" + (env.prod ? ".min" : "") + ".css",

&nbsp;           })

&nbsp;       ],

```



> \*\*\_Ignore unnecessary files\_\*\*

> The build script plentyShop uses prepares the plugin for both precompilation and build compilation. If you want to use the script as is, add the following paths to your `.gitignore` (Git) or `plenty.ignore` (plentyDevTool):

> • `\*\*/resources/css/\*.css`

> • `\*\*/resources/css/\*.css.map`

> If you use plentyDevTool, you may want to modify the paths to match specific plugins.



\## Build compilation



Use build compilation if you want to make your plugin available to others and enable them to configure parts of the styling, such as the colour scheme. To enable configuration of SASS variables from the PlentyONE back end, \[use the plugin configuration](https://developers.plentymarkets.com/en-gb/developers/main/plugin-configuration/how-to-plugin-configuration.html) and set the `scss` property. This approach makes it possible to define SASS variables without modifying any files. But it also means that you cannot compile all the SASS with your own development tools. Instead, the plugin build covers the compilation. The deployment process takes longer for every SASS file it has to compile.



You have to process SASS files from the `scss` directory, so that the plugin build can compile them. Processing resolves `@import` statements and moves the files to the `css` directory. The build script of the plentyShop LTS plugin uses the script \*\*\[bundleSass.js](https://github.com/plentymarkets/plugin-ceres/blob/stable/tools/bundleSass.js)\*\* to process SASS files. You can use this script without modification in your own plugin.



> \*\*\_Bug in old script version\_\*\*

> If you use a fork of plentyShop LTS version 5.0.55 or older, the `bundleSass` script doesn't remove outdated output from the `css` directory. Outdated output can lead to compilation errors during plugin build.

> You can resolve this problem by \*\*\[updating the script](https://github.com/plentymarkets/plugin-ceres/pull/3341/files#diff-381bd00efba6d8ee887e60272fceb0358e5a24b2b00fa48f25bf353ea54482d9)\*\*.



> \*\*\_Ignore unnecessary files\_\*\*

> The build script plentyShop uses prepares the plugin for both precompilation and build compilation. If you want to use the script as-is, add the following paths to your `.gitignore` (Git) or `plenty.ignore` (plentyDevTool):

> • `\*\*/resources/css/\*.scss`

> If you use plentyDevTool, you may want to modify the paths to match specific plugins.

