<?php

namespace App\Http\Controllers;

use App;
use App\Http\Controllers\Admin\AdminController;
use Illuminate\Http\Request;

class TranslateController extends AdminController
{
    public function translate(Request $request){
    	App::setLocale($request->lang);
    	return json_encode(trans('calendar'));
    }
}
