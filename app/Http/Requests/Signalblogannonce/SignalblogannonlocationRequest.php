<?php
namespace App\Http\Requests\Signalblogannonce;

class SignalblogannonlocationRequest extends BaseRequest
{

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return $this->getRules('signalblogannoncelocation');
    }

} // class
