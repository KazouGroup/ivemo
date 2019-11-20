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
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700">
<!-- BEGIN: Vendor CSS-->
<!-- Icons -->
<link rel="stylesheet" href="/assets/dashboard/assets/vendor/nucleo/css/nucleo.css" type="text/css">
<link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Roboto+Slab:400,700|Material+Icons" />
<link rel="stylesheet" href="/assets/dashboard/assets/vendor/@fortawesome/fontawesome-free/css/all.min.css" type="text/css"/>
<!-- Page plugins -->
<link rel="stylesheet" href="/assets/dashboard/assets/vendor/animate.css/animate.min.css">
<link rel="stylesheet" href="/assets/dashboard/assets/vendor/sweetalert2/dist/sweetalert2.min.css">
<link rel="stylesheet" href="/assets/dashboard/assets/vendor/datatables.net-bs4/css/dataTables.bootstrap4.min.css">
<link rel="stylesheet" href="/assets/dashboard/assets/vendor/datatables.net-buttons-bs4/css/buttons.bootstrap4.min.css">
<link rel="stylesheet" href="/assets/dashboard/assets/vendor/datatables.net-select-bs4/css/select.bootstrap4.min.css">
<!-- Argon CSS -->
<link rel="stylesheet" href="/assets/dashboard/assets/css/argon.css?v=1.1.0" type="text/css">
@notifyCss
@section('style')
    @show

