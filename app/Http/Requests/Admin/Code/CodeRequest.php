<?php

namespace App\Http\Requests\Admin\Code;

use App\Http\Requests\Request;

class CodeRequest extends Request
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {

        $rule = 'required|unique:codes';

        $id = $this->route()->parameter('id');

        if($id) {

            $rule .= ',id,' . $id;

        }

        return [
            'code' => $rule,
            'category' => 'required',
            'type' => 'required',
            'expired_at' => 'required'
        ];
    }
}
