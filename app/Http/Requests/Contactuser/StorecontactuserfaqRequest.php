<?php
namespace App\Http\Requests\Contactuser;

class StorecontactuserfaqRequest extends BaseRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return $this->getRules('contactusersfaqs');
    }

} // class
