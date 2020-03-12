<?php

namespace App\Model;

use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;
use OwenIt\Auditing\Auditable as AuditableTrait;
use OwenIt\Auditing\Contracts\Auditable;

class imagereservation extends Model 
{
    //use AuditableTrait;

    protected $guarded = [];

    protected  $table = 'imagereservations';

    /**
     * @return array
     */
    public function generateTags(): array
    {
        //
    }
    //

    public function annoncelocation()
    {
        return $this->belongsTo(annoncelocation::class,'annoncelocation_id');
    }
}
