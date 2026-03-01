<?php

namespace HammerTheme\Widgets\Header;

use Ceres\Widgets\Helper\BaseWidget;
use Ceres\Widgets\Helper\Factories\WidgetDataFactory;
use Ceres\Widgets\Helper\WidgetTypes;

class HammerHeaderWidget extends BaseWidget
{
    protected $template = 'HammerTheme::Widgets.Header.HammerHeaderWidget';

    public function getData(): array
    {
        return WidgetDataFactory::make('HammerTheme::HeaderWidget')
            ->withLabel("David's Custom Header")
            ->withPreviewImageUrl('/images/widgets/hammer-header.svg')
            ->withType(WidgetTypes::HEADER)
            ->withCategory('header')
            ->withPosition(100)
            ->toArray();
    }

    public function getSettings(): array
    {
        return [
            'logoLink' => [
                'type' => 'text',
                'required' => false,
                'defaultValue' => '/',
                'options' => [
                    'name' => 'Logo target path',
                    'tooltip' => 'Relative path or URL for the logo link'
                ]
            ],
            'wishlistIconUrl' => [
                'type' => 'text',
                'required' => false,
                'defaultValue' => '',
                'options' => [
                    'name' => 'Merkliste icon URL',
                    'tooltip' => 'Optional image URL (svg, png, jpg, jpeg, webspace/upload). Uses default icon when empty.'
                ]
            ],
            'accountIconUrl' => [
                'type' => 'text',
                'required' => false,
                'defaultValue' => '',
                'options' => [
                    'name' => 'Account icon URL',
                    'tooltip' => 'Optional image URL (svg, png, jpg, jpeg, webspace/upload). Uses default icon when empty.'
                ]
            ],
            'basketIconUrl' => [
                'type' => 'text',
                'required' => false,
                'defaultValue' => '',
                'options' => [
                    'name' => 'Basket icon URL',
                    'tooltip' => 'Optional image URL (svg, png, jpg, jpeg, webspace/upload). Uses default icon when empty.'
                ]
            ],
            'contactPhoneIconUrl' => [
                'type' => 'text',
                'required' => false,
                'defaultValue' => '',
                'options' => [
                    'name' => 'Contact phone icon URL',
                    'tooltip' => 'Optional image URL (svg, png, jpg, jpeg, webspace/upload). Uses default icon when empty.'
                ]
            ],
            'contactMailIconUrl' => [
                'type' => 'text',
                'required' => false,
                'defaultValue' => '',
                'options' => [
                    'name' => 'Contact mail icon URL',
                    'tooltip' => 'Optional image URL (svg, png, jpg, jpeg, webspace/upload). Uses default icon when empty.'
                ]
            ]
        ];
    }
}
