<?php

namespace App\Models;

use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Database\Eloquent\Model;
use OwenIt\Auditing\Auditable as AuditableTrait;
use OwenIt\Auditing\Contracts\Auditable;

class termscondition extends Model
{
    use Sluggable;
    //use AuditableTrait;
    protected $fillable = ['title','body','slug','status'];

    protected $table = 'terms_conditions';

    /**
     * @return array
     */
    public function generateTags(): array
    {
        return [
            $this->title,
        ];
    }

    protected $casts = [
        'status' => 'boolean',
    ];


    /**
     * Return the sluggable configuration array for this model.
     *
     * @return array
     */
    public function sluggable(): array
    {
        return [
            'slug' => [
                'source' => 'title',
                'separator' => '+'
            ]

        ];
    }
}
