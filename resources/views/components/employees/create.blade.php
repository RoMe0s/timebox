<style>
    .assistant-form__col---6, .col--6 {

        margin: 10px;

        width: calc(50% - 20px);

        float: left;

    }
    .assistant-form__row {

        clear: both;

    }
    .assistant-form__row.__margin .assistant-form__col {

        margin: 10px 0;

        display: table;

    }
    .custom-upload-button {

        position: absolute;
        top: calc(50% - 49px / 2);
        left: 260px;
        width: auto;
        padding: 15px;

    }
    #assistant-create-employee-services, .assistant-create-employee-services {

        border: 1px solid #d8d8d8;

        padding: 10px 15px 0;

        list-style: none;

        height: 300px;

        overflow-y: auto;

        text-align: left;

    }
    #assistant-create-employee-services > li > ul, .assistant-create-employee-services > li> ul {

        padding: 5px 0;

        list-style: none;

        margin-left: 20px;

    }
    #assistant-create-employee-services > li > label, .assistant-create-employee-services > li > label {

        background-image: url('/images/select-arrow-red.png');

        background-position: right;

        background-repeat: no-repeat;

        width: 100%;

    }
    #assistant-create-employee-services input[type="checkbox"]:checked + label, .assistant-create-employee-services input[type="checkbox"]:checked + label, #assistant-create-employee-services .assistant-input--checkbox + label, .assistant-create-employee-services .assistant-input--checkbox + label {

        width: 25px;

        height: 25px;

    }
    .margin-10 {

        margin: 10px;

        position: relative;

    }
    .assistant-upload__drop {

        margin-bottom: 0;

    }
    .assistant {

        padding-top: 20px;

    }
</style>
@if(!isset($info))
    @include('components.employees.partials.info')
@else
    @include($info)
@endif

<template id="employee-create-new-template">

    <confirm-vue :show.sync="showConfirm" :is-confirm.sync="isConfirm">
        <p>{{trans('employees.confirm_question')}}</p>
    </confirm-vue>

    <alert
            :show.sync="showCreateEmplAlert"
            :duration="3000"
            type="danger"
            width="400px"
            placement="top-right"
            dismissable
    >
        <span class="icon-ok-circled alert-icon-float-left"></span>
        <strong>Error</strong>
        <p>Sie können nicht einen anderen Mitarbeiter erstellen.</p>
    </alert>

    <div class="assistant-block assistant">

{{--        <div class="assistant-block__label ">
            {!! trans('common.employee editing') !!}
        </div>--}}

        <form v-on:submit.prevent="trySendForm($event)" method="post" action="{!! isset($action) ? $action : '/office/employees/store' !!}" enctype="multipart/form-data">
            <input type="hidden" name="_token" value="{!! csrf_token() !!}">

            <employee-info-new-vue></employee-info-new-vue>

            <div class="assistant-form__row __margin margin-10">
                <div class="assistant-form__col assistant-form__col--4">
                    <button v-on:click.prevent="trySendForm($event, true)" class="assistant-upload__btn assistant-btn assistant-btn--red">
                        {{trans('common.save')}}
                    </button>
                </div>
                <div class="assistant-form__col assistant-form__col--4" style="position: absolute; left: 220px; top: 27px; height: 49px; margin: 0">
                    <a type="button" class="assistant-btn assistant-btn--gray" style="padding: 14.5px 15px" href="{!! isset($cancel) ? $cancel : '/office/employees' !!}">
                        {{trans('common.cancel')}}
                    </a>
                </div>
            </div>

        </form>
    </div>
</template>