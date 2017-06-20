<!doctype html>
<html class="no-js" lang="ru">
<head>
    <meta charset="utf-8">
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="locale" content="de">
    <title> admin-dashboard </title>
    <link rel="stylesheet" type="text/css" href="{{ asset('styles/token-input.css') }}"/>
    <link rel="stylesheet" type="text/css" href="{{ asset('styles/token-input-facebook.css') }}"/>
    <link rel="stylesheet" type="text/css" href="{{ asset('styles/token-input-mac.css') }}"/>
    <link rel="stylesheet" type="text/css" href="{{ asset('styles/colorpicker.css') }}"/>
    <link rel="stylesheet" type="text/css" href="{{ asset('styles/palette-color-picker.css') }}"/>
    <link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
    <link rel="stylesheet" type="text/css" href="//cdnjs.cloudflare.com/ajax/libs/fullcalendar/3.1.0/fullcalendar.min.css"/>

    <link rel="apple-touch-icon" href="{{ asset('apple-touch-icon.png') }}">
    <link href='https://fonts.googleapis.com/css?family=Open+Sans:400,700,600,300italic,600italic,700italic,400italic,300'
          rel='stylesheet' type='text/css'>
    <!-- Place favicon.ico in the root directory -->
    <link rel="stylesheet" href="{{ asset('styles/admin.css') }}">
    <style>
        .director-main {

            padding-left: 0 !important;

        }
        .director-content {

            margin: 0;

        }
        .no-width-padding {

            padding-left: 0 !important;

            padding-right: 0 !important;

        }
        .assistant-step__btns.left-buttons {

            width: 80%;

            text-align: left;

        }
        .pager {

            margin-top: 10px;

        }
        .employee-button {

            margin: 20px;

        }
        .no-height-padding {

            padding-top: 0;

            padding-bottom: 0;

        }
        .add-employee-button {

            position: absolute;
            top: 20px;
            right: 20px;
            height: 43px;
            line-height: 43px;

        }
        .label-place {

            margin-top: 30px;

            position: relative;

            padding-top: 80px;

        }
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
            top: 60.5px;
            left: 260px;

        }
        #assistant-create-employee-services, .assistant-create-employee-services {

            border: 1px solid #d8d8d8;

            padding: 10px 15px 0;

            list-style: none;

            height: 380px;

            overflow-y: auto;

            text-align: left;

        }
        #assistant-create-employee-services > li > ul, .assistant-create-employee-services > li> ul {

            padding: 5px 0;

            list-style: none;

            margin-left: 20px;

        }
        #assistant-create-employee-services > li > label, .assistant-create-employee-services > li > label {

            background-image: url(../images/select-arrow-red.png);

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

        }
    </style>
</head>
<body id="assistant" class="page">
<!--[if lt IE 8]>
<p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade
    your browser</a> to improve your experience.</p>
<![endif]-->

<div class="container">
    <div id="tablePreloader"></div>
    <header class="admin-header">
        <div class="admin-header__logo">
            <a href="/office/">
                <img src="" alt="">
            </a>
        </div>

        <div class="admin-header__right admin-header__right--assistant">
            <select @change.stop="changeLang" v-model="locale" name="" id="">
                <option value="de">de</option>
                <option value="en">en</option>
                <option value="ru">ru</option>
            </select>
            <header-time-vue></header-time-vue>
            <div class="admin-header__avatar">
                <a href="#">
                    <img src="/images/default_avatar.png" alt=""
                         style="width: 48px;height: 48px">
                </a>
                <ul>
                    @can('admin_employee')
                    <li><a href="/office/profil_employee">Profil bearbeiten</a></li>
                    @endcan
                    @can('admin')
                    <li><a href="/logout">Abmelden</a></li>
                    @endcan
                </ul>
            </div>
            <div class="admin-header__question"><a href="#"><i></i></a></div>
            <a href="#"></a>
        </div>
    </header>

    <div class="containter__in">

        <assistant-vue></assistant-vue>

    </div>
