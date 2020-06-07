<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class AuthController extends Controller
{

    protected function auth()
    {
        return auth('api_jwt');
    }

    public function login()
    {
        $auth = $this->auth();
        $credentials = request(['email', 'password']);
        $token = $auth->attempt($credentials);

        if(!$token) {
            return $this->resJson([], null, ['login_failed']);
        }

        $user = $auth->user();

        $data = [
            'token' => [
                'accessToken' => $token,
                'expires_in'   => $auth->factory()->getTTL() * 60
            ],
            'user' => $user,
        ];

        return $this->resJson($data);
    }

    public function logout()
    {
        $this->auth()->logout();
        return $this->resJson([]);
    }

    public function refresh()
    {
        $auth = $this->auth();

        $data = [
            'token' => [
                'accessToken' => $auth->refresh(),
                'expires_in'   => $auth->factory()->getTTL() * 60
            ],
        ];

        return $this->resJson($data);
    }

}
