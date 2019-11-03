<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    @include('layouts.admin._head')

    @yield('style')
</head>
<body>

    @can('dashboard')

        @section('content')


        @show

    @endcan

@include('layouts.admin._script')

@yield('script')
</body>
</html>
