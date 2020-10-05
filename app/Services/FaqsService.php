<?php


namespace App\Services;


use App\Http\Resources\FaqResource;
use App\Models\categoryfaq;
use App\Models\faq;
use Illuminate\Support\Facades\Auth;

class FaqsService
{

    public static function findAll()
    {
        $faqs =  FaqResource::collection(faq::with('user','categoryfaq')->latest()->get());

        return response()->json($faqs,200);
    }
    /**
     * Return the permission with the given id, or null if no product is found.
     *
     * @param int $id
     */
    public static function faqbycatagoryapi($categoryfaq)
    {
        $faqs = FaqResource::collection(categoryfaq::whereSlug($categoryfaq)->firstOrFail()->faqs()
            ->with('user','categoryfaq')->latest()
            ->paginate(6));
        return response()->json($faqs,200);
    }

}
