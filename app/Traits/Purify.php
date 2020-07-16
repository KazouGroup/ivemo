<?php

namespace App\Traits;

use App\Model\annoncelocation;
use App\Model\annoncereservation;
use App\Model\annoncevente;
use App\Model\blogannoncelocation;
use App\Model\blogannoncereservation;
use App\Model\blogannoncevente;
use App\Model\employment;
use App\Model\favorite\favoriteannoncelocation;
use App\Model\favorite\favoriteannoncereservation;
use App\Model\favorite\favoriteannoncevente;
use App\Model\favorite\favoriteblogannoncelocation;
use App\Model\favorite\favoriteblogannoncereservation;
use App\Model\favorite\favoriteblogannoncevente;
use App\Model\favorite\favoritemployment;
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
