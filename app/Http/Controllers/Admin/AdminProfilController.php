<?php

namespace App\Http\Controllers\Admin;

use App\Calendar;
use App\Employee;
use App\EmployeeService;
use App\ProtocolPersonal;
use App\Services;
use App\ServicesCategory;
use App\User;
use DB;
use Illuminate\Http\Request;
use App\Http\Requests;
use Auth;
use App\Admin;
use App\Avatar;
use Illuminate\Support\Facades\Gate;
use Validator;

class AdminProfilController extends AdminController
{
	/**
	 * Profile page for employee
	 *
	 * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
	 */
	public function profilEmployee()
	{

	    if(\request()->ajax()) {

	        $employee = Employee::where('user_id', $this->userId)->first();
            $this->data['employee_services'] = $employee->servicesEmployee()->lists('service_id')->toArray();
            $this->data['employee'] = $employee;
            $this->data['services'] = $this->admin->services()->active()->get();

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

            $this->data['avatar'] = $employee->avatarEmployee;

            return ['data' => $this->data];

        }

        $this->data['action'] = \request()->fullUrl() . '/set_personal_info';

		return view('admin.personal_profil_employee', $this->data);
	}

	/**
	 * Update employee services by employee
	 *
	 * @param Request $request
	 *
	 * @return \Illuminate\Http\RedirectResponse
	 * @throws \Exception
	 */
	public function updateEmployeeService(Request $request)
	{
		EmployeeService::where('employee_id', $this->employeeId)->delete();
		$services = $request->input('services') ?: [];
		foreach ($services as $service) {
			EmployeeService::create(['employee_id' => $this->employeeId, 'service_id' => $service]);
		}

		return redirect()->back();
	}

	/**
	 * Get employee personal data
	 *
	 * @return \Illuminate\Http\JsonResponse
	 */
	public function getEmplPersonalInfo()
	{
		$result = Employee::find($this->employeeId);

		return response()->json($result);
	}

	/**
	 * Update employee personal data
	 *
	 * @param Requests\UpdatePersonalInfo $request
	 *
	 * @return \Illuminate\Http\JsonResponse
	 */
	public function setEmplPersonalInfo(Requests\UpdatePersonalInfo $request)
	{

	    DB::beginTransaction();

	    try {

            $employee = Employee::find($this->employeeId);

            $employee->fill($request->all());

            if($request->hasFile('avatar')) {

                Avatar::storeAvatar($employee->user_id, $request);

            }

            $employee->save();

            DB::commit();

            return response()->json(['status' => true, 'redirect' => '/office']);

        } catch (\Exception $e) {

            return response()->json(false);

	        DB::rollback();

        }
	}

	/**
	 * Set employee password
	 *
	 * @param Requests\UpdatePassword $request
	 *
	 * @return \Illuminate\Http\JsonResponse
	 */
	public function setEmplPassword(Requests\UpdatePassword $request)
	{
		$oldPass = $request['old_password'];
		$newPass = $request['new_password-1'];

		if (User::changePassword($oldPass, $newPass, $this->userId)) {
			return response()->json(true);
		} else {
			return response()->json(false);
		}
	}

	/**
	 * Set employee email
	 *
	 * @param Requests\UpdateEmail $request
	 *
	 * @return \Illuminate\Http\JsonResponse
	 */
	public function setEmplEmail(Requests\UpdateEmail $request)
	{
		$changeEmail = User::where('email', $request->email)->first();
		if ($changeEmail) {
			return response()->json(false);
		} else {
			User::find($this->userId)->update(['email' => $request->email]);
			Employee::where('user_id', $this->userId)->update(['email' => $request->email]);

			return response()->json(true);
		}
	}

	/**
	 * Store employee avatar
	 *
	 * @param Requests\StoreAvatar $request
	 *
	 * @return bool|string
	 */
	public function storeEmplAvatar(Requests\StoreAvatar $request)
	{
		return Avatar::storeAvatar($this->userId, $request);
	}

