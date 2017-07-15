<?php

namespace App\Http\Controllers\Admin;

use App\DirectorBankDetails;
use App\DirectorEmployee;
use App\Order;
use App\ProtocolPersonal;
use App\Traits\OrderToPdfTrait;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\BankDetails;
use Illuminate\Support\Facades\Gate;
use PDF;

class AdminBillingController extends AdminController
{
	use OrderToPdfTrait;

	/**
	 * Page with orders and bank data
	 *
	 * @return \Illuminate\Contracts\View\Factory|\Illuminate\Http\RedirectResponse|\Illuminate\Routing\Redirector|\Illuminate\View\View
	 */
	public function billing()
	{
		if (Gate::denies('admin')) {
			return redirect('/office/orders_list');
		}

		$this->data['orders_new'] = $this->admin->orders()->new()->get();
		$this->data['orders_old'] = $this->admin->orders()->old()->get();

		foreach ($this->data['orders_new'] as $order) {
			$admin = \App\Admin::where("id",$order->admin_id)->first();
			$order['employee_price'] = $order->employee_count * 5;
			$order['tariff_price'] = $order->price - ($order->employee_count * 5);
			$order['discount_employe'] = 0.00;
			$order['employe_count'] = 'currency';

		if ($admin->bonusEmloyee) {
                $bonus = $admin->bonusEmloyee;
                if ($bonus->count != NULL) $order['employe_count'] = $bonus->count;

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
                        $order['discount_employe'] = $bonus->discount;
                    }elseif ($to_years == $system_years) {
                        if ($to_mounth >= $system_mounth && $to_day >= $system_day) {
                            $order['discount_employe'] = $bonus->discount;
                        }
                    }
                }
            }
		}
		return view('admin.billing', $this->data);
	}

	/**
	 * Download order pdf file
	 *
	 * @param Request $request
	 *
	 * @return \Illuminate\Http\RedirectResponse|\Illuminate\Http\Response|\Illuminate\Routing\Redirector
	 */
	public function downloadOrder(Request $request)
	{
		if (Gate::denies('admin')) {
			return redirect('/office/orders_list');
		}

		$order = Order::find($request->id);
		$data = $this->dataOrderGenerate($order);
		$order_name = $this->nameOrderGenerate($order);
		$pdf = PDF::loadView('pdf.order', $data);

		return $pdf->download($order_name);
	}

	/**
	 * Get admin bank details for edit
	 *
	 * @return \Illuminate\Http\JsonResponse
	 */
	public function getBankDetails()
	{
		$bank_details = BankDetails::getBankDetails($this->idAdmin);

		return response()->json($bank_details);
	}

	/**
	 * Update admin bank details
	 *
	 * @param Requests\UpdateBankDetails $request
	 *
	 * @return \Illuminate\Http\JsonResponse|\Illuminate\Http\RedirectResponse|\Illuminate\Routing\Redirector
	 * @throws \Exception fail transaction
	 */
	public function setBankDetails(Requests\UpdateBankDetails $request)
	{
		if (Gate::denies('admin')) {
			return redirect('/office/orders_list');
		}

		\DB::beginTransaction();
		try {
			ProtocolPersonal::protocolAdminBankChange($this->idAdmin, array_keys($request->all()), $request);
			BankDetails::where('admin_id', $this->idAdmin)->update($request->all());
			\DB::commit();

			return response()->json(true);
		} catch (\Exception $e) {
			\DB::rollBack();

			return response()->json(false);
		}
	}

	/**
	 * Discard admin for bank auto withdraw
	 *
	 * @return \Illuminate\Http\JsonResponse
	 */
	public function refusal()
	{
		BankDetails::where('admin_id', $this->idAdmin)->update(['agreement' => 0]);

		return response()->json(true);
	}


	/**
	 * Download document
	 *
	 * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
	 */
	public function document()
	{
		$data['bank_details'] = DirectorBankDetails::find(1);
		$data['admin_details'] = $this->admin;
		$data['firm_details'] = $this->admin->firm;
		$data['director_details'] = DirectorEmployee::where('group', 'main')->first();
		$data['admin_bank_details'] = $this->admin->bankDetails;

		$pdf = PDF::loadView('pdf.document', $data);

		return $pdf->download('document.pdf');
	}
}
