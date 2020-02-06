@extends('inc.user.main')
<?php $item = htmlspecialchars(config('app.name'));?>
@section('title', $user->first_name.' - '.$item)

@section('style')
@endsection

@section('init')
    <!-- Site wrapper -->
@endsection

@section('content')


<div class="container">
    <form method="post" action="{{route('public_profile_send_message.site', [$user->slug])}}">
        @csrf
        <h1 class="title">Reserver cette chambre {{$user->first_name}}</h1>
        <div class="row">
            <div class="col-md-6">
                <input name="full_name" placeholder="nom" type="text" class="form-control"/>
            </div>

            <div class="col-md-6">
                <input name="phone" placeholder="phone" type="text" class="form-control"/>
            </div>

            <div class="col-md-6">
                <input name="subject" placeholder="Subject" type="text" class="form-control"/>
            </div>
            <div class="col-md-6">
                <input name="email" placeholder="votre email" type="email" class="form-control"/>
            </div>
        </div>
        <div class="row">
            <textarea placeholder="votre email" name="message" class="form-control"></textarea>
        </div>
        <button class="btn btn-success btn-round" type="submit">envoyer</button>
    </form>
</div>

<!--<div id="app_ivemo"></div> -->
@endsection

@section('script')

@endsection
