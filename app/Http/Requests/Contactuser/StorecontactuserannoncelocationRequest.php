<?php
namespace App\Http\Requests\Contactuser;

class StorecontactuserannoncelocationRequest extends BaseRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return $this->getRules('sendcontactservicelocation');
    }

} // class
