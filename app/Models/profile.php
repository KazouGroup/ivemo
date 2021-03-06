<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;

class profile extends Model
{
    //use AuditableTrait;

   protected $table = 'profiles';

   protected $guarded = [
           'created_at','updated_at'
    ];

    protected $dates = [
        'birthdate',
    ];


    protected $casts = [
        'status_avis' => 'boolean',
        'status_team_user' => 'boolean',
        'status_employments' => 'boolean',
        'status_responsecomments' => 'boolean',
        'status_comments' => 'boolean',
        'status_annonce_ventes' => 'boolean',
        'status_annonce_locations' => 'boolean',
        'status_annonce_reservations' => 'boolean',
        'status_blog_locations' => 'boolean',
        'status_blog_reservations' => 'boolean',
        'status_blog_ventes' => 'boolean',
        'status_contactservice' => 'boolean',
    ];


    public function getRouteKeyName()
    {
        return 'slug';
    }

    public function user()
    {
        return $this->belongsTo(user::class,'user_id');
    }

    public function city()
    {
        return $this->belongsTo(city::class,'city_id');
    }

    public function categoryprofile()
    {
        return $this->belongsTo(categoryprofile::class,'categoryprofile_id');
    }
}
