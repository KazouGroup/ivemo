<?php
namespace App\Http\Requests\Blog\Blogannoncereservation;

class StoreRequest extends BaseRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return $this->getRules('store');
    }

} // class
