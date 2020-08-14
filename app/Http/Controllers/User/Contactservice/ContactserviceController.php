<?php

namespace App\Http\Controllers\User\Contactservice;

use App\Http\Controllers\Controller;
use App\Model\contactservice;
use App\Model\employment;
use App\Services\HelpersService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class ContactserviceController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }


    public function apipersonacontactservices()
    {
        $user = Auth::user();

        $contactservices = HelpersService::helperscontactuserscount($user)
            ->with(['contactusers' => function ($q) use ($user){
                $q->whereIn('user_id',[$user->id])
                    ->latest()->distinct()->get()->toArray()
                ;},
            ])

            ->with(['contactservicesemployments' => function ($q) use ($user){
                $q->with('to','from','contactserviceable')
                    ->where('contactserviceable_type',employment::class)
                    ->whereIn('to_id',[$user->id])
                    ->whereHas('contactserviceable', function ($q) {
                        $q->whereIn('user_id',[Auth::id()]);})
                    ->latest()->distinct()->get()->toArray()
                ;},
            ])
            ->first();

        return response()->json($contactservices,200);

    }

    public function statusarchvement(contactservice $contactservice)
    {
        $this->authorize('update',$contactservice);

        $contactservice->update(['status_archvement' => !$contactservice->status_archvement,]);

        return response('Success',Response::HTTP_ACCEPTED);
    }

    public function favorite(contactservice $contactservice)
    {
        $this->authorize('update',$contactservice);

        $contactservice->update(['status_favorite' => 1]);

        return response('Favorite',Response::HTTP_ACCEPTED);
    }

    public function unfavorite(contactservice $contactservice)
    {
        $this->authorize('update',$contactservice);

        $contactservice->update(['status_favorite' => 0,]);

        return response('Unfavorite',Response::HTTP_ACCEPTED);
    }

    public function statuscontacts(contactservice $contactservice)
    {
        $this->authorize('update',$contactservice);

        $contactservice->update(['status_red' => !$contactservice->status_red,]);

        return response('Success',Response::HTTP_ACCEPTED);
    }

    public function statuscontactsisadmin(contactservice $contactservice)
    {

        $contactservice->update(['status_red' => !$contactservice->status_red,]);

        return response('Success',Response::HTTP_ACCEPTED);
    }


    public function contactred(contactservice $contactservice)
    {
        $this->authorize('update',$contactservice);

        $contactservice->update(['status_red' => 1,]);

        return response('Red',Response::HTTP_ACCEPTED);
    }

    public function destroy(contactservice $contactservice)
    {
        $this->authorize('update',$contactservice);

        $contactservice->delete();

        return ['message' => 'Deleted successfully'];
    }
}
