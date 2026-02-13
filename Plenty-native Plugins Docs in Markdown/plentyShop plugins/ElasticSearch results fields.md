# plentyShop plugins → ElasticSearch results fields

## Item information

The following table lists the result fields pertaining to items.

| Result field | Description |

|---|---|

| item.defaultShippingCost | Contains the default shipping costs of the item in the system currency. |

| item.updatedAt | Contains the timestamp of when the item was last updated. |

| item.freeTextFields.lang | Contains the language of the free text field in ISO 639-1 format. |

| item.freeTextFields.free{Number} | Contains the value of the free text field, where {Number} is replaced by the id of the free text field. |

| item.id | Contains the id of the item. |

| item.customsTariffNumber | Contains the customs tariff number of the item. |

| item.maximumOrderQuantity | Contains the maximum order quantity of the item. |

| item.manufacturer.id | Contains the id of the item's manufacturer. |

| item.manufacturer.name | Contains the name of the item's manufacturer. |

| item.manufacturer.externalName | Contains the external name of the manufacturer. |

| item.manufacturer.logo | Contains the logo URL of the manufacturer. |

| item.manufacturer.url | Contains the homepage URL of the manufacturer. |

| item.manufacturer.street | Contains the street of the manufacturer. |

| item.manufacturer.houseNo | Contains the house number of the manufacturer. |

| item.manufacturer.postcode | Contains the postcode of the manufacturer. |

| item.manufacturer.town | Contains the town of the manufacturer. |

| item.manufacturer.phoneNumber | Contains the phone number of the manufacturer. |

| item.manufacturer.faxNumber | Contains the fax number of the manufacturer. |

| item.manufacturer.email | Contains the email address of the manufacturer. |

| item.manufacturer.countryId | Contains the country ID of the manufacturer. |

| item.manufacturer.pixmaniaCategoryId | Contains the Pixmania ID of the manufacturer. |

| item.manufacturer.neckermannAtEpCategoryId | Contains the Neckermann.at enterprise ID of the manufacturer. |

| item.manufacturer.laRedouteCategoryId | Contains the LaRedoute.fr ID of the manufacturer. |

| item.manufacturer.position | Contains the position of the manufacturer. |

| item.manufacturer.comment | Contains the comment saved for the manufacturer. |

| item.manufacturer.updatedAt | Contains the timestamp of when the manufacturer data was last updated. |

| item.storeSpecial.id | Contains the id of the store special. |

| item.storeSpecial.createdAt | Contains the timestamp of when the store special was created. |

| item.storeSpecial.updatedAt | Contains the timestamp of when the store special was last updated. |

| item.minimumOrderQuantity | Contains the minimum order quantity of the item. |

| item.producingCountry.isoCode2 | Contains the ISO2 code of the item's producing country. |

| item.producingCountry.isoCode3 | Contains the ISO3 code of the item's producing country. |

| item.producingCountry.names.name | Contains the name of the producing country. |

| item.producingCountry.names.lang | Contains the language of the name of the producing country. |

| item.producingCountry.id | Contains the id of the producing country. |

| item.producingCountry.isActive | Contains a Boolean that returns true if the producing country is active. |

| item.producingCountry.isEu | Contains a Boolean that returns true if the producing country is in the EU. |

| item.producingCountry.shippingDestinationId | Contains the ID of the producing country's shipping destination. |

| item.condition.id | Contains the id of the item condition. |

| item.condition.names.name | Contains the name of the item condition. |

| item.condition.names.lang | Contains the language of the name of the item condition. |

| item.condition.position | Contains the position of the item condition. |

| item.ageRestriction | Contains the age restriction of the item. |

| item.createdAt | Contains the timestamp of when the item was created. |

| item.itemType | Contains the item type. |

| item.ownerID | Contains the owner id of the item. |

| item.manufacturerId | Contains the id of the item's manufacturer. This is equivalent to the information contained in item.manufacturer.id. |

| item.revenueAccount | Contains the revenue account of the item. |

## Item texts

The following table lists the result fields pertaining to item texts.

| Result field | Description |

|---|---|

| texts.lang | Contains the language of the item texts in ISO 639-1 format. |

| texts.name1 | Contains the first name of the item. |

| texts.name2 | Contains the second name of the item. |

| texts.name3 | Contains the third name of the item. |

| texts.shortDescription | Contains the item's short description. |

| texts.description | Contains the item's description. |

| texts.technicalData | Contains the item's technical data. |

| texts.urlPath | Contains the URL path of the item. |

| texts.metaDescription | Contains the item's meta description. |

