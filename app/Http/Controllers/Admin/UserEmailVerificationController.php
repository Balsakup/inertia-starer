<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;

class UserEmailVerificationController extends Controller
{
    public function __invoke(User $user)
    {
        //$user->sendEmailVerificationNotification();

        return back()->with(
            'toast.success',
            __('Email verification for user :full_name has been sent', ['full_name' => $user->full_name])
        );
    }
}
