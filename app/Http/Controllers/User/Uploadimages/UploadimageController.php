<?php

namespace App\Http\Controllers\User\Uploadimages;

use App\Http\Controllers\Controller;
use File;
use App\Model\uploadimage;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Facades\Image;
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

    public function destroy(uploadimage $uploadimage)
    {
        $oldFilename = base64_decode($uploadimage->photo);
        
        Storage::disk('s3')->delete($oldFilename);

        $uploadimage->delete();

        return ['message' => 'Deleted successfully'];
    }

}
