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
	    /** @var Admin $admin */
	    foreach ($event->admins as $admin){
		    $admin_tariff = $admin->tariffJournal;
//		    dd($admin);
    		$order['employee_count'] = ($admin->employees()->count() > 2) ? $admin->employees()->count() - 2 : 0;
		    $order['price'] = $admin_tariff->tariff + $admin_tariff->tariff_per_employee * $order['employee_count'];
		    $order['tax']   = $order['price'] * $event::ORDER_TAX;

		    $admin['order'] = $admin->orders()->create($order);

		    $admin->orderEmployees()
			        ->whereMonth('created_at', '=', $event->last_month)
			        ->update(['order_id' => $admin['order']['id']]);
	    }
    }
}
