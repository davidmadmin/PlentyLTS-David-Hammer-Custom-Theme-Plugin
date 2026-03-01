<?php

namespace HammerTheme\Containers;

use Plenty\Plugin\Templates\Twig;

class HammerThemeScriptContainer
{
    /**
     * Liefert den Script-Provider-Output fuer den verknuepften Container-Link.
     */
    public function call(Twig $twig): string
    {
        return $twig->render('HammerTheme::content.HammerThemeScripts');
    }
}
