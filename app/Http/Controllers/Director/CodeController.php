<?php

namespace App\Http\Controllers\Director;

use App\Http\Requests\Admin\Code\CodeRequest;
use App\Models\Code;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
use DB;
use Carbon\Carbon;

class CodeController extends DirectorController
{

    public $module = 'code';

    public $data = [];

    function __construct() {
    
        parent::__construct();

        $this->data['module'] = $this->module;
    
    }

    public function index() {
    
        return view('components.' . $this->module . '.index')->with($this->data);
    
    }

    public function getList(Request $request) {

        if($request->ajax()) {

            $list = Code::orderByExpired()->get();

            foreach($list as $item) {

                $item->interval = $item->getInterval();

                $item->count =  $item->count ? trans("common.{$item->count}") : "-";

                $item->type = trans("common.{$item->type}");

                $item->category = trans("common.{$item->category}");

                $item->value = $item->value ? : "-";

            }

            return $list;

        }

        return redirect()->to('admin.code.index');
    
    }

    public function delete( $id) {

        Code::destroy($id);

    }

    public function getData(Request $request) {

        $item = new \stdClass();

        if($request->get('id')) {

            $item = Code::find($request->get('id'));

        }

        return [
            'info' => $item,
            'categories' => Code::getCategories(true),
            'types' => Code::getTypes(true),
            'count' => Code::getCount(true),
            'translations' => [
                'value' => trans('common.value'),
                'considered' => trans('common.considered')
            ]
        ];

    }

    public function create() {


        return view("components.{$this->module}.create")->with($this->data);

    }

    public function store(CodeRequest $request) {

        DB::beginTransaction();

        try {

            $code = new Code();

            $code->fill($request->all());

            $code->save();

            DB::commit();

            return ['status' => true, 'redirect' => '/backend/code'];

        } catch (\Exception $e) {

            DB::rollback();

            throw new \Exception($e->getMessage());

        }

    }

    public function edit($id) {

        $this->data['id'] = $id;

        return view("components.{$this->module}.edit")->with($this->data);

    }

    public function update($id, CodeRequest $request) {

        DB::beginTransaction();

        try {

            $code = Code::find($id);

            $code->fill($request->only([
                'code',
                'category',
                'type',
                'count',
                'value',
                'expired_at',
                'from',
                'to',
                'period'
            ]));

            $code->save();

            DB::commit();

            return ['status' => true, 'redirect' => '/backend/code'];

        } catch (\Exception $e) {

            DB::rollback();

            throw new \Exception($e->getMessage());

        }

    }
    
    public function activate(Request $request) {
       return  "OK";

    }

}
