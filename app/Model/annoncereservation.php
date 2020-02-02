<?php

namespace App\Model;

use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Database\Eloquent\Model;

class annoncereservation extends Model
{
    protected $guarded = [];

    protected  $table = 'annoncereservations';

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

    public function city()
    {
        return $this->belongsTo(city::class,'city_id');
    }

    public function annoncetype()
    {
        return $this->belongsTo(annoncetype::class,'annoncetype_id');
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
