<?php
namespace App\Http\Requests\Profile;

use App\Http\Requests\Request;
use App\Model\user;
use Illuminate\Validation\Rule;


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
        if ($group == 'store') {
            $rules = [
               //
            ];
        }elseif ($group == 'profile_add_info_account_update'){
            $rules = [
                'site_internet' => ['required','url','string', 'max:255'],
                'city_id' => ['required'],
                'birthdate' => 'required',
                'address' => ['nullable','string', 'max:255'],
                'facebook_link' => ['nullable','url','string', 'max:255'],
                'twitter_link' => ['nullable','url','string', 'max:255'],
                'instagram_link' => ['nullable','url','string', 'max:255'],
                'linkedin_link' => ['nullable','url','string', 'max:255'],

            ];
        }elseif ($group == 'profile_account_update'){
            $rules = [
                'username' => ['required','string','min:2','max:100', Rule::unique((new User)->getTable())->ignore(auth()->id())],
                'slug' => ['required','string','alpha_dash','min:2','max:100', Rule::unique((new User)->getTable())->ignore(auth()->id())],
                'email' => ['required','string','email', Rule::unique((new User)->getTable())->ignore(auth()->id())],
                "sex" => "required|in:female,male",
                "phone" => "required|numeric",

            ];
        } else { // 'edit'
            $rules = [
                'site_internet' => ['required','url','string', 'max:255'],
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
