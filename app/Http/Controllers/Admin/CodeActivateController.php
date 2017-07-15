<?php

namespace App\Http\Controllers\Admin;

use App\Admin;
use App\AdminMail;
use App\AdminsClients;
use App\Client;
use App\Employee;
use App\ProtocolNewsletter;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Mail;
use Validator;


/**
 * Class CodeActivateController
 * @package App\Http\Controllers\Admin
 */
class CodeActivateController extends AdminController {
    public function activate(Request $request) {
        if (!\Auth::user()->admin) return abort(403);
        $error = 1;
        $data = 0;
        $code = e($request->code);
        $promo = \App\Models\Code::where('code',$code)->first();
        
        if ($promo){
            $error = strcmp($promo->code,$code);
            if (!$error) {
                $id = \Auth::user()->id;

                $system_years = (int)date("Y");
                $system_mounth = (int)date("m");
                $system_day = (int)date("d");
                
                $date = $promo->expired_at;
                $date = explode('/', $date);

                $code_years = (int)$date[2];
                $code_mounth = (int)$date[1];
                $code_day = (int)$date[0];

                if ($code_years < $system_years) {
                    $error = 1;
                    $data = array('error' => trans('tariff.message_inactive'));
                    return json_encode( $data );
                }elseif ($code_years == $system_years) {
                    if ($code_mounth <= $system_mounth && $code_day < $system_day) {
                        $error = 1;
                        $data = array('error' => trans('tariff.message_inactive'));
                        return json_encode( $data );
                    }
                }
                foreach (\Auth::user()->codes->all() as $active_code){  
                    if ($promo->id == $active_code->id) {
                        $error = 1;
                        $data = array('error' => trans('tariff.message_repeat_activate'));
                        return json_encode( $data );
                    }            
                }

                if (!$error){
                    $type = $promo->type;

                    $tariff = $this->admin->tariffJournal;

                    $price = $tariff->tariff;     

                    $period = NULL;
                    $count = NULL;
                    $from = NULL;
                    $to = NULL;
                    
                    if ($promo->category === "tariff") {
                        
                        if ($type === "present") {
                            $discount = $price;
                          
                            if ($promo->from != NULL && $promo->to != NULL) {
                                $from = str_replace("/",'-',$promo->from);
                                $to = str_replace("/",'-',$promo->to);
                            }elseif ($promo->period > 0) {
                                    $from = date('Y-m-d');
                                    $to_y = date('Y');
                                    $to_d = date('d');
                                    $to_m = date('m'); 
                                    for ($i = 1; $i <= $promo->period; $i++) {
                                        $to_m++;
                                        if ($to_m > 12) {
                                            $to_y += 1;
                                            $to_m = 1;
                                        }

                                    }
                                    $to = $to_y . '-' . $to_m . '-' . $to_d;
                                    $period = $promo->period; 
                                }
                            if ($period) $gift_msg = trans('tariff.message_gift') . trans('tariff.message_on') . $period . trans('tariff.message_month');
                            if (!$period) $gift_msg = trans('tariff.message_gift') . trans('tariff.message_from') . $from . trans('tariff.message_to') . $to;
                        }
                        if ($type === "discount") {
                            $discount = $promo->value;
                            $count = $promo->count;
                           
                            if ($promo->from != NULL && $promo->to != NULL) {
                                $from = str_replace("/",'-',$promo->from);
                                $to = str_replace("/",'-',$promo->to);
                            }elseif ($promo->period > 0) {
                                    $from = date('Y-m-d');
                                    $to_y = date('Y');
                                    $to_d = date('d');
                                    $to_m = date('m'); 
                                    for ($i = 1; $i <= $promo->period; $i++) {
                                        $to_m++;
                                        if ($to_m > 12) {
                                            $to_y += 1;
                                            $to_m = 1;
                                        }

                                    }
                                    $to = $to_y . '-' . $to_m . '-' . $to_d;
                                    $period = $promo->period; 
                                }
                            if ($count == "percent") $count_msg = "%" ;
                            if ($count == "currency") $count_msg = "€" ;
                            if ($period) $gift_msg = trans('tariff.message_discount') . $discount ." ". $count_msg . trans('tariff.message_on') . $period . trans('tariff.message_month');
                            if (!$period) $gift_msg = trans('tariff.message_discount') . $discount ." ". $count_msg . trans('tariff.message_from') . $from . trans('tariff.message_to') . $to;
                            
                        }
                        
                        if ($this->admin->bonus) $bonus = $this->admin->bonus;
                        else $bonus = new \App\AdminBonus;
                       
        
                        $bonus->admin_id = $this->admin->id;
                        $bonus->discount = $discount;
                        $bonus->count = $count;
                        $bonus->type = $type;
                        $bonus->discount_left = $period;
                        $bonus->discount_from = $from;
                        $bonus->discount_to = $to;

                        if ($bonus->save()){
                                $promo->users()->attach($id );
                                $data = array('succ' => trans('tariff.message_succ_activate') . $gift_msg);
                                return  json_encode( $data );
                        }else {
                                $data = array('error' => trans('tariff.message_some_activate'));
                                return  json_encode( $data );
                        }

                    }
                    if ($promo->category === "sms") {
                        if ($type === "present") {
                        
                            $value = $promo->value;

                            $admin_id = \App\Admin::where('user_id',$id)->first()->id;

                            $sms_data = \App\AdminSMSData::where('admin_id',$admin_id)->first();
                            if ($sms_data === NULL){
                                $data = array('error' => trans('tariff.message_some_activate'));
                                return  json_encode( $data );
                            }
                            $sms_data->count += $value;
                            
                            if ($sms_data->save()){
                                    $promo->users()->attach($id );
                                    $data = array('succ' => trans('tariff.message_succ_activate') . trans('sms.count_increase') . $value);
                                    return  json_encode( $data );
                            }else {
                                    $data = array('error' => trans('tariff.message_some_activate'));
                                    return  json_encode( $data );
                            }
                        }
                        if ($type === "discount") {
                            $discount = $promo->value;
                            $count = $promo->count;
                            
                            
                            if ($promo->from != NULL && $promo->to != NULL) {
                                $from = str_replace("/",'-',$promo->from);
                                $to = str_replace("/",'-',$promo->to);
                            }elseif ($promo->period > 0) {
                                $from = date('Y-m-d');
                                $to_y = date('Y');
                                $to_d = date('d');
                                $to_m = date('m'); 
                                for ($i = 1; $i <= $promo->period; $i++) {
                                    $to_m++;
                                    if ($to_m > 12) {
                                        $to_y += 1;
                                        $to_m = 1;
                                    }

                                }
                                $to = $to_y . '-' . $to_m . '-' . $to_d;
                                $period = $promo->period; 
                            }
                            if ($count == "percent") $count_msg = "%" ;
                            if ($count == "currency") $count_msg = "€" ;
                            if ($period) $gift_msg = trans('tariff.message_sms_discount') . $discount ." ". $count_msg . trans('tariff.message_on') . $period . trans('tariff.message_month');
                            if (!$period) $gift_msg = trans('tariff.message_sms_discount') . $discount ." ". $count_msg . trans('tariff.message_from') . $from . trans('tariff.message_to') . $to;
                            

                        
                            if ($this->admin->bonusSms) $bonus = $this->admin->bonusSms;
                            else $bonus = new \App\AdminSMSBonus;
                        
            
                            $bonus->admin_id = $this->admin->id;
                            $bonus->discount = $discount;
                            $bonus->count = $count;
                            $bonus->discount_left = $period;
                            $bonus->discount_from = $from;
                            $bonus->discount_to = $to;

                            if ($bonus->save()){
                                    $promo->users()->attach($id );
                                    $data = array('succ' => trans('tariff.message_succ_activate') . $gift_msg);
                                    return  json_encode( $data );
                            }else {
                                    $data = array('error' => trans('tariff.message_some_activate'));
                                    return  json_encode( $data );
                            }
                        }
                    }
                    if ($promo->category === "employee") {
                        if ($type === "present") {
                            
                        }

                        if ($type === "discount") {
                            $discount = $promo->value;
                            $count = $promo->count;
                               
                            if ($promo->from != NULL && $promo->to != NULL) {
                                $from = str_replace("/",'-',$promo->from);
                                $to = str_replace("/",'-',$promo->to);
                            }elseif ($promo->period > 0) {
                                $from = date('Y-m-d');
                                $to_y = date('Y');
                                $to_d = date('d');
                                $to_m = date('m'); 
                                for ($i = 1; $i <= $promo->period; $i++) {
                                    $to_m++;
                                    if ($to_m > 12) {
                                        $to_y += 1;
                                        $to_m = 1;
                                    }

                                }
                                $to = $to_y . '-' . $to_m . '-' . $to_d;
                                $period = $promo->period; 
                            }
                            if ($count == "percent") $count_msg = "%" ;
                            if ($count == "currency") $count_msg = "€" ;
                            if ($period) $gift_msg = trans('tariff.message_emp_discount') . $discount ." ". $count_msg . trans('tariff.message_on') . $period . trans('tariff.message_month');
                            if (!$period) $gift_msg = trans('tariff.message_emp_discount') . $discount ." ". $count_msg . trans('tariff.message_from') . $from . trans('tariff.message_to') . $to;
                            

                        
                            if ($this->admin->bonusEmployee) $bonus = $this->admin->bonusEmployee;
                            else $bonus = new \App\AdminEmloyeeBonus;
                        
            
                            $bonus->admin_id = $this->admin->id;
                            $bonus->discount = $discount;
                            $bonus->count = $count;
                            $bonus->discount_from = $from;
                            $bonus->discount_to = $to;

                            if ($bonus->save()){
                                    $promo->users()->attach($id );
                                    $data = array('succ' => trans('tariff.message_succ_activate') . $gift_msg);
                                    return  json_encode( $data );
                            }else {
                                    $data = array('error' => trans('tariff.message_some_activate'));
                                    return  json_encode( $data );
                            }
                        }
                    }
                }
            }
        }
        if ($data) return  json_encode( $data );
        else {
            $data = $error ? array('error' => trans('tariff.message_error_activate')) : array('succ' => trans('tariff.message_succ_activate') );
            return  json_encode( $data );
        }
    }
}
