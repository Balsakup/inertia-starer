<?php

namespace App\Providers;

use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\Route;

class RouteServiceProvider extends ServiceProvider
{
    /** @var string */
    public const HOME = '/';

    public function boot(): void
    {
        $this->configureRateLimiting();

        $this->routes(static function () {
            Route::middleware('web')
                ->prefix(config('admin.prefix'))
                ->name('admin::')
                ->group(base_path('routes/admin/web.php'));

            Route::middleware('web')
                ->name('front::')
                ->group(base_path('routes/front/web.php'));
        });
    }

    protected function configureRateLimiting(): void
    {
        RateLimiter::for('login', static function (Request $request) {
            $email = (string) $request->email;

            return Limit::perMinute(5)->by($email . $request->ip());
        });

        RateLimiter::for('two-factor', static function (Request $request) {
            return Limit::perMinute(5)->by($request->session()->get('login.id'));
        });
    }
}
