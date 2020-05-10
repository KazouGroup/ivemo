<?php

namespace App\Providers;

use App\Model\annoncelocation;
use App\Model\annoncereservation;
use App\Model\annoncevente;
use App\Model\blogannoncelocation;
use App\Model\blogannoncereservation;
use App\Model\blogannoncevente;
use App\Model\contactuser;
use App\Model\contactuserslocation;
use App\Model\contactusersvente;
use App\model\profile;
use App\Model\teamuser;
use App\Model\user;
use App\Policies\AnnoncelocationPolicy;
use App\Policies\AnnoncereservationPolicy;
use App\Policies\AnnonceventePolicy;
use App\Policies\BlogannoncelocationPolicy;
use App\Policies\BlogannoncereservationPolicy;
use App\Policies\BlogannonceventePolicy;
use App\Policies\ContactuserPolicy;
use App\Policies\ContactuserslocationPolicy;
use App\Policies\ContactusersventePolicy;
use App\Policies\ProfilePolicy;
use App\Policies\TeamuserPolicy;
use App\Policies\UserPolicy;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Laravel\Passport\Passport;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
        profile::class => ProfilePolicy::class,
        contactuser::class => ContactuserPolicy::class,
        contactuserslocation::class => ContactuserslocationPolicy::class,
        contactusersvente::class => ContactusersventePolicy::class,
        annoncelocation::class => AnnoncelocationPolicy::class,
        annoncereservation::class => AnnoncereservationPolicy::class,
        annoncevente::class => AnnonceventePolicy::class,
        blogannoncereservation::class => BlogannoncereservationPolicy::class,
        blogannoncelocation::class => BlogannoncelocationPolicy::class,
        blogannoncevente::class => BlogannonceventePolicy::class,
        teamuser::class => TeamuserPolicy::class,
        user::class => UserPolicy::class,
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        Passport::routes();
        Passport::tokensExpireIn(now()->addDays(15));
        Passport::refreshTokensExpireIn(now()->addDays(30));
    }
}
