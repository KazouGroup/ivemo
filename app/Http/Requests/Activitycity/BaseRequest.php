<?php
namespace App\Http\Requests\Activitycity;

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
        if ($group == 'storeactivitycity') {
            $rules = [
                'title' => 'required|min:3|max:250',
                'description' => 'required|min:3|max:9000',
                'city_id' => 'required|numeric',
            ];
        }
        else { // 'edit'
            $rules = [
                'title' => 'required',
                'description' => 'required|min:3|max:9000',
                'city_id' => 'required|numeric',
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
            'city_id' => 'city',
        ];
    }

    // --------------------------------------------------------------------------

    // --------------------------------------------------------------------------

} // class
