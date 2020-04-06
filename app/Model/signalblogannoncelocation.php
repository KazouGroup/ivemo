<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class signalblogannoncelocation extends Model
{
    protected $guarded = [];

    protected  $table = 'signalblogannoncelocations';

    public function blogannoncelocation()
    {
        return $this->belongsTo(blogannoncelocation::class,'blogannoncelocation_id');
    }

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model){
            $model->ip = request()->ip();
        });
    }
}
