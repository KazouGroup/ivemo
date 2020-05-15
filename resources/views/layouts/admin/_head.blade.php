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
<!-- CSS Files -->
<link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Roboto+Slab:400,700|Material+Icons" />
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/latest/css/font-awesome.min.css">
<!-- CSS Files -->
<link href="/assets/dashboard/assets/css/material-dashboard.css?v=2.1.0" rel="stylesheet" />

@section('style')
    @show

