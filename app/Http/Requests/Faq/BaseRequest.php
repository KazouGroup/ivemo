<?php
namespace App\Http\Requests\Faq;

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
        if ($group == 'store') {
            $rules = [
                'title' => 'required',
                'body' => 'required',
                'categoryfaq_id' => 'required',
            ];
        }
        else { // 'edit'
            $rules = [
                'title' => 'required',
                'body' => 'required',
                'categoryfaq_id' => 'required',
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
            'categoryfaq_id' => 'category faq',
        ];
    }

    // --------------------------------------------------------------------------

    // --------------------------------------------------------------------------

} // class
