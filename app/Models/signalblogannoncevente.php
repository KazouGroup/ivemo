<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class signalblogannoncevente extends Model
{
    protected $guarded = [];

    protected  $table = 'signalblogannonceventes';

    public function blogannoncevente()
    {
        return $this->belongsTo(blogannoncevente::class,'blogannoncevente_id');
    }

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model){
            $model->ip = request()->ip();
        });
    }
}
