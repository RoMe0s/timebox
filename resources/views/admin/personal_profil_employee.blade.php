@extends('layouts.layoutAdmin')
@section('content')
    @include('components.employees.create', ['action' => $action, 'info' => 'components.employees.partials.profil_info', 'cancel' => '/office'])

    @include('components.employees.modals.personal_password')

    <section class="admin-leistungen director-main">

        <h1 class="director-content__heading heading heading__h1">
            {!! trans('common.employee editing') !!}
        </h1>

        <div class="director-content">
            <employee-create-new-vue v-bind:edit="true"></employee-create-new-vue>
        </div>

    </section>
@stop
