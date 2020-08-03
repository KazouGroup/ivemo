<?php

namespace App\Traits;

use App\Model\abonne\subscribeannonce;
use App\Model\abonne\subscribeblogannonce;
use App\Model\abonne\subscribeforum;
use App\Model\abonne\subscribemployment;
use App\Model\followeruser;
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
            'member_id')->withTimeStamps();
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

    public function subscribeforum()
    {
        return (bool) subscribeforum::where('user_id', Auth::guard('web')->id())
            ->where('member_id', $this->id)
            ->first();
    }


    public function subscribeforums()
    {
        return $this->hasMany(subscribeforum::class, 'user_id');
    }


    public function putsubscribeforums()
    {
        return $this->belongsToMany(
            subscribeforum::class,
            'subscribeforums',
            'user_id',
            'member_id')
            ->withTimeStamps();
    }



    public function subscribeannonce()
    {
        return (bool) subscribeannonce::where('user_id', Auth::guard('web')->id())
            ->where('member_id', $this->id)
            ->first();
    }


    public function subscribeannonces()
    {
        return $this->hasMany(subscribeannonce::class, 'user_id');
    }


    public function putsubscribannonces()
    {
        return $this->belongsToMany(
            subscribeannonce::class,
            'subscribeannonces',
            'user_id',
            'member_id')
            ->withTimeStamps();
    }


    public function followerusers()
    {
        return $this->hasMany(followeruser::class, 'member_id');
    }


    public function putfollowerusers()
    {
        return $this->belongsToMany(
            followeruser::class,
            'followerusers',
            'user_id',
            'member_id')
            ->withTimeStamps();
    }

    public function followeruser()
    {
        return (bool) followeruser::where('user_id', Auth::id())
            ->where('member_id', $this->id)
            ->first();
    }



}
