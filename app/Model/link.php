<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;
use OwenIt\Auditing\Contracts\Auditable;

class link extends Model implements Auditable
{
    use \OwenIt\Auditing\Auditable;

    protected $fillable = ['body','title','status'];

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
}
