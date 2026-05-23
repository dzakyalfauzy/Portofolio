<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Certificate extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'issuer',
        'date',
        'credential',
        'skills',
        'category',
        'verify_url',
        'image_path',
        'order',
    ];

    protected $casts = [
        'skills' => 'array',
        'order' => 'integer',
    ];
}
