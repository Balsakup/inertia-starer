<?php

namespace App\Fortify\Responses;

use App\Providers\RouteServiceProvider;
use Illuminate\Http\RedirectResponse;
use Laravel\Fortify\Contracts\LogoutResponse as LogoutResponseContract;

class LogoutResponse implements LogoutResponseContract
{
    public function toResponse($request): RedirectResponse
    {
        if ($request->routeIs('admin::authenticated_session.destroy')) {
            return redirect()
                ->route('admin::authenticated_session.create')
                ->with('toast.success', __('You are now logged out'));
        }

        return redirect(RouteServiceProvider::HOME);
    }
}
