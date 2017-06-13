import Vue from 'vue'
import * as ajax from '../ajax.js'
import ConfirmVue from './ConfirmVue.vue'
import Alert from './vue-strap/src/Alert.vue'

let CreateEmployeeVue = Vue.component('create-employee-vue', {
	template: '#create-employee-template',

  components: {ConfirmVue, Alert},

  data() {
    return {
      showConfirm: false,
      isConfirm: false,
      showCreateEmplAlert: false,
    }
  },

  ready() {

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
});

export default CreateEmployeeVue;