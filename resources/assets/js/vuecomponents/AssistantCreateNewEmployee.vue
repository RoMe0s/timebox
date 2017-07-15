<template>
    <section class="director-mitarbeiter director-main">

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
        <h1 class="director-content__heading heading heading__h1">{{trans_choice('common.employees', 2)}}</h1>
        <form @submit.prevent="trySendForm" id="userInfoForm" method="post" action="store" enctype="multipart/form-data">
            <input type="hidden" name="_token" value="{!! csrf_token() !!}">
            <div class="director-content" style="text-align: left">

                <user-info-vue></user-info-vue>

                <section class="director-dienstleister2__main director-mitarbeiter__main">

                    <table class="table table--striped">

                        <tr>
                            <th>{{trans('common.nr')}}</th>
                            <th>{{trans_choice('common.services', 1)}}</th>
                            <th>{{trans('common.status')}}</th>
                        </tr>
                        <?php $i = 1?>
                        @foreach($services as $service)
                        <tr>
                            <td>{{ $i }}</td>
                            <td>{{ $service->service_name }}</td>
                            <td><input class="checkbox" type="checkbox" name="services[]"
                                       value="{{ $service->id }}"></td>
                        </tr>
                        <?php $i++?>
                        @endforeach
                    </table>

                    <div class="director-dienstleister2__bottom">
                        <button type="submit" class="btn btn--red">{{trans('common.create')}}</button>
                    </div>
                </section>
            </div>
        </form>
    </section>
</template>

<script>
    import Vue from 'vue'
    import * as ajax from '../ajax.js'
    import ConfirmVue from './ConfirmVue.vue'
    import Alert from './vue-strap/src/Alert.vue'
    import UserInfoVue from './UserInfoVue.js'

    export default {

        components: {
            ConfirmVue,
            Alert,
            UserInfoVue
        },
        data: () => {
            return {
                showConfirm: false,
                isConfirm: false,
                showCreateEmplAlert: false,
            }
        },
        ready: () => {



        },

        methods: {
            trySendForm() {
                let form = $('#userInfoForm');
                form.validate();
                let isValid = form.valid();
                if (isValid) {
                    this.showConfirm = true;
                } else {
                    this.showConfirm = false;
                }
            },
            submitCreateEmpl() {
                let data = ajax.getFormData($('#userInfoForm'));
                let path = `/${ajax.pathWho}/employees/store`;
                ajax.sendAjax(data, path)
                    .done((res) => {
                        if (res) {
                            this.isConfirm = false;
                            location.href = '/office/employees';
                        } else {
                            this.isConfirm = false;
                            this.showCreateEmplAlert = true;
                        }
                    })
                    .fail((err)=> {
                        this.isConfirm = false;
                        throw new Error(err);
                    });
            },
        },

        watch: {
            'isConfirm': function () {
                if (this.isConfirm == true) {
                    this.submitCreateEmpl();
                }
            }
        }

    }
</script>