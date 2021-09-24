<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Cviebrock\EloquentSluggable\Sluggable;
use App\Models\user;
use Illuminate\Support\Facades\Cache;
use OwenIt\Auditing\Contracts\Auditable;
use Spatie\Activitylog\Traits\LogsActivity;
use Spatie\Activitylog\LogOptions;


class about extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    use \OwenIt\Auditing\Auditable, Sluggable;

    protected $table = 'abouts';
    protected $fillable = [
        'first_name',
        'lkndlink',
        'fblink',
        'instlink',
        'last_name',
        'user_id',
        'ip',
        'status',
        'photo',
        'role',
        'description'
    ];
    protected static $logAttributes = [
        'first_name',
        'lkndlink',
        'fblink',
        'instlink',
        'last_name',
        'user_id',
        'ip',
        'status',
        'photo',
        'role',
        'description'
    ];

    /**
     * @return array
     */
    public function generateTags(): array
    {
        return [
            $this->user->name,
        ];
    }

    public function user()
    {
        return $this->belongsTo(user::class);
    }

    /**
     * save and deleting image
     */
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model){
            if (auth()->check()){
                $model->user_id = auth()->id();
            }
            $model->ip = request()->ip();
        });
        static::updating(function($model){
            if (auth()->check()){
                $model->user_id = auth()->id();
            }
            $model->ip = request()->ip();
        });
    }

    public function isOnline()
    {
        return Cache::has('user-is-online-' . $this->id);
    }

    /**
     * Return the sluggable configuration array for this model.
     *
     * @return array
     */
    public function sluggable() : array
    {
        return [
            'slug' => [
                'source' => 'first_name'
            ]
        ];
    }
}
