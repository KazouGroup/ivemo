@extends('inc.admin.main')
<?php $item = htmlspecialchars($link->title); ?>
@section('title',"- $item")

@section('style')

@endsection


@section('content')
    <div id="root"></div>
@endsection

@section('script')

@endsection
