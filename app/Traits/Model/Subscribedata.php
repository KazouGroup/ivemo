<?php

namespace App\Traits\Model;

use App\Model\abonne\subscribeblogannonce;
use App\Model\abonne\subscribemployment;
use Illuminate\Support\Facades\Auth;

trait Subscribedata
{


    public function subscribedblog()
    {
        return (bool) subscribeblogannonce::where('user_id', Auth::guard('web')->id())
            ->where('member_id', $this->id)
            ->first();
    }

    public function subscribeblogannonces()
    {
        return $this->hasMany(subscribeblogannonce::class, 'user_id');
    }

    public function putsubscribeblogannonces()
    {
        return $this->belongsToMany(
            subscribeblogannonce::class,
            'subscribeblogannonces',
            'user_id',
            'member_id')
            ->withTimeStamps();
    }



    public function subscribedemployment()
    {
        return (bool) subscribemployment::where('user_id', Auth::guard('web')->id())
            ->where('member_id', $this->id)
            ->first();
    }

    public function subscribemployments()
    {
        return $this->hasMany(subscribemployment::class, 'user_id');
    }

    public function putsubscribemployments()
    {
        return $this->belongsToMany(
            subscribemployment::class,
            'subscribemployments',
            'user_id',
            'member_id')
            ->withTimeStamps();
    }




}
