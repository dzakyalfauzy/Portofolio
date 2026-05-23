<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Experience extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'company',
        'location',
        'duration',
        'description',
        'stack',
        'images',
        'prokers',
        'current',
        'order',
    ];

    protected $casts = [
        'stack' => 'array',
        'images' => 'array',
        'prokers' => 'array',
        'current' => 'boolean',
        'order' => 'integer',
    ];
}
