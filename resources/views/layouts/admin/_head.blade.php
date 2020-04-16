<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0, shrink-to-fit=no' name='viewport' />

<meta property="og:title" content="__OG_TITLE__">
<meta property="og:description" content="__OG_DESCRIPTION__">
<title>@yield('title')</title>
<!-- CSRF Token -->
<meta name="csrf-token" content="{{ csrf_token() }}">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
<meta name="userID" content="{{ auth()->user()->id }}">
<script>window.Ivemo = { csrfToken: '{{ csrf_token() }}' }; </script>
<script>
    window.user = {!! json_encode([
     'user' => auth()->user(),
    'guest' => auth()->guest(),
    'authcheck' => auth()->check(),
     'url_site' => htmlspecialchars(config('app.url')),
     'country' => htmlspecialchars(config('app.country')),
     'country_sigle' => htmlspecialchars(config('app.country_sigle')),
     'name_site' => htmlspecialchars(config('app.name')),
     'phone_number' => htmlspecialchars(config('app.phone')),
      'roles' => auth()->user()->roles,
      'permissions' => auth()->user()->getAllPermissions(),
    ]) !!}
</script>
<meta content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0, shrink-to-fit=no' name='viewport' />
<!--     Fonts and icons     -->
<link href="https://fonts.googleapis.com/css?family=Montserrat:400,700,200" rel="stylesheet" />
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.1/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossorigin="anonymous">
<!-- CSS Files -->
<link href="/assets/admin/assets/css/bootstrap.min.css" rel="stylesheet" />
<link href="/assets/admin/assets/css/now-ui-dashboard.css?v=1.4.1" rel="stylesheet" />

<!-- CSS Just for demo purpose, don't include it in your project -->
<link href="/assets/admin/assets/demo/demo.css" rel="stylesheet" />
@notifyCss
@section('style')
    @show

