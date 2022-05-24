<?php

namespace App\Enums;

enum ThemeType: string
{
    case ADMIN = 'admin';

    case FRONT = 'front';

    public function getPath(string $name): string
    {
        return base_path("themes/$this->value/$name");
    }
}
