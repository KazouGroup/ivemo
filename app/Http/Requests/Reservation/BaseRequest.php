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
     * @param object $partner The partner object or null if the group is 'store'.
     * @return array
     */
    protected function getRules($group)
    {
        if ($group == 'sendannoncereservation') {
            $rules = [
                'full_name' => 'required|string|min:2|max:150',
                'email' => 'required|email|min:2|max:150',
                'phone' => 'required',
                'description' => 'required|min:2',
                'adult_number' => 'required',
                'children_number' => 'required',
                //'annoncereservation_id' => 'required',
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
