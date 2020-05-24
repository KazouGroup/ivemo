<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class contactuserslocation extends Model
{
    protected $guarded = [];

    protected  $table = 'contactuserslocations';

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

    public function annoncelocation()
    {
        return $this->belongsTo(annoncelocation::class,'annoncelocation_id');
    }

    protected $casts = [
        'status_red' => 'boolean',
        'status_favorite' => 'boolean',
        'status_archvement' => 'boolean',
    ];
}
