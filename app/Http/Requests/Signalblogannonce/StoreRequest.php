<?php
namespace App\Http\Requests\Signalblogannonce;

class StoreRequest extends BaseRequest
{

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return $this->getRules('sendcontactmessageuser');
    }

} // class
