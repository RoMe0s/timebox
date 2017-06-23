@extends('layouts.layoutDirector')
@section('content')
    <section class="director-benachrichtigung director-main">

        <h1 class="director-content__heading heading heading__h1">
            {!! trans('common.code creating') !!}
        </h1>

        <div class="director-content">

            <code-edit-vue id="0" module="{{$module}}"></code-edit-vue>

        </div>

    </section>

    <template id="code-edit-template">

        <div class="assistant-block assistant" style="padding-top: 20px">

            <form enctype="multipart/form-data" v-on:submit.prevent="trySendForm($event)" method="POST" action="/backend/code">

                <code-info-vue :id="id" :module="module"></code-info-vue>

                <div class="assistant-form__row" style="margin-top: 100px">
                    <div class="assistant-form__col assistant-form__col--6">
                        <a v-on:click.prevent="trySendForm($event, true)" class="assistant-btn assistant-btn--red">
                            {{trans('common.save')}}
                        </a>
                    </div>
                    <div class="assistant-form__col assistant-form__col--6">
                        <a type="button" class="assistant-btn assistant-btn--gray" href="/backend/code">
                            {{trans('common.cancel')}}
                        </a>
                    </div>
                </div>

            </form>

        </div>

    </template>

    @include('components.code.partials.info')
@endsection