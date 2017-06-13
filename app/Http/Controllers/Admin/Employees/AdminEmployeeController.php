<?php

namespace App\Http\Controllers\Admin\Employees;

use App\Avatar;
use App\Employee;
use App\Http\Controllers\Admin\AdminController;
use App\Http\Requests;
use App\ProtocolEmployee;
use App\User;
use DB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class AdminEmployeeController extends AdminController
{
	/**
	 * @var \App\Employee Object of employee
	 */
	protected $employee;

	public function __construct()
	{
		parent::__construct();
		$this->employee = Employee::find(\Route::current()->parameter('employee'));
	}

	/**
	 * List of all admin employees
	 *
	 * @return \Illuminate\Contracts\View\Factory|\Illuminate\Http\RedirectResponse|\Illuminate\Routing\Redirector|\Illuminate\View\View
	 */
	public function employeesList()
	{
		if (Gate::denies('admin')) {
			return redirect()->route('orders_list');
		}
//		$referer_path = explode('/', \URL::previous());

		$this->data['can_add_employee'] = 1;
		if ($this->admin->tariffJournal->type === 'free' && $this->admin->employees()->count() >= 2){
			$this->data['can_add_employee'] = 0;
		}


		$this->data['employees'] = $this->admin->employees()->paginate(15);

		return view('admin.employees_list', $this->data);
	}

	/**
	 * Page for profil employee
	 *
	 * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
	 */
	public function employeeInfo()
	{
		$this->data['employee_services'] = $this->employee->servicesEmployee()->lists('service_id')->toArray();
		$this->data['employee'] = $this->employee;
		$this->data['services'] = $this->admin->services()->active()->get();

		return view('admin.profil_employee', $this->data);
	}

	/**
	 * Get admin employee info for edit
	 *
	 * @return \Illuminate\Http\JsonResponse
	 */
	public function getEmplInfo()
	{
		return response()->json($this->employee);
	}

	/**
	 * Edit admin employee info with validation
	 *
	 * @param Requests\UpdateEmployee $request
	 *
	 * @return \Illuminate\Http\JsonResponse
	 * @throws \Exception
	 */
	public function setEmplInfo(Requests\UpdateEmployee $request)
	{
		/**
		 * Check tariff for active employee
		 */
//		if ($request->status === 'active') {
//			if (!TariffAdminJournal::checkTariffEmployee($this->idAdmin)) {
//				return response()->json(false);
//			}
//		} else {
//			$tariff = TariffAdminJournal::where('admin_id', $this->idAdmin)->first();
//			if (!$tariff->employee_unlimited) {
//				$tariff->increment('employee_count');
//			}
//		}

		DB::beginTransaction();
		try {

			ProtocolEmployee::protocolAdminEmployeeChange($this->idAdmin, $this->employee->id, array_keys($request->all()), $request);
			$this->employee->update($request->all());

			($request->group === 'employee')
				? $this->employee->userEmployee()->update(['status' => 'admin_employee'])
				: $this->employee->userEmployee()->update(['status' => 'admin']);

			DB::commit();

			return response()->json(true);
		} catch (\Exception $e) {
			DB::rollBack();

			return response()->json(false);
		}
	}

	/**
	 * Change employee password
	 *
	 * @param Requests\UpdatePassword $request
	 *
	 * @return \Illuminate\Http\JsonResponse
	 */
	public function setPassword(Requests\UpdatePassword $request)
	{
		$oldPass = $request['old_password'];
		$newPass = $request['new_password-1'];

		if (User::changePassword($oldPass, $newPass, $this->employee->user_id)) {
			return response()->json(true);
		} else {
			return response()->json(false);
		}
	}

	/**
	 * Change employee avatar
	 *
	 * @param Requests\StoreAvatar $request
	 *
	 * @return \Illuminate\Http\JsonResponse
	 */
	public function storeAvatar(Requests\StoreAvatar $request)
	{
		$avatar = Avatar::storeAvatar($this->employee->user_id, $request);

		return response()->json($avatar, 200, [], JSON_UNESCAPED_SLASHES);
	}

	/**
	 * Edit employee email
	 *
	 * @param Requests\UpdateEmail $request
	 *
	 * @return \Illuminate\Http\JsonResponse
	 * @throws \Exception
	 */
	public function setEmail(Requests\UpdateEmail $request)
	{
		if (User::where('email', $request->email)->first()) {
			return response()->json(false);
		} else {
			DB::beginTransaction();
			try {
				ProtocolEmployee::protocolAdminEmployeeChange($this->idAdmin, $this->employee->id, array_keys($request->all()), $request);
				$this->employee->update(['email' => $request->email]);
				$this->employee->userEmployee()->update(['email' => $request->email]);
				DB::commit();

				return response()->json(true);
			} catch (\Exception $e) {
				DB::rollBack();

				return response()->json(false);
			}
		}
	}

	/**
	 * Edit employee services
	 *
	 * @param Request $request
	 *
	 * @return \Illuminate\Http\RedirectResponse|\Illuminate\Routing\Redirector
	 */
	public function updateEmployeeService(Request $request)
	{
		$services = $request->input('services') ?: [];
		$this->employee->servicesEmployee()->sync($services);

		return redirect()->back();
	}

	/**
	 * Destroy employee
	 * @return \Illuminate\Http\RedirectResponse
	 * @internal param Employee $employee
	 *
	 */
	public function destroy()
	{
		$this->employee->delete();

		return redirect()->back();
	}
}
