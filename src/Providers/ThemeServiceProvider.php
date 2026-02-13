<?php

namespace PlentyLTSDavidHammerCustomThemePlugin\Providers;

use Plenty\Plugin\ServiceProvider;
use PlentyLTSDavidHammerCustomThemePlugin\Containers\ThemeContainer;

class ThemeServiceProvider extends ServiceProvider
{
    public function register()
    {
        // Plugin-Registrierungen erfolgen bei Bedarf.
    }

    public function boot()
    {
        $this->getApplication()->register(ThemeContainer::class);
    }
}
