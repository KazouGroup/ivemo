<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;
use OwenIt\Auditing\Auditable as AuditableTrait;
use OwenIt\Auditing\Contracts\Auditable;

class testimonial extends Model implements Auditable
{
    use AuditableTrait;

    protected $guarded = [];

    protected $table = 'testimonials';

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
        return $this->belongsTo(user::class,'user_id');
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
    }

    public function isOnline()
    {
        return Cache::has('user-is-online-' . $this->id);
    }

}
