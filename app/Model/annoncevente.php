<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;
use Cviebrock\EloquentSluggable\Sluggable;


class annoncevente extends Model
{
   protected $guarded = [];

   protected $table = 'annonceventes';

   protected static function boot()
    {
        parent::boot();

        static::creating(function ($model){
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
        return $this->belongsTo(User::class, 'user_id');
    }

    public function member()
    {
        return $this->belongsTo(User::class,'member_id');
    }

    public function categoryannoncevente()
    {
        return $this ->belongsTo(categoryannoncevente::class, 'categoryannoncevente_id');
    }

    public function city()
    {
        return $this ->belongsTo(city::class, 'city_id');
    }

    public function annoncetype()
    {
        return $this->belongsTo(annoncetype::class,'annoncetype_id');
    }

    public function contactusersventes()
    {
        return $this->hasMany(contactusersvente::class, 'annoncevente_id');
    }

    public function signalannonceventes()
    {
        return $this->hasMany(signalannoncevente::class, 'annoncevente_id');
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
