<?php
namespace App\Services;

use App\Model\user;

class HelpersService
{
    public static function helpersdatabyuseractive($user)
    {
        $data = user::whereSlug($user->slug)
            ->withCount(['annoncelocations' => function ($q) use ($user){
                $q->where(['status' => 1,'status_admin' => 1])
                    ->whereHas('categoryannoncelocation', function ($q) {$q->where('status',1);})
                    ->whereHas('city', function ($q) {$q->where('status',1);})
                    ->whereIn('user_id',[$user->id]);
            }])->withCount(['annoncereservations' => function ($q) use ($user){
                $q->where(['status' => 1,'status_admin' => 1])
                    ->whereHas('categoryannoncereservation', function ($q) {$q->where('status',1);})
                    ->whereHas('city', function ($q) {$q->where('status',1);})
                    ->whereIn('user_id',[$user->id]);
            }])->withCount(['annonceventes' => function ($q) use ($user){
                $q->where(['status' => 1,'status_admin' => 1])
                    ->whereHas('categoryannoncevente', function ($q) {$q->where('status',1);})
                    ->whereHas('city', function ($q) {$q->where('status',1);})
                    ->whereIn('user_id',[$user->id]);
            }])->withCount(['employments' => function ($q) use ($user){
                $q->where(['status' => 1,'status_admin' => 1])
                    ->whereHas('categoryemployment', function ($q) {$q->where('status',1);})
                    ->whereHas('city', function ($q) {$q->where('status',1);})
                    ->whereIn('user_id',[$user->id]);
            }])->withCount(['blogannoncelocations' => function ($q) use ($user){
                $q->where(['status' => 1,'status_admin' => 1])
                    ->whereHas('categoryannoncelocation', function ($q) {$q->where('status',1);})
                    ->whereIn('user_id',[$user->id]);
            }])->withCount(['blogannoncereservations' => function ($q) use ($user){
                $q->where(['status' => 1,'status_admin' => 1])
                    ->whereHas('categoryannoncereservation', function ($q) {$q->where('status',1);})
                    ->whereIn('user_id',[$user->id]);
            }])->withCount(['blogannonceventes' => function ($q) use ($user){
                $q->where(['status' => 1,'status_admin' => 1])
                    ->whereHas('categoryannoncevente', function ($q) {$q->where('status',1);})
                    ->whereIn('user_id',[$user->id]);
            }]);

        return $data;

    }


    public static function helpersfavoritescount($user)
    {
        $data = user::whereSlug($user->slug)
            ->withCount(['favoritemployments' => function ($q) use ($user){
                $q->with('user','employment')
                    ->whereIn('user_id',[$user->id])
                    ->whereHas('employment', function ($q) {$q->where(['status' => 1,'status_admin' => 1]);})
                    ->whereHas('employment.city', function ($q) {$q->where('status',1);})
                    ->whereHas('employment.categoryemployment', function ($q) {$q->where('status',1);});
            }])
            ->withCount(['favoriteannonceventes' => function ($q) use ($user){
                $q->with('user','annonceventes')
                    ->whereIn('user_id',[$user->id])
                    ->whereHas('annoncevente', function ($q) {$q->where(['status' => 1,'status_admin' => 1]);})
                    ->whereHas('annoncevente.city', function ($q) {$q->where('status',1);})
                    ->whereHas('annoncevente.categoryannoncevente', function ($q) {$q->where('status',1);});
            }])
            ->withCount(['favoriteannoncelocations' => function ($q) use ($user){
                $q->with('user','annoncelocations')
                    ->whereIn('user_id',[$user->id])
                    ->whereHas('annoncelocation', function ($q) {$q->where(['status' => 1,'status_admin' => 1]);})
                    ->whereHas('annoncelocation.city', function ($q) {$q->where('status',1);})
                    ->whereHas('annoncelocation.categoryannoncelocation', function ($q) {$q->where('status',1);});
            }])
            ->withCount(['favoriteblogannoncereservations' => function ($q) use ($user){
                $q->with('user','blogannoncereservation')
                    ->whereIn('user_id',[$user->id])
                    ->whereHas('blogannoncereservation', function ($q) {$q->where(['status' => 1,'status_admin' => 1]);})
                    ->whereHas('blogannoncereservation.categoryannoncereservation', function ($q) {$q->where('status',1);});
            }])
            ->withCount(['favoriteblogannoncelocations' => function ($q) use ($user){
                $q->with('user','blogannoncelocation')
                    ->whereIn('user_id',[$user->id])
                    ->whereHas('blogannoncelocation', function ($q) {$q->where(['status' => 1,'status_admin' => 1]);})
                    ->whereHas('blogannoncelocation.categoryannoncelocation', function ($q) {$q->where('status',1);});
            }])
            ->withCount(['favoriteblogannonceventes' => function ($q) use ($user){
                $q->with('user','blogannoncevente')
                    ->whereIn('user_id',[$user->id])
                    ->whereHas('blogannoncevente', function ($q) {$q->where(['status' => 1,'status_admin' => 1]);})
                    ->whereHas('blogannoncevente.categoryannoncevente', function ($q) {$q->where('status',1);});
            }]);

        return $data;

    }


