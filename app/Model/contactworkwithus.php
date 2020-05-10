<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class contactworkwithus extends Model
{
    protected $guarded = [];

    protected $table = 'contactworkwithuses';

    public function workwithus()
    {
        return $this->belongsTo(workwithus::class,'workwithus_id');
    }

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model){
            $model->ip = request()->ip();
            $model->slug  = Str::uuid();

        });

        static::updating(function($model){
            if (auth()->check()){
                $model->user_id = auth()->id();
            }
            $model->ip = request()->ip();
        });
    }

    protected $casts = [
        'status_red' => 'boolean',
    ];


    public function getUploadPath($append = null, $full = false)
    {
        $path = 'contactworkwithus' . DIRECTORY_SEPARATOR . $this->id . DIRECTORY_SEPARATOR;

        if($append)
            $path .= $append;

        if($full)
            $path = storage_path('app/public' . DIRECTORY_SEPARATOR . $path);

        return $path;
    }
}
