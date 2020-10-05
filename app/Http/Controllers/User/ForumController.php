<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\Forum\StoreRequest;
use App\Http\Requests\Forum\UpdateRequest;
use App\Models\categoryforum;
use App\Models\user;
use App\Models\forum;
use App\Services\ForumService;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ForumController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth',['only' => [
            'create','store','statuscomments','destroy','apiforumslugin','edit','update', 'forumsbyuser','apiforumsbyuser'
        ]]);
    }


    public function index()
    {
        return view ('user.forum.index');
    }

    public function forumsbyuser(user $user)
    {
        $this->authorize('update',$user);

        return view('user.forum.forumsetting', compact ('user'));
    }

    public function apicategoryforumcount()
    {
        $categoryforumcounts = ForumService::apicategoryforumcount();

        return response()->json($categoryforumcounts,200);
    }

    public function apicategoryforumbyusercount()
    {
        $categoryforumcounts = ForumService::apicategoryforumbyusercount();

        return response()->json($categoryforumcounts,200);
    }

    public function apiforums()
    {
        $forums = ForumService::apiforums();

        return response()->json($forums,200);
    }

    public function apiforumscategory(categoryforum $categoryforum)
    {
        $forums = ForumService::apiforumscategory($categoryforum);

        return response()->json($forums,200);
    }

    public function apiforumscategoryinteresse(categoryforum $categoryforum)
    {
        $forums = ForumService::apiforumscategoryinteresse($categoryforum);

        return response()->json($forums,200);
    }


    public function apiforumscategorycount(categoryforum $categoryforum)
    {
        $forums = ForumService::apiforumscategorycount($categoryforum);

        return response()->json($forums,200);
    }

    public function forumscategory(categoryforum $categoryforum)
    {
        ForumService::apiforumscategory($categoryforum);

        return view ('user.forum.categoryforum',compact('categoryforum'));
    }

    public function apiforumscategoryslugin(categoryforum $categoryforum,$user,forum $forum)
    {
        visits($forum)->seconds(5)->increment();

        $forums = ForumService::apiforumscategoryslugin($categoryforum,$forum);

        return response()->json($forums,200);
    }

    public function forumscategoryslugin(categoryforum $categoryforum,$user,forum $forum)
    {
        visits($forum)->seconds(5)->increment();

        return view ('user.forum.show',compact('forum'));
    }

    public function apiforumsbyuser(user $user)
    {
        $this->authorize('update',$user);

        $forums = ForumService::apiforumsbyuser($user);

        return response()->json($forums,200);
    }


    public function statuscomments($id)
    {
        $forum = forum::where('id', $id)->findOrFail($id);

        $this->authorize('update',$forum);

        $forum->update(['status_comments' => !$forum->status_comments,]);

        return response('Confirmed',Response::HTTP_ACCEPTED);
    }

    public function create()
    {
        return view ('user.forum.create');
    }

    public function store(StoreRequest $request)
    {
        $forum= new forum();

        $forum->fill($request->all());

        ForumService::sendMessageToUser($request);

        $forum->save();

        return response('Created',Response::HTTP_CREATED);
    }

    public function apiforumslugin(forum $forum)
    {
        $this->authorize('update',$forum);

        $forums = ForumService::apiforumslugin($forum);

        return response()->json($forums,200);

    }

    public function edit(forum $forum)
    {
        $this->authorize('update',$forum);

        return view ('user.forum.edit',compact('forum'));
    }

    public function update(UpdateRequest $request,forum $forum)
    {
        $this->authorize('update',$forum);

        $forum->slug = null;
        $forum->update($request->all());

        return response()->json($forum,200);
    }

    public function destroy(forum $forum)
    {
        $this->authorize('update',$forum);

        $forum->delete();

        return ['message' => 'Deleted successfully'];
    }

}
