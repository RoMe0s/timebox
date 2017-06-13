@extends('layouts.layoutAdmin')
@section('content')
<section class="admin-kalendar director-main">
        <h1 class="heading heading__h1">{{trans('common.calendar')}}</h1>
        <div class="director-content">
            <calendar-block :work-days="{{json_encode($work_days)}}" :employeeslist="{{json_encode($employees)}}"></calendar-block>
        </div>

    </section>
    @stop

