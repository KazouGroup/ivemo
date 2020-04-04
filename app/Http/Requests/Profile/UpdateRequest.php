<?php
namespace App\Http\Requests\Profile;

class UpdateRequest extends BaseRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return $this->getRules('profile_account_update');
    }

} // class
