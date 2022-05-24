<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    public function rootView(Request $request): string
    {
        if ($request->routeIs('admin::*')) {
            if ($request->routeIs('admin::authenticated_session.create')) {
                return 'admin::layouts.auth';
            }

            return 'admin::layouts.app';
        }

        return 'front::layouts.app';
    }

    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    public function share(Request $request): array
    {
        return array_merge(parent::share($request), [
            'toast' => $request->session()->get('toast'),
        ]);
    }
}
