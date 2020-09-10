<?php
namespace App\Services;



use App\Http\Resources\ForumResource;
use App\Jobs\NewforumJob;
use App\Model\abonne\subscribeforum;
use App\Model\categoryforum;
use App\Model\forum;
use Illuminate\Support\Facades\Auth;


class ForumService
{

    public static function getcategoryforum($categoryforum)
    {
        return
        $categoryforum->forums()->where(['status' => 1,'status_admin' => 1])
            ->with('user','categoryforum')
            ->whereIn('categoryforum_id',[$categoryforum->id])
            ->with(['user' => function ($q) {
                $q->select('id','first_name','status_profile','sex','slug','created_at','avatar');}])
            ->whereHas('categoryforum', function ($q) {$q->with('user')->where('status',1);})
            ->orderByDesc('created_at');
    }

    public static function apicategoryforumcount()
    {
        $data = categoryforum::where('status',1)
            ->withCount(['forums' => function ($q){
                $q->where(['status' => 1,'status_admin' => 1])
                    ->whereHas('categoryforum', function ($q) {$q->with('user')->where('status',1);});
            }])
            ->orderBy('forums_count','desc')
            ->distinct()->get();

        return $data;
    }

    public static function apicategoryforumbyusercount()
    {
        $data = categoryforum::where('status',1)
            ->withCount(['forums' => function ($q){
                $q->where(['status_admin' => 1])
                    ->whereHas('user', function ($q) {$q->whereIn('user_id',[Auth::id()]);})
                    ->whereHas('categoryforum', function ($q) {$q->with('user')->where('status',1);});
            }])
            ->orderBy('forums_count','desc')
            ->distinct()->get();

        return $data;
    }

    public static function apiforums()
    {
        $data = ForumResource::collection(forum::where(['status' => 1,'status_admin' => 1])
            ->with('user','categoryforum')
            ->with(['user' => function ($q) {
                $q->select('id','first_name','status_profile','sex','slug','created_at','avatar');}])
            ->whereHas('categoryforum', function ($q) {$q->with('user')->where('status',1);})
            ->orderByDesc('created_at')
            ->distinct()->get());

        return $data;
    }

    public static function apiforumscategory($categoryforum)
    {

        $data = ForumResource::collection(self::getcategoryforum($categoryforum)
            ->distinct()->get());

        return $data;
    }

    public static function apiforumscategoryinteresse($categoryforum)
    {

        $data = ForumResource::collection(self::getcategoryforum($categoryforum)
        ->take(18)
        ->distinct()->get());

        return $data;
    }

    public static function apiforumsbyuser($user)
    {
        $data = ForumResource::collection(forum::with('user','categoryforum')
            ->whereIn('user_id', [$user->id])
            ->whereHas('categoryforum', function ($q) {$q->with('user')->where('status',1);})
            ->orderByDesc('created_at')
            ->distinct()->paginate(40));

        return $data;
    }

    public static function apiforumscategorycount($categoryforum)
    {

        $data = categoryforum::whereSlug($categoryforum->slug)
            ->where(['status' => 1])
            ->withCount(['forums' => function ($q) use ($categoryforum){
                $q->where(['status' => 1,'status_admin' => 1])
                    ->whereHas('categoryforum', function ($q) {$q->with('user')->where('status',1);});
            }])->orderBy('forums_count','desc')
            ->first();

        return $data;
    }

    public static function apiforumscategoryslugin($categoryforum,$forum)
    {

        $data = new ForumResource(forum::whereSlugin($forum->slugin)
            //->where(['status' => 1,'status_admin' => 1])
            ->with('user','categoryforum')
            ->whereIn('categoryforum_id',[$categoryforum->id])
            ->with(['user' => function ($q) {$q->with('profile')
                ->select('id','first_name','status_profile','sex','created_at','avatar','slug');}])
            ->whereHas('categoryforum', function ($q) {$q->with('user')->where('status',1);})
            ->distinct()->firstOrFail());

        return $data;
    }

    public static function apiforumslugin($forum)
    {

        $data = new ForumResource(forum::whereSlugin($forum->slugin)
            ->with('user','categoryforum')
            ->with(['user' => function ($q) {$q->with('profile')
                ->distinct()->get();}])
            ->whereHas('categoryforum', function ($q) {$q->with('user')->where('status',1);})
            ->distinct()->firstOrFail());

        return $data;
    }


    public static function sendMessageToUser($request)
    {
        $fromUser = auth()->user();
        $fromTitleUser = $request->get('title');

        $emailsubscribeforum = subscribeforum::with('user','member')
            ->whereIn('member_id',[$fromUser->id])
            ->distinct()->get();

        $emailuserJob = (new NewforumJob($emailsubscribeforum,$fromTitleUser,$fromUser));

        dispatch($emailuserJob);

    }

}