</div>

<template id="services-template">
    <section class="admin-leistungen director-main">
        <div class="director-content">
            <!--      remodal for create and edit category-->
            <div class="remodal kalendar-form leistungen-form" id="categoryModal">
                <button data-remodal-action="close" class="remodal-close"><i></i></button>

                <div class="block">

                    <ul class="block__nav">
                        <li data-tab="tab-1" class="block__item is-active">@{{ $t("all.add_category") }}</li>
                    </ul>

                    <div data-tab-id="tab-1" class="tab-content is-active">
                        <form
                                @submit.prevent="sendCategoryForm($event)"
                                class="kalendar-form__form" id="kategorieForm" action="" method="POST">
                            <fieldset class="kalendar-form__fieldset">

                                <div class="kalendar-form__row">
                                    <input
                                            name="category_name" type="text"
                                            v-model="editCategory.category_name"
                                            class="kalendar-form__input kalendar-input kalendar-form__input--name"
                                            placeholder="@{{ $t('all.ph_category_name')}}"
                                            required>
                                </div>

                                <div class="kalendar-form__row">
                                    <select
                                            v-model="editCategory.category_status"
                                            name="category_status" class="kalendar-form__input kalendar-form__input--service kalendar-input" required>
                                        <option
                                                value="1">Active</option>
                                        <option
                                                value="0">No active</option>
                                    </select>
                                </div>

                            </fieldset>
                            <fieldset class="kalendar-form__fieldset">
                                <input class="kalendar-form__submit btn btn--red" id="create_new_category" type="submit" value="@{{$t('all.save')}}">
                            </fieldset>
                        </form>
                    </div>

                </div>

            </div>

            <!--remodal for create and edit service-->
            <div class="remodal kalendar-form leistungen-form" id="serviceModal">
                <button data-remodal-action="close" class="remodal-close"><i></i></button>

                <div class="block">

                    <ul class="block__nav">
                        <li data-tab="tab-1" class="block__item is-active">@{{ $t('all.add_service') }}</li>
                    </ul>

                    <div data-tab-id="tab-1" class="tab-content is-active">
                        <form
                                @submit.prevent="sendServiceForm($event)"
                                id="sendServiceForm"
                                class="kalendar-form__form" action="">
                            <fieldset class="kalendar-form__fieldset">

                                <div class="kalendar-form__row">
                                    <div>
                                        <input
                                                v-model="editService.service_name"
                                                type="text" name="service_name"
                                                class="kalendar-form__input kalendar-input"
                                                id="service_name"
                                                placeholder="@{{ $t('all.ph_service_name') }}">
                                    </div>
                                    <div>
                                        <select
                                                v-model="editService.category_id"
                                                class="kalendar-form__input kalendar-input category-select" name="category_id" id="category_name">
                                            <option
                                                    v-for="category in categories"
                                                    :value="category.id">
                                                @{{ category.category_name }}
                                            </option>
                                        </select>
                                    </div>
                                </div>

                                <div class="kalendar-form__row">
                                    <div>
                                        <input
                                                v-model="editService.price"
                                                type="text" name="price"
                                                class="kalendar-form__input kalendar-input"
                                                id="price"
                                                placeholder="@{{ $t('all.price') }}">
                                    </div>
                                    <div>
                                        <input
                                                v-model="editService.duration"
                                                type="text" name="duration"
                                                class="worktime-timepicker kalendar-form__input kalendar-input"
                                                id="duration"
                                                readonly
                                                placeholder="@{{ $t('all.duration') }}">
                                    </div>
                                </div>

                                <div class="kalendar-form__row">
                                    <select
                                            v-model="editService.service_status"
                                            name="service_status" class="kalendar-form__input kalendar-form__input--service kalendar-input" required>
                                        <option value="1">Active</option>
                                        <option value="0">No active</option>
                                    </select>
                                </div>

                                <div class="kalendar-form__row">
                                    <p class="is-danger" v-show="showServiceDanger">@{{ $t('all.tariff_warning') }}</p>
                                </div>

                            </fieldset>
                            <fieldset class="kalendar-form__fieldset">
                                <input class="kalendar-form__submit btn btn--red" id="create_new_service" type="submit" value="@{{ $t('all.save') }}">
                            </fieldset>
                        </form>
                    </div>

                </div>

            </div>
            <div class="block">
                <ul class="block__nav" style="text-align: left">
                    <li
                            @click="showCategoryBtn"
                            data-tab="tab-1" class="block__item is-active">@{{ $t('all.categories') }}</li>
                    <li
                            @click="showServiceBtn"
                            data-tab="tab-2" class="block__item">@{{$t('all.services')}}</li>
                    <a
                            @click.stop="openCategoryModal('categoryModal')"
                            v-show="categoryBtn"
                            href="javascript:void(0);"
                            id="leistungenBtn1"
                            class="admin-leistungen__btn btn btn--red f-right">@{{$t('all.add_category')}}</a>
                    <a
                            @click.stop="openServiceModal('serviceModal')"
                            v-show="serviceBtn"

                            href="javascript:void(0);"
                            id="leistungenBtn2"
                            class="admin-leistungen__btn btn btn--red f-right">@{{$t('all.add_service')}}</a>
                </ul>

                <div data-tab-id="tab-1" class="tab-content is-active">
                    <table class="table table--striped table--sortable" id="category-table">
                        <thead>
                        <tr>
                            <th>@{{$t('all.nr')}}</th>
                            <th>@{{$t('all.name')}}</th>
                            <th>@{{$t('all.status')}}</th>
                        </tr>
                        </thead>
                        <tbody class="sortable">
                        <tr
                                v-for="category in categories"
                                @click.stop="openCategoryModal('categoryModal', category)"
                                data-category-id="@{{ category.id }}"
                        >
                            <td>@{{$index+1}}</td>
                            <td>@{{category.category_name}}</td>
                            <td>@{{ +category.category_status ? 'Active' : 'Not Active' }}</td>
                            <td>
                                <a
                                        @click.stop="deleteCategory(category)"
                                        href="javascript:void(0);"
                                        class="delete-category">
                                    <i class="i">
                                        {!! file_get_contents(asset('images/svg/rubbish-bin.svg')) !!}
                                    </i>
                                </a>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>

                <div data-tab-id="tab-2" class="tab-content">
                    <table class="table table--striped table--sortable" id="services-table">
                        <thead>
                        <tr>
                            <th>@{{$t('all.nr')}}</th>
                            <th>@{{$t('all.name')}}</th>
                            <th>@{{$t('all.categories')}}</th>
                            <th>@{{$t('all.price')}}</th>
                            <th>@{{$t('all.duration')}}</th>
                            <th>@{{$t('all.status')}}</th>
                        </tr>
                        </thead>
                        <tbody class="sortable">
                        <tr
                                v-for="service in services"
                                @click.stop="openServiceModal('serviceModal', service)"
                                data-service-id="@{{service.id}}">
                            <td>@{{ $index+1 }}</td>
                            <td>@{{ service.service_name }}</td>
                            <td>@{{ service.category_name }}</td>
                            <td><span>@{{ service.price }}</span> EUR</td>
                            <td class="service_duration">@{{ service.duration | hourMinutes }}</td>
                            <td>@{{ +service.service_status ? 'Active' : 'Not Active'}}</td>
                            <td>
                                <a
                                        @click.stop="deleteService(service)"
                                        href="javascript:void(0);"
                                        class="delete-service">
                                    <i class="i">
                                        {!! file_get_contents(asset('images/svg/rubbish-bin.svg')) !!}
                                    </i>
                                </a>
                            </td>
                        </tr>
                        </tbody>

                    </table>
                </div>

            </div>

        </div>

    </section>
