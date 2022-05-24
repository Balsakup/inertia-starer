<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Http\Request;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Throwable;

class Handler extends ExceptionHandler
{
    /** @var array<class-string<\Throwable>, \Psr\Log\LogLevel::*> */
    protected $levels = [
        //
    ];

    /** @var array<int, class-string<\Throwable>> */
    protected $dontReport = [
        //
    ];

    /** @var array<int, string> */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    public function register(): void
    {
        $this->reportable(static function (Throwable $e) {
            //
        });

        $this->renderable(static function (Throwable $e, Request $request) {
            if ($e instanceof AccessDeniedHttpException) {
                return back()->with('toast.error', __('This action is unauthorized'));
            }

            return false;
        });
    }
}
