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
                'full_name' => ['required', 'string','min:3','max:255'],
                'message' => 'required',
                'phone' => ['nullable', 'numeric'],
                'email' => ['required', 'string', 'email','min:2', 'max:255'],
                'subject' => ['required', 'string', 'max:255'],
            ];
        }elseif($group === 'sendcontactmessageuser') {
            $rules = [
                'full_name' => ['required', 'string','min:3', 'max:255'],
                'message' => 'required',
                'phone' => ['nullable', 'numeric'],
                'email' => ['required', 'string', 'email', 'max:255'],
                'subject' => ['required', 'string', 'max:255'],
            ];
        }elseif($group === 'contactusersfaqs') {
            $rules = [
                'full_name' => ['required', 'string','min:3', 'max:255'],
                'message' => 'required',
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
        }elseif($group === 'contactuseremployment') {
            $rules = [
                'full_name' => ['required', 'string','min:3','max:255'],
                'email' => ['required', 'string', 'email','min:2','max:255'],
                //'cv_file' => ['required'],
                //'confirm_send' => ['required'],
                'phone' => ['required', 'numeric'],
            ];
        }elseif($group === 'work_with_us_store') {
            $rules = [
                'full_name' => ['required', 'string','min:3','max:255'],
                'email' => ['required', 'string', 'email','min:2','max:255'],
                //'cv_file' => ['required'],
                //'confirm_send' => ['required'],
                'phone' => ['required', 'numeric'],
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