	/**
	 * Admin profile with check if he if employee
	 *
	 * @param Request $request
	 *
	 * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
	 */
	public function profilAdmin(Request $request)
	{
/*		$this->data['admin'] = Employee::where('user_id', $this->userId)->first();
		if (!$this->data['admin']) {
			$this->data['admin'] = Admin::find($this->idAdmin);
		}

		$this->data['services'] = Services::getServicesList($this->idAdmin);
		$employee = Employee::where('user_id', $this->userId)->first();

		if ($employee) {
			$employee_services = EmployeeService::where('employee_id', $employee->id)->select('service_id')->get();

			$estmp = [];
			foreach ($employee_services as $es) {
				$estmp[] = $es->service_id;
			}

			$this->data['employee_services'] = $estmp;
			$this->data['admin_empl_id'] = $employee->id;
		}

		//check MainEmploee. If true -> show button want_to_be_empl
		//if empl with status admin -> not show button anywhere
		$mainAdmin = Admin::where('user_id', $this->userId)->first();

		if (!$mainAdmin == null) {
			$this->data['mainAdmin'] = true;
		}

		if ($request->services_edit) {
			self::editService($request, $employee->id);
		}*/

        if(request()->ajax()) {

            $employee = Employee::where('user_id', $this->userId)->first();

            if(!$employee) {

                $employee = Admin::where('user_id', $this->userId)->first();

            }

            $this->data['employee_services'] = [];

            $avatar = $employee instanceof Employee ? $employee->avatarEmployee : $employee->avatar;

            $this->data['employee_services'] = $employee instanceof Employee ? $employee->servicesEmployee()->lists('service_id')->toArray() : [];

            $this->data['employee'] = $employee;

            $categories = collect();

            $admin = $employee instanceof Employee ? $employee->admin : $employee;

            foreach(ServicesCategory::where('category_status', 1)->where('admin_id', $this->admin->id)->get() as $category) {

                $categories->push([
                    'id' => $category->id,
                    'name' => $category->category_name,
                    'show' => false,
                    'items' => $admin->services()->active()->where('category_id', $category->id)->get()
                ]);

            }

            $this->data['categories'] = $categories;

            $this->data['avatar'] = $avatar;

            $this->data['mainAdmin'] = $employee instanceof Admin ? true : false;

            return ['data' => $this->data];

        }


        $this->data['action'] = \request()->fullUrl() . '/set_personal_info';

		return view('admin.profil_admin', $this->data);
	}

