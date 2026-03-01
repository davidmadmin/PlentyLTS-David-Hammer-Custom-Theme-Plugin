<?php

namespace HammerTheme\Providers;

use HammerTheme\Widgets\Footer\HammerFooterWidget;
use HammerTheme\Widgets\Header\HammerHeaderWidget;
use Plenty\Modules\ShopBuilder\Contracts\ContentWidgetRepositoryContract;
use Plenty\Plugin\ServiceProvider;

class HammerThemeServiceProvider extends ServiceProvider
{
    /**
     * Register the service provider.
     */
    public function register()
    {
    }

    public function boot(ContentWidgetRepositoryContract $widgetRepository)
    {
        $widgetRepository->registerWidget(HammerHeaderWidget::class);
        $widgetRepository->registerWidget(HammerFooterWidget::class);
    }
}