    public static function helperscontactuserscount($user)
    {
        $data = user::whereSlug($user->slug)
            ->withCount(['contactusers' => function ($q) use ($user){
                $q->where(['status_red' => 1])
                    ->with('user')
                    ->whereIn('user_id',[$user->id]);
            }])
            ->withCount(['archvementcontactusers' => function ($q) use ($user){
                $q->where(['status_archvement' => 1])
                    ->with('user')
                    ->whereIn('user_id',[$user->id]);
            }])->withCount(['favoritecontactusers' => function ($q) use ($user){
                $q->where(['status_favorite' => 1])
                    ->with('user')
                    ->whereIn('user_id',[$user->id]);
            }])
            ->withCount(['contactusersventes' => function ($q) use ($user){
                $q->where(['status_red' => 1])
                    ->whereIn('user_id',[$user->id])
                    ->with('annoncevente','user')
                    ->whereHas('annoncevente', function ($q) use ($user) {
                        $q->where('status_admin',1)
                            ->whereIn('user_id',[$user->id]);
                    });},
            ])->withCount(['favoritecontactusersventes' => function ($q) use ($user){
                $q->where(['status_favorite' => 1])
                    ->whereIn('user_id',[$user->id])
                    ->with('annoncevente','user')
                    ->whereHas('annoncevente', function ($q) use ($user) {
                        $q->where('status_admin',1)
                            ->whereIn('user_id',[$user->id]);
                    });},
            ])->withCount(['archvementcontactusersventes' => function ($q) use ($user){
                $q->where(['status_archvement' => 1])
                    ->whereIn('user_id',[$user->id])
                    ->with('annoncevente','user')
                    ->whereHas('annoncevente', function ($q) use ($user) {
                        $q->where('status_admin',1)
                            ->whereIn('user_id',[$user->id]);
                    });},
            ])
            ->withCount(['contactuserslocations' => function ($q) use ($user){
                $q->where(['status_red' => 1])
                    ->whereIn('user_id',[$user->id])
                    ->with('annoncelocation','user')
                    ->whereHas('annoncelocation', function ($q) use ($user) {
                        $q->where('status_admin',1)
                            ->whereIn('user_id',[$user->id]);
                    });},
            ])->withCount(['archvementcontactuserslocations' => function ($q) use ($user){
                $q->where(['status_archvement' => 1])
                    ->whereIn('user_id',[$user->id])
                    ->with('annoncelocation','user')
                    ->whereHas('annoncelocation', function ($q) use ($user) {
                        $q->where('status_admin',1)
                            ->whereIn('user_id',[$user->id]);
                    });},
            ])->withCount(['favoritecontactuserslocations' => function ($q) use ($user){
                $q->where(['status_favorite' => 1])
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
                $q ->where(['status_admin' => 1])
                    ->whereHas('categoryannoncelocation', function ($q) {$q->where('status',1);})
                    ->whereHas('city', function ($q) {$q->where('status',1);})
                    ->whereIn('user_id',[$user->id]);
            }])->withCount(['annoncereservations' => function ($q) use ($user){
                $q ->where(['status_admin' => 1])
                    ->whereHas('categoryannoncereservation', function ($q) {$q->where('status',1);})
                    ->whereHas('city', function ($q) {$q->where('status',1);})
                    ->whereIn('user_id',[$user->id]);
            }])->withCount(['annonceventes' => function ($q) use ($user){
                $q ->where(['status_admin' => 1])
                    ->whereHas('categoryannoncevente', function ($q) {$q->where('status',1);})
                    ->whereHas('city', function ($q) {$q->where('status',1);})
                    ->whereIn('user_id',[$user->id]);
            }])->withCount(['employments' => function ($q) use ($user){
                $q->where(['status_admin' => 1])
                    ->whereHas('categoryemployment', function ($q) {$q->where('status',1);})
                    ->whereHas('city', function ($q) {$q->where('status',1);})
                    ->whereIn('user_id',[$user->id]);
            }])->withCount(['blogannoncelocations' => function ($q) use ($user){
                $q ->where(['status_admin' => 1])
                    ->whereHas('categoryannoncelocation', function ($q) {$q->where('status',1);})
                    ->whereIn('user_id',[$user->id]);
            }])->withCount(['blogannoncereservations' => function ($q) use ($user){
                $q ->where(['status_admin' => 1])
                    ->whereHas('categoryannoncereservation', function ($q) {$q->where('status',1);})
                    ->whereIn('user_id',[$user->id]);
            }])->withCount(['blogannonceventes' => function ($q) use ($user){
                $q ->where(['status_admin' => 1])
                    ->whereHas('categoryannoncevente', function ($q) {$q->where('status',1);})
                    ->whereIn('user_id',[$user->id]);
            }]);

        return $data;

    }


