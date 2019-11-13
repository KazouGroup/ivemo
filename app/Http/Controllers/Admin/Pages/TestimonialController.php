<?php

namespace App\Http\Controllers\Admin\Pages;

use App\Http\Resources\TestimonialResource;
use App\Model\testimonial;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Symfony\Component\HttpFoundation\Response;

class TestimonialController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth',['except' => ['api']]);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('admin.testimonial.index');
    }

    public function api()
    {
        $testimonials = TestimonialResource::collection(testimonial::with('user')->latest()->get());
        return response()->json($testimonials,200) ;
    }

    public function show($id)
    {
        $testimonial = new TestimonialResource(testimonial::where('id',$id)->firstOrFail());
        return response()->json($testimonial,200) ;
    }

    public function create()
    {
        return view('admin.testimonial.create');
    }

    public function edit($id)
    {
        $testimonial = testimonial::where('id', $id)->findOrFail($id);
        return view('admin.testimonial.show', compact('testimonial'));
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //dd(\request()->all()); // pour tester les donner qui entre dans la base de donner
        $this->validate($request,[
            'body' => 'required',
            'role' => 'required|string|max:100',
        ]);

        $testimonial = new Testimonial;

        $slug = sha1(date('YmdHis') . str_random(5));

        $testimonial->body = $request->body;
        $testimonial->role = $request->role;
        $testimonial->slug = $slug;

        $testimonial->save();

        return response('Created', Response::HTTP_CREATED);
    }

    /**
     * @param testimonial $testimonial
     * @return \Illuminate\Http\JsonResponse
     */
    public function status(testimonial $testimonial,$id)
    {
        $testimonial = testimonial::where('id', $id)->findOrFail($id);
        $testimonial->update(['status' => !$testimonial->status]);

        return response('Update', Response::HTTP_ACCEPTED);
    }


    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */

    public function vector(testimonial $testimonial)
    {
        return view('admin.testimonial.show', [
            'testimonial' => $testimonial,
        ]);
    }

    public function view($slug)
    {
        $testimonial = new TestimonialResource(testimonial::where('slug',$slug)->firstOrFail());
        return $testimonial;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return array|\Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $this->validate($request,[
            'body' => 'required',
            'role' => 'required|string|max:100',
        ]);

        $testimonial = Testimonial::findOrFail($id);

        $testimonial->body = $request->body;
        $testimonial->role = $request->role;

        $testimonial->save();

        return ['message' => 'updated successfully'];
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int $id
     * @return array|\Illuminate\Http\Response
     */
    public function destroy(Request $request,$id)
    {
        $testimonial = Testimonial::findOrFail($id);

        $testimonial->delete();

        return ['message' => 'Deleted successfully'];
    }
}
