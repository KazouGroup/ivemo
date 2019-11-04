<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    @include('layouts.admin._head')

    @yield('style')
</head>
<body>

    @can('dashboard')

        @if(auth()->user()->status_user === 1)
        @section('content')


        @show
        @endif

    @endcan

@include('layouts.admin._script')

@yield('script')
</body>
</html>
