<?php
namespace App\Http\Requests\Blog\Blogannoncevente;

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
                'title' => 'required|string|min:2|max:200',
                'red_time' => 'required|numeric',
                'description' => 'required',
                'photo' => 'required|string',
                'categoryannoncevente_id' => 'required|numeric',
            ];
        }
        else { // 'edit'
            $rules = [
                'title' => 'required|string|min:2|max:200',
                'red_time' => 'required|numeric',
                'description' => 'required',
                'photo' => 'required|string',
                'categoryannoncevente_id' => 'required|numeric',
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
            'categoryannoncevente_id' => 'catégorie de l\'annonce',
        ];
    }

    // --------------------------------------------------------------------------

    // --------------------------------------------------------------------------

} // class
