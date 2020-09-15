<?php

namespace App\Http\Resources\Profile;

use App\Model\annoncevente;
use Illuminate\Http\Resources\Json\JsonResource;

class PrivateAnnonceventeResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'slug' => $this->slug,
            'slugin' => $this->slugin,
            'link_video' => $this->link_video,
            'surface' => $this->surface,
            'rooms' => $this->rooms,
            'pieces' => $this->pieces,
            'price' => $this->price,
            'district' => $this->district,
            'annoncetype_id' => $this->annoncetype_id,
            'user' => $this->user,
            'user_id' => $this->user_id,
            'city' => $this->city,
            'city_id' => $this->city_id,
            'annoncetype' => $this->annoncetype,
            'status' => $this->status,
            'furniture' => $this->furniture,
            'terrace' => $this->terrace,
            'balcony' => $this->balcony,
            'elevator' => $this->elevator,
            'terrace_number' => $this->terrace_number,
            'balcony_number' => $this->balcony_number,
            'phone_seller' => $this->phone_seller,
            'contact_seller' => $this->contact_seller,
            'status_comments' => $this->status_comments,
            'status_admin' => $this->status_admin,
            'contactservices' => $this->contactservices,
            'contactservices_count' => $this->contactservices_count,
            'favoriteted' => $this->favoriteted(),
            'likeked' => $this->likeked(),
            'countlikes' => $this->likes()
                ->whereIn('likeable_id',[$this->id])
                ->where('likeable_type', annoncevente::class)
                ->count(),
            'uploadimages' => $this->uploadimages()
                ->whereIn('uploadimagealable_id',[$this->id])
                ->where('uploadimagealable_type', annoncevente::class)
                ->get(),
            'uploadimages_count' => $this->uploadimages()
                ->whereIn('uploadimagealable_id',[$this->id])
                ->where('uploadimagealable_type', annoncevente::class)
                ->count(),
            'countsignals' => $this->signals()->count(),
            'visits_count' => $this->visits()->count(),
            'visits_countries' => $this->visits()->countries(),
            'visits_languages' => $this->visits()->languages(),
            'visits_operatingSystems' => $this->visits()->operatingSystems(),
            'statusOnline' => $this->isOnline(),
            'countcomments' => $this->comments()->count(),
            'categoryannoncevente' => $this->categoryannoncevente,
            'signalannonceventes_count' => $this->signalannonceventes_count,
            'categoryannoncevente_id' => $this->categoryannoncevente_id,
            'disponible_date' => (string) $this->disponible_date,
            'created_at' => (string) $this->created_at,
            'updated_at' => (string) $this->updated_at,
            'expired_at' => (string) $this->expired_at->diffInDays(),
        ];
    }
}
