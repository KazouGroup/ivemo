<?php

namespace App\Model;

use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class blogannoncevente extends Model
{
    protected $guarded = [];

    protected  $table = 'blogannonceventes';

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

    public function categoryannoncevente()
    {
        return $this->belongsTo(categoryannoncevente::class,'categoryannoncevente_id');
    }



    protected $casts = [
        'status' => 'boolean',
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
