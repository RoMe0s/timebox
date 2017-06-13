<?php

namespace App\Events;

use App\Admin;
use App\DirectorBankDetails;
use App\Events\Event;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class SendBillOrders extends Event
{
    use SerializesModels;

	public $admins = array();
	public $last_month;
	const ORDER_TAX = 0.19;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->admins = Admin::where('status', 'active')->whereHas('tariffJournal', function ($query){
	        $query->where('type', 'paid');
        })->get();
	    $this->last_month = date("m",strtotime("-1 month"));
    }

    /**
     * Get the channels the event should be broadcast on.
     *
     * @return array
     */
    public function broadcastOn()
    {
        return [];
    }
}
