<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\Contactuser\StorecontactworkwithusRequest;
use App\Model\categoryworkwithus;
use App\Model\workwithus;
use App\Services\Contactusers\ContactworkwithusService;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class WorkwithusController extends Controller
{
    public function work_with_us()
    {
        return view('user.page.work_with_us.index');
    }

    public function work_with_uscategoryworkwithus(categoryworkwithus $categoryworkwithus)
    {
        return view('user.page.work_with_us.index',[
            'categoryworkwithus' => $categoryworkwithus
        ]);
    }

    public function work_with_us_show($categoryworkwithus,workwithus $workwithus)
    {
        visits($workwithus)->seconds(5)->increment();

        return view('user.page.work_with_us.show',[
            'workwithus' => $workwithus
        ]);
    }

    public function sendcontactservice(StorecontactworkwithusRequest $request,categoryworkwithus $categoryworkwithus,workwithus $workwithus)
    {

        $workwithus->contactservices()->create([
            'full_name' => $request->full_name,
            'to_id' => $workwithus->user_id,
            'email' => $request->email,
            'phone' => $request->phone,
            'from_id' => auth()->id(),
            'slug' => sha1(('YmdHis') . str_random(30)),
            'ip' => request()->ip(),
            'message' => $request->message,
        ]);


        ContactworkwithusService::newEmailTocontactworkwithus($request,$workwithus);

        return response('Success',Response::HTTP_ACCEPTED);
    }
}
