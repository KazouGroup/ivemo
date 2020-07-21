<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Redirect;

class UserStatusProfileAdminVerified
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

        if(!$user ||  (!$user->profileadmin->status_user)){
            return $request->expectsJson()
            ? abort(403, 'You\'r not autorize Thank :) ')
            : Redirect::route($redirectToRoute ?: 'welcome');
        }

        return $next($request);
    }
}
