@extends('inc.user.main')
<?php $item = htmlspecialchars(config('app.name'));?>
@section('title', $annoncereservation->title.' - '.$item)

@section('style')
@endsection

@section('init')
<!-- Site wrapper -->
@endsection

@section('content')

<div class="container">
    <form method="post" action="{{route('sendannoncereservation_site', [$annoncetype->slug, $categoryannoncereservation->slug, $city->slug, $annoncereservation->slug])}}">
        @csrf
        <h1 class="title">Reserver cette chambre {{$annoncereservation->title}} a {{$annoncereservation->city->name}}</h1>
        <div class="row">
                <div class="col-md-3">
                    <input name="first_name" placeholder="nom" type="text" class="form-control"/>
                </div>
                <div class="col-md-3">
                    <input name="last_name" placeholder="prenom" type="text" class="form-control"/>
                </div>
                <div class="col-md-3">
                    <input name="email" placeholder="votre email" type="email" class="form-control"/>
                </div>
            <button class="btn btn-success btn-round" type="submit">Reserver</button>
        </div>
    </form>
</div>




<!--<div id="app_ivemo"></div>-->
@endsection

@section('script')

@endsection
