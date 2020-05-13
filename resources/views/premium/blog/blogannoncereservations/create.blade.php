@extends('inc.premium.main')
<?php $item = htmlspecialchars(config('app.name'));?>
@section('title', 'Dashboard '.$user->first_name.' - '.$item)

@section('style')

@endsection

@section('content')
    <div id="premium_app_ivemo"></div>
@endsection

@section('script')

@endsection

