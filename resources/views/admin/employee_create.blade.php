@extends('layouts.layoutAdmin')
@section('content')

    @include('components.employees.create')

    <section class="admin-leistungen director-main">

        <h1 class="director-content__heading heading heading__h1">
            {!! trans('common.create employee') !!}
        </h1>

        <div class="director-content">
            <employee-create-new-vue></employee-create-new-vue>
        </div>

    </section>
@stop