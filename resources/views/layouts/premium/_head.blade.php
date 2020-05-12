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
<title>@yield('title')</title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
<meta name="userID" content="{{ auth()->user()->id }}">
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
<meta content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0, shrink-to-fit=no' name='viewport' />
<!-- CSS Files -->
<link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Roboto+Slab:400,700|Material+Icons" />
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/latest/css/font-awesome.min.css">
<!-- CSS Files -->
<link href="/assets/dashboard/assets/css/material-dashboard.css?v=2.1.0" rel="stylesheet" />

@section('style')
    @show

