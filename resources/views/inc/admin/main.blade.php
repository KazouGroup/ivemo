<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
@include('layouts.admin._head')

@yield('style')
</head>
<body class="sidebar-mini">

<div  class="wrapper " id="app">
    @can('dashboard')
        @if(auth()->user()->status_user)

            <admin-verticalnavusersite></admin-verticalnavusersite>

        @section('content')


        @show

        @endif
    @endcan
</div>

@include('layouts.admin._script')

@yield('script')
</body>
</html>
