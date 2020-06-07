<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0, shrink-to-fit=no' name='viewport' />

<meta name="author" content="{{ config('app.author') }}">
<meta name="keywords" content="{{ config('app.keywords') }}">
<meta name="description" content="{{ isset($description) ? $description : config('app.description') }}"/>
<meta name="user-name" content="{{Auth::check() ? Auth::user()->first_name : 'name' }}">

<meta property="og:type" name="og:type" content="site"/>
<meta property="og:country" content="{{ config('app.country') }}"/>
<meta property="og:url" name="og:url" content="{{ request()->url() }}"/>
<meta property="og:title" name="og:title" content="{{ isset($title) ? $title : config('app.title') }}">
<meta property="og:description" name="og:description" content="{{ isset($description) ? $description : config('app.description') }}">
<!-- CSRF Token -->
<meta name="csrf-token" content="{{ csrf_token() }}">
@auth
    <meta name="userID" content="{{ auth()->user()->id }}">
    <script>
    window.dataIvemo = {!! json_encode([
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
     'url_site' => htmlspecialchars(config('app.url')),
     'country' => htmlspecialchars(config('app.country')),
     'country_sigle' => htmlspecialchars(config('app.country_sigle')),
     'name_site' => htmlspecialchars(config('app.name')),
     'phone_number' => htmlspecialchars(config('app.phone')),
    ]) !!}
</script>

<title>@yield('title')</title>
  <meta content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0, shrink-to-fit=no' name='viewport' />
  <!--     Fonts and icons     -->
  <link href="https://fonts.googleapis.com/css?family=Montserrat:400,700,200|Open+Sans+Condensed:700" rel="stylesheet">
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.1/css/all.css" crossorigin="anonymous">
  <!-- CSS Files -->
  <link href="/assets/vendor/assets/css/bootstrap.min.css" rel="stylesheet" />
  <link href="/assets/vendor/assets/css/now-ui-kit.css?v=1.3.1" rel="stylesheet" />
  <!-- Ivemo SCSS Files -->
  <link href="/assets/user/assets/scss/ivemo.css" rel="stylesheet" />

@section('style')
@show