| texts.keywords | Contains the item's keywords. |

## Attribute values

The following table lists the result fields pertaining to attribute values.

| Result field | Description |

|---|---|

| attributes.attributeId | Contains the id of the attribute. |

| attributes.valueId | Contains the id of the attribute value. |

| attributes.names.name | Contains the name of the attribute. |

| attributes.names.lang | Contains the language of the name of the attribute. |

| attributes.values.value | Contains the value of the attribute. |

| attributes.values.lang | Contains the language of the value of the attribute. |

## Item images

The following table lists the result fields pertaining to item images.

| Result field | Description |

|---|---|

| images.all[].itemId | Contains the item id for the image. |

| images.all[].type | Contains the image type. |

| images.all[].fileType | Contains the file type of the image. |

| images.all[].path | Contains the image path in the webspace. |

| images.all[].position | Contains the position of the image. |

| images.all[].lastUpdateTimestamp | Contains the timestamp of when the image was last updated. |

| images.all[].createdAt | Contains the timestamp of when the image was created. |

| images.all[].updatedAt | Contains the timestamp of when the image was last updated. |

| images.all[].url | Contains the URL to the image. |

| images.all[].urlMiddle | Contains the URL to the middle-sized preview image. |

| images.all[].urlPreview | Contains the URL to the preview image. |

| images.all[].urlSecondPreview | Contains the URL to the second preview image. |

| images.all[].height | Contains the height of the image in pixels. |

| images.all[].width | Contains the width of the image in pixels. |

| images.all[].md5Checksum | Contains the md5 hash of the image. |

| images.all[].md5ChecksumOriginal | Contains the md5 hash of the original image. |

| images.all[].size | Contains the file size of the image in bytes. |

| images.all[].storageProviderId | Contains the storage provider id of the image. |

| images.all[].names[].name | Contains the names of the image. The image can have names in multiple languages. Separated by array. |

| images.all[].names[].alternate | Contains alternate image names. |

| images.all[].availabilities[].type | Contains an indicator for the type of the images availability. |

| images.all[].availabilities[].value | Contains an indicator for the value of the images availability. |

| images.variation[{Number}].itemId | Contains the item id for the images of the variation with the id {Number}. |

| images.variation[{Number}].type | Contains the image type. |

| images.variation[{Number}].fileType | Contains the file type of the image. |

| images.variation[{Number}].path | Contains the image path in the webspace. |

| images.variation[{Number}].position | Contains the position of the image. |

| images.variation[{Number}].lastUpdateTimestamp | Contains the timestamp of when the image was last updated. |

| images.variation[{Number}].createdAt | Contains the timestamp of when the image was created. |

| images.variation[{Number}].updatedAt | Contains the timestamp of when the image was last updated. |

| images.variation[{Number}].url | Contains the URL to the image. |

| images.variation[{Number}].urlMiddle | Contains the URL to the middle-sized preview image. |

| images.variation[{Number}].urlPreview | Contains the URL to the preview image. |

| images.variation[{Number}].urlSecondPreview | Contains the URL to the second preview image. |

| images.variation[{Number}].height | Contains the height of the image in pixels. |

| images.variation[{Number}].width | Contains the width of the image in pixels. |

| images.variation[{Number}].md5Checksum | Contains the md5 hash of the image. |

| images.variation[{Number}].md5ChecksumOriginal | Contains the md5 hash of the original image. |

| images.variation[{Number}].size | Contains the file size of the image in bytes. |

| images.variation[{Number}].storageProviderId | Contains the storage provider id of the image. |

| images.variation[{Number}].names[].name | Contains the names of the image. The image can have names in multiple languages. Separated by array. |

| images.variation[{Number}].names[].alternate | Contains alternate image names. |

| images.variation[{Number}].availabilities[].type | Contains an indicator for the type of the images availability. |

| images.variation[{Number}].availabilities[].value | Contains an indicator for the value of the images availability. |

| images.item.itemId | Contains the item id for the item images. |

| images.item.type | Contains the image type. |

| images.item.fileType | Contains the file type of the image. |

| images.item.path | Contains the image path in the webspace. |

| images.item.position | Contains the position of the image. |

| images.item.lastUpdateTimestamp | Contains the timestamp of when the image was last updated. |

| images.item.createdAt | Contains the timestamp of when the image was created. |

| images.item.updatedAt | Contains the timestamp of when the image was last updated. |

| images.item.url | Contains the URL to the image. |

| images.item.urlMiddle | Contains the URL to the middle-sized preview image. |

| images.item.urlPreview | Contains the URL to the preview image. |

