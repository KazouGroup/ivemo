<?php
namespace App\Services;



use Illuminate\Support\Facades\Storage;

class WorkwithusService
{

    public static function uploadCvfile($path, $file, $old_filename)
    {
        $disk = Storage::disk('public');

        $old_path = $path . $old_filename;
        if($disk->exists($old_path))
            $disk->delete($old_path);

        $filename = 'cv_file.' . $file->getClientOriginalExtension();
        $disk->putFileAs($path, $file, $filename);

        return $filename;
    }
}
