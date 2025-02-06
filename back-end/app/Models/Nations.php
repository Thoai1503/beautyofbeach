<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Nations extends Model
{

    protected $fillable=[
        'name',
        'continentid',
    ];
    use HasFactory;
}