</template>

<template id="employees-list-template">
{{--    @if(isset($is_employee))
        <div style="text-align: right; @if($is_employee) display: none; @endif">
            <button class="btn btn--red employee-button" @click.prevent="ChangeStatus('employee')" data-status="employee">
                {{trans('common.be_employee')}}
            </button>
        </div>
        <div style="text-align: right; @if(!$is_employee) display: none; @endif">
            <button class="btn btn--red employee-button" @click.prevent="ChangeStatus('admin')" data-status="admin">
                {{trans('common.be_admin')}}
            </button>
        </div>
    @endif--}}
    <div class="director-content" style="margin-top: 70px; width: 100%">

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
                <th>@{{$t('all.avatar')}}</th>
                <th>@{{$t('all.first_name')}}</th>
                <th>@{{$t('all.group')}}</th>
                <th>@{{$t('all.status')}}</th>
                <th></th>
                <th></th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="employee in employees" data-row="@{{ employee.id }}">
                <td>
                    <img class="table__avatar" v-bind:src="employee.avatar" alt="Avatar" />
                </td>
                <td>
                    @{{ employee.name }}
                </td>
                <td>
                    @{{ employee.trans_group }}
                </td>
                <td>
                    @{{ employee.status }}
                </td>
                <td>
                    <a @click.prevent="editEmployee(employee.id)">
                        <i class="i">
                            {!! file_get_contents(asset('images/svg/pencil.svg')) !!}
                        </i>
                    </a>
                </td>
                <td>
                    <a @click.prevent="deleteEmployee('/office/employees/delete/' + employee.id, true, employee.id)" href="/office/employees/delete/@{{ employee.id }}">
                        <i class="i">
                            {!! file_get_contents(asset('images/svg/rubbish-bin.svg')) !!}
                        </i>
                    </a>
                </td>
            </tr>
            </tbody>
        </table>
    </div>

    <div class="assistant-block" v-show="employee !== null && employee !== undefined" style="text-align: left">

        <div class="assistant-block__label ">@{{ $t("step7.label3") }}</div>
        <form @submit.prevent="trySendForm(employee.employee.id)" id="userInfoFormEdit_@{{ employee.employee.id }}" method="post" action="/office/employees/update" enctype="multipart/form-data">
            <input type="hidden" name="id" value="@{{ employee.employee.id }}" />
            <div class="assistant-form__row">
                <div class="assistant-form__col assistant-form__col--12">
                    <div class="assistant-block assistant-upload no-height-padding no-width-padding" style="height: auto; width: 240px;">
                        <div class="assistant-upload__drop">
                            <input class="assistant-block__file" id="assistantAvatarEdit_@{{ employee.employee.id }}" type="file" name="avatar" @change="previewAvatar($event, employee.employee.id)">
                            <img class="assistant-upload__image" id="assistantAvatarPreviewEdit_@{{ employee.employee.id }}" src="@{{ employee.avatar.path }}" data-upload />
                        </div>
                        <button onclick="$('#assistantAvatarEdit_@{{ employee.employee.id }}').click();" type="button" class="assistant-upload__btn assistant-btn assistant-btn--red custom-upload-button">
                            @{{ $t("step7.upload") }}
                        </button>
                    </div>
                </div>
            </div>

            <div class="assistant-form__row">
                <div class="assistant-form__col assistant-form__col---6">
                    <label class="assistant-form__label">@{{$t('all.first_name')}}</label>
                    <input class="assistant-input" type="text" name="name" required value="@{{ employee.employee.name }}">
                </div>
                <div class="assistant-form__col assistant-form__col---6">
                    <label class="assistant-form__label">@{{$t('all.last_name')}}</label>
                    <input class="assistant-input" type="text" name="last_name" required value="@{{ employee.employee.last_name }}">
                </div>
            </div>

            <div class="assistant-form__row">
                <div class="assistant-form__col assistant-form__col---6">
                    <label class="assistant-form__label">@{{$t('all.phone')}}</label>
                    <input class="assistant-input" type="tel" name="phone" value="@{{ employee.employee.phone }}" required>
                </div>
                <div class="assistant-form__col assistant-form__col---6">
                    <label class="assistant-form__label">@{{$t('all.email')}}</label>
                    <input class="assistant-input" type="email" name="email" required value="@{{ employee.employee.email }}" required>
                </div>
            </div>

            <div class="assistant-form__row __margin col--6">
                <div class="assistant-form__col assistant-form__col--12">
                    <label class="assistant-form__label">@{{$t('all.gender')}}</label>
                    <select name="gender" class="assistant-input assistant-input--select">
                        <option value="male" selected="@{{ employee.employee.gender === 'male' ? 'true' : 'false' }}">@{{$t('all.male')}}</option>
                        <option value="female" selected="@{{ employee.employee.gender === 'female' ? 'true' : 'false' }}">@{{$t('all.female')}}</option>
                    </select>
                </div>
            </div>

            <div class="assistant-form__row col--6">
                <div class="assistant-form__col assistant-form__col--12">
                    <label class="assistant-form__label">@{{$t('all.birthday')}}</label>
                    <input class="assistant-input input-date" type="text" name="birthday" required value="@{{ employee.employee.birthday }}">
                </div>
            </div>

            <div class="assistant-form__row __margin col--6">
                <div class="assistant-form__col assistant-form__col--12">
                    <label class="assistant-form__label">@{{$t('all.group')}}</label>
                    <select name="group" class="assistant-input assistant-input--select">
                        <option value="admin" selected="@{{ employee.employee.group === 'admin' ? 'true' : 'false' }}">@{{$t('all.admin')}}</option>
                        <option value="employee" selected="@{{ employee.employee.group === 'employee' ? 'true' : 'false' }}">@{{$t('all.employee')}}</option>
                    </select>
                </div>
            </div>

            <div class="assistant-form__row __margin col--6">
                <div class="assistant-form__col assistant-form__col--12">
                    <label class="assistant-form__label">@{{$t('all.status')}}</label>
                    <select name="status" class="assistant-input assistant-input--select" required>
                        <option value="active" @{{ employee.employee.status == 'active' ? 'selected' : '' }}>Active</option>
                        <option value="not active" @{{ employee.employee.status != 'active' ? 'selected' : '' }}>Not active</option>
                    </select>
                </div>
            </div>

            <div class="assistant-form__row __margin col--6" style="position: absolute; height: 380px; left: calc(50% + 10px); margin: -4px 0 0 0; width: calc(50% - 40px);">
                <div class="assistant-form__col assistant-form__col--12">
                    <label class="assistant-form__label">@{{$t('all.services')}}</label>
                    <ul v-show="employee.categories !== undefined && employee.categories.length" class="assistant-create-employee-services">
                        <li v-for="category in employee.categories" v-on:click="showCategory(category.id)">
                            <label class="assistant-form__label">@{{ category.name }}</label>
                            <ul v-show="category.show == true">
                                <li v-for="item in category.items">
                                    <input class="assistant-form__checkbox assistant-input--checkbox" type="checkbox" name="services[]" value="@{{ item.id }}" id="assistant-create-employee-1-id-@{{ category.id }}-@{{ item.id }}" v-bind:checked="employee.employee_services.indexOf('' + item.id) !== -1">
                                    <label class="assistant-form__label" for="assistant-create-employee-1-id-@{{ category.id }}-@{{ item.id }}"></label>
                                    <label>
                                        @{{ item.service_name }}
                                    </label>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="assistant-form__row __margin" style="text-align: left; margin-left: 10px;">
                <div class="assistant-form__col assistant-form__col--4">
                    <button type="submit" class="assistant-upload__btn assistant-btn assistant-btn--red">
                        @{{ $t("step7.save") }}
                    </button>
                </div>
                <div class="assistant-form__col assistant-form__col--4" style="position: absolute; left: 230px;">
                    <button type="button" class="assistant-btn assistant-btn--gray" style="height: 49px" v-on:click="clearEmployee()">
                        @{{ $t('all.cancel') }}
                    </button>
                </div>
            </div>

        </form>
    </div>

