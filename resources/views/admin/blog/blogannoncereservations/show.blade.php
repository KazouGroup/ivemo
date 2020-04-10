@extends('inc.admin.main')
<?php $item = htmlspecialchars(config('app.name'));?>
@section('title', $blogannoncereservation->title.' - '.$item)

@section('style')

@endsection

@section('content')
    <router-view></router-view>
@endsection

@section('script')

@endsection

