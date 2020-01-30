<?php

namespace App\Model;

use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Database\Eloquent\Model;

class conseilvente extends Model
{
     protected $guarded = [];

        protected $table = 'conseilventes';

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

    public function user()
    {
        return $this->belongsTo(User::class,'user_id');
    }

    public function categoryannoncevente()
    {
        return $this->belongsTo(categoryannoncevente::class,'categoryannoncevente_id');
    }

         use Sluggable;
            /**
             * Return the sluggable configuration array for this model.
             *
             * @return array
             */
            public function sluggable()
            {
                return [
                    'slug' => [
                        'source' => 'title',
                        'separator' => '+'
                    ]

                ];
            }
}
