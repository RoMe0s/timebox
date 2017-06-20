<template id="employee-info-new-template">

    <editing-modal-vue v-if="edit === true"></editing-modal-vue>

    <div class="assistant-form__row">
        <div class="assistant-form__col assistant-form__col--12 margin-10" style="position: relative">
            <div class="assistant-upload__drop avatar_zone">
                <input class="assistant-block__file" type="file" name="avatar" v-on:change="previewAvatar($event)">
                <img class="assistant-upload__image" v-bind:src="userInfo.avatar.path"/>
            </div>
            <button v-on:click="clickAvatar($event)" type="button" class="assistant-upload__btn assistant-btn assistant-btn--red custom-upload-button">
                {!! trans('common.select photo') !!}
            </button>
        </div>
    </div>

    <a v-if="edit === true" href="javascript:void(0);" class="btn btn--red margin-10" @click="openUserInfoModal">{{trans('common.change_password')}}</a>

    <div class="assistant-form__row">
        <div class="assistant-form__col assistant-form__col---6">
            <label class="assistant-form__label">
                {!! trans('common.first_name') !!}
            </label>
            <input class="assistant-input" type="text" name="name" required v-bind:value="userInfo.employee.name">
        </div>
        <div class="assistant-form__col assistant-form__col---6">
            <label class="assistant-form__label">
                {!! trans('common.last_name') !!}
            </label>
            <input class="assistant-input" type="text" name="last_name" required v-bind:value="userInfo.employee.last_name">
        </div>
    </div>

    <div class="assistant-form__row">
        <div class="assistant-form__col assistant-form__col---6">
            <label class="assistant-form__label">
                {!! trans('common.phone') !!}
            </label>
            <input class="assistant-input" type="tel" name="phone" v-bind:value="userInfo.employee.phone" required maxlength="15" minlength="5">
        </div>
        <div class="assistant-form__col assistant-form__col---6">
            <label class="assistant-form__label">
                {!! trans('common.email') !!}
            </label>
            <input class="assistant-input" type="email" name="email" required v-bind:value="userInfo.employee.email">
        </div>
    </div>

    <div class="assistant-form__row __margin col--6">
        <div class="assistant-form__col assistant-form__col--12">
            <label class="assistant-form__label">
                {!! trans('common.gender') !!}
            </label>
            <select name="gender" class="assistant-input assistant-input--select">
                <option value="male" v-bind:selected="userInfo.employee.gender === 'male'">
                    {!! trans('common.male') !!}
                </option>
                <option value="female" v-bind:selected="userInfo.employee.gender === 'female'">
                    {!! trans('common.female') !!}
                </option>
            </select>
        </div>
    </div>

    <div class="assistant-form__row col--6">
        <div class="assistant-form__col assistant-form__col--12">
            <label class="assistant-form__label">
                {!! trans('common.birthday') !!}
            </label>
            <input class="assistant-input input-date" type="text" name="birthday" required v-bind:value="userInfo.employee.birthday">
        </div>
    </div>

    <div class="assistant-form__row __margin col--6" style="position: absolute; height: 200px; left: calc(50% + 10px); margin: -4px 0 0 0; width: calc(50% - 40px);">
        <div class="assistant-form__col assistant-form__col--12">
            <label class="assistant-form__label">
                {!! trans('common.services') !!}
            </label>
            <ul v-show="categories !== undefined && categories.length" id="assistant-create-employee-services" style="height: 200px">
                <li v-for="category in categories" v-on:click="showCategory(category.id)">
                    <label class="assistant-form__label">@{{ category.name }}</label>
                    <ul v-show="category.show == true">
                        <li v-for="item in category.items">
                            <input class="assistant-form__checkbox assistant-input--checkbox" type="checkbox" name="services[]" value="@{{ item.id }}" id="assistant-create-employee-id-@{{ category.id }}-@{{ item.id }}" v-bind:checked="userInfo.employee_services.indexOf('' + item.id) !== -1">
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
</template>