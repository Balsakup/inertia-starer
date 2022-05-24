<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UsersSeeder extends Seeder
{
    public function run(): void
    {
        User::factory()->withAvatar()->withRole('superadmin')->create([
            'first_name' => 'Quentin',
            'last_name' => 'CATHERINE',
            'email' => 'quentin@example.com',
        ]);
        User::factory(9)->withAvatar()->create();
        User::factory(10)->withAvatar()->unverified()->create();
        User::factory(5)->withAvatar()->deleted()->create();
        User::factory(5)->withAvatar()->unverified()->deleted()->create();
    }
}
