<?php

namespace App\Model;


use App\Notifications\VerifyEmailUsers;
use App\Traits\Favoritesuserdata;
use App\Traits\Subscribedata;
use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Cache;
use Laravel\Passport\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;
use Illuminate\Support\Str;

class user extends Authenticatable implements MustVerifyEmail
{
    use Notifiable,HasApiTokens,HasRoles,Favoritesuserdata,Subscribedata;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $guard_name = 'web';

    protected $guarded = [
        'created_at','updated_at'
    ];

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
        'status_user' => 'boolean',
    ];

     protected static function boot()
     {
        parent::boot();

        static::created(function ($user){
            $user->syncRoles('1');
            $myslug = Str::uuid();
            $user->profile()->create([
                'full_name' => $user->first_name,
                'slug' => $myslug,
            ]);
            $user->profileadmin()->create([
                'status_user' => true
            ]);
            if (auth()->check()){
                $user->user_id = auth()->id();
            }
        });

     }

    /**
     * Send the email verification notification.
     *
     * @return void
     */
    public function sendEmailVerificationNotification()
    {
        $this->notify(new VerifyEmailUsers());
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
                'source' => 'first_name',
                'separator' => '_'
            ]

        ];
    }

    public function isOnline()
    {
        return Cache::has('user-is-online-' . $this->id);
    }

    public function profile()
    {
        return $this->hasOne(profile::class,'user_id');
    }

    public function profileadmin()
    {
        return $this->hasOne(profileadmin::class,'user_id');
    }

    public function getDataBirthdayItAttribute()
    {
        return !empty($this->birthday)? $this->birthday->format('d/m/Y') : '';
    }


    public function getAgeAttribute(){
        return $this->birthday->diffInYears();
    }


    public function getRouteKeyName()
    {
        return 'slug';
    }

    public function annoncelocations()
    {
        return $this->hasMany(annoncelocation::class, 'user_id');
    }

    public function blogannoncelocations()
    {
        return $this->hasMany(blogannoncelocation::class, 'user_id');
    }

    public function annoncereservations()
    {
        return $this->hasMany(annoncereservation::class, 'user_id');
    }

    public function blogannoncereservations()
    {
        return $this->hasMany(blogannoncereservation::class, 'user_id');
    }

    public function blogannonceventes()
    {
        return $this->hasMany(blogannoncevente::class, 'user_id');
    }

    public function annonceventes()
    {
        return $this->hasMany(annoncevente::class, 'user_id');
    }

    public function employments()
    {
        return $this->hasMany(employment::class, 'user_id');
    }

    public function teamusers()
    {
        return $this->hasMany(teamuser::class, 'user_id');
    }
    public function contactusers()
    {
        return $this->hasMany(contactuser::class, 'user_id');
    }

    public function archvementcontactusers()
    {
        return $this->hasMany(contactuser::class, 'user_id');
    }

    public function favoritecontactusers()
    {
        return $this->hasMany(contactuser::class, 'user_id');
    }

    public function contactuserslocations()
    {
        return $this->hasMany(contactuserslocation::class, 'user_id');
    }

    public function favoritecontactuserslocations()
    {
        return $this->hasMany(contactuserslocation::class, 'user_id');
    }

    public function archvementcontactuserslocations()
    {
        return $this->hasMany(contactuserslocation::class, 'user_id');
    }

    public function contactusersventes()
    {
        return $this->hasMany(contactusersvente::class, 'user_id');
    }

    public function  archvementcontactusersventes()
    {
        return $this->hasMany(contactusersvente::class, 'user_id');
    }

    public function favoritecontactusersventes()
    {
        return $this->hasMany(contactusersvente::class, 'user_id');
    }

    public function subscriberusers()
    {
        return $this->hasMany(subscriberuser::class, 'user_id');
    }


    public function removelikes()
    {
        return $this->belongsToMany(
            like::class,
            'likes',
            'user_id',
            'likeable_id')
            ->withTimeStamps();
    }

    public function removefavorites()
    {
        return $this->belongsToMany(
            favorite::class,
            'favorites',
            'user_id',
            'favoriteable_id')
            ->withTimeStamps();
    }

    public function removesubscribannonces()
    {
        return $this->belongsToMany(
            subscribannonce::class,
            'subscribannonces',
            'user_id',
            'subscribannonceable_id')
            ->withTimeStamps();
    }

}
