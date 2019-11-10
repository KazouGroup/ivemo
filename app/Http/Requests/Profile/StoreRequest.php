<?php

namespace App\Http\Requests\Profile;

use Illuminate\Foundation\Http\FormRequest;

class StoreRequest extends BaseRequest
{

    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'username' => 'required|unique:users,username,',
            'email' => 'required|email|unique:users,email,',
            "sex" => "required|in:Female,Male",
            'country_id' => 'required',
            'roles' => 'required',
        ];
    }
    public function messages()
    {
        return [
            'country_id.required' => 'Le pays est obligatoire',
        ];
    }
    /**
     *  Filters to be applied to the input.
     *
     * @return array
     */
    public function filters()
    {
        return [
            'email' => 'trim|lowercase',
            'username' => 'trim|capitalize|escape'
        ];
    }
}
