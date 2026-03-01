<?php

namespace HammerTheme\Widgets\Footer;

use Ceres\Widgets\Helper\BaseWidget;
use Ceres\Widgets\Helper\Factories\WidgetDataFactory;
use Ceres\Widgets\Helper\Factories\WidgetSettingsFactory;
use Ceres\Widgets\Helper\WidgetTypes;

class HammerFooterWidget extends BaseWidget
{
    protected $template = 'HammerTheme::Widgets.Footer.HammerFooterWidget';

    public function getData(): array
    {
        return WidgetDataFactory::make('HammerTheme::FooterWidget')
            ->withLabel("David's Custom Footer")
            ->withPreviewImageUrl('/images/widgets/hammer-footer.svg')
            ->withType(WidgetTypes::FOOTER)
            ->withCategory('footer')
            ->withPosition(100)
            ->toArray();
    }

    public function getSettings(): array
    {
        /** @var WidgetSettingsFactory $settings */
        $settings = pluginApp(WidgetSettingsFactory::class);

        $settings->createText('bottomText')
            ->withDefaultValue('© 2002–2026 ACME CORP Shop | ACME INC. Alle Rechte vorbehalten.')
            ->withName('Footer copyright text')
            ->withTooltip('Editable bottom line text for the footer widget');

        $shippingMethods = $settings->createVerticalContainer('shippingMethods')
            ->withList(1)
            ->withName('Shipping methods')
            ->withTooltip('Add shipping methods with label and icon URL. Empty list uses shop defaults.');

        $shippingMethods->children->createText('label')
            ->withName('Shipping method label')
            ->withTooltip('Visible label for the shipping method icon');

        $shippingMethods->children->createText('iconUrl')
            ->withName('Shipping method icon URL')
            ->withTooltip('Absolute URL of the shipping method icon image');

        return $settings->toArray();
    }
}
