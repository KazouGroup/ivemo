<?php
namespace App\Http\Requests\TermsCondition;

class UpdateRequest extends BaseRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return $this->getRules('update', $this->route('terms_conditions'));
    }

} // class
