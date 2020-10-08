<?php

namespace App\Http\Controllers\User\Uploadimages;

use App\Http\Controllers\Controller;
use App\Models\uploadimage;
use App\Services\Contactusers\ContactuserService;
use Storage;
use Symfony\Component\HttpFoundation\Response;

class UploadimageController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }


    public function statusuploadimage(uploadimage $uploadimage)
    {
        $uploadimage->update(['status' => !$uploadimage->status,]);

        return response('Success',Response::HTTP_ACCEPTED);
    }

    public function adminstatusuploadimage(uploadimage $uploadimage)
    {
        $uploadimage->update(['status_admin' => !$uploadimage->status_admin,]);

        ContactuserService::newEmailuploadimagesadmins($uploadimage);

        return response('Success',Response::HTTP_ACCEPTED);
    }

    public function destroy(uploadimage $uploadimage)
    {
        $disk = \Storage::disk('s3');
        $path = $uploadimage->photo;
        if($disk->exists($path))
        $disk->delete($path);
        
        $uploadimage->delete();

        return ['message' => 'Deleted successfully'];
    }

}
