<?php

namespace App\Model;

use App\Model\favorite\favoriteannoncevente;
use App\Traits\Purify;
use Illuminate\Database\Eloquent\Model;
use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Str;


class annoncevente extends Model
{

    use Purify;

   protected $guarded = [];

   protected $table = 'annonceventes';

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

    public function isOnline()
    {
        return (bool) Cache::has('user-is-online-' . $this->user->id);
    }

    public function user()
    {
        return $this->belongsTo(user::class, 'user_id');
    }

    public function member()
    {
        return $this->belongsTo(user::class,'member_id');
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

    public function visits()
    {
        return visits($this);
    }

    protected $casts = [
        'status' => 'boolean',
        'status_comments' => 'boolean',
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

    public function comments()
    {
        return $this->morphMany(comment::class ,'commentable');
    }

    public function signals()
    {
        return $this->morphMany(signal::class ,'signalable');
    }

    public function contactservices()
    {
        return $this->morphMany(contactservice::class ,'contactserviceable');
    }
    
    public function iscontactservice()
    {
        return (bool) contactservice::where('from_id', Auth::id())
            ->where(['contactserviceable_type' => 'App\Model\annoncevente',
                'contactserviceable_id' => $this->id ])
            ->first();
    }

    public function likes()
    {
        return $this->morphMany(like::class ,'likeable');
    }

    public function likeked()
    {
        return (bool) like::where('user_id', Auth::guard('web')->id())
            ->where(['likeable_type' => 'App\Model\annoncevente',
                'likeable_id' => $this->id ])
            ->first();
    }

    public function favorites()
    {
        return $this->morphMany(favorite::class ,'favoriteable');
    }

    public function favoriteted()
    {
        return (bool) favorite::where('user_id', Auth::guard('web')->id())
            ->where(['favoriteable_type' => 'App\Model\annoncevente',
                'favoriteable_id' => $this->id ])
            ->first();
    }
}
