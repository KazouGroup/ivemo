<?php
namespace App\Http\Requests\Profile;

class UpdateprofileRequest extends BaseRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return $this->getRules('profile_add_info_account_update');
    }

} // class
