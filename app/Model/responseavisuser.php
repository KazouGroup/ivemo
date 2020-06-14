<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class responseavisuser extends Model
{

    protected $guarded = [];

    protected $table = 'responseavisusers';

    public function user()
    {
        return $this->belongsTo(user::class,'user_id');
    }

    protected $casts = [
        'status' => 'boolean',
    ];

    public function avisuser()
    {
        return $this->belongsTo(avisuser::class,'avisuser_id');
    }

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model){
            if (auth()->check()){
                $model->user_id = auth()->id();
            }
        });
    }
}
