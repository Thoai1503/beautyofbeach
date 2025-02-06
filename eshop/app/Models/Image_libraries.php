<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Image_libraries extends Model
{
 protected $fillable=[
'id',
'beachid',
'img_url',


 ];

    use HasFactory;
}
