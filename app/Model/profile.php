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
    ];

    public function user()
    {
        return $this->belongsTo(User::class,'user_id');
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
