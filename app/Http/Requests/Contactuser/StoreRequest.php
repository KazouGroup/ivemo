<?php
namespace App\Http\Requests\Contactuser;

class StoreRequest extends BaseRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return $this->getRules('public_profile_send_message');
    }

} // class
