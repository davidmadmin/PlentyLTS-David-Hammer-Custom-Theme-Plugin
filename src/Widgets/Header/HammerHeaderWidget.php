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
                'type' => 'file',
                'required' => false,
                'defaultValue' => '',
                'showPreview' => true,
                'options' => [
                    'name' => 'Merkliste icon file',
                    'tooltip' => 'Optional icon file from webspace/upload. Uses default icon when empty.'
                ]
            ],
            'accountIconUrl' => [
                'type' => 'file',
                'required' => false,
                'defaultValue' => '',
                'showPreview' => true,
                'options' => [
                    'name' => 'Account icon file',
                    'tooltip' => 'Optional icon file from webspace/upload. Uses default icon when empty.'
                ]
            ],
            'basketIconUrl' => [
                'type' => 'file',
                'required' => false,
                'defaultValue' => '',
                'showPreview' => true,
                'options' => [
                    'name' => 'Basket icon file',
                    'tooltip' => 'Optional icon file from webspace/upload. Uses default icon when empty.'
                ]
            ],
            'contactPhoneIconUrl' => [
                'type' => 'file',
                'required' => false,
                'defaultValue' => '',
                'showPreview' => true,
                'options' => [
                    'name' => 'Contact phone icon file',
                    'tooltip' => 'Optional icon file from webspace/upload. Uses default icon when empty.'
                ]
            ],
            'contactMailIconUrl' => [
                'type' => 'file',
                'required' => false,
                'defaultValue' => '',
                'showPreview' => true,
                'options' => [
                    'name' => 'Contact mail icon file',
                    'tooltip' => 'Optional icon file from webspace/upload. Uses default icon when empty.'
                ]
            ]
        ];
    }
}
