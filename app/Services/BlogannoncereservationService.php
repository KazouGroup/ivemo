<?php
namespace App\Services;


use App\Http\Resources\BlogannoncereservationResource;
use App\Model\blogannoncereservation;

class BlogannoncereservationService
{

    public static function show($blogannoncereservation)
    {
        $blogannoncereservation = new BlogannoncereservationResource(blogannoncereservation::whereSlugin($blogannoncereservation)->first());

        return $blogannoncereservation;
    }

}