</template>

<template id="user-info-template">

            <div class="assistant-form__row">
                <div class="assistant-form__col assistant-form__col--12">
                    <div class="assistant-block assistant-upload no-height-padding no-width-padding" style="height: auto; width: 240px;">
                        <div class="assistant-upload__drop" id="assistantAvatarCropie">
                            <input class="assistant-block__file" id="assistantAvatarCreate" type="file" name="avatar" v-on:change="previewAvatarr($event)">
                            <img class="assistant-upload__image" id="assistantAvatarCreatePreview"/>
                        </div>
                        <button onclick="$('#assistantAvatarCreate').click();" type="button" class="assistant-upload__btn assistant-btn assistant-btn--red custom-upload-button">
                            @{{ $t("step7.upload") }}
                        </button>
                    </div>
                </div>
            </div>

            <div class="assistant-form__row">
                <div class="assistant-form__col assistant-form__col---6">
                    <label class="assistant-form__label">@{{$t('all.first_name')}}</label>
                    <input class="assistant-input" type="text" name="name" required>
                </div>
                <div class="assistant-form__col assistant-form__col---6">
                    <label class="assistant-form__label">@{{$t('all.last_name')}}</label>
                    <input class="assistant-input" type="text" name="last_name" required>
                </div>
            </div>

            <div class="assistant-form__row">
                <div class="assistant-form__col assistant-form__col---6">
                    <label class="assistant-form__label">@{{$t('all.phone')}}</label>
                    <input class="assistant-input" type="tel" name="phone">
                </div>
                <div class="assistant-form__col assistant-form__col---6">
                    <label class="assistant-form__label">@{{$t('all.email')}}</label>
                    <input class="assistant-input" type="email" name="email" required>
                </div>
            </div>

            <div class="assistant-form__row __margin col--6">
                <div class="assistant-form__col assistant-form__col--12">
                    <label class="assistant-form__label">@{{$t('all.gender')}}</label>
                    <select name="gender" class="assistant-input assistant-input--select">
                        <option value="male" selected>@{{$t('all.male')}}</option>
                        <option value="female">@{{$t('all.female')}}</option>
                    </select>
                </div>
            </div>

            <div class="assistant-form__row col--6">
                <div class="assistant-form__col assistant-form__col--12">
                    <label class="assistant-form__label">@{{$t('all.birthday')}}</label>
                    <input class="assistant-input input-date" type="text" name="birthday" required>
                </div>
            </div>

            <div class="assistant-form__row __margin col--6">
                <div class="assistant-form__col assistant-form__col--12">
                    <label class="assistant-form__label">@{{$t('all.group')}}</label>
                    <select name="group" class="assistant-input assistant-input--select">
                        <option value="admin">@{{$t('all.admin')}}</option>
                        <option value="employee">@{{$t('all.employee')}}</option>
                    </select>
                </div>
            </div>

            <div class="assistant-form__row __margin col--6">
                <div class="assistant-form__col assistant-form__col--12">
                    <label class="assistant-form__label">@{{$t('all.status')}}</label>
                    <select name="status" class="assistant-input assistant-input--select" required>
                        <option value="active">Active</option>
                        <option value="not active">Not active</option>
                    </select>
                </div>
            </div>
