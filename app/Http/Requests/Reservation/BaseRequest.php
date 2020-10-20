<?php
namespace App\Http\Requests\Reservation;

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
        if ($group == 'sendannoncereservation') {
            $rules = [
                'full_name' => 'required|string|min:2|max:200',
                'email' => 'required|email|min:2|max:200',
                'phone' => 'nullable|numeric|digits_between:4,30',
                'adult_number' => 'required|numeric|digits_between:1,2',
                'children_number' => 'required|numeric|digits_between:1,2',
            ];
        }
        else { // 'edit'
            $rules = [
               ///
            ];
        }

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
            //
        ];
    }

    // --------------------------------------------------------------------------

    // --------------------------------------------------------------------------

} // class
