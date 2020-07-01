<?php

namespace App\Model;

use App\Model\favorite\favoriteblogannoncereservation;
use App\Traits\Likesdata;
use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Model;
use OwenIt\Auditing\Auditable as AuditableTrait;
use OwenIt\Auditing\Contracts\Auditable;
use Spatie\Activitylog\Traits\LogsActivity;

class blogannoncereservation extends Model implements Auditable
{
    use AuditableTrait,LogsActivity,Likesdata;

    protected $guarded = [];

    protected static $logAttributes = ['title','red_time','ip','status','status_admin','member_id'];

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
            $model->ip = request()->ip();
        });
    }

    public function getRouteKeyName()
    {
        return 'slug';
    }

    public function user()
    {
        return $this->belongsTo(user::class,'user_id');
    }

    public function member()
    {
        return $this->belongsTo(user::class,'member_id');
    }

    public function categoryannoncereservation()
    {
        return $this->belongsTo(categoryannoncereservation::class,'categoryannoncereservation_id');
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

    public function bookmarked()
    {
        return (bool) favoriteblogannoncereservation::where('user_id', Auth::guard('web')->id())
            ->where('blogannoncereservation_id', $this->id)
            ->first();
    }
}
