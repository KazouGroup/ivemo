<?php

namespace App\Model;

use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Model;

class blogannoncereservation extends Model
{
    protected $guarded = [];

    protected  $table = 'blogannoncereservations';

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model){
            $myslug = Str::uuid();
            if (auth()->check()){
                $model->user_id = auth()->id();
                $model->slugin = $myslug;
            }
        });
        static::updating(function($model){
            if (auth()->check()){
                $model->user_id = auth()->id();
            }
        });
    }

    public function getRouteKeyName()
    {
        return 'slug';
    }

    public function user()
    {
        return $this->belongsTo(User::class,'user_id');
    }

    public function categoryannoncereservation()
    {
        return $this->belongsTo(categoryannoncereservation::class,'categoryannoncereservation_id');
    }



    protected $casts = [
        'status' => 'boolean',
        'status_admin' => 'boolean',
    ];


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
