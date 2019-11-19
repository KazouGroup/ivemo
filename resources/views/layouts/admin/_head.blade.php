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
<link href="https://fonts.googleapis.com/css?family=Montserrat:300,400,500,600" rel="stylesheet">
<!-- BEGIN: Vendor CSS-->
<link rel="stylesheet" type="text/css" href="/assets/dashboard/app-assets/vendors/css/vendors.min.css">
<link rel="stylesheet" type="text/css" href="/assets/dashboard/app-assets/vendors/css/charts/apexcharts.css">
<link rel="stylesheet" type="text/css" href="/assets/dashboard/app-assets/vendors/css/extensions/tether-theme-arrows.css">
<link rel="stylesheet" type="text/css" href="/assets/dashboard/app-assets/vendors/css/extensions/tether.min.css">
<link rel="stylesheet" type="text/css" href="/assets/dashboard/app-assets/vendors/css/extensions/shepherd-theme-default.css">
<!-- END: Vendor CSS-->

<!-- BEGIN: Theme CSS-->
<link rel="stylesheet" type="text/css" href="/assets/dashboard/app-assets/css/bootstrap.css">
<link rel="stylesheet" type="text/css" href="/assets/dashboard/app-assets/css/bootstrap-extended.css">
<link rel="stylesheet" type="text/css" href="/assets/dashboard/app-assets/css/colors.css">
<link rel="stylesheet" type="text/css" href="/assets/dashboard/app-assets/css/components.css">
<link rel="stylesheet" type="text/css" href="/assets/dashboard/app-assets/css/themes/dark-layout.css">
<link rel="stylesheet" type="text/css" href="/assets/dashboard/app-assets/css/themes/semi-dark-layout.css">

<!-- BEGIN: Page CSS-->
<link rel="stylesheet" type="text/css" href="/assets/dashboard/app-assets/css/core/menu/menu-types/horizontal-menu.css">
<link rel="stylesheet" type="text/css" href="/assets/dashboard/app-assets/css/core/colors/palette-gradient.css">
<link rel="stylesheet" type="text/css" href="/assets/dashboard/app-assets/css/pages/dashboard-analytics.css">
<link rel="stylesheet" type="text/css" href="/assets/dashboard/app-assets/css/pages/card-analytics.css">
<link rel="stylesheet" type="text/css" href="/assets/dashboard/app-assets/css/plugins/tour/tour.css">
<!-- END: Page CSS-->
@notifyCss
@section('style')
    @show

