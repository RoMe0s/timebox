<template id="code-info-template">
    <div class="assistant-form__row">
        <div class="assistant-form__col assistant-form__col--12">
            <label class="assistant-form__label">
                {!! trans('common.code') !!}
            </label>
            <input class="assistant-input" type="text" name="code" required v-model="code">
        </div>
        <div class="assistant-form__col assistant-form__col--6">
            <a v-on:click="generateCode($event)" class="assistant-btn assistant-btn--red" style="margin-top: 25px">
                {{trans('common.generate')}}
            </a>
        </div>
    </div>
    <div class="assistant-form__row">
        <div class="assistant-form__col assistant-form__col--12">
            <label class="assistant-form__label">
                {!! trans('common.category') !!}
            </label>
            <select name="category" class="assistant-input assistant-input--select" required v-model="category">
                <option v-for="(index, category) in categories" value="@{{ index }}" :selected="info.category == index">
                    @{{ category }}
                </option>
            </select>
        </div>
    </div>
    <div class="assistant-form__row">
        <div class="assistant-form__col assistant-form__col--12">
            <label class="assistant-form__label">
                {!! trans('common.type') !!}
            </label>
            <select name="type" class="assistant-input assistant-input--select" required v-model="type">
                <option v-for="(index, type) in types" value="@{{ index }}" :selected="info.type == index">
                    @{{ type }}
                </option>
            </select>
        </div>
    </div>
    <div class="assistant-form__row" v-show="show_value === true">
        <div class="assistant-form__col assistant-form__col--12" v-bind:style="show_count === true ? 'margin-right: 10px; width: calc(70% - 10px);' : ''">
            <label class="assistant-form__label">
                @{{ value_label }}
            </label>
            <input class="assistant-input" type="text" v-bind:name="show_value === true ? 'value' : false" required :value="info.value">
        </div>
        <div class="assistant-form__col assistant-form__col-4" v-bind:style="show_count === true ? 'width: 30%; display: block;' : 'display: none;'">
            <label class="assistant-form__label">
                {{trans('common.calculation')}}
            </label>
            <select v-bind:name="show_value === true ? 'count' : false" class="assistant-input assistant-input--select" v-bind:required="show_count === true" v-model="selected_count">
                <option v-for="(index, count_single) in showing_count" value="@{{ index }}" :selected="info.count == index">
                    @{{ count_single }}
                </option>
            </select>
        </div>
    </div>
    <div class="assistant-form__row" v-show="show_period === true">
        <div class="assistant-form__col assistant-form__col--12">
            <label class="assistant-form__label">
                {{trans('common.period')}}
            </label>
            <select name="period" class="assistant-input assistant-input--select" :required="show_individual_calendar === false ? true : false" v-model="period">
                <option value="1" v-bind:selected="period == 1 ? true: false">
                    1 {{trans('common.month')}}
                </option>
                <option value="3" v-bind:selected="period == 3 ? true: false">
                    3 {{trans('common.month')}}
                </option>
                <option value="6" v-bind:selected="period == 6 ? true: false">
                    6 {{trans('common.month')}}
                </option>
                <option value="12" v-bind:selected="period == 12 ? true: false">
                    {{trans('common.year')}}
                </option>
                <option value="0" v-bind:selected="period == 0 ? true: false">
                    {{trans('common.individual')}}
                </option>
            </select>
        </div>
    </div>
    <div class="assistant-form__row" v-show="show_individual_calendar === true && show_period === true">
        <div class="assistant-form__col assistant-form__col--12" style="width: calc(50% - 5px); margin-right: 5px;">
            <label class="assistant-form__label">
                {{trans('common.from')}}
            </label>
            <input class="assistant-input input-date" type="text" :name="show_individual_calendar === true ? 'from' : false" v-bind:required="show_individual_calendar" v-bind:value="info.from">
        </div>
        <div class="assistant-form__col assistant-form__col--12" style="width: calc(50% - 5px); margin-left: 5px;">
            <label class="assistant-form__label">
                {{trans('common.to')}}
            </label>
            <input class="assistant-input input-date" type="text" :name="show_individual_calendar === true ? 'to' : false" v-bind:required="show_individual_calendar" v-bind:value="info.to">
        </div>
    </div>
    <div class="assistant-form__row">
        <div class="assistant-form__col assistant-form__col--12">
            <label class="assistant-form__label">
                {!! trans('common.expired_at') !!}
            </label>
            <input class="assistant-input input-date" type="text" name="expired_at" required :value="info.expired_at">
        </div>
    </div>
</template>