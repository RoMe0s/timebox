<?php

namespace App\Http\Controllers\Admin;

use App\Admin;
use App\Avatar;
use App\BankDetails;
use App\Employee;
use App\EmployeeService;
use App\Firm;
use App\FirmType;
use App\Http\Controllers\Controller;
use App\Http\Requests;
use App\Image;
use App\ServicesCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AdminStartAssistantController extends Controller
{
    public $admin_id;

    public $admin;

	/**
	 * Get admin id for start assistant
	 *
	 * AdminStartAssistantController constructor.
	 */
    public function __construct()
    {
        $this->admin = Admin::where('user_id', Auth::id())->first();

        $this->admin_id = $this->admin->id;
    }

	/**
	 * Start assistant page with checking if admin need start assistant
	 *
	 * @return \Illuminate\Contracts\View\Factory|\Illuminate\Http\RedirectResponse|\Illuminate\Routing\Redirector|\Illuminate\View\View
	 */
    public function startAssistant()
    {

        $employees = $this->admin->employees;

        $this->data['can_add_employee'] = 1;
        if ($this->admin->tariffJournal->type === 'free' && count($employees) >= 2){
            $this->data['can_add_employee'] = 0;
        }

        $this->data['employees'] = $employees;

        $employee = Employee::where('user_id', $this->admin->user_id)->first();

        if($employee) {

            $this->data['is_employee'] = EmployeeService::where('employee_id', $employee->id)->count() ? true : false;

        } else {

            $this->data['is_employee'] = false;

        }

        return view('admin.start_assistant', $this->data);
    }

	/**
	 * Get by ajax start data for start assistant
	 *
	 * @return \Illuminate\Http\JsonResponse
	 */
    public function getStartData()
    {
        $data['admin_data'] = Admin::where('user_id', Auth::id())->first();
        $data['avatar'] = Avatar::where('user_id', Auth::id())->first();
        $data['firmtype'] = FirmType::get();
        
        return response()->json($data);
    }

	/**
	 * Store avatar in start assistant
	 *
	 * @param Request $request
	 *
	 * @return \Illuminate\Http\JsonResponse
	 */
    public function storeAvatar(Request $request)
    {
        $validator = \Validator::make($request->all(), [
            'avatar'   =>  'image',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors());
        }

        Avatar::storeAvatar(Auth::id(), $request);
        return response()->json(true);
    }

	/**
	 * Store admin logo in start assistant
	 *
	 * @param Request $request
	 *
	 * @return \Illuminate\Http\JsonResponse
	 */
    public function storeLogo(Request $request)
    {
        $validator = \Validator::make($request->all(), [
            'firm_logo'   =>  'image',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors());
        }
        $request->admin_id = $this->admin_id;
        Image::addLogo($this->admin_id, $request);
        return response()->json(true);
    }

	/**
	 * Confirm new admin in start assistant
	 *
	 * @param Requests\StartAssistant $request
	 * @param                         $domain
	 *
	 * @return \Illuminate\Http\JsonResponse
	 * @throws \Exception
	 */
    public function confirm(Requests\StartAssistant $request, $domain)
    {
        \DB::beginTransaction();
        try{
            $admin = Admin::where('user_id', Auth::id())->first();
            $data = $request->all();
            $data['assistant_passed'] = true;
            $admin->update($data);
            $firm = Firm::where('firmlink', $domain)->first();
            $firm->update($request->all());
	        $admin->tariffJournal()->create(['type' => 'free']);
            BankDetails::where('admin_id', $admin->id)->first()->update($request->all());
            $admin->save();
            \DB::commit();
            return response()->json(true);
        }catch (\Exception $e){
            \DB::rollBack();
            return response()->json(false);
        }
    }

    public function get_employees_list() {

        $employees = $this->admin->employees;

        $employees->filter(function($employee) {

            $employee->avatar = isset($employee->avatarEmployee)
                ? $employee->avatarEmployee->path
                : asset('images/default_avatar.png');

            $employee->trans_group = trans('employees.'. $employee->group);

            return $employee;

        });

        $data['data'] = $employees;

        return response()->json($data);

    }

    public function getServicesCategories() {

        $categories = collect();

        foreach(ServicesCategory::where('category_status', 1)->where('admin_id', $this->admin_id)->get() as $category) {

            $categories->push([
                'id' => $category->id,
                'name' => $category->category_name,
                'show' => false,
                'items' => $this->admin->services()->active()->where('category_id', $category->id)->get()
            ]);

        }

        return array('data' => $categories);

    }

}
