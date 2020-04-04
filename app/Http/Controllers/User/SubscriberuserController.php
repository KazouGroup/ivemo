<?php

namespace App\Http\Controllers\User;

use App\Exports\SubscriberuserExport;
use App\Http\Controllers\Controller;
use App\Model\subscriberuser;
use App\Model\user;
use Maatwebsite\Excel\Facades\Excel;
use Newsletter;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class SubscriberuserController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth',['except' => ['api','subscriberuser_public_mail']]);
    }

    public function  apisubscriberusersbyuser(user $user)
    {
       if (auth()->user()->id === $user->id){

           $user = user::whereSlug($user->slug)
               ->with(['subscriberusers' => function ($q){
                   $q->with('user')->orderBy('created_at','DESC')
                       ->whereIn('user_id',[auth()->user()->id])
                       ->distinct()->get()->toArray();},
               ])->withCount(['subscriberusers' => function ($q){
                   $q->whereIn('user_id',[auth()->user()->id]);
               }])
               ->withCount(['teamusers' => function ($q) use ($user){
                   $q->whereIn('user_id',[$user->id]);
               }])->withCount(['annoncelocations' => function ($q) use ($user){
                   $q->whereIn('user_id',[$user->id]);
               }])->withCount(['annoncereservations' => function ($q) use ($user){
                   $q ->whereIn('user_id',[$user->id]);
               }])->withCount(['annonceventes' => function ($q) use ($user){
                   $q ->whereIn('user_id',[$user->id]);
               }])->withCount(['blogannoncelocations' => function ($q) use ($user){
                   $q->whereIn('user_id',[$user->id]);
               }])->withCount(['blogannoncereservations' => function ($q) use ($user){
                   $q->whereIn('user_id',[$user->id]);
               }])->withCount(['blogannonceventes' => function ($q) use ($user){
                   $q->whereIn('user_id',[$user->id]);
               }])->first();

           return response()->json($user, 200);
       }else{
           abort(404);
       }

    }


    public function export()
    {
        return Excel::download(new SubscriberuserExport(), 'Email-subscriber.xlsx');
    }

    public function subscriberuserprivate(user $user)
    {
        if (auth()->user()->id === $user->id){
            return view('user.profile.subscriberuserprivate',[
                'user' => auth()->user(),
            ]);
        }else{
            abort(404);
        }
    }

    public function subscriberuser_public_mail(Request $request,user $user)
    {
        $this->validate($request, [
            'user_email' => 'required|string|email|min:2|max:200',
        ]);

        if ( ! Newsletter::isSubscribed($request->user_email) ) {
            Newsletter::subscribe($request->user_email);

            $subscriberuser= new subscriberuser;
            $subscriberuser->user_email = $request->user_email;
            $subscriberuser->user_id = $user->id;

            $subscriberuser->save();

            return response('Thank you for subscribing to our newsletters',Response::HTTP_CREATED);
        }

        return response('You are already subscribed',Response::HTTP_CREATED);
    }
}
