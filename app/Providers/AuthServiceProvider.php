<?php

namespace App\Providers;

use App\Model\annoncelocation;
use App\Model\annoncereservation;
use App\Model\contactuser;
use App\model\profile;
use App\Model\teamuser;
use App\Policies\AnnoncelocationPolicy;
use App\Policies\AnnoncereservationPolicy;
use App\Policies\ContactuserPolicy;
use App\Policies\ProfilePolicy;
use App\Policies\TeamuserPolicy;
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
        annoncelocation::class => AnnoncelocationPolicy::class,
        annoncereservation::class => AnnoncereservationPolicy::class,
        teamuser::class => TeamuserPolicy::class,
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
    }
}
