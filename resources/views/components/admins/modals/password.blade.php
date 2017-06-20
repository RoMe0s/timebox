<template id="editing-modal-template">
    <div class="remodal kalendar-form" id="userInfoModal">
        <button data-remodal-action="close" class="remodal-close"><i></i></button>

        <div class="block">
            <ul class="block__nav">
                <li data-tab="tab-2" class="block__item is-active">{{trans('common.change_password')}}</li>
            </ul>

            <div data-tab-id="tab-2" class="tab-content is-active">
                <form class="kalendar-form__form" id="passwordForm" action="" method="POST">
                    <fieldset class="kalendar-form__fieldset">
                        <div>
                            <input class="kalendar-form__password kalendar-input"
                                   type="password" name="old_password" placeholder="{{trans('common.current_password')}}">
                        </div>
                        <div>
                            <input
                                    class="kalendar-form__password kalendar-input newPass1"
                                    type="password" name="new_password-1" placeholder="{{trans('common.new_password')}}">
                        </div>
                        <div>
                            <input
                                    class="kalendar-form__password kalendar-input"
                                    type="password" name="new_password-2" placeholder="{{trans('common.new_password')}}">
                        </div>
                    </fieldset>

                    <fieldset class="kalendar-form__fieldset">
                        <input class="kalendar-form__submit btn btn--red" type="submit" value="{{trans('common.edit')}}">
                    </fieldset>
                </form>
            </div>
        </div>
    </div>
    </div>
</template>