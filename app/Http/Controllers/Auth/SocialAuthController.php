<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\user;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;
use Throwable;

class SocialAuthController extends Controller
{

    public function __construct()
    {
        $this->middleware('guest');
    }

    /**
     * List of providers configured in config/services acts as whitelist
     *
     * @var array
     */
    protected $providers = [
        'github',
        'facebook',
        'google',
        'twitter'
    ];
    /**
     * Redirect to provider for authentication
     *
     * @param $driver
     * @return mixed
     */
    public function redirectToProvider($driver)
    {
        if( ! $this->isProviderAllowed($driver) ) {
            return $this->sendFailedResponse("{$driver} is not currently supported");
        }

        try {
            return Socialite::driver($driver)->redirect();
        } catch (Throwable $e) {
            // You should show something simple fail message
            return $this->sendFailedResponse($e->getMessage());
        }
    }

    /**
     * Handle response of authentication redirect callback
     *
     * @param $driver
     * @return \Illuminate\Http\RedirectResponse
     */
    public function handleProviderCallback( $driver )
    {
        try {
            $user = Socialite::driver($driver)->user();
        } catch (Throwable $e) {
            return $this->sendFailedResponse($e->getMessage());
        }

        // check for email in returned user
        return empty( $user->email )
            ? $this->sendFailedResponse("No email id returned from {$driver} provider.")
            : $this->loginOrCreateAccount($user, $driver);
    }

    /**
     * Send a successful response
     *
     * @return \Illuminate\Http\RedirectResponse
     */
    protected function sendSuccessResponse()
    {
        return redirect()->intended($this->redirectPath());
    }

    public function redirectPath()
    {
        if (method_exists($this, 'redirectTo')) {
            return $this->redirectTo();
        }
        return property_exists($this, 'redirectTo') ? $this->redirectTo : '/';
    }

    /*
     * Send a failed response with a msg
     *
     * @param null $msg
     * @return \Illuminate\Http\RedirectResponse
     */
    protected function sendFailedResponse($msg = null)
    {
        return redirect()->route('login')
            ->withErrors(['msg' => $msg ?: 'Unable to login, try with another provider to login.']);
    }

    /**
     * Login or create an account for a user
     *
     * @param $providerUser
     * @param $driver
     * @return \Illuminate\Http\RedirectResponse
     */
    protected function loginOrCreateAccount($providerUser, $driver)
    {
        // check for already has account
        $user = user::where('email', $providerUser->getEmail())->first();

        //dd($providerUser);
        // if user already found
        if( $user ) {
            // update the avatar and provider that might have changed
            $user->update([
                'provider' => $driver,
                'provider_id' => $providerUser->id,
                'social_token' => $providerUser->token
            ]);
        } else {
            // create a new user
            $user = User::create([
                'first_name' => $providerUser->getName(),
                'email' => $providerUser->getEmail(),
                'username' => str_slug($providerUser->getName()),
                'avatar' => $providerUser->getAvatar(),
                'provider' => $driver,
                'provider_id' => $providerUser->getId(),
                'social_token' => $providerUser->token,
                // user can use reset password to create a password
                'email_verified_at' => now(),
                'password' => ''
            ]);
        }

        // login the user
        Auth::login($user, true);

        return $this->sendSuccessResponse();
    }

    /**
     * Check for provider allowed and services configured
     *
     * @param $driver
     * @return bool
     */
    private function isProviderAllowed($driver)
    {
        return in_array($driver, $this->providers) && config()->has("services.{$driver}");
    }
}
