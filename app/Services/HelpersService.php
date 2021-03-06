<?php

namespace App\Services;

use App\Models\annoncelocation;
use App\Models\annoncereservation;
use App\Models\annoncevente;
use App\Models\employment;
use App\Models\forum;
use App\Models\user;
use Illuminate\Support\Facades\Auth;

class HelpersService
{
    public static function helpersdatabyuseractive($user)
    {
        $data = user::whereSlug($user->slug)
            ->withCount(['annoncelocations' => function ($q) use ($user) {
                $q->where(['status' => 1, 'status_admin' => 1])
                    ->whereHas('categoryannoncelocation', function ($q) {
                        $q->where('status', 1);
                    })
                    ->whereHas('city', function ($q) {
                        $q->where('status', 1);
                    })
                    ->whereIn('user_id', [$user->id]);
            }])
            ->withCount(['annoncereservations' => function ($q) use ($user) {
                $q->where(['status' => 1, 'status_admin' => 1])
                    ->whereHas('categoryannoncereservation', function ($q) {
                        $q->where('status', 1);
                    })
                    ->whereHas('city', function ($q) {
                        $q->where('status', 1);
                    })
                    ->whereIn('user_id', [$user->id]);
            }])
            ->withCount(['annonceventes' => function ($q) use ($user) {
                $q->where(['status' => 1, 'status_admin' => 1])
                    ->whereHas('categoryannoncevente', function ($q) {
                        $q->where('status', 1);
                    })
                    ->whereHas('city', function ($q) {
                        $q->where('status', 1);
                    })
                    ->whereIn('user_id', [$user->id]);
            }])
            ->withCount(['employments' => function ($q) use ($user) {
                $q->where(['status' => 1, 'status_admin' => 1])
                    ->whereHas('categoryemployment', function ($q) {
                        $q->where('status', 1);
                    })
                    ->whereHas('city', function ($q) {
                        $q->where('status', 1);
                    })
                    ->whereIn('user_id', [$user->id]);
            }])
            ->withCount(['blogannoncelocations' => function ($q) use ($user) {
                $q->where(['status' => 1, 'status_admin' => 1])
                    ->whereHas('categoryannoncelocation', function ($q) {
                        $q->where('status', 1);
                    })
                    ->whereIn('user_id', [$user->id]);
            }])
            ->withCount(['blogannoncereservations' => function ($q) use ($user) {
                $q->where(['status' => 1, 'status_admin' => 1])
                    ->whereHas('categoryannoncereservation', function ($q) {
                        $q->where('status', 1);
                    })
                    ->whereIn('user_id', [$user->id]);
            }])
            ->withCount(['blogannonceventes' => function ($q) use ($user) {
                $q->where(['status' => 1, 'status_admin' => 1])
                    ->whereHas('categoryannoncevente', function ($q) {
                        $q->where('status', 1);
                    })
                    ->whereIn('user_id', [$user->id]);
            }]);

        return $data;

    }


    public static function helpersfavoritescount($user)
    {
        $data = user::whereSlug($user->slug)
            ->withCount(['favoritesemployments' => function ($q) use ($user) {
                $q->whereIn('user_id', [$user->id])
                    ->with('user', 'favoriteable')
                    ->where('favoriteable_type', employment::class)
                    ->whereIn('user_id', [$user->id])
                    ->with(['favoriteable.categoryemployment' => function ($q) {
                        $q->where('status', 1);
                    },
                        'favoriteable.city' => function ($q) {
                            $q->where('status', 1);
                        },]);
            }])
            ->withCount(['favoritesforums' => function ($q) use ($user) {
                $q->whereIn('user_id', [$user->id])
                    ->with('user', 'favoriteable')
                    ->where('favoriteable_type', forum::class)
                    ->whereIn('user_id', [$user->id])
                    ->with(['favoriteable.categoryforum' => function ($q) {
                        $q->where('status', 1);
                    },
                        'favoriteable.city' => function ($q) {
                            $q->where('status', 1);
                        },]);
            }]);

        return $data;

    }


