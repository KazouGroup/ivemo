<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
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
            'first_name' => $this->first_name,
            'last_name' => $this->last_name,
            'username' => $this->username,
            'slug' => $this->slug,
            'email' => $this->email,
            'sex' => $this->sex,
            'phone' => $this->phone,
            'categoryprofile_id' => $this->categoryprofile_id,
            //'birthday' => $this->birthday->format('d/m/Y'),
            'birthday' => $this->birthday,
            'color_name' => $this->color_name,
            'status_user' => $this->status_user,
            'body' => $this->body,
            'avatar' => $this->avatar,
            'avatarcover' => $this->avatarcover,
            'status_profile' => $this->status_profile,
            'email_verified_at' => $this->email_verified_at,
            'statusOnline' => $this->isOnline(),
            'roles' => $this->roles()->pluck('name'),
            'profile' => $this->profile,
            'status_avis' => $this->status_avis,
            //'provider' => $this->provider,
            'subscribedblog' => $this->subscribedblog(),
            'subscribedemployment' => $this->subscribedemployment(),


            'subscribannonced' => $this->subscribannonced(),
            'subscribannonces' => $this->subscribannonces()->count(),

            'employments_count' => $this->employments_count,
            'annoncelocations_count' => $this->annoncelocations_count,
            'blogannoncelocations_count' => $this->blogannoncelocations_count,
            'annoncereservations_count' => $this->annoncereservations_count,
            'blogannoncereservations_count' => $this->blogannoncereservations_count,
            'blogannonceventes_count' => $this->blogannonceventes_count,
            'annonceventes_count' => $this->annonceventes_count,
            'created_at' => (string) $this->created_at,
            'updated_at' => (string) $this->updated_at,
        ];
    }
}
