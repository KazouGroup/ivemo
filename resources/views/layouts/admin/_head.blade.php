<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0, shrink-to-fit=no' name='viewport' />

<!-- CSRF Token -->
<meta name="csrf-token" content="{{ csrf_token() }}">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
@auth
    <meta name="userID" content="{{ auth()->user()->id }}">
@endauth
<script>window.ivemo = { csrfToken: '{{ csrf_token() }}' }; </script>
<script>
    window.user = {!! json_encode([
    'user' => auth()->user(),
    'roles' => auth()->user()->roles,
    'permissions' => auth()->user()->getAllPermissions(),
    ]) !!}
</script>

<title>{{ config('app.name') }} @yield('title')</title>
<meta content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0, shrink-to-fit=no' name='viewport' />
<!--     Fonts and icons     -->
<link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Roboto+Slab:400,700|Material+Icons" />
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/latest/css/font-awesome.min.css">
<!-- CSS Files -->
<link href="/assets/dashboard/assets/css/material-dashboard.css?v=2.1.0" rel="stylesheet" />
<!-- CSS Just for demo purpose, don't include it in your project -->
<link href="/assets/dashboard/assets/demo/demo.css" rel="stylesheet" />
<link rel="stylesheet" href="/assets/dashboard/assets/css/plugins/animate.css">

@section('style')
    @show

