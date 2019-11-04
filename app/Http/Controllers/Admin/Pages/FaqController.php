<?php

namespace App\Http\Controllers\Admin\Pages;

use App\Http\Controllers\Controller;
use App\Http\Resources\FaqResource;
use App\Model\faq;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response;

class FaqController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth',['except' => ['api','view','apibystatus']]);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('admin.faq.index');
    }

    public function v1()
    {
        return view('admin.faq.index');
    }

    public function sites()
    {
        return view('admin.faq.index');
    }

    public function api()
    {
        $faqs =  FaqResource::collection(faq::with('user')->latest()->get());

        return response()->json($faqs,200);
    }

    public function apibystatus()
    {
        $faqs =  FaqResource::collection(faq::with('user')
            ->where('status',1)->latest()
            ->paginate(12));

        return response()->json($faqs);
    }

    public function view($slug)
    {
        $faq = new FaqResource(faq::where('slug',$slug)->first());

        return response()->json($faq,200);
    }
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('admin.faq.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $inputs = $request->validate([
            'title' => 'required',
            'body' => 'required',
        ]);

        $faq = faq::create([
            'title' => $inputs['title'],
            'body' => $inputs['body'],
        ]);

        return response()->json($faq,200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $faq = new FaqResource(faq::where('id', $id)->findOrFail($id));

        return response()->json($faq,200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit(faq $faq)
    {
        $data = [
            'faq' => $faq,
        ];
        return view('admin.faq.show',$data);
    }

    public function vector(faq $faq)
    {
        $data = [
            'faq' => $faq,
        ];
        return view('admin.faq.show', $data);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return array|\Illuminate\Http\Response
     */
    public function update(Request $request, faq $faq)
    {
        $this->validate($request,[
            'title'=>'required|string',
        ]);

        $faq = faq::findOrFail($faq->id);


        $faq->title = $request->title;
        $faq->body = $request->body;
        $faq->slug = null;
        //$faq->categoryfaq_id = $request->categoryfaq_id;

        $faq->save();

        return ['message' => 'updated successfully'];
    }


    /**
     * @param faq $faq
     * @return \Illuminate\Http\JsonResponse
     */
    public function disable(faq $faq, $id)
    {
        $faq = faq::where('id', $id)->findOrFail($id);
        $faq->update([
            'status' => 0,
        ]);
        return response('Deactivated',Response::HTTP_ACCEPTED);
    }

    public function active(faq $faq, $id)
    {
        $faq = faq::where('id', $id)->findOrFail($id);
        $faq->update([
            'status' => 1,
        ]);
        return response('Activated',Response::HTTP_ACCEPTED);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  faq $faq
     * @return array|\Illuminate\Http\Response
     */
    public function destroy(faq $faq)
    {
        $faq = faq::findOrFail($faq->id);
        $faq->delete();

        return ['message' => 'Deleted successfully '];
    }
}
