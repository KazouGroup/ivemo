<?php

namespace App\Http\Controllers\Admin\Pages;

use App\Http\Controllers\Controller;
use App\Http\Requests\Faq\StoreRequest;
use App\Http\Requests\Faq\UpdateRequest;
use App\Http\Resources\FaqResource;
use App\Models\categoryfaq;
use App\Models\faq;
use Illuminate\Http\Request;
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
        $this->middleware('auth',['except' => ['api','view','apibystatus','faqbycatagoryapi','apisitesfaqs']]);
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

    public function sites()
    {
        return view('admin.faq.index');
    }

    public function api()
    {
        $faqs =  FaqResource::collection(faq::with('user','categoryfaq')->latest()->get());

        return response()->json($faqs,200);
    }

    public function apisitesfaqs()
    {
        $faqs =  FaqResource::collection(faq::with('user','categoryfaq')
            ->where('status',1)->latest()->get());

        return response()->json($faqs,200);
    }

    public function apibystatus()
    {
        $faqs =  FaqResource::collection(faq::with('user','categoryfaq')
            ->where('status',1)->latest()
            ->paginate(12));

        return response()->json($faqs);
    }

    public function faqbycatagoryapi($categoryfaq)
    {
        $faqs = FaqResource::collection(categoryfaq::whereSlug($categoryfaq)->firstOrFail()->faqs()
            ->with('user','categoryfaq')->latest()->get());

        return response()->json($faqs,200);

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
    public function store(StoreRequest $request)
    {

        $inputs = $request->all();

        $faq = faq::create([
            'title' => $inputs['title'],
            'body' => $inputs['body'],
            'categoryfaq_id' => $inputs['categoryfaq_id'],
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

    public function v1()
    {
        return view('admin.faq.index');
    }

    public function vector($slug)
    {
        $faq = faq::where('slug',$slug)->first();
        return view('admin.faq.show', compact('faq'));
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return array|\Illuminate\Http\Response
     */
    public function update(UpdateRequest $request, faq $faq)
    {


        $faq = faq::findOrFail($faq->id);


        $faq->title = $request->title;
        $faq->body = $request->body;
        $faq->categoryfaq_id = $request->categoryfaq_id;
        $faq->slug = null;


        $faq->save();

        return ['message' => 'updated successfully'];
    }


    /**
     * @param faq $faq
     * @return \Illuminate\Http\JsonResponse
     */
    public function status(faq $faq,$id)
    {
        $faq = faq::where('id', $id)->findOrFail($id);
        $faq->update(['status' => !$faq->status]);

        return response('Update', Response::HTTP_ACCEPTED);
    }


    public function activated($id)
    {
        $faq = faq::where('id', $id)->findOrFail($id);

        $faq->update(['status' => 1,]);

        return response('Confirmed',Response::HTTP_ACCEPTED);
    }

    public function unactivated($id)
    {
        $faq = faq::where('id', $id)->findOrFail($id);

        $faq->update(['status' => 0,]);

        return response('Confirmed',Response::HTTP_ACCEPTED);
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
