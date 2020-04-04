@extends('inc.user.main')
<?php $item = htmlspecialchars(config('app.name'));?>
@section('title', 'Guides et conseils ventes '.$categoryannoncevente->name.' - '.$item)

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
