<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Artisan;
use Spatie\MediaLibrary\MediaCollections\Commands\CleanCommand;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call(RolesSeeder::class);
        $this->call(UsersSeeder::class);
        Artisan::call(CleanCommand::class);
    }
}