</template>

<template id="create-employee-template">

    <employees-list-vue></employees-list-vue>

    <a @click.prevent="changeState({{$can_add_employee}})" class="btn btn--plus add-employee-button">
        <i></i>
        @{{$t('all.add')}}
    </a>
    <div class="assistant-block" style="text-align: left" v-show="state === true">

        <div class="assistant-block__label ">@{{ $t("step7.label2") }}</div>

        <confirm-vue :show.sync="showConfirm" :is-confirm.sync="isConfirm">
            <p>@{{$t('all.confirm_question')}}</p>
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

        <form @submit.prevent="trySendForm" id="userInfoForm" method="post" action="/office/employees/store" enctype="multipart/form-data">
            <input type="hidden" name="_token" value="{!! csrf_token() !!}">

            <user-info-vue></user-info-vue>

            <div class="assistant-form__row __margin col--6" style="position: absolute; height: 380px; left: calc(50% + 10px); margin: -4px 0 0 0; width: calc(50% - 40px);">
                <div class="assistant-form__col assistant-form__col--12">
                    <label class="assistant-form__label">@{{$t('all.services')}}</label>
                    <ul v-show="categories !== undefined && categories.length" id="assistant-create-employee-services">
                        <li v-for="category in categories" v-on:click="showCategory(category.id)">
                            <label class="assistant-form__label">@{{ category.name }}</label>
                            <ul v-show="category.show == true">
                                <li v-for="item in category.items">
                                    <input class="assistant-form__checkbox assistant-input--checkbox" type="checkbox" name="services[]" value="@{{ item.id }}" id="assistant-create-employee-id-@{{ category.id }}-@{{ item.id }}">
                                    <label class="assistant-form__label" for="assistant-create-employee-id-@{{ category.id }}-@{{ item.id }}"></label>
                                    <label>
                                        @{{ item.service_name }}
                                    </label>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="assistant-form__row __margin margin-10">
                <div class="assistant-form__col assistant-form__col--6">
                    <input type="checkbox" class="assistant-form__checkbox assistant-input--checkbox" @change="changeStatus($event)" id="be-employee-checkbox" @if($is_employee) checked="checked" @endif>
                    <label for="be-employee-checkbox" class="assistant-form__label"></label>
                    <label>@{{$t('all.show_in_calendar')}}</label>
                </div>
            </div>
            <div class="assistant-form__row __margin margin-10">
                <div class="assistant-form__col assistant-form__col--4">
                    <button type="submit" class="assistant-upload__btn assistant-btn assistant-btn--red">
                        @{{ $t("step7.save") }}
                    </button>
                </div>
            </div>
        </form>
    </div>
