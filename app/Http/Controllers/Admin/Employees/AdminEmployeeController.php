<?php

namespace App\Http\Controllers\Admin\Employees;

use App\Admin;
use App\Avatar;
use App\Calendar;
use App\Employee;
use App\EmployeeService;
use App\Http\Controllers\Admin\AdminController;
use App\Http\Requests;
use App\ProtocolEmployee;
use App\ProtocolPersonal;
use App\ServicesCategory;
use App\User;
use DB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
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
	 * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View|array
	 */
	public function employeeInfo()
	{
		$this->data['employee_services'] = $this->employee->servicesEmployee()->lists('service_id')->toArray();
		$this->data['employee'] = $this->employee;
		$this->data['services'] = $this->admin->services()->active()->get();

		if(request()->ajax()) {

            $categories = collect();

            foreach(ServicesCategory::where('category_status', 1)->where('admin_id', $this->admin->id)->get() as $category) {

                $categories->push([
                    'id' => $category->id,
                    'name' => $category->category_name,
                    'show' => false,
                    'items' => $this->admin->services()->active()->where('category_id', $category->id)->get()
                ]);

            }

            $this->data['categories'] = $categories;

            $this->data['avatar'] = $this->employee->avatarEmployee;

		    return ['data' => $this->data];

        }

		return view('admin.profil_employee', $this->data);
	}

	public function update(Requests\UpdateEmployee $request) {

	    DB::beginTransaction();

	    try {

	        $employee = Employee::find($request->get('id'));

	        $employee->fill($request->all());

	        $employee->save();

	        Avatar::storeAvatar($employee->user_id, $request);

            EmployeeService::where('employee_id', $employee->id)->delete();

            foreach($request->get('services', []) as $id) {

                EmployeeService::create(['employee_id' => $employee->id, 'service_id' => $id]);

            }

            DB::commit();

	        return ['status' => 'success'];

        } catch (\Exception $e) {

	        DB::rollback();

	        return ['status' => 'error'];

        }

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
	 * @return \Illuminate\Http\RedirectResponse|array
	 * @internal param Employee $employee
	 *
	 */
	public function destroy()
	{
		$this->employee->delete();

		if(request()->ajax()) {

		    return ['status' => 'success'];

        }

		return redirect()->back();
	}

	public function changeStatus(Request $request) {

        $status = $request->get('status');

        if($status != "admin") {

            DB::beginTransaction();

            try {

                if ($this->admin->tariffJournal->type === 'free' && $this->admin->employees()->count() >= 2){

                    if($request->ajax()) {

                        return ['redirect' => '/office/tariff'];

                    } else {

                        return redirect('/office/tariff');

                    }

                }

                $info = Admin::find($this->idAdmin);

                $employee = Employee::where('user_id', $info->user_id)->first();

                if (!$employee) {

                    $employee = Employee::create(['user_id' => $info->user_id, 'phone' => $info->mobile, 'email' => $info->email,
                        'gender' => $info->gender, 'birthday' => $info->birthday, 'admin_id' => $this->idAdmin,
                        'name' => $info->firstname, 'group' => 'admin', 'status' => 'active']);

                }

                $isset = EmployeeService::where('employee_id', $employee->id)->count() ? true : false;

                if (!$isset) {

                    EmployeeService::create(['employee_id' => $employee->id]);

                }

                DB::commit();

            } catch (\Exception $e) {

                DB::rollback();

                throw new \Exception($e->getMessage());

            }

        } else {

            DB::beginTransaction();

            try {

                $empl_id = Employee::where('user_id', $this->userId)->first()->id;
                EmployeeService::where('employee_id', $empl_id)->delete();
                Calendar::where('employee_id', $empl_id)->update(['employee_id' => null]);
                Employee::find($empl_id)->delete();
                ProtocolPersonal::create(['admin_id'  => $this->idAdmin, 'type' => 'change_admin_type',
                    'old_value' => 'employee', 'new_value' => 'admin']);
                DB::commit();

                return response()->json(true);
            } catch (\Exception $e) {
                DB::rollBack();

                throw new \Exception($e->getMessage());
            }

        }

    }
}
