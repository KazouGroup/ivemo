<?php
namespace App\Http\Requests\Signalblogannonce;

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
        $rules = [
            'full_name' => ['required', 'string','min:3', 'max:255'],
            'message' => 'required',
            //'confirm_send' => 'required',
            'email' => ['required', 'string', 'email', 'max:255'],
            'subject' => ['nullable', 'string', 'max:255'],
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
            //
        ];
    }

    // --------------------------------------------------------------------------

    // --------------------------------------------------------------------------

} // class
