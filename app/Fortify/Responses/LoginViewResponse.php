<?php

namespace App\Fortify\Responses;

use Inertia\Inertia;
use Laravel\Fortify\Contracts\LoginViewResponse as LoginViewResponseContract;
use Symfony\Component\HttpFoundation\Response;

class LoginViewResponse implements LoginViewResponseContract
{
    public function toResponse($request): Response|null
    {
        if ($request->routeIs('admin::authenticated_session.create')) {
            return Inertia::render('AuthenticatedSession/Create')->toResponse($request);
        }

        return null;
    }
}
