<?php

namespace HammerTheme\Containers;

use Plenty\Plugin\Templates\Twig;

class HammerThemeContainer
{
    public function call(Twig $twig): string
    {
        return $twig->render('HammerTheme::content.HammerTheme');
    }
}
