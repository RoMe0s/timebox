/**
 * Created by rome0s on 6/19/17.
 */
import Vue from 'vue'

let EmployeeInfoNewVue = Vue.component('employee-info-new-vue', {

    template: "#employee-info-new-template",

    data() {
        return {

            categories: [],
            userInfo: {
                avatar: {

                },
                employee: {

                },

            },
            edit: false

        }
    },

    props: ["edit"],

    methods: {

        previewAvatar(e) {

            let $this = e.target;

            if (e.target.files !== undefined && e.target.files[0]) {
                let reader = new FileReader();
                reader.onload = function (e) {
                    $($this).closest(".avatar_zone").find("img").attr('src', e.target.result);
                };
                reader.readAsDataURL(e.target.files[0]);
            }

        },

        clickAvatar(e) {

            $(e.target).closest('div').find('[type="file"]').first().click();

        },

        showCategory(id) {

            for(let iterator in this.categories) {

                if(this.categories[iterator].id !== id) {

                    this.categories[iterator].show = false;

                } else {

                    if(this.categories[iterator].show === false) {

                        this.categories[iterator].show = true;

                    } else {

                        this.categories[iterator].show = false;

                    }

                }

            }

        },

        loadUserData() {

            $.get(window.location.href)
                .done(function(response) {
                    this.userInfo = response.data;
                    this.categories = response.data.categories;
                    this.edit = true;
                }.bind(this));

        },

        openUserInfoModal() {
            this.$broadcast('openUserInfoModal');
        },
    },
    events: {

        'getUserinfo': function () {

            this.loadUserData();

        }

    }

});

export default EmployeeInfoNewVue;