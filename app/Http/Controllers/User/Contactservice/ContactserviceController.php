<?php

namespace App\Http\Controllers\User\Contactservice;

use App\Http\Controllers\Controller;
use App\Model\contactservice;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ContactserviceController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
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
