\# Multilingual configuration



When creating a plugin configuration, you have to supply the properties `label`, `caption` and `tooltip` in multiple languages. German and English are required.



\*\*\_Note:\_\*\* Every translation key must feature the prefix `Config.`.



```

{

&nbsp;  "tab"       : "Config.globalTab",

&nbsp;  "key"       : "header.company\_name",

&nbsp;  "label"     : "Config.globalHeaderCompanyName",

&nbsp;  "type"      : "text",

&nbsp;  "default"   : "Ceres Webshop"

}

```



\## Using separate translation files



To use the multiligualism functionality to its full extent, you have to use separate translation files for each language you want to provide. In addition, the files have to be stored in the correct folder structure. For example, use `resources/lang/de` for German and `resources/lang/en` for English. The translation file in each folder has to be named `Config.properties`.



\*\*\_PluginXY/resources/lang/de/Config.properties\_\*\*



```

globalTab=Global

globalHeaderCompanyName=Name Ihres Geschäfts

globalHeaderCompanyLogo=URL des Firmenlogos

globalShippingCostsCategoryId=Kategorie für die Versandinformationen

globalDefaultContactClassB2b=Standard Kundenklasse für B2B

globalEnableOldUrlPattern=Callisto Routen für Artikel aktivieren

contactShopMail=Kontakt E-Mail-Adresse

contactOpeningTimes=Öffnungszeiten (DE)

contactEnOpeningTimes=Öffnungszeiten (EN)

contactShowData=Kontaktdaten anzeigen

contactShowDataValuesName=Firma

contactShowDataValuesCeo=CEO

contactShowDataValuesCity=Stadt

contactShowDataValuesCountry=Land

contactShowDataValuesEmail=E-Mail

contactShowDataValuesFax=Fax

contactShowDataValuesFon=Telefon

contactShowDataValuesHotline=Hotline

contactShowDataValuesStreet=Straße

contactShowDataValuesVatNumber=Steuernummer

contactShowDataValuesZip=PLZ

contactShowDataValuesTimezone=Zeitzone

contactShowDataValuesOpeningTimes=Öffnungszeiten

```



\*\*\_PluginXY/resources/lang/en/Config.properties\_\*\*



```

globalTab=Global

globalHeaderCompanyName=Name of your store

globalHeaderCompanyLogo=URL to your company logo

globalShippingCostsCategoryId=Category to display shipping information

globalDefaultContactClassB2b=Default customer class B2B

globalEnableOldUrlPattern=Enable Callisto route pattern for items

contactShopMail=Contact form email address

contactOpeningTimes=Opening hours (DE)

contactEnOpeningTimes=Opening hours (EN)

contactShowData=Show contact data

contactShowDataValuesName=Company

contactShowDataValuesCeo=CEO

contactShowDataValuesCity=City

contactShowDataValuesCountry=Country

contactShowDataValuesEmail=Email

contactShowDataValuesFax=Fax

contactShowDataValuesFon=Phone

contactShowDataValuesHotline=Hotline

contactShowDataValuesStreet=Street

contactShowDataValuesVatNumber=VAT number

contactShowDataValuesZip=ZIP

contactShowDataValuesTimezone=Time zone

contactShowDataValuesOpeningTimes=Opening hours

```



\### Example of the use of the translation keys



\*\*\_Note:\_\*\* Every translation key must feature the prefix `Config.`.



\*\*\_PluginXY/config.json\_\*\*



```

{

&nbsp;   "tab"                         : "Config.globalTab",

&nbsp;   "key"                         : "contact.show\_data",

&nbsp;   "label"                       : "Config.contactShowData",

&nbsp;   "type"                        : "multi\_select",

&nbsp;   "possibleValues"              :

&nbsp;   {

&nbsp;       "name"                      : "Config.contactShowDataValuesName",

&nbsp;       "ceo"                       : "Config.contactShowDataValuesCeo",

&nbsp;       "city"                      : "Config.contactShowDataValuesCity",

&nbsp;       "country"                   : "Config.contactShowDataValuesCountry",

&nbsp;       "email"                     : "Config.contactShowDataValuesEmail",

&nbsp;       "fax"                       : "Config.contactShowDataValuesFax",

&nbsp;       "hotline"                   : "Config.contactShowDataValuesHotline",

&nbsp;       "street"                    : "Config.contactShowDataValuesStreet",

&nbsp;       "vatNumber"                 : "Config.contactShowDataValuesVatNumber",

&nbsp;       "zip"                       : "Config.contactShowDataValuesZip",

&nbsp;       "timezone"                  : "Config.contactShowDataValuesTimezone",

&nbsp;       "opening\_times"             : "Config.contactShowDataValuesOpeningTimes"

&nbsp;   },

&nbsp;   "default"                     : "street, zip, city, hotline, email, opening\_times"

}

```

