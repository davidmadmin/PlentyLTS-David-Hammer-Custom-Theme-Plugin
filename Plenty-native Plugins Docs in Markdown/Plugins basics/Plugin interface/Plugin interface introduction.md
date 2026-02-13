\# Plugin Interface Introduction



\## Overview



The plugin interface allows you to develop plugin functionality by accessing plentymarkets core functions. Before developing your first plugin, you should have basic knowledge of the interfaces listed below.



\## Available interfaces



| Interface | Description |

|-----------|-------------|

| \[\*\*Account\*\*](https://developers.plentymarkets.com/en-gb/interface/stable7/Account.html) | Contains contracts and repositories for contact and address data. |

| \[\*\*Accounting\*\*](https://developers.plentymarkets.com/en-gb/interface/stable7/Accounting.html) | Interface for VAT. |

| \[\*\*Authentication\*\*](https://developers.plentymarkets.com/en-gb/interface/stable7/Authentication.html) | Interface for authentication and authorisation, containing the sub-module \*\*Contracts\*\* for contracts. |

| \[\*\*Authorization\*\*](https://developers.plentymarkets.com/en-gb/interface/stable7/Authorization.html) | Interface for authorisations. |

| \[\*\*Backend\*\*](https://developers.plentymarkets.com/en-gb/interface/stable7/Backend.html) | Interface for the plentymarkets back end. Contains models and services, such as extensions, notifications and UI-related tools. |

| \[\*\*Basket\*\*](https://developers.plentymarkets.com/en-gb/interface/stable7/Basket.html) | Contains contracts for the shopping cart as well as the sub-modules for basket items and discounts. |

| \[\*\*Blog\*\*](https://developers.plentymarkets.com/en-gb/interface/stable7/Blog.html) | Interface for the blog. |

| \[\*\*Board\*\*](https://developers.plentymarkets.com/en-gb/interface/stable7/Board.html) | Interface for task management. |

| \[\*\*Campaign\*\*](https://developers.plentymarkets.com/en-gb/interface/stable7/Campaign.html) | Interface for campaigns. |

| \[\*\*Category\*\*](https://developers.plentymarkets.com/en-gb/interface/stable7/Category.html) | Interface with sub-modules and models for categories. |

| \[\*\*Cloud\*\*](https://developers.plentymarkets.com/en-gb/interface/stable7/Cloud.html) | Interface for cloud services, e.g. ElasticSearch and Storage. |

| \[\*\*Comment\*\*](https://developers.plentymarkets.com/en-gb/interface/stable7/Comment.html) | Contains the comment model. |

| \[\*\*ContentBuilder\*\*](https://developers.plentymarkets.com/en-gb/interface/stable7/ContentBuilder.html) | Interface for the content builder. |

| \[\*\*ContentCache\*\*](https://developers.plentymarkets.com/en-gb/interface/stable7/ContentCache.html) | Interface for the content cache. |

| \[\*\*Cron\*\*](https://developers.plentymarkets.com/en-gb/interface/stable7/Cron.html) | Interface for accessing cron jobs. |

| \[\*\*CustomerContract\*\*](https://developers.plentymarkets.com/en-gb/interface/stable7/CustomerContract.html) | Interface for customer contracts. |

| \[\*\*Data\*\*](https://developers.plentymarkets.com/en-gb/interface/stable7/Data.html) | Contains the data model. |

| \[\*\*DataExchange\*\*](https://developers.plentymarkets.com/en-gb/interface/stable7/DataExchange.html) | Interface for exchanging data. Contains models for export and filters. |

| \[\*\*DeleteLog\*\*](https://developers.plentymarkets.com/en-gb/interface/stable7/DeleteLog.html) | Interface for the delete log. |

| \[\*\*Document\*\*](https://developers.plentymarkets.com/en-gb/interface/stable7/Document.html) | Contains the document model. |

| \[\*\*ElasticSync\*\*](https://developers.plentymarkets.com/en-gb/interface/stable7/ElasticSync.html) | Interface for ElasticSync. |

| \[\*\*EventProcedures\*\*](https://developers.plentymarkets.com/en-gb/interface/stable7/EventProcedures.html) | Interface with events and services for event procedures. |

| \[\*\*Facet\*\*](https://developers.plentymarkets.com/en-gb/interface/stable7/Facet.html) | Interface for facets. |

| \[\*\*Feedback\*\*](https://developers.plentymarkets.com/en-gb/interface/stable7/Feedback.html) | Interface for feedbacks. |

| \[\*\*Frontend\*\*](https://developers.plentymarkets.com/en-gb/interface/stable7/Frontend.html) | Interface with services for the online store. |

| \[\*\*Helper\*\*](https://developers.plentymarkets.com/en-gb/interface/stable7/Helper.html) | Interface with contracts, models and services for helpers. |

| \[\*\*Item\*\*](https://developers.plentymarkets.com/en-gb/interface/stable7/Item.html) | Contains sub-modules for attributes, availability, item and variation data, manufacturers, shipping and units. |

| \[\*\*ItemSet\*\*](https://developers.plentymarkets.com/en-gb/interface/stable7/ItemSet.html) | Interface for item sets. Contains methods to get and create item sets and item set components. |

| \[\*\*Listing\*\*](https://developers.plentymarkets.com/en-gb/interface/stable7/Listing.html) | Interface for listings. |

| \[\*\*LiveShopping\*\*](https://developers.plentymarkets.com/en-gb/interface/stable7/LiveShopping.html) | Interface for LiveShopping. |

| \[\*\*Market\*\*](https://developers.plentymarkets.com/en-gb/interface/stable7/Market.html) | Contains the sub-module \*\*Ebay\*\* for fitments and fitment items. |

| \[\*\*Messenger\*\*](https://developers.plentymarkets.com/en-gb/interface/stable7/Messenger.html) | Interface for the messenger. |

| \[\*\*Order\*\*](https://developers.plentymarkets.com/en-gb/interface/stable7/Order.html) | Contains contracts and models for orders and order items as well as the sub-modules \*\*Currency\*\*, \*\*Payment\*\* and \*\*Shipping\*\*. This interface is the counterpart to the PlentyONE order module. |

| \[\*\*Payment\*\*](https://developers.plentymarkets.com/en-gb/interface/stable7/Payment.html) | Contains the sub-modules for payment methods, the payment history, as well as contracts and models for payments and payment properties. |

| \[\*\*Pim\*\*](https://developers.plentymarkets.com/en-gb/interface/stable7/Pim.html) | Interface for prices. |

| \[\*\*plentyMarketplace\*\*](https://developers.plentymarkets.com/en-gb/interface/stable7/PlentyMarketplace.html) | Interface for plentyMarketplace. |

| \[\*\*Plugin\*\*](https://developers.plentymarkets.com/en-gb/interface/stable7/Plugin.html) | Contains the sub-modules for storing data in a plugin database or accessing external SDKs. |

| \[\*\*PluginMultilingualism\*\*](https://developers.plentymarkets.com/en-gb/interface/stable7/PluginMultilingualism.html) | Interface for multilingualism. |

| \[\*\*Property\*\*](https://developers.plentymarkets.com/en-gb/interface/stable7/Property.html) | Interface for properties. |

| \[\*\*Report\*\*](https://developers.plentymarkets.com/en-gb/developers/main/plugin-interface/interface-introduction.html#stable7@interface::Report.adoc) | Interface for reports. |

| \[\*\*ShopBuilder\*\*](https://developers.plentymarkets.com/en-gb/interface/stable7/ShopBuilder.html) | Interface for ShopBuilder. |

| \[\*\*StockManagement\*\*](https://developers.plentymarkets.com/en-gb/interface/stable7/StockManagement.html) | Contains contracts and models for stock management and storage data. |

| \[\*\*System\*\*](https://developers.plentymarkets.com/en-gb/interface/stable7/System.html) | Contains the \*\*Webstore\*\* model. |

| \[\*\*Tag\*\*](https://developers.plentymarkets.com/en-gb/interface/stable7/Tag.html) | Interface for tags. |

| \[\*\*Template\*\*](https://developers.plentymarkets.com/en-gb/interface/stable7/Template.html) | Contains contracts and models for the design and design configuration. |

| \[\*\*Ticket\*\*](https://developers.plentymarkets.com/en-gb/interface/stable7/Ticket.html) | Contains contracts and models related to the PlentyONE ticket system. |

| \[\*\*User\*\*](https://developers.plentymarkets.com/en-gb/interface/stable7/User.html) | Interface for users. |

| \[\*\*Warehouse\*\*](https://developers.plentymarkets.com/en-gb/interface/stable7/Warehouse.html) | Interface for warehouses. |

| \[\*\*Webshop\*\*](https://developers.plentymarkets.com/en-gb/interface/stable7/Webshop.html) | Interface for the online store. |

| \[\*\*Wizard\*\*](https://developers.plentymarkets.com/en-gb/interface/stable7/Wizard.html) | Interface for assistants. |

| \[\*\*Miscellaneous\*\*](https://developers.plentymarkets.com/en-gb/interface/stable7/Miscellaneous.html) | Contains interfaces that cannot be organised in the listed interfaces. |

