<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class contactusersvente extends Model
{

    protected $guarded = [];

    protected  $table = 'contactusersventes';

    public function user()
    {
        return $this->belongsTo(User::class,'user_id');
    }

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model){
            $model->ip = request()->ip();
        });
    }

    public function annoncevente()
    {
        return $this->belongsTo(annoncevente::class,'annoncevente_id');
    }


    public function getRouteKeyName()
    {
        return 'slug';
    }

    protected $casts = [
        'status_red' => 'boolean',
    ];

}
