\# Template setup



When developing your own plugin to extend your online store, you may want to use the default PlentyONE design as a starting point. It is comprised of two plugins:



\- \[\*\*plentyShop LTS\*\*](https://github.com/plentymarkets/plugin-ceres)

\- \[\*\*IO\*\*](https://github.com/plentymarkets/plugin-io)



By including them via Git, you can modify them according to your needs. This page describes how to add plentyShop LTS and IO from GitHub to your PlentyONE system and the existing branches.



\## Adding plentyShop LTS and IO to your system



1\. Open the back end of your PlentyONE system.

2\. Go to \*\*Plugins » Git\*\*.

3\. Click on Add new Repository.

&nbsp;  The repository settings are displayed.

4\. Enter the \[\*\*plentyShop LTS repository URL\*\*](https://github.com/plentymarkets/plugin-ceres) as well as \*any\* user name and token into the respective fields.

5\. Change the branch you want to check our during installation to either \*\*stable\*\* or \*\*beta\*\*. See below for more information on the various branches.

6\. \*\*Save\*\* the settings.

&nbsp;  PlentyONE checks and establishes the connection to the Git repository.



Repeat the above steps for the \[\*\*IO plugin\*\*](https://github.com/plentymarkets/plugin-io). Once you have added both plugins, install them in a plugin set:



7\. Go to \*\*Plugins » Plugin overview\*\*.

8\. Select the plugin set you want to work in or create a new one via the \*\*Create new set\*\* button.

9\. Filter for uninstalled plugins, then install the newly added plentyShop LTS and IO plugins one after the other.

&nbsp;  \*\*NOTE\*\* that you cannot install these plugins if you have already installed the Marketplace versions in the same set.

10\. Change the \*\*Position\*\* of the plugins, so that IO has the highest value and plentyShop LTS the second highest.

11\. Click on \*\*Save \& publish plugin set\*\*.



\## plentyShop LTS release cycle



Two branches of the plentyShop LTS and IO repositories are important to describe the release cycle of the design: \*\*Development\*\*, \*\*Beta\*\* and \*\*Stable\*\*.



| \*\*Branch\*\* | \*\*Description\*\* |

|------------|-----------------|

| \*\*Beta\*\* | The \*\*Beta\*\* branch is the main branch for PlentyONE 7 systems in beta status. It is recommended to use the \*\*Beta\*\* branches of our repositories for a beta system. The \*\*Stable\*\* branches will also work with beta systems, but certain features or fixes released when \*\*Development\*\* branches are merged into the \*\*Beta\*\* branches are not available in \*\*Stable\*\* branches yet. The \*\*Beta\*\* branches will be merged into \*\*Stable\*\* approx. every 2 weeks and the new \*\*Stable\*\* branches will be released. |

| \*\*Stable\*\* | The \*\*Stable\*\* branch are the main branch for PlentyONE 7 systems in stable status. It is recommended to use the \*\*Stable\*\* branches of our repositories for a stable system. The \*\*Beta\*\* branches will not necessarily work with stable systems. It is possible that certain menus or features of PlentyONE do not work if you check out and use \*\*Beta\*\* branches in a stable system. Approx. every 2 weeks, the new \*\*Stable\*\* branches will be released. |

| \*\*Other branches\*\* | Other branches of our repositories are work-in-progress branches of PlentyONE developers. It is not recommended to use these branches in a beta or stable system. |