| images.item.urlSecondPreview | Contains the URL to the second preview image. |

| images.item.height | Contains the height of the image in pixels. |

| images.item.width | Contains the width of the image in pixels. |

| images.item.md5Checksum | Contains the md5 hash of the image. |

| images.item.md5ChecksumOriginal | Contains the md5 hash of the original image. |

| images.item.size | Contains the file size of the image in bytes. |

| images.item.storageProviderId | Contains the storage provider id of the image. |

| images.item.names[].name | Contains the names of the image. The image can have names in multiple languages. Separated by array. |

| images.item.names[].alternate | Contains alternate image names. |

| images.item.availabilities[].type | Contains an indicator for the type of the images availability. |

| images.item.availabilities[].value | Contains an indicator for the value of the images availability. |

## Sales prices

The following table lists the result fields pertaining to sales prices.

| Result field | Description |

|---|---|

| salesPrices[0].price | Contains the value of the sales price. |

| salesPrices[0].priceNet | Contains the net value of the sales price. |

| salesPrices[0].basePrice | Contains the base price. |

| salesPrices[0].basePriceNet | Contains the net base price. |

| salesPrices[0].unitPrice | Contains the unit price. |

| salesPrices[0].unitPriceNet | Contains the net unit price. |

| salesPrices[0].lowestPrice | Contains the lowest price. |

| salesPrices[0].lowestPriceNet | Contains the net lowest price. |

| salesPrices[0].customerClassDiscountPercent | Contains the customer class discount in percent. |

| salesPrices[0].customerClassDiscount | Contains the customer class discount. |

| salesPrices[0].customerClassDiscountNet | Contains the net customer class discount. |

| salesPrices[0].categoryDiscountPercent | Contains the category discount in percent. |

| salesPrices[0].categoryDiscount | Contains the category discount. |

| salesPrices[0].categoryDiscountNet | Contains the net category discount. |

| salesPrices[0].vatId | Contains the id of the VAT configuration. |

| salesPrices[0].vatValue | Contains the value of the VAT configuration in percent. |

| salesPrices[0].currency | Contains the currency of the sales price. |

| salesPrices[0].interval | Contains the subscription interval. |

| salesPrices[0].conversionFactor | Contains the conversion factor of the unit of the price. |

| salesPrices[0].minimumOrderQuantity | Contains the minimum order quantity for the sales price. |

| salesPrices[0].updatedAt | Contains the timestamp of when the sales price was last updated. |

| salesPrices[0].type | Contains the type of the price. "default" = Normal price, "rrp" = Recommended retail price, "set" = Set price, "specialOffer" = Special offer price. |

| salesPrices[0].pricePosition | Contains the position of the sales price. |

| salesPrices[0].priceId | Contains the id of the sales price. |

| salesPrices[0].names.nameInternal | Contains the internal name of the sales price. |

| salesPrices[0].names.nameExternal | Contains the external name of the sales price. |

| salesPrices[0].names.lang | Contains the language of the name of the sales price. |

| salesPrices[0].priceReturnItem | Contains the return price of the item. |

## Facets

The following table lists the result fields pertaining to facets.

| Result field | Description |

|---|---|

| facets.id | Contains the id of the facet. |

| facets.type | Contains the type of the facet. |

| facets.position | Contains the position of the facet. |

| facets.minHitCount | Contains the minimum number of hits a facet value must have in order to be returned. |

| facets.maxResultCount | Contains the maximum number of facet values to return. |

| facets.sort | Contains the sorting of facet values. |

| facets.names.name | Contains the name of the facet. |

| facets.names.lang | Contains the language of the name of the facet. |

| facets.values.id | Contains the id of the facet value. |

| facets.values.position | Contains the position of the facet value. |

| facets.values.names.name | Contains the name of the facet value. |

| facets.values.names.lang | Contains the language of the name of the facet value. |

## Barcodes

The following table lists the result fields pertaining to barcodes.

| Result field | Description |

|---|---|

| barcodes.code | Contains the barcode itself. |

| barcodes.type | Contains the type of the barcode. |

| barcodes.createdAt | Contains the timestamp of when the barcode was created. |

| barcodes.updatedAt | Contains the timestamp of when the barcode was last updated. |

## Default categories

The following table lists the result fields pertaining to default categories.

| Result field | Description |

|---|---|

| defaultCategories[0].id | Contains the id of the default category. |

| defaultCategories[0].parentCategoryId | Contains the id of the parent category. |

| defaultCategories[0].level | Contains the category level. |

| defaultCategories[0].type | Contains the category type. |

