<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Skill extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'lucide_icon',
        'category',
        'order',
    ];

    protected $casts = [
        'order' => 'integer',
    ];
}
