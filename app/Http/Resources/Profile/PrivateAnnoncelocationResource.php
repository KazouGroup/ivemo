<?php

namespace App\Http\Resources\Profile;

use App\Model\annoncelocation;
use Illuminate\Http\Resources\Json\JsonResource;

class PrivateAnnoncelocationResource extends JsonResource
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
            'surface' => $this->surface,
            'rooms' => $this->rooms,
            'pieces' => $this->pieces,
            'district' => $this->district,
            'price' => $this->price,
            'link_video' => $this->link_video,
            'award_price' => $this->award_price,
            'user' => $this->user,
            'user_id' => $this->user_id,
            'city' => $this->city,
            'city_id' => $this->city_id,
            'annoncetype' => $this->annoncetype,
            'annoncetype_id' => $this->annoncetype_id,
            'periodeannonce_id' => $this->periodeannonce_id,
            'periodeannonce' => $this->periodeannonce,
            'status' => $this->status,
            'furniture' => $this->furniture,
            'terrace' => $this->terrace,
            'balcony' => $this->balcony,
            'elevator' => $this->elevator,
            'terrace_number' => $this->terrace_number,
            'balcony_number' => $this->balcony_number,
            'phone_seller' => $this->phone_seller,
            'contact_seller' => $this->contact_seller,
            'contactservices' => $this->contactservices,
            'contactservices_count' => $this->contactservices_count,
            'status_comments' => $this->status_comments,
            'status_admin' => $this->status_admin,
            'favoriteted' => $this->favoriteted(),
            'likeked' => $this->likeked(),
            'countlikes' => $this->likes()
                ->whereIn('likeable_id',[$this->id])
                ->where('likeable_type', annoncelocation::class)
                ->count(),
            'uploadimages' => $this->uploadimages()
                ->where(['status' => 1,'status_admin' => 1])
                ->whereIn('uploadimagealable_id',[$this->id])
                ->where('uploadimagealable_type', annoncelocation::class)
                ->get(),
            'uploadimages_count' => $this->uploadimages()
                ->where(['status' => 1,'status_admin' => 1])
                ->whereIn('uploadimagealable_id',[$this->id])
                ->where('uploadimagealable_type', annoncelocation::class)
                ->count(),
            'countsignals' => $this->signals()->count(),
            'countcomments' => $this->comments()->count(),
            'visits_count' => $this->visits()->count(),
            'visits_countries' => $this->visits()->countries(),
            'visits_languages' => $this->visits()->languages(),
            'visits_operatingSystems' => $this->visits()->operatingSystems(),
            'statusOnline' => $this->isOnline(),
            'categoryannoncelocation' => $this->categoryannoncelocation,
            'signalannoncelocations_count' => $this->signalannoncelocations_count,
            'categoryannoncelocation_id' => $this->categoryannoncelocation_id,
            'disponible_date' => (string) $this->disponible_date,
            'created_at' => (string) $this->created_at,
            'updated_at' => (string) $this->updated_at,
            'expired_at' => (string) $this->expired_at->diffInDays(),
        ];
    }
}
