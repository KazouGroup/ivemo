<?php
namespace App\Http\Requests\Contactuser;

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
        if ($group == 'public_profile_send_message') {
            $rules = [
                'full_name' => ['required', 'string', 'max:255'],
                'message' => 'required',
                'email' => ['required', 'string', 'email', 'max:255'],
                'subject' => ['required', 'string', 'max:255'],
            ];
        }elseif($group == 'sendcontactmessageuser') {
            $rules = [
                'full_name' => ['required', 'string', 'max:255'],
                'message' => 'required',
                'email' => ['required', 'string', 'email', 'max:255'],
                'subject' => ['required', 'string', 'max:255'],
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