<?php
namespace App\Services;

use App\Model\user;

class HelpersService
{
    public static function helperscontactuserscount($user)
    {
        $data = user::whereSlug($user->slug)

            ->withCount(['contactusers' => function ($q) use ($user){
                $q->where('status_red',1)
                    ->with('user')
                    ->whereIn('user_id',[$user->id]);
            }])
            ->withCount(['contactusersventes' => function ($q) use ($user){
                $q->where('status_red',1)
                    ->whereIn('user_id',[$user->id])
                    ->with('annoncevente','user')
                    ->whereHas('annoncevente', function ($q) use ($user) {
                        $q->where('status_admin',1)
                            ->whereIn('user_id',[$user->id]);
                    });},
            ])
            ->withCount(['contactuserslocations' => function ($q) use ($user){
                $q->where('status_red',1)
                    ->whereIn('user_id',[$user->id])
                    ->with('annoncelocation','user')
                    ->whereHas('annoncelocation', function ($q) use ($user) {
                        $q->where('status_admin',1)
                            ->whereIn('user_id',[$user->id]);
                    });},
            ]);

        return $data;

    }

    public static function helpersannonceteamcount($user)
    {
        $data = user::whereSlug($user->slug)
            ->withCount(['subscriberusers' => function ($q){
                $q->whereIn('user_id',[auth()->user()->id]);
            }])->withCount(['teamusers' => function ($q) use ($user){
                $q->whereIn('user_id',[$user->id]);
            }])->withCount(['annoncelocations' => function ($q) use ($user){
                $q->whereHas('categoryannoncelocation', function ($q) {$q->where('status',1);})
                    ->whereIn('user_id',[$user->id]);
            }])->withCount(['annoncereservations' => function ($q) use ($user){
                $q->whereHas('categoryannoncereservation', function ($q) {$q->where('status',1);})
                    ->whereIn('user_id',[$user->id]);
            }])->withCount(['annonceventes' => function ($q) use ($user){
                $q->whereHas('categoryannoncevente', function ($q) {$q->where('status',1);})
                    ->whereIn('user_id',[$user->id]);
            }])->withCount(['blogannoncelocations' => function ($q) use ($user){
                $q->whereHas('categoryannoncelocation', function ($q) {$q->where('status',1);})
                    ->whereIn('user_id',[$user->id]);
            }])->withCount(['blogannoncereservations' => function ($q) use ($user){
                $q->whereHas('categoryannoncereservation', function ($q) {$q->where('status',1);})
                    ->whereIn('user_id',[$user->id]);
            }])->withCount(['blogannonceventes' => function ($q) use ($user){
                $q->whereHas('categoryannoncevente', function ($q) {$q->where('status',1);})
                    ->whereIn('user_id',[$user->id]);
            }]);

        return $data;

    }

}
