<?php

namespace App\Http\Controllers\User\Blogs;

use App\Http\Controllers\Controller;
use App\Model\blogannoncelocation;
use App\Model\blogannoncereservation;
use App\Model\blogannoncevente;

class BlogannonceController extends Controller
{

    public function index()
    {
        return view('user.blogs.index');
    }


    public function apiblogs_annonces_locations()
    {
        $categoryannoncelocations = blogannoncelocation::with('user','categoryannoncelocation')
            ->where(['status' => 1,'status_admin' => 1])
            ->whereHas('categoryannoncelocation', function ($q) {$q->where('status',1);})
            ->orderBy('created_at','DESC')->take(4)->distinct()->get();

        return response()->json($categoryannoncelocations, 200);
    }

    public function apiblogs_annonces_reservations()
    {
        $blogannoncereservations = blogannoncereservation::with('user','categoryannoncereservation')
            ->where(['status' => 1,'status_admin' => 1])
            ->whereHas('categoryannoncereservation', function ($q) {$q->where('status',1);})
            ->orderBy('created_at','DESC')->take(4)->distinct()->get();

        return response()->json($blogannoncereservations, 200);
    }

    public function apiblogs_annonces_ventes()
    {
        $blogannoncereseventes = blogannoncevente::with('user','categoryannoncevente')
            ->where(['status' => 1,'status_admin' => 1])
            ->whereHas('categoryannoncevente', function ($q) {$q->where('status',1);})
            ->orderBy('created_at','DESC')->take(4)->distinct()->get();

        return response()->json($blogannoncereseventes, 200);

    }

}
