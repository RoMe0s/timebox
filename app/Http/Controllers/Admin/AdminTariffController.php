<?php

namespace App\Http\Controllers\Admin;

use App\DirectorBankDetails;
use App\DirectorEmployee;
use App\DirectorNotice;
use App\ProtocolPersonal;
use Illuminate\Support\Facades\Gate;

class AdminTariffController extends AdminController
{
	/**
	 * Current tariff page
	 *
	 * @return \Illuminate\Contracts\View\Factory|\Illuminate\Http\RedirectResponse|\Illuminate\Routing\Redirector|\Illuminate\View\View
	 */
    public function currentTariff()
    {
        if (Gate::denies('admin')) {
            return redirect('/office/orders_list');
        }
        $tariff = $this->admin->tariffJournal;

        $this->data['tariff_type']  =  $tariff->type;
        $this->data['tariff_price']  =  $tariff->tariff;
        $this->data['paid_from']  =  date('Y-m-d', strtotime($tariff->updated_at));
        $this->data['admin'] = $this->admin;
        $this->data['director_tariff'] = DirectorBankDetails::first()->tariff;

        return view('admin.tariff', $this->data);
    }

	/**
	 * Change tariff with recalculate admin balance
	 * @return \Illuminate\Http\JsonResponse
	 * @internal param Request $request
	 *
	 */
    public function changeTariff()
    {
        \DB::beginTransaction();
        try{
	        $tariff = DirectorBankDetails::select(['tariff', 'tariff_per_employee'])->first()->toArray();
	        $tariff['type'] = 'paid';
        	$this->admin->tariffJournal()->update($tariff);
	        ProtocolPersonal::protocolAdminTariffChange($this->idAdmin);
	        DirectorNotice::create(['admin_id' => $this->idAdmin, 'notice_type' => 'change_tariff']);

	        \DB::commit();
        }catch (\Exception $e){
        	\DB::rollBack();

	        return response()->json(['status' => false]);
        }

        return response()->json(['status' => true]);
    }

	/**
	 * Freeze admin profile
	 *
	 * @return \Illuminate\Http\JsonResponse
	 */
    public function freezeProfil()
    {
        DirectorNotice::create(['admin_id' => $this->idAdmin, 'notice_type' => 'admin_freeze']);
        $phone = DirectorEmployee::where('group', 'main')->first()->phone;
        
        return response()->json('Thank you for your attention. You must phone to director on number ' . $phone);
    }
}