| defaultCategories[0].linklist | Contains a Boolean that returns true if the category is displayed in the navigation. |

| defaultCategories[0].right | Contains the right limit of the nested set model. |

| defaultCategories[0].sitemap | Contains a Boolean that returns true if the category is displayed in the sitemap. |

| defaultCategories[0].updatedAt | Contains the timestamp of when the category was last updated. |

| defaultCategories[0].plentyId | Contains the plenty id of the category. |

| defaultCategories[0].details.categoryId | Contains the category id. |

| defaultCategories[0].details.lang | Contains the language of the category detail. |

| defaultCategories[0].details.name | Contains the name of the category. |

| defaultCategories[0].details.name2 | Contains the second name of the category. |

| defaultCategories[0].details.shortDescription | Contains the short description of the category. |

| defaultCategories[0].details.description | Contains the description of the category. |

| defaultCategories[0].details.description2 | Contains the second description of the category. |

| defaultCategories[0].details.metaKeywords | Contains the meta keywords of the category. |

| defaultCategories[0].details.metaDescription | Contains the meta description of the category. |

| defaultCategories[0].details.nameUrl | Contains the URL name of the category. |

| defaultCategories[0].details.metaTitle | Contains the meta title of the category. |

| defaultCategories[0].details.image | Contains the image of the category. |

| defaultCategories[0].details.imagePath | Contains the image path of the category. |

| defaultCategories[0].details.image2 | Contains the second image of the category. |

| defaultCategories[0].details.image2Path | Contains the second image path of the category. |

| defaultCategories[0].details.plentyId | Contains the plenty id of the category. |

## Item properties

The following table lists the result fields pertaining to item properties.

| Result field | Description |

|---|---|

| properties.property.id | Contains the id of the property. |

| properties.property.position | Contains the position of the property. |

| properties.property.propertyGroupId | Contains the property group id of the property. |

| properties.property.unit | Contains the unit of the property. |

| properties.property.backendName | Contains the backend name of the property. |

| properties.property.comment | Contains the comment of the property. |

| properties.property.isSearchable | Contains a Boolean that returns true if the property is searchable. |

| properties.property.isOderProperty | Contains a Boolean that returns true if the property is an order property. |

| properties.property.isShownOnItemPage | Contains a Boolean that returns true if the property is shown on the item page. |

| properties.property.isShownOnItemList | Contains a Boolean that returns true if the property is shown in the item list. |

| properties.property.isShownAtCheckout | Contains a Boolean that returns true if the property is shown at checkout. |

| properties.property.isShownInPdf | Contains a Boolean that returns true if the property is shown in PDF documents. |

| properties.property.updatedAt | Contains the timestamp of when the property was last updated. |

| properties.property.cast | Contains the cast of the property. |

| properties.property.names.propertyId | Contains the id of the property. |

| properties.property.names.lang | Contains the language of the name of the property. |

| properties.property.names.name | Contains the name of the property. |

| properties.property.names.description | Contains the description of the property. |

| properties.texts.value | Contains the value of a text property. |

| properties.texts.lang | Contains the language of the text property value. |

| properties.selection.id | Contains the id of the property selection. |

| properties.selection.lang | Contains the language of the property selection. |

| properties.selection.name | Contains the name of the property selection. |

| properties.selection.description | Contains the description of the property selection. |

## Tags

The following table lists the result fields pertaining to tags.

| Result field | Description |

|---|---|

| tags.tagId | Contains the id of the tag. |

| tags.tagName | Contains the name of the tag. |

| tags.color | Contains the color of the tag in hexadecimal format. |

## Units

The following table lists the result fields pertaining to units.

| Result field | Description |

|---|---|

| unit.unitOfMeasurement | Contains the ISO-code of the unit of measurement. |

| unit.createdAt | Contains the timestamp of when the unit was created. |

| unit.names.name | Contains the name of the unit. |

| unit.names.unitId | Contains the id of the unit. |

| unit.names.lang | Contains the language of the name of the unit. |

| unit.id | Contains the id of the unit. This is equivalent to the information contained in unit.names.unitId |

| unit.position | Contains the position of the unit. |

| unit.isDecimalPlacesAllowed | Contains a Boolean that returns true if the unit allows the use of decimal places in its quanitification. |

| unit.content | Contains the number of units. |

| unit.updatedAt | Contains the timestamp of when the unit was last updated. |

## Variation information

The following table lists the result fields pertaining to variations of an item.

| Result field | Description |

|---|---|

| variation.intervalOrderQuantity | Contains the interval order quantity of the variation. |

