<?php
namespace App\Http\Requests\Contact;

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
        if ($group == 'store') {
            $rules = [
                'full_name' => 'required',
                'message' => 'required',
                'phone' => ['nullable', 'numeric'],
                'email' => 'required',
                'subject' => 'required',
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
