@extends('inc.premium.main')
<?php $item = htmlspecialchars(config('app.name'));?>
@section('title', 'Dashboard Articles de blogs ventes - '.$item)

@section('style')

@endsection

@section('content')
    <router-view></router-view>
@endsection

@section('script')

@endsection

