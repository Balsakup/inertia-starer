<?php

namespace App\Fortify\Actions;

use App\Models\User;
use Illuminate\Http\Request;

class Authenticate
{
    public function __invoke(Request $request): User|null
    {
        $user = User::firstWhere('email', $request->email);

        if (! $user) {
            return null;
        }

        if ($request->routeIs('admin::*') && ! $user->hasRole('superadmin')) {
            return null;
        }

        return $user;
    }
}
