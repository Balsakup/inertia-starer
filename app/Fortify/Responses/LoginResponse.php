<?php

namespace App\Fortify\Responses;

use App\Providers\RouteServiceProvider;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Laravel\Fortify\Contracts\LoginResponse as LoginResponseContract;

class LoginResponse implements LoginResponseContract
{
    public function toResponse($request): RedirectResponse|JsonResponse
    {
        $redirectUrl = $request->routeIs('admin::authenticated_session.store')
            ? route('admin::dashboard')
            : RouteServiceProvider::HOME;

        return $request->wantsJson()
            ? response()->json(['two_factor' => false])
            : redirect()
                ->intended($redirectUrl)
                ->with('toast.success', __('You are now logged in'));
    }
}
