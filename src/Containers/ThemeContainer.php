<?php

namespace PlentyLTSDavidHammerCustomThemePlugin\Containers;

use Plenty\Modules\Webshop\Template\Containers\Container;

class ThemeContainer extends Container
{
    public function call($templateData = [])
    {
        return $this->twig->render('PlentyLTSDavidHammerCustomThemePlugin::content.Theme', $templateData);
    }
}
