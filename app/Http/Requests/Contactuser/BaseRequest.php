<?php
namespace App\Http\Requests\Contactuser;

use App\Http\Requests\Request;


class BaseRequest extends Request
{
    // --------------------------------------------------------------------------

    /**
     * Return the array of validation rules for the given group.
     *
     * @param string $group The group name: 'public_profile_send_message','sendcontactmessageuser','contactusersfaqs'.
     * @return array
     */
    protected function getRules($group)
    {
        if ($group === 'public_profile_send_message') {
            $rules = [
                'full_name' => 'required|string|min:3|max:200',
                'message' => 'required|min:5|max:5000',
                'phone' => 'nullable|numeric',
                'subject' => 'required|string|min:3|max:200',
                'email' => 'required|email|min:2|max:200',
            ];
        }elseif($group === 'sendcontactmessageuser') {
            $rules = [
                'full_name' => ['required', 'string','min:3', 'max:200'],
                'message' => 'required|min:5|max:5000',
                'phone' => ['nullable', 'numeric'],
                'email' => ['required', 'string', 'email', 'max:200'],
            ];
        }elseif($group === 'contactusersfaqs') {
            $rules = [
                'full_name' => ['required', 'string','min:3', 'max:255'],
                'message' => 'required|min:5|max:5000',
                'email' => ['required', 'string', 'email', 'min:2', 'max:255'],
                'phone' => ['nullable', 'numeric'],
                'categoryuser_id' => ['required', 'numeric'],
                'categoryobjet_id' => ['required', 'numeric'],
            ];
        }elseif($group === 'contactusersadverts') {
            $rules = [
                'full_name' => ['required', 'string','min:3','max:255'],
                'appointment_time' => ['required', 'string','min:2','max:20'],
                'email' => ['required', 'string', 'email','min:2','max:255'],
                'confirm_send' => ['required'],
                'phone' => ['nullable', 'numeric'],
            ];
        }elseif($group === 'sendcontactservice') {
            $rules = [
                'full_name' => ['required', 'string','min:3','max:255'],
                'email' => ['required', 'string', 'email','min:2','max:255'],
                'phone' => ['required', 'numeric'],
                'message' => ['nullable','min:10','max:5000'],
            ];
        }elseif($group === 'sendcontactserviceannonce') {
            $rules = [
                'full_name' => 'nullable|string|min:3|max:200',
                'email' => 'nullable|string|email|min:5|max:200',
                'phone' => 'nullable|numeric|min:3|max:30',
                'subject' => 'required|string|min:3|max:200',
                'message' => 'required|min:5|max:5000',
            ];
        }elseif($group === 'contactadmins') {
            $rules = [
                'first_name' => ['required', 'string','min:3','max:200'],
                'last_name' => ['required', 'string','min:3','max:200'],
                'email' => ['required', 'string', 'email','min:2','max:200'],
                'phone' => ['nullable', 'string','max:30'],
                'subject' => ['required','string','min:2','max:255'],
                'message' => 'required|min:5|max:5000',
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
