<?php

namespace App\Http\Middleware;

use Illuminate\Auth\Middleware\Authenticate as Middleware;

class Authenticate extends Middleware
{
    protected function redirectTo($request): string|null
    {
        if (! $request->expectsJson()) {
            if ($request->routeIs('admin::*')) {
                return route('admin::authenticated_session.create');
            }

            return route('front::authenticated_session.create');
        }

        return null;
    }
}
