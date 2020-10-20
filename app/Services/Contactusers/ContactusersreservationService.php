<?php
namespace App\Services\Contactusers;



use App\Jobs\Adminaction\AdminactionAnnoncelocationJob;
use App\Jobs\Contacts\ContactuserlocationJob;
use App\Jobs\Contacts\ContactuserreservationJob;
use App\Models\annoncereservation;
use App\Models\contactuserslocation;
use App\Services\HelpersService;
use Illuminate\Support\Facades\Auth;

class ContactusersreservationService
{


    public static function apicontactservice_statistique($user,$annoncereservation)
    {
        $data = annoncereservation::whereSlugin($annoncereservation->slugin)
            ->with('user', 'city', 'annoncetype', 'periodeannonce', 'categoryannoncereservation', 'uploadimages')
            ->whereIn('user_id', [$annoncereservation->user_id])
            ->whereHas('categoryannoncereservation', function ($q) {$q->where('status', 1);})
            ->whereHas('city', function ($q) {$q->where('status', 1);})
            ->withCount(['uploadimages' => function ($q) {
                $q->where(['status' => 1, 'status_admin' => 1])
                    ->where('uploadimagealable_type', annoncereservation::class);
            }])
            ->with(['uploadimages' => function ($q) {
                $q->where(['status' => 1, 'status_admin' => 1])
                    ->where('uploadimagealable_type', annoncereservation::class)->get();
            }])
            ->withCount(['contactservices' => function ($q) use ($user,$annoncereservation) {
                $q->where(['status_red' => 0])
                    ->with('to', 'from')
                    ->whereIn('from_id', [$user->id])
                    ->whereIn('to_id', [$annoncereservation->user_id]);
            }])
            ->with(['contactservices' => function ($q) use ($user,$annoncereservation) {
                $q->with('to', 'from')
                    ->whereIn('from_id', [$user->id])
                    ->whereIn('to_id', [$annoncereservation->user_id])
                    ->with(['responsecontactservices' => function ($q){
                        $q->where(['status' => 1])
                            ->with('user','contactservice')
                            ->orderByDesc('created_at')
                            ->distinct()->get()
                        ;},
                    ])
                    ->orderByDesc('created_at')
                    ->distinct()->get();
            }])->first();


        return $data;
    }

    public static function formsendreservationdata($request,$annoncereservation)
    {
        $data = $annoncereservation->contactservices()->create([
            'to_id' => $annoncereservation->user_id,
            'full_name' => $request->full_name,
            'email' => $request->email,
            'phone' => $request->phone,
            'adult_number' => $request->adult_number,
            'children_number' => $request->children_number,
            'message' => $request->message,
            'from_id' => auth()->guest() ? null : auth()->id(),
            'slug' => sha1(('YmdHis') . str_random(30)),
            'ip' => request()->ip(),
        ]);


        return $data;
    }

    public static function formsenddata($request,$annoncereservation)
    {
        $data = $annoncereservation->contactservices()->create([
            'to_id' => $annoncereservation->user_id,
            'phone' => $request->phone,
            'from_id' => auth()->guest() ? null : auth()->id(),
            'slug' => sha1(('YmdHis') . str_random(30)),
            'ip' => request()->ip(),
            'message' => $request->message,
        ]);


        return $data;
    }

    public static function newEmailToannoncereservationpageShow($request,$annoncereservation)
    {
        $fromPhoneUser = $request->get('phone');
        $fromMessageUser = $request->get('message');
        $userFrom = Auth::user();

        $emailToUser = (new ContactuserreservationJob($fromPhoneUser,$fromMessageUser,$userFrom,$annoncereservation));

        dispatch($emailToUser);
    }

    public static function adminsendMessageToUser($annoncelocation)
    {
        $emailToUser = (new AdminactionAnnoncelocationJob($annoncelocation));

        dispatch($emailToUser);
    }
}
