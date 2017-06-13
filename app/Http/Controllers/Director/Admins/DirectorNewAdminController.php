<?php

namespace App\Http\Controllers\Director\Admins;

use App\Admin;
use App\Avatar;
use App\BankDetails;
use App\CalendarConfig;
use App\Firm;
use App\FirmType;
use App\Http\Controllers\Director\DirectorController;
use App\Http\Requests\StoreNewAdmin;
use App\ProtocolPersonal;
use App\User;
use Illuminate\Http\Request;

class DirectorNewAdminController extends DirectorController
{
	/**
	 * Page with new admin info
	 *
	 * @param Request $request
	 *
	 * @return \Illuminate\Contracts\View\Factory|\Illuminate\Http\RedirectResponse|\Illuminate\View\View
	 * @throws \Exception
	 */
    public function adminInfoNew(Request $request)
    {
        $newAdminId = $request->id;

        if (isset($_GET['status'])) {
            if ($_GET['status'] === 'active') {

                \DB::beginTransaction();
                try{
                    $admin = Admin::find($newAdminId);
                    $userId = User::storeAdmin($admin->toArray(), $admin->email);
                    $admin->update(['user_id' => $userId, 'status' => 'active']);
                    
                    BankDetails::create(['admin_id' => $admin->id]);
                    Firm::create(['firmlink' => $admin->firmlink]);
                    CalendarConfig::create(['admin_id' => $newAdminId]);
	                $admin->tariffJournal()->create(['type' => 'free']);
	                $admin->smsData()->create(['title' => $admin->firmlink]);
                    \DB::commit();
                }catch (\Exception $e){
                    \DB::rollBack();
                    return redirect(route('director'))->with('status', 'Admin not store');
                }
                return redirect(route('director'))->with('status', 'Admin approved');
            } else {
                Admin::find($request->id)->delete();
                return redirect(route('director'))->with('status', 'Admin deleted');
            }
        }
        $this->data['newAdminInfo'] = Admin::find($newAdminId);

        return view('director.admin_info_new', $this->data);
    }

	/**
	 * Create new admin page by director
	 *
	 * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
	 */
    public function createAdmin()
    {
        $this->data['firmType'] = FirmType::get();
        return view('director.admin_create', $this->data);
    }

	/**
	 *
	 * Store new admin by director
	 *
	 * @param StoreNewAdmin $request
	 *
	 * @return \Illuminate\Http\RedirectResponse|\Illuminate\Routing\Redirector
	 * @throws \Exception
	 */
    public function newAdminStore(StoreNewAdmin $request)
    {
        $data = $request->all();
        $data['user_status'] = 'admin';

        \DB::beginTransaction();
        try {
            $userId = User::storeAdmin($data, $data['email']);
            $data['user_id'] = $userId;
            $admin = Admin::create($data);
            Avatar::storeAvatar($userId, $request);
            Firm::addNewFirm($data['firmlink']);
	        CalendarConfig::create(['admin_id' => $admin->id]);
            BankDetails::addNewBankDetails($admin->id);
	        $admin->tariffJournal()->create(['type' => 'free']);
	        $admin->smsData()->create(['title' => $admin->firmlink]);

	        ProtocolPersonal::protocolAdminStore($admin->id);

            \DB::commit();
        }catch (\Exception $e){
            \DB::rollBack();

            \Log::error($e);
        }

        return redirect('/backend/admins');
    }
}
