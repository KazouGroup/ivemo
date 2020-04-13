<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
@include('layouts.premium._head')

@yield('style')
</head>
<body class=" sidebar-mini ">

@section('content')


@show

@include('layouts.premium._script')

@yield('script')
</body>
</html>
