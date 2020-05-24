@extends('inc.user.main')
<?php $item = htmlspecialchars(config('app.name'));?>
@section('title', 'Ventes des maisons, villa, térrains et bien d\'autres dans la ville de '.$city->name.' - '.$item)

@section('style')
@endsection

@section('init')
    <!-- Site wrapper -->
@endsection

@section('content')
    <div id="app_ivemo"></div>
@endsection

@section('script')

@endsection
