<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0, shrink-to-fit=no' name='viewport' />

<!-- CSRF Token -->
<meta name="csrf-token" content="{{ csrf_token() }}">
@auth
    <meta name="userID" content="{{ auth()->user()->id }}">
    <script>
    window.userIvemo = {!! json_encode([
    'roles' => auth()->user()->roles,
    'permissions' => auth()->user()->getAllPermissions(),
    ]) !!}
    </script>
@endauth
<script>window.Ivemo = { csrfToken: '{{ csrf_token() }}' }; </script>
<script>
    window.userIvemo = {!! json_encode([
    'user' => auth()->user(),
    'guest' => auth()->guest(),
    'authcheck' => auth()->check(),
    ]) !!}
</script>

<title>@yield('title')</title>
  <meta content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0, shrink-to-fit=no' name='viewport' />
  <!--     Fonts and icons     -->
  <link href="https://fonts.googleapis.com/css?family=Montserrat:400,700,200|Open+Sans+Condensed:700" rel="stylesheet">
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.1/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossorigin="anonymous">
  <!-- CSS Files -->
  <link href="/assets/vendor/assets/css/bootstrap.min.css" rel="stylesheet" />
  <link href="/assets/vendor/assets/css/now-ui-kit.css?v=1.3.1" rel="stylesheet" />
  <!-- CSS Just for demo purpose, don't include it in your project -->
  <link href="/assets/vendor/assets/demo/demo.css" rel="stylesheet" />



@section('style')
@show
