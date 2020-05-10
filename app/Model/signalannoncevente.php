<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class signalannoncevente extends Model
{
    protected $guarded = [];

    protected  $table = 'signalannonceventes';

    public function annoncevente()
    {
        return $this->belongsTo(annoncevente::class,'annoncevente_id');
    }

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model){
            $model->ip = request()->ip();
        });
    }
}
