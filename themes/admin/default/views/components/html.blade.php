<!doctype html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
        <title>
            {{ config('app.name') }}
            @isset($page['props']['title'])
                | {{ $page['props']['title'] }}
            @endisset
        </title>
        <link rel="stylesheet" href="{{ mix('css/app.css', 'assets/admin') }}">
        @inertiaHead
    </head>
    <body @class(explode(' ', $bodyClass ?? ''))>
        @inertia

        <script src="{{ mix('js/app.js', 'assets/admin') }}"></script>
    </body>
</html>
