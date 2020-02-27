<?php
namespace App\Http\Requests\Profile;

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
               //
            ];
        }elseif ($group == 'profile_add_info_account_update'){
            $rules = [
                'site_internet' => ['nullable','url','string', 'max:255'],
                'city_id' => ['required'],
                'birthdate' => 'required|numeric|digits_between:4,4',
                'address' => ['nullable','string', 'max:255'],
                'facebook_link' => ['nullable','string', 'max:255'],
                'twitter_link' => ['nullable','string', 'max:255'],
                'instagram_link' => ['nullable','string', 'max:255'],
                'linkedin_link' => ['nullable','string', 'max:255'],

            ];
        } else { // 'edit'
            $rules = [
                'site_internet' => ['nullable','url'],
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
