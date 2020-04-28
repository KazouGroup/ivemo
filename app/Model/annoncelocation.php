<?php

namespace App\Model;

use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class annoncelocation extends Model
{
    protected $guarded = [];

    protected  $table = 'annoncelocations';

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model){
            $myslug = Str::uuid();
            if (auth()->check()){
                $model->user_id = auth()->id();
                $model->slugin = $myslug;
                $model->ip = request()->ip();
            }
        });

        static::updating(function($model){
            $model->ip = request()->ip();
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

    public function member()
    {
        return $this->belongsTo(User::class,'member_id');
    }

    public function categoryannoncelocation()
    {
        return $this->belongsTo(categoryannoncelocation::class,'categoryannoncelocation_id');
    }

    public function city()
    {
        return $this->belongsTo(city::class,'city_id');
    }

    public function annoncetype()
    {
        return $this->belongsTo(annoncetype::class,'annoncetype_id');
    }

    public function signalannoncelocations()
    {
        return $this->hasMany(signalannoncelocation::class, 'annoncelocation_id');
    }

    public function visits()
    {
        return visits($this);
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
