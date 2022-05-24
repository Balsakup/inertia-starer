<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function __invoke(): Response
    {
        $usersCount = User::count();

        return Inertia::render('Dashboard/Index', [
            'title' => __('Dashboard'),
            'users_count' => $usersCount,
        ]);
    }
}
