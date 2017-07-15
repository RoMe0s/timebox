<?php

namespace App\Traits;

use App\DirectorBankDetails;
use App\DirectorEmployee;
use Illuminate\Support\Facades\Request;

trait OrderToPdfTrait
{
	/**
	 * Generate data for order pdf file
	 *
	 * @param Request $request
	 */
	public function dataOrderGenerate($order)
	{
		$data['bank_details'] = DirectorBankDetails::find(1);
		$data['order_details'] = $order;
		$data['admin_details'] = $order->admin;
		$data['firm_details'] = $order->admin->firm;
		$data['director_details'] = DirectorEmployee::where('group', 'main')->first();
		$data['admin_bank_details'] = $order->admin->bankDetails;
		$data['additional_employees'] = $order->orderEmployees;
		$data['final_sum'] = $order->price + $order->tax + $order->orderEmployees()->sum('price');

		$admin = \App\Admin::where("id",$order->admin_id)->first();
		$data['order_details']['discount_employe'] = 0.00;
		$data['order_details']['employe_count'] = 'currency';

		if ($admin->bonusEmloyee) {
                $bonus = $admin->bonusEmloyee;
                if ($bonus->count != NULL) $data['order_details']['employe_count'] = $bonus->count;

                $from_flag = 0;
                $system_years = (int)date("Y");
                $system_mounth = (int)date("m");
                $system_day = (int)date("d");

                $date = $bonus->discount_from;
                $date = explode('-', $date);

                $from_day = (int)$date[2];
                $from_mounth = (int)$date[1];
                $from_years = (int)$date[0];
            
                $date = $bonus->discount_to;
                $date = explode('-', $date);

                $to_day = (int)$date[2];
                $to_mounth = (int)$date[1];
                $to_years = (int)$date[0];

                if ($from_years < $system_years) {
                    $from_flag = 1;
                }elseif ($from_years == $system_years) {
                    if ($from_mounth <= $system_mounth && $from_day <= $system_day) {
                        $from_flag = 1;
                    }
                }
                if ($from_flag) {
                    if ($to_years > $system_years) {
                        $data['order_details']['discount_employe'] = $bonus->discount;
                    }elseif ($to_years == $system_years) {
                        if ($to_mounth >= $system_mounth && $to_day >= $system_day) {
                            $data['order_details']['discount_employe'] = $bonus->discount;
                        }
                    }
                }
            }
			
		return $data;
	}

	/**
	 * Generate right order name file
	 *
	 * @param $order
	 *
	 * @return string
	 */
	public function nameOrderGenerate($order)
	{
		return sprintf('T%05u', $order->id) . '_' . $order->created_at . '_Rechung.pdf';
	}
}