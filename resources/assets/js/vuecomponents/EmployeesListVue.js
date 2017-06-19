import Vue from 'vue'
import ConfirmVue from './ConfirmVue.vue'
import * as ajax from '../ajax.js'


let EmployeesListVue = Vue.component('employees-list-vue', {
    template: '#employees-list-template',

    components: {ConfirmVue},

    data() {
        return {
            showAlertSuccess: true,
            showConfirm: false,
            isConfirm: false,
            employees: null,
            employee: null,
            isConfirmSubmit: false,
            formId: 0
        }
    },

    created() {
        setTimeout(() => {
            this.showAlertSuccess = false;
        }, 3000);

        if (window.location.pathname == "/office/start_assistant") {

            $.ajax({
                type: "GET",
                url: "/office/start_assistant/get_employees_list",
                dataType: 'JSON'
            }).done(function (response) {

                this.employees = response.data;

            }.bind(this));

            setInterval(function () {

                $.ajax({
                    type: "GET",
                    url: "/office/start_assistant/get_employees_list",
                    dataType: 'JSON'
                }).done(function (response) {

                    this.employees = response.data;

                }.bind(this));

            }.bind(this), 5000);

        }
    },

    methods: {
        deleteEmployee(link, is_ajax = false, row = 0) {
            let text = '';
            let isConfirm;
            let locale = this.$root.locale;

            switch (locale) {
                case 'ru':
                    text = 'Вы действительно желаете удалить сотрудника? В связи с этим будут удалены все  заказы. вы согласны с этим?';
                    break;
                case 'de':
                    text = 'Sind Sie sicher, dass Sie einen Mitarbeiter zu löschen? In diesem Zusammenhang werden alle Aufträge gelöscht. gehen Sie mit dem zustimmen?';
                    break;
                case 'en':
                    text = 'Are you sure you want to delete an employee? In this regard, all orders will be deleted. do you agree with that?';
                    break;
            }

            isConfirm = confirm(text);

            if (isConfirm) {

                if (is_ajax === true) {

                    $.get(link).done(function () {
                        $('tr[data-row="' + row + '"]').fadeOut("fast");
                    });

                } else {

                    location.href = link;

                }
            }
        },
        addEmployee(yes = 0, blank = false) {
            if (+yes) {
                if (blank) {

                    window.open('/office/employees/create', '_blank');

                } else {

                    location.href = '/office/employees/create';

                }
            } else {
                this.showConfirm = true;
            }
        },
        trySendForm(id) {
            let form = $('#userInfoFormEdit_' + id);
            form.validate();
            let isValid = form.valid();
            if (isValid) {
                this.isConfirmSubmit = true;
                this.formId = id;
            } else {
                this.isConfirmSubmit = false;
            }
        },
        submitCreateEmpl() {
            let $form = $("form#userInfoFormEdit_" + this.formId),
                formData = new FormData($form[0]);

            if($form.html() !== undefined && $form.html().length) {

                $.ajax({
                    url: $form.attr("action"),
                    type: $form.attr("method"),
                    data: formData,
                    contentType: false,
                    processData: false
                })
                    .done(function (response) {

                        if (response.status === 'success') {

                            this.employee = null;

                        }

                    }.bind(this));

            }

            this.isConfirmSubmit = false;

        },
        editEmployee(id) {

            this.employee = null;

          $.get('/office/employees/info/' + id)
              .done(function(response) {

                  this.employee = response.data;

                  $('[data-upload]').attr('src', '');

              }.bind(this));

        },
        previewAvatar(e, id) {
            if (e.target.files !== undefined && e.target.files[0]) {
                let reader = new FileReader();
                reader.onload = function (e) {
                    $("#assistantAvatarPreviewEdit_" + id).attr('src', e.target.result);
                };
                reader.readAsDataURL(e.target.files[0]);
            }
        },
        showCategory(id) {

            for(let iterator in this.employee.categories) {

                if(this.employee.categories[iterator].id !== id) {

                    this.employee.categories[iterator].show = false;

                } else {

                    if(this.employee.categories[iterator].show === false) {

                        this.employee.categories[iterator].show = true;

                    } else {

                        this.employee.categories[iterator].show = false;

                    }

                }

            }

        },
        clearEmployee() {

            this.employee = null;

        }
    },
    watch: {
        'isConfirm': function () {
            if (this.isConfirm) {
                window.open('/office/tariff', '_blank');
            }
        },
        'isConfirmSubmit': function () {
            if (this.isConfirmSubmit) {
                this.submitCreateEmpl();
            }
        }
    }

});

export default EmployeesListVue;