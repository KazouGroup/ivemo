<?php

namespace App\Model;

use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;
use OwenIt\Auditing\Auditable as AuditableTrait;
use OwenIt\Auditing\Contracts\Auditable;

class faq extends Model implements Auditable
{
    use AuditableTrait;

    protected $fillable = ['body','title','status','categoryfaq_id'];

    /**
     * @return array
     */
    public function generateTags(): array
    {
        return [
            $this->user->name,
        ];
    }
    protected $casts = [
        'status' => 'boolean',
    ];

    public static function faqId(string $id): self
    {
        return static::where('id', $id)->first();
    }

    public function user()
    {
        return $this->belongsTo(User::class,'user_id');
    }

    public function categoryfaq()
    {
        return $this->belongsTo(categoryfaq::class,'categoryfaq_id');
    }

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

    /**
     * Get the comments for the blogs post.
     */
    public function comments()
    {
        return $this->hasMany(comment::class,'commentable');
    }
}
