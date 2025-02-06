<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Beaches extends Model
{
    protected $fillable=[
       
        'name',
        'avartar_url',
        'description',
        'visitor',
        'nationid',
        'ratingScore',
        'map_html_code'
    ];
    use HasFactory;
}