    public static function helperscontactuserscount($user)
    {
        $data = user::whereSlug($user->slug)
            ->withCount('unreadNotifications')
            ->withCount(['contactusers' => function ($q) use ($user) {
                $q->where(['status_red' => 1])
                    ->with('user')
                    ->whereIn('user_id', [$user->id]);
            }])
            ->withCount(['contactservicesemployments' => function ($q) use ($user) {
                $q->where(['status_red' => 0])
                    ->with('to', 'from', 'contactserviceable')
                    ->where('contactserviceable_type', employment::class)
                    ->whereIn('to_id', [$user->id]);
            }])
            ->withCount(['contactservicesemploymentsfrom' => function ($q) use ($user) {
                $q->with('to', 'from', 'contactserviceable')
                    ->where('contactserviceable_type', employment::class)
                    ->whereIn('from_id', [$user->id]);
            }])
            ->withCount(['contactservicesannoncelocations' => function ($q) use ($user) {
                $q->where(['status_red' => 0])
                    ->with('to', 'from', 'contactserviceable')
                    ->where('contactserviceable_type', annoncelocation::class)
                    ->whereIn('to_id', [$user->id]);
            }])
            ->withCount(['contactservicesannoncelocationsfrom' => function ($q) use ($user) {
                $q->with('to', 'from', 'contactserviceable')
                    ->where('contactserviceable_type', annoncelocation::class)
                    ->whereIn('from_id', [$user->id]);
            }])
            ->withCount(['contactservicesannonceventes' => function ($q) use ($user) {
                $q->where(['status_red' => 0])
                    ->with('to', 'from', 'contactserviceable')
                    ->where('contactserviceable_type', annoncevente::class)
                    ->whereIn('to_id', [$user->id]);
            }])
            ->withCount(['contactservicesannonceventesfrom' => function ($q) use ($user) {
                $q->with('to', 'from', 'contactserviceable')
                    ->where('contactserviceable_type', annoncevente::class)
                    ->whereIn('from_id', [$user->id]);
            }])
            ->withCount(['contactservicesannoncereservations' => function ($q) use ($user) {
                $q->where(['status_red' => 0])
                    ->with('to', 'from', 'contactserviceable')
                    ->where('contactserviceable_type', annoncereservation::class)
                    ->whereIn('to_id', [$user->id]);
            }])
            ->withCount(['contactservicesannoncereservationsfrom' => function ($q) use ($user) {
                $q->with('to', 'from', 'contactserviceable')
                    ->where('contactserviceable_type', annoncereservation::class)
                    ->whereIn('from_id', [$user->id]);
            }]);

        return $data;

    }


    public static function helpersannonblogceteambyusercount($user)
    {
        $data = user::whereSlug($user->slug)
            ->withCount(['subscriberusers' => function ($q) {
                $q->whereIn('user_id', [auth()->user()->id]);
            }])
            ->withCount(['teamusers' => function ($q) use ($user) {
                $q->whereIn('user_id', [$user->id]);
            }])
            ->withCount(['annoncelocations' => function ($q) use ($user) {
                $q->where(['status_admin' => 1])
                    ->whereHas('categoryannoncelocation', function ($q) {
                        $q->where('status', 1);
                    })
                    ->whereHas('city', function ($q) {
                        $q->where('status', 1);
                    })
                    ->whereIn('user_id', [$user->id]);
            }])
            ->withCount(['annoncereservations' => function ($q) use ($user) {
                $q->where(['status_admin' => 1])
                    ->whereHas('categoryannoncereservation', function ($q) {
                        $q->where('status', 1);
                    })
                    ->whereHas('city', function ($q) {
                        $q->where('status', 1);
                    })
                    ->whereIn('user_id', [$user->id]);
            }])
            ->withCount(['annonceventes' => function ($q) use ($user) {
                $q->where(['status_admin' => 1])
                    ->whereHas('categoryannoncevente', function ($q) {
                        $q->where('status', 1);
                    })
                    ->whereHas('city', function ($q) {
                        $q->where('status', 1);
                    })
                    ->whereIn('user_id', [$user->id]);
            }])
            ->withCount(['employments' => function ($q) use ($user) {
                $q->where(['status_admin' => 1])
                    ->whereHas('categoryemployment', function ($q) {
                        $q->where('status', 1);
                    })
                    ->whereHas('city', function ($q) {
                        $q->where('status', 1);
                    })
                    ->whereIn('user_id', [$user->id]);
            }])
            ->withCount(['forums' => function ($q) use ($user) {
                $q->where(['status_admin' => 1])
                    ->whereHas('categoryforum', function ($q) {
                        $q->where('status', 1);
                    })
                    ->whereIn('user_id', [$user->id]);
            }])
            ->withCount(['blogannoncelocations' => function ($q) use ($user) {
                $q->where(['status_admin' => 1])
                    ->whereHas('categoryannoncelocation', function ($q) {
                        $q->where('status', 1);
                    })
                    ->whereIn('user_id', [$user->id]);
            }])
            ->withCount(['blogannoncereservations' => function ($q) use ($user) {
                $q->where(['status_admin' => 1])
                    ->whereHas('categoryannoncereservation', function ($q) {
                        $q->where('status', 1);
                    })
                    ->whereIn('user_id', [$user->id]);
            }])
            ->withCount(['blogannonceventes' => function ($q) use ($user) {
                $q->where(['status_admin' => 1])
                    ->whereHas('categoryannoncevente', function ($q) {
                        $q->where('status', 1);
                    })
                    ->whereIn('user_id', [$user->id]);
            }]);

        return $data;

    }

}
