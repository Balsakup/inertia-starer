<?php

namespace App\Providers;

use App\Models\User;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Support\Facades\Gate;
use Laravel\Horizon\Horizon;
use Laravel\Horizon\HorizonApplicationServiceProvider;

class HorizonServiceProvider extends HorizonApplicationServiceProvider
{
    public function boot(): void
    {
        parent::boot();
        Horizon::night();
    }

    protected function gate(): void
    {
        Gate::define('viewHorizon', static fn(User&Authenticatable $user) => $user->email === 'quentin@example.com');
    }
}
