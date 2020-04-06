<?php
namespace App\Http\Requests\Contactuser;

class StorecontactuseradvertRequest extends BaseRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return $this->getRules('contactusersadverts');
    }

} // class
