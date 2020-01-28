<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    @include('layouts.user._head')

    @yield('style')
</head>
<body>

    @section('content')


    @show

@include('layouts.user._script')

@yield('script')
</body>
</html>
