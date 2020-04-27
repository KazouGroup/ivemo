<?php
namespace App\Http\Requests\Contactuser;

class StorecontactworkwithusRequest extends BaseRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return $this->getRules('work_with_us_store');
    }

} // class
