<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class teamuser extends Model
{
    protected $guarded = [];

    protected  $table = 'teamusers';

    public function user()
    {
        return $this->belongsTo(User::class,'user_id');
    }

      protected static function boot()
      {
          parent::boot();

          static::creating(function ($model){
              if (auth()->check()){
                  $model->user_id = auth()->id();
              }

          });
          static::updating(function($model){
              if (auth()->check()){
                  $model->user_id = auth()->id();
              }

          });
      }

    protected $casts = [
        'status' => 'boolean',
    ];
}
