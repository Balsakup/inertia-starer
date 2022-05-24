<?php

namespace App\Providers;

use App\Fortify\Actions\Authenticate;
use App\Fortify\Responses\LoginViewResponse;
use Illuminate\Support\ServiceProvider;
use Laravel\Fortify\Contracts\LoginViewResponse as LoginViewResponseContract;
use Laravel\Fortify\Fortify;

class FortifyServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        Fortify::ignoreRoutes();
    }

    public function boot(): void
    {
        Fortify::authenticateUsing(app(Authenticate::class));

        $this->app->singleton(LoginViewResponseContract::class, LoginViewResponse::class);
    }
}
