<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class AdminEmloyeeBonus extends Model
{
    protected $table = 'admin_employee_bonus';
    protected $fillable = [
        'id',
        'admin_id',
        'discount',
        'count',
        'discount_left',
        'discount_from',
	];        
}

