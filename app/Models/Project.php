<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'stack',
        'github',
        'demo',
        'color',
        'image_path',
        'order',
    ];

    protected $casts = [
        'stack' => 'array',
        'order' => 'integer',
    ];
}
