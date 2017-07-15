<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class AdminBonus extends Model
{
    protected $table = 'admin_bonus';
    protected $fillable = [
        'id',
        'admin_id',
        'discount',
        'count',
        'type',
        'discount_left',
        'discount_from',
        'discount_to',
    ];
    
}
