<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;
use App\Admin;
use App\User;

class Code extends Model
{
    protected $fillable = [
        'user_id',
        'code',
        'category',
        'type',
        'count',
        'value',
        'expired_at',
        'from',
        'to',
        'period'
    ];

    public $dates = [
        'created_at',
        'updated_at'
    ];

    public static function getCategories($translate = false) {
    
       $categories = ['employee', 'sms', 'tariff'];

       if($translate) {

           $categories = array_combine($categories, $categories);

           foreach($categories as $value) {

               $categories[$value] = trans('common.' . $value);

           }
       
       }

       return $categories;
    
    }

    public static function getTypes($translate = false) {
    
       $types = ['present', 'discount'];

       if($translate) {

           $types = array_combine($types, $types);

           foreach($types as $value) {

               $types[$value] = trans('common.' . $value);

           }
       
       }

       return $types;
    
    }

    public static function getCount($translate = false) {
    
       $count = ['percent', 'currency', 'considered'];

       if($translate) {

           $count = array_combine($count, $count);

           foreach($count as $value) {

               $count[$value] = trans('common.' . $value);

           }
       
       }

       return $count;
    
    }

    public function user() {
    
       return $this->belongsTo(User::class);
    
    }

    public function users() {
    
        return $this->belongsToMany(User::class, 'users_codes');
    
    }

    public function scopeOrderByExpired($query, $type = "ASC") {
    
        return $query->orderBy('expired_at', $type);
    
    }

    public function getExpiredAtAttribute($value) {

        if(!empty($value)) {

            $value = Carbon::createFromFormat("Y-m-d", $value)->format("d/m/Y");

        }

        return $value;

    }

    public function getFromAttribute($value) {
    
        if(!empty($value)) {

            $value = Carbon::createFromFormat("Y-m-d", $value)->format("d/m/Y");
        
        }

        return $value;
    
    }

    public function getToAttribute($value) {
    
        if(!empty($value)) {

            $value = Carbon::createFromFormat("Y-m-d", $value)->format("d/m/Y");
        
        }

        return $value;
    
    }

    public function setExpiredAtAttribute($value) {

        if(!empty($value)) {

            $value = Carbon::createFromFormat("d/m/Y", $value)->format("Y-m-d");

        }

        $this->attributes['expired_at'] = $value;

    }

    public function setFromAttribute($value) {

        if(!empty($value)) {

            $value = Carbon::createFromFormat("d/m/Y", $value)->format("Y-m-d");

        }

        $this->attributes['from'] = $value;

    }

    public function setToAttribute($value) {

        if(!empty($value)) {

            $value = Carbon::createFromFormat("d/m/Y", $value)->format("Y-m-d");

        }

        $this->attributes['to'] = $value;

    }

    public function getInterval() {

        if($this->from && $this->to) {

            return $this->from . ' - ' . $this->to;

        }

        return $this->period ? : "-";

    }

}
