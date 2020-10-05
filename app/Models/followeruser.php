<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;

class followeruser extends Model
{
    protected $guarded = [];

    protected  $table = 'followerusers';

    public function user()
    {
        return $this->belongsTo(user::class,'user_id');
    }

    public function member()
    {
        return $this->belongsTo(user::class,'member_id');
    }

    public function isOnline()
    {
        return (bool) Cache::has('user-is-online-' . $this->user->id);
    }

    public function followeruser()
    {
        return (bool) followeruser::where('user_id', Auth::id())
            ->where('member_id', $this->user->id)
            ->first();
    }

    public function followinguser()
    {
        return (bool) followeruser::where('user_id', Auth::id())
            ->where('member_id', $this->member->id)
            ->first();
    }
}
