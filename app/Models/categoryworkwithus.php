<?php

namespace App\Models;

use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Database\Eloquent\Model;

class categoryworkwithus extends Model
{
    use Sluggable;

    protected $guarded = [];

    protected $table = 'categoryworkwithuses';


    /**
     * Return the sluggable configuration array for this model.
     *
     * @return array
     */
    public function sluggable(): array
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
