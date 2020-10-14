<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;

class responsecontactservice extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected $table = 'responsecontactservices';

    public function user()
    {
        return $this->belongsTo(user::class,'user_id');
    }

    protected $casts = [
        'status' => 'boolean',
    ];

    public function contactservice()
    {
        return $this->belongsTo(contactservice::class,'contactservice_id');
    }

    public function isOnline()
    {
        return (bool) Cache::has('user-is-online-' . $this->user->id);
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
}