    public static function helpersannonblogceteambyusercount($user)
    {
        $data = user::whereSlug($user->slug)
            ->withCount(['subscriberusers' => function ($q){
                $q->whereIn('user_id',[auth()->user()->id]);
            }])->withCount(['teamusers' => function ($q) use ($user){
                $q->whereIn('user_id',[$user->id]);
            }])->withCount(['annoncelocations' => function ($q) use ($user){
                $q->where(['status_admin' => 1])
                    ->whereHas('categoryannoncelocation', function ($q) {$q->where('status',1);})
                    ->whereHas('city', function ($q) {$q->where('status',1);})
                    ->whereIn('user_id',[$user->id]);
            }])->withCount(['annoncereservations' => function ($q) use ($user){
                $q->where(['status_admin' => 1])
                    ->whereHas('categoryannoncereservation', function ($q) {$q->where('status',1);})
                    ->whereHas('city', function ($q) {$q->where('status',1);})
                    ->whereIn('user_id',[$user->id]);
            }])->withCount(['annonceventes' => function ($q) use ($user){
                $q->where(['status_admin' => 1])
                    ->whereHas('categoryannoncevente', function ($q) {$q->where('status',1);})
                    ->whereHas('city', function ($q) {$q->where('status',1);})
                    ->whereIn('user_id',[$user->id]);
            }])->withCount(['employments' => function ($q) use ($user){
                $q->where(['status_admin' => 1])
                    ->whereHas('categoryemployment', function ($q) {$q->where('status',1);})
                    ->whereHas('city', function ($q) {$q->where('status',1);})
                    ->whereIn('user_id',[$user->id]);
            }])->withCount(['blogannoncelocations' => function ($q) use ($user){
                $q->where(['status_admin' => 1])
                    ->whereHas('categoryannoncelocation', function ($q) {$q->where('status',1);})
                    ->whereIn('user_id',[$user->id]);
            }])->withCount(['blogannoncereservations' => function ($q) use ($user){
                $q->where(['status_admin' => 1])
                    ->whereHas('categoryannoncereservation', function ($q) {$q->where('status',1);})
                    ->whereIn('user_id',[$user->id]);
            }])->withCount(['blogannonceventes' => function ($q) use ($user){
                $q->where(['status_admin' => 1])
                    ->whereHas('categoryannoncevente', function ($q) {$q->where('status',1);})
                    ->whereIn('user_id',[$user->id]);
            }]);

        return $data;

    }

}
