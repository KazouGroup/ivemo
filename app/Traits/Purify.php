<?php

namespace App\Traits;

use HTMLPurifier;
use HTMLPurifier_Config;

trait Purify
{


    /**
     * @property $allowed allowed html inside description field
     */
    private $allowed = 'p, strong, h2, h3, a[href], ul, ol, li, i';

    /**
     * Laravel mutator.
     * Filter all unauthorized HTML from the description field
     * @param $value
     */
    public function setDescriptionAttribute($value)
    {
        $config = HTMLPurifier_Config::createDefault();
        $config->set('HTML.Allowed', $this->allowed);
        $purifier = new HTMLPurifier($config);
        $this->attributes['description'] = $purifier->purify($value);
    }

}
