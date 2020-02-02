<?php

namespace App\Model;

use App\Notifications\VerifyEmailUsers;
use Carbon\Carbon;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Cache;
use Laravel\Passport\HasApiTokens;
use OwenIt\Auditing\Auditable as AuditableTrait;
use OwenIt\Auditing\Contracts\Auditable;
use Spatie\Permission\Traits\HasRoles;

class user extends Authenticatable implements MustVerifyEmail,Auditable
{
    use Notifiable,HasApiTokens,HasRoles,AuditableTrait;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $guarded = [];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    protected $dates = ['birthday'];
    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'birthday' => 'date:d/m/Y',
        'email_verified_at' => 'datetime',
    ];
    /**
     * Send the email verification notification.
     *
     * @return void
     */
    public function sendEmailVerificationNotification()
    {
        $this->notify(new VerifyEmailUsers());
    }

    protected static function boot()
    {
        parent::boot();
        static::creating(function ($user){
            $user->syncRoles('1');
            $user->profile()->create([
                'full_name' => $user->email,
            ]);
            if (auth()->check()){
                $user->user_id = auth()->id();
            }
        });
        static::updating(function($user){
            if (auth()->check()){
                $user->user_id = auth()->id();
            }
        });

    }

    public function isOnline()
    {
        return Cache::has('user-is-online-' . $this->id);
    }

    public function profile()
    {
        return $this->hasOne(profile::class);
    }

    public function getDataBirthdayItAttribute()
    {
        return !empty($this->birthday)? $this->birthday->format('d/m/Y') : '';
    }


    public function getAgeAttribute(){
        return $this->birthday->diffInYears();
    }


    public function followers()
    {
        return $this->belongsToMany(User::class, 'followers', 'leader_id', 'follower_id')->withTimestamps();
    }

    public function getRouteKeyName()
    {
        return 'slug';
    }
    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function followings()
    {
        return $this->belongsToMany(User::class, 'followers', 'follower_id', 'leader_id')->withTimestamps();
    }

    public function annoncereservation()
    {
        return $this->belongsTo(categoryfaq::class,'categoryfaq_id');
    }
}