</template>

<div id="sitePreloader"></div>


<script src="{{ asset('scripts/libs/socket.io-1.3.4.js') }}"></script>
<script src="{{ asset('scripts/libs/jquery.js') }}"></script>
<script src="{{ asset('scripts/libs/jquery-ui.min.js') }}"></script>
<script src="{{ asset('scripts/libs/jquery.formstyler.min.js') }}"></script>
<script src="{{ asset('scripts/libs/jquery.sticky.js') }}"></script>
<script src="{{ asset('scripts/libs/slick.js') }}"></script>
<script src="{{ asset('scripts/libs/jquery.validate.min.js') }}"></script>
<script src="{{ asset('scripts/libs/remodal.js') }}"></script>
<script src="{{ asset('scripts/libs/jquery-ui-timepicker-addon.js') }}"></script>
<script src="{{ asset('scripts/libs/spectrum.js') }}"></script>
<script src="{{ asset('scripts/libs/d3.min.js') }}"></script>
<script src="{{ asset('scripts/libs/c3.min.js') }}"></script>
<script src="{{ asset('scripts/libs/jquery.tokeninput.js') }}"></script>
<script src="{{ asset('scripts/libs/jquery.tablesorter.js') }}"></script>
<script src="//cdn.ckeditor.com/4.5.9/full/ckeditor.js"></script>
<script src="{{ asset('scripts/admin_ajax.js') }}"></script>
<script src="{{ asset('scripts/admin.js') }}"></script>
<script>
    $(document).on("change", "#assistantAvatarCreate", function (e) {

        if (e.target.files !== undefined && e.target.files[0]) {
            let reader = new FileReader();
            reader.onload = function (e) {
                $(document).find("#assistantAvatarCreatePreview").attr('src', e.target.result);
            };
            reader.readAsDataURL(e.target.files[0]);
        }

    });
</script>
</body>
</html>
