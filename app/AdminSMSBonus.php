<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class AdminSMSBonus extends Model
{
    protected $table = 'admin_sms_bonus';
    protected $fillable = [
        'id',
        'admin_id',
        'discount',
        'count',
        'discount_left',
        'discount_from',
        'discount_to',
    ];
}

