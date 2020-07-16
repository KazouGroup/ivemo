<?php
namespace App\Http\Requests\Forum;

use App\Http\Requests\Request;


class BaseRequest extends Request
{
    // --------------------------------------------------------------------------

    /**
     * @param $group
     * @return array
     */
    protected function getRules($group)
    {
        $rules = [
            'title' => 'required|string|min:3|max:250',
            'categoryforum_id' => 'required|numeric|digits_between:1,3',
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
            'categoryforum_id' => 'categorie',
        ];
    }

    // --------------------------------------------------------------------------

    // --------------------------------------------------------------------------

} // class