	/**
	 * Admin-employee stay admin
	 *
	 * @return \Illuminate\Http\JsonResponse
	 * @throws \Exception
	 */
	public function toAdmin()
	{
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

			return response()->json(false);
		}
	}

	/**
	 * Admin stay employee
	 *
	 * @param Request $request
	 *
	 * @return \Illuminate\Http\RedirectResponse
	 * @throws \Exception
	 */
	public function profilAdminService(Request $request)
	{
		if (Gate::denies('admin')) {
			return redirect()->route('orders_list');
		}

		DB::beginTransaction();
		try {
			$info = Admin::find($this->idAdmin);
			$id = Employee::create(['user_id' => $info->user_id, 'phone' => $info->mobile, 'email' => $info->email,
			                        'gender'  => $info->gender, 'birthday' => $info->birthday, 'admin_id' => $this->idAdmin,
			                        'name' => $info->firstname, 'group'   => 'admin', 'status' => 'active'])->id;

			self::editService($request, $id);
			ProtocolPersonal::create(['admin_id'  => $this->idAdmin, 'type' => 'change_admin_type',
			                          'old_value' => 'admin', 'new_value' => 'employee']);
			DB::commit();

			return redirect()->back();
		} catch (\Exception $e) {
			DB::rollBack();

			return redirect()->back();
		}
	}

	/**
	 * Edit admin-employee services
	 *
	 * @param Request $request
	 *
	 * @return \Illuminate\Http\RedirectResponse
	 */
	public function profilAdminEditServices(Request $request)
	{
		$employee = Employee::where('user_id', $this->userId)->first();
		self::editService($request, $employee->id);

		return redirect()->back();
	}

	/**
	 * Edit employee service
	 *
	 * @param $request
	 * @param $id
	 *
	 * @throws \Exception
	 */
	public static function editService($request, $id)
	{
		EmployeeService::where('employee_id', $id)->delete();
		$services = $request->input('services') ?: [];
		foreach ($services as $service) {
			EmployeeService::create(['employee_id' => $id, 'service_id' => $service]);
		}
	}

	/**
	 * Get admin personal data for edit
	 *
	 * @return \Illuminate\Http\JsonResponse
	 */
	public function getPersonalInfo()
	{
		$result = Admin::where('user_id', $this->userId)->first();
		if (!$result) {
			$result = Employee::where('user_id', $this->userId)->first();
			$result->firstname = $result->name;
			$result->lastname = $result->last_name;
			$result->mobile = $result->phone;
		}

		return response()->json($result);
	}

	/**
	 * Update admin's personal data and personal data of admin-employee
	 *
	 * @param Request $request
	 *
	 * @return \Illuminate\Http\JsonResponse
	 * @throws \Exception
	 */
	public function setPersonalInfo(Request $request)
	{
		$rules = [
			'firstname' => 'required|string|max:255',
			'lastname'  => 'required|string|max:255',
			'mobile'    => 'required|digits_between:5,15',
			'birthday'  => 'required|date_format:"d/m/Y"',
			'gender'    => 'required|string',
		];

		$validator = Validator::make($request->all(), $rules);
		if ($validator->fails()) {
			echo $validator->errors();

			return response()->json(false);
		}

		DB::beginTransaction();
		try {

			$adminMain = Admin::where('user_id', $this->userId)->first();

            $employee = Employee::where('user_id', $this->userId)->first();

			if ($adminMain) {

				ProtocolPersonal::protocolAdminPersonalChange($this->idAdmin, array('firstname', 'lastname', 'mobile'), $request);

                $adminMain->fill($request->all());

                $adminMain->save();

                if($request->has('is_employee') && !$employee) {

                    if ($adminMain->tariffJournal->type === 'free' && $adminMain->employees()->count() >= 2) {

                        if ($request->ajax()) {

                            return ['redirect' => '/office/tariff'];

                        } else {

                            return redirect('/office/tariff');

                        }

                    }

                    if (!$employee) {

                        $employee = Employee::create(['user_id' => $adminMain->user_id, 'phone' => $adminMain->mobile, 'email' => $adminMain->email,
                            'gender' => $adminMain->gender, 'birthday' => $adminMain->birthday, 'admin_id' => $adminMain->id,
                            'name' => $adminMain->firstname, 'group' => 'admin', 'status' => 'active', 'last_name' => $adminMain->lastname]);

                    }

                } elseif(!$request->has('is_employee')) {

                    $this->toAdmin();

                    $employee = null;

                }

			}

            if($employee) {

                $employee->update([
                    'name' => $request->firstname, 'last_name' => $request->lastname, 'phone' => $request->mobile,
                    'gender' => $request->gender, 'birthday' => $request->birthday,
                ]);

                $services = $request->input('services') ?: [];

                $employee->servicesEmployee()->sync($services);

            }

            Avatar::storeAvatar(Auth::user()->id, $request);

            DB::commit();

            return response()->json(array('status' => true, 'redirect' => '/office/employees'));

		} catch (\Exception $e) {
			DB::rollBack();

			return response()->json(false);
		}
	}

	/**
	 * Update admin's password
	 *
	 * @param Requests\UpdatePassword $request
	 *
	 * @return \Illuminate\Http\JsonResponse
	 */
	public function setPassword(Requests\UpdatePassword $request)
	{
		$oldPass = $request['old_password'];
		$newPass = $request['new_password-1'];

		if (User::changePassword($oldPass, $newPass, $this->userId)) {
			return response()->json(true);
		} else {
			return response()->json(false);
		}
	}

	/**
	 * Update admin's email
	 *
	 * @param Requests\UpdateEmail $request
	 *
	 * @return \Illuminate\Http\JsonResponse
	 * @throws \Exception
	 */
	public function setEmail(Requests\UpdateEmail $request)
	{
		$changeEmail = User::where('email', $request->email)->first();
		if ($changeEmail) {
			return response()->json(false);
		} else {
			DB::beginTransaction();
			try {
				ProtocolPersonal::protocolAdminPersonalChange($this->idAdmin, array('firstname', 'lastname', 'mobile'), $request);
				User::find($this->userId)->update(['email' => $request->email]);
				$mainAdmin = Admin::where('user_id', $this->userId)->first();
				if ($mainAdmin) {
					Admin::where('user_id', $this->userId)->update(['email' => $request->email]);
				} else {
					Employee::where('user_id', $this->userId)->update(['email' => $request->email]);
				}

				DB::commit();

				return response()->json(true);
			} catch (\Exception $e) {
				DB::rollBack();

				return response()->json(false);
			}
		}
	}

	/**
	 * Upload avatar
	 *
	 * @param Requests\StoreAvatar $request
	 *
	 * @return \Illuminate\Http\JsonResponse
	 */
	public function storeAvatar(Requests\StoreAvatar $request)
	{
		$avatar = Avatar::storeAvatar($this->userId, $request);

		return response()->json($avatar, 200, [], JSON_UNESCAPED_SLASHES);
	}
}
