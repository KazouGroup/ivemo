<?php
namespace App\Http\Requests\Annonces\Annoncereservation;

use App\Http\Requests\Request;


class BaseRequest extends Request
{
    // --------------------------------------------------------------------------

    /**
     * Return the array of validation rules for the given group.
     *
     * @param string $group The group name: 'store' or 'update'.
     * @return array
     */
    protected function getRules($group)
    {
        $rules = [
            'title' => 'required|string|min:3|max:200',
            'district' => 'required|string|min:3|max:200',
            'description' => 'required|max:50000',
            'price' => 'required|numeric|digits_between:2,13',
            'surface' => 'required|numeric|digits_between:2,6',
            'rooms' => 'nullable|numeric|digits_between:1,2',
            'pieces' => 'nullable|numeric|digits_between:1,2',
            'city_id' => 'required|numeric|digits_between:1,3',
            'balcony_number' => 'nullable|numeric|digits_between:1,2',
            'periodeannonce_id' => 'required|numeric|digits_between:1,2',
            'categoryannoncereservation_id' => 'required|numeric|digits_between:1,3',
        ];

        return $rules;
    }

    // --------------------------------------------------------------------------

    // --------------------------------------------------------------------------

    /**
     * the attributes method replaces the :attribute placeholder on the validation messages
     * with given attribute names
     *
     * @return array
     */

    public function attributes()
    {
        return [
            'city_id' => 'ville de l\'annonce',
            'periodeannonce_id' => 'periode de l\'annonce',
            'categoryannoncereservation_id' => 'categorie de l\'annonce',
        ];
    }

    // --------------------------------------------------------------------------

    // --------------------------------------------------------------------------

} // class
