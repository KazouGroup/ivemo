<?php

namespace App\model;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;

class profile extends Model
{
    //use AuditableTrait;

   protected $guarded = [
           'created_at','updated_at'
    ];


    public function getRouteKeyName()
    {
        return 'slug';
    }

    protected $casts = [
        'status_avis' => 'boolean',
        'status_team_user' => 'boolean',
        'status_employments' => 'boolean',
        'status_annonce_ventes' => 'boolean',
        'status_annonce_locations' => 'boolean',
        'status_annonce_reservations' => 'boolean',
        'status_blog_locations' => 'boolean',
        'status_blog_reservations' => 'boolean',
        'status_blog_ventes' => 'boolean',
    ];

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
