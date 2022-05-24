<?php

namespace App\Providers;

use App\Enums\ThemeType;
use Illuminate\Support\Facades\File;
use Illuminate\Support\ServiceProvider;
use RuntimeException;

class ThemeServiceProvider extends ServiceProvider
{
    /**
     * @throws \JsonException
     * @throws \Illuminate\Contracts\Filesystem\FileNotFoundException
     */
    public function boot(): void
    {
        $adminThemeName = config('theme.admin');

        $this->checkIfThemeIsValid(ThemeType::ADMIN, $adminThemeName);
        $this->bootTheme(ThemeType::ADMIN, $adminThemeName);
    }

    protected function checkIfThemeIsValid(ThemeType $themeType, string $themeName): void
    {
        if (! File::exists($themeType->getPath($themeName) . '/theme.json')) {
            throw new RuntimeException("Theme $themeType->value/$themeName is not valid");
        }
    }

    /**
     * @throws \JsonException
     * @throws \Illuminate\Contracts\Filesystem\FileNotFoundException
     */
    protected function bootTheme(ThemeType $themeType, string $themeName): void
    {
        $this->bootViews($themeType, $themeName);
        $this->loadTranslationsFrom($themeType->getPath($themeName) . '/lang', $themeType->value);
        $this->loadJsonTranslationsFrom($themeType->getPath($themeName) . '/lang');
    }

    /**
     * @throws \JsonException
     * @throws \Illuminate\Contracts\Filesystem\FileNotFoundException
     */
    protected function extractThemeInformation(ThemeType $themeType, string $themeName): array
    {
        return json_decode(File::get($themeType->getPath($themeName) . '/theme.json'), true, 512, JSON_THROW_ON_ERROR);
    }

    /**
     * @throws \JsonException
     * @throws \Illuminate\Contracts\Filesystem\FileNotFoundException
     */
    protected function bootViews(ThemeType $themeType, string $themeName): void
    {
        $themeInformation = $this->extractThemeInformation($themeType, $themeName);
        $viewsPath = [$themeType->getPath($themeName) . '/views'];

        if (array_key_exists('parent', $themeInformation)) {
            $this->checkIfThemeIsValid(ThemeType::ADMIN, $themeInformation['parent']);

            $viewsPath[] = $themeType->getPath($themeInformation['parent'] . '/views');
        }

        $this->loadViewsFrom($viewsPath, $themeType->value);
    }
}
