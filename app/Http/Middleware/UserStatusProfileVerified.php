<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Redirect;

class UserStatusProfileVerified
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  string|null  $redirectToRoute
     * @return \Illuminate\Http\RedirectResponse|\Illuminate\Http\Response|void
     */
    public function handle($request, Closure $next, $redirectToRoute = null)
    {
        $user = $request->user();

        if (!$user || ( $user->status_profile === 0 )) {

            return $request->expectsJson()
                ? abort(403, 'Your status is not professional')
                : Redirect::route($redirectToRoute ?: 'profile_add_info_account.site');
        }

        return $next($request);
    }
}
