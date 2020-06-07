<?php

namespace App\Model;

use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Database\Eloquent\Model;

class categoryworkwithus extends Model
{
    protected $guarded = [];

    protected $table = 'categoryworkwithuses';

    use Sluggable;
    /**
     * Return the sluggable configuration array for this model.
     *
     * @return array
     */
    public function sluggable()
    {
        return [
            'slug' => [
                'source' => 'name',
                'separator' => '+'
            ]

        ];
    }

    protected $casts = [
        'status' => 'boolean',
    ];

    public function workwithuses()
    {
        return $this->hasMany(workwithus::class, 'categoryworkwithus_id');
    }
}
