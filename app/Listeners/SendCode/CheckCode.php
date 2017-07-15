<?php

namespace App\Listeners\SendCode;

use App\Events\SendBlockBillOrders;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class CheckCode
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
     * @param  SendBlockBillOrders  $event
     * @return void
     */
    public function handle()
    {
        $system_years = (int)date("Y");
        $system_mounth = (int)date("m");
        $system_day = (int)date("d");

        $codes = \App\Models\Code::all();
        foreach ($codes as $code) {
            $date = $code->expired_at;
            $date = explode('/', $date);

            $code_years = (int)$date[2];
            $code_mounth = (int)$date[1];
            $code_day = (int)$date[0];
            
            if ($code_years < $system_years) {
                $code->delete();
            }elseif ($code_years == $system_years) {
                if ($code_mounth <= $system_mounth && $code_day < $system_day) {
                   $code->delete();
                }
            }
        }

    }
}
