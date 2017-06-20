<template id="employees-index">
    <h1 class="director-content__heading heading heading__h1">{{trans_choice('common.employees', 2)}}
        <a @click.prevent="addEmployee($event, {{$can_add_employee}})" class="director-tarife__btn btn btn--plus" href="/office/employees/create"><i></i>{{trans('common.add')}}
        </a>
    </h1>

    <div class="director-content" style="background-color: white">

        <confirm-vue :show.sync="showConfirm" :is-confirm.sync="isConfirm">
            <p>
                <img src="/images/warning-sign.png" alt="">
                {{trans('employees.go_to_paid')}}
            </p>
        </confirm-vue>

        @if(session()->has('store_employee'))
            <div v-if="showAlertSuccess" class="fade-transition alert alert-success" role="alert">
                <p>{{trans('employees.confirm_create_employee')}}</p>
            </div>
        @endif

        <table class="table table--striped" id="employee-table">
            <thead>
            <tr>
                <th>{{trans('common.nr')}}</th>
                <th>{{trans('common.avatar')}}</th>
                <th>{{trans('common.first_name')}}</th>
                <th>{{trans('common.mobile')}}</th>
                <th>{{trans('common.e-mail')}}</th>
                <th>{{trans('common.group')}}</th>
                <th>{{trans('common.status')}}</th>
                <th></th>
                <th></th>
            </tr>
            </thead>
            <tbody>
            <?php $i = 1?>
            @foreach($employees as $employee)
                <tr>
                    <td>{{$i}}</td>
                    <td><img class="table__avatar"
                             src="{{ isset($employee->avatarEmployee)
						                ? $employee->avatarEmployee->path
						                : asset('images/default_avatar.png') }}"
                             alt="Avatar"></td>
                    <td>{{ $employee->name }}</td>
                    <td>{{ $employee->phone }}</td>
                    <td>{{ $employee->email }}</td>
                    <td>{{ trans('employees.'. $employee->group) }}</td>
                    <td>{{ $employee->status }}</td>
                    <td>
                        <a href="/office/employees/info/{{ $employee->id }}">
                            <i class="i">
                                {!! file_get_contents(asset('images/svg/pencil.svg')) !!}
                            </i>
                        </a>
                    </td>
                    <td>
                        <a @click.prevent="deleteEmployee('/office/employees/delete/{{$employee->id}}')" href="/office/employees/delete/{{$employee->id}}">
                            <i class="i">
                                {!! file_get_contents(asset('images/svg/rubbish-bin.svg')) !!}
                            </i>
                        </a>
                    </td>
                </tr>
                <?php $i++?>
            @endforeach
            </tbody>
        </table>
        {!!$employees->render()!!}
{{--        <div style="margin: 10px 10px 0">
            <input type="checkbox" class="assistant-form__checkbox assistant-input--checkbox" id="be-employee-checkbox" v-on:change="changeStatus($event)" {!! $is_employee === true ? "checked" : "" !!}>
            <label for="be-employee-checkbox" class="assistant-form__label"></label>
            <label>
                {!! trans('common.show_in_calendar') !!}
            </label>
        </div>--}}
    </div>
</template>