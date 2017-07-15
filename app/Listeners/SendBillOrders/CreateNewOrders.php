<?php

namespace App\Listeners\SendBillOrders;

use App\Admin;
use App\Events\SendBillOrders;

class CreateNewOrders
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  SendBillOrders  $event
     * @return void
     */

     public function handle(SendBillOrders $event)
    {
	    foreach ($event->admins as $admin){
		    $admin_tariff = $admin->tariffJournal;
//		    dd($admin);
    		$order['employee_count'] = ($admin->employees()->count() > 2) ? $admin->employees()->count() - 2 : 0;
		    $order['price'] = $admin_tariff->tariff + $admin_tariff->tariff_per_employee * $order['employee_count'];
		    $order['tax']   = $order['price'] * $event::ORDER_TAX;
            $order['for_what'] = "tariff";

            $order['discount'] = 0.00;
            $order['count'] = 'currency';
            if ($admin->bonus) {
                $bonus = $admin->bonus;
                if ($bonus->count != NULL) $order['count'] = $bonus->count;

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
                        $order['discount'] = $bonus->discount;
                    }elseif ($to_years == $system_years) {
                        if ($to_mounth >= $system_mounth && $to_day >= $system_day) {
                            $order['discount'] = $bonus->discount;
                        }
                    }
                }
            }
           


		    $admin['order'] = $admin->orders()->create($order);

		    $admin->orderEmployees()
			        ->whereMonth('created_at', '=', $event->last_month)
			        ->update(['order_id' => $admin['order']['id']]);
	    }
    }
  
}