| variation.stockLimitation | Contains an the variation's stock limitation. 0 = None, 1 = To net stock, 2 = Do not administer stock for this variation. |

| variation.minimumOrderQuantity | Contains the minimum order quantity of the variation. |

| variation.isUnavailableIfNetStockIsNotPositive | Contains a Boolean that states whether the variation is unavailable if the net stock is not positive. |

| variation.packingUnits | Contains the number of packing units of the variation. |

| variation.purchasePrice | Contains the net purchase price of the variation. |

| variation.isActive | Contains a Boolean that returns true when the variation is active. |

| variation.widthMM | Contains the width of the variation in millimeter. |

| variation.number | Contains the variation number as defined in the variation's basic settings. |

| variation.createdAt | Contains the timestamp of when the variation was created. |

| variation.availableUntil | Contains the timestamp of when the variation will become unavailable. |

| variation.isInvisibleIfNetStockIsNotPositive | Contains a Boolean that returns true when the variation is invisible if its net stock is not positive. |

| variation.weightG | Contains the variation's weight in gramme. |

| variation.customs | Contains the value in percent for customs. |

| variation.model | Contains the model name of the variation. |

| variation.id | Contains the variation id. |

| variation.updatedAt | Contains the timestamp of when the variation was last updated. |

| variation.extraShippingCharge1 | Contains the first extra shipping charge in the standard currency of your PlentyONE system. |

| variation.extraShippingCharge2 | Contains the second extra shipping charge in the standard currency of your PlentyONE system. |

| variation.isMain | Contains a Boolean that returns true if the current variation is the main variation. |

| variation.picking | Contains the order picking settings for the variation. |

| variation.palletTypeId | Contains the id of the pallet type. |

| variation.isVisibleIfNetStockIsPositive | Contains a Boolean that returns true when the variation is visible if its net stock is positive. |

| variation.itemId | Contains the id of the item the variation derives from. |

| variation.operatingCosts | Contains the variations operating costs in percent. |

| variation.mainWarehouseId | Contains the id of the variation's main warehouse. |

| variation.name | Contains the name of the variation. |

| variation.activeChildren | Contains the number of active child variations. |

| variation.position | Contains the position of the variation. |

| variation.mayShowUnitPrice | Contains a Boolean that returns true if the unit price is displayed. |

| variation.releasedAt | Contains the variation's release date and time. |

| variation.weightNetG | Contains the variation's net weight in gramme. |

| variation.transportationCosts | Contains the variation's transportation costs. |

| variation.packingUnitTypeId | Contains the id of the variation's packing unit type. |

| variation.isAvailableIfNetStockIsPositive | Contains a Boolean that returns true if the variation is available if the net stock is positive. |

| variation.isHiddenInCategoryList | Contains a Boolean that returns true if the variation is hidden in the category list. |

| variation.availability.averageDays | Contains the average number delivery period of the variation in days. |

| variation.availability.names.name | Contains the name of the variation's availability. |

| variation.availability.names.lang | Contains the language of the name of the variation's availability. |

| variation.availability.id | Contains the id of the variation's availability. |

| variation.availability.id | Contains the id of the variation's availability. |

| variation.bundleType | Returns "bundle_item" if the variation is part of an item bundle. |

| variation.maximumOrderQuantity | Contains the maximum order quantity of the variation. |

| variation.unitsContained | Contains the number of units contained in the variation, as per the settings in the dimensions area in the backend. |

| variation.salesRank | Contains the sales rank of the variation, from which the position in the top seller list is derived. |

| variation.heightMM | Contains the height of the variation in millimeter. |

| variation.externalId | Contains the external id of the variation. |

| variation.priceCalculationId | Contains the id of the price calculation. Returns null if no price calculation has been selected. |

| variation.defaultShippingCosts | Contains the default shipping costs of the variation. |

| variation.lengthMM | Contains the length of the variation in millimeter. |

| variation.storageCosts | Contains the storage costs of the variation. |

| variation.movingAveragePrice | Contains the moving average purchase net price of the variation. |

| variation.movingAveragePrice | Contains the moving average purchase net price of the variation. |

## Variation property groups

The following table lists the result fields pertaining to variation property groups.

| Result field | Description |

|---|---|

| variationPropertyGroups[0].names.name | Contains the name of the property group. |

| variationPropertyGroups[0].names.description | Contains the description of the property group. |

| variationPropertyGroups[0].names.lang | Contains the language of the name and the description of the property group. |

| variationPropertyGroups[0].id | Contains the id of the property group. |

| variationPropertyGroups[0].position | Contains the position of the property group. |
