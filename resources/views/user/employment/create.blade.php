@extends('inc.user.main')
<?php $item = htmlspecialchars(config('app.name'));?>
@section('title', 'Annonce - '.$item)

@section('style')
@endsection

@section('init')
<!-- Site wrapper -->
@endsection

@section('content')
<div id="app_ivemo"></div>


<!--
<form method="POST" action="{{ route('employmentstore_site') }}">
        @csrf

    <input name="title" placeholder="title">
    <input name="district" placeholder="ville">
    <button type="submit">send le teste</button>
</form>
-->
@endsection

@section('script')

@endsection
