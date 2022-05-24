<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;
use Spatie\MediaLibrary\MediaCollections\Commands\CleanCommand;

class Kernel extends ConsoleKernel
{
    protected function schedule(Schedule $schedule): void
    {
        $schedule->command(CleanCommand::class)->dailyAt('00:30');
    }

    protected function commands(): void
    {
        $this->load(__DIR__ . '/Commands');
    }
}
