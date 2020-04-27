<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\Contactuser\StorecontactworkwithusRequest;
use App\Model\categoryworkwithus;
use App\Model\contactworkwithus;
use App\Model\workwithus;
use App\Services\WorkwithusService;
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

        return view('user.page.work_with_us.show',[
            'workwithus' => $workwithus
        ]);
    }

    public function work_with_us_store(StorecontactworkwithusRequest $request,categoryworkwithus $categoryworkwithus,workwithus $workwithus)
    {
        $inputs = $request->all();

        $contactworkwithus = new contactworkwithus();

        $contactworkwithus->fill($inputs);
        $contactworkwithus->user_id = $workwithus->user->id;
        $contactworkwithus->workwithus_id = $workwithus->id;

        //if(isset($inputs['cv_file'])) {
        //    $file_cv_file_name = WorkwithusService::uploadCvfile($contactworkwithus->getUploadPath(), $inputs['cv_file'], $contactworkwithus->cv_file);
        //    $contactworkwithus->cv_file = $file_cv_file_name;
        //}

        $contactworkwithus->save();

        return response('Created',Response::HTTP_CREATED);
    }
}
