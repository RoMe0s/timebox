<?php

namespace App\Http\Controllers\Director;

use App\DirectorBankDetails;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class DirectorTariffsController extends DirectorController
{
	/**
	 * Page for tariffs
	 *
	 * @return \Illuminate\Contracts\View\Factory|\Illuminate\Http\RedirectResponse|\Illuminate\View\View
	 */
    public function index()
    {
        if (Gate::denies('director')) {
            return redirect()->route('admins');
        }

        $this->data['director_tariff'] = DirectorBankDetails::select(['tariff', 'tariff_per_employee'])->first();

        return view('director.tariff', $this->data);
    }

	/**
	 * Update tariffs
	 *
	 * @param Request $request
	 *
	 * @return \Illuminate\Http\RedirectResponse
	 */
    public function update(Request $request)
    {
        if (Gate::denies('director')) {
            return redirect()->route('admins');
        }

	    DirectorBankDetails::first()->update($request->all());

        return redirect()->back();
    }
}
