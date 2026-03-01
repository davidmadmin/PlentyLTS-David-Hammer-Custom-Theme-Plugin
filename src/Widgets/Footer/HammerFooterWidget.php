<?php

namespace HammerTheme\Widgets\Footer;

use Ceres\Widgets\Helper\BaseWidget;
use Ceres\Widgets\Helper\Factories\WidgetDataFactory;
use Ceres\Widgets\Helper\WidgetTypes;

class HammerFooterWidget extends BaseWidget
{
    protected $template = 'HammerTheme::Widgets.Footer.HammerFooterWidget';

    public function getData(): array
    {
        return WidgetDataFactory::make('HammerTheme::FooterWidget')
            ->withLabel("David's Custom Footer")
            ->withType(WidgetTypes::FOOTER)
            ->withCategory('footer')
            ->withPosition(100)
            ->toArray();
    }

    public function getSettings(): array
    {
        return [
            'bottomText' => [
                'type' => 'text',
                'required' => false,
                'defaultValue' => '© 2002–2026 ACME CORP Shop | ACME INC. Alle Rechte vorbehalten.',
                'options' => [
                    'name' => 'Footer copyright text',
                    'tooltip' => 'Editable bottom line text for the footer widget'
                ]
            ]
        ];
    }
}
