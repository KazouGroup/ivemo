<?php
namespace App\Http\Requests\Signalblogannonce;

class SignalblogannoncereservationRequest extends BaseRequest
{

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return $this->getRules('signalblogannoncereservation');
    }

} // class
