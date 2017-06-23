@extends('layouts.layoutDirector')
@section('content')
    <section class="director-benachrichtigung director-main">

        <code-index-vue module="{{$module}}"></code-index-vue>

        <template id="code-index-template">
            <h1 class="director-content__heading heading heading__h1">
                {{trans('common.codes')}}
                <a class="director-tarife__btn btn btn--plus" href="/backend/{{$module}}/create"><i></i>
                    {{trans('common.add')}}
                </a>
            </h1>
            <div class="director-content" style="background-color: white">
                <table class="table table--striped">
                    <thead>
                    <tr>
                        <th>{{trans('common.nr')}}</th>
                        <th>{{trans('common.code')}}</th>
                        <th>{{trans('common.category')}}</th>
                        <th>{{trans('common.type')}}</th>
                        <th>{{trans('common.calculation')}}</th>
                        <th>{{trans('common.value')}}</th>
                        <th>{{trans('common.interval')}}</th>
                        <th>{{trans('common.expired_at')}}</th>
                        <th></th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="item in list">
                        <td>
                            @{{ item.id }}
                        </td>
                        <td>
                            @{{ item.code }}
                        </td>
                        <td>
                            @{{ item.category }}
                        </td>
                        <td>
                            @{{ item.type }}
                        </td>
                        <td>
                            @{{ item.count }}
                        </td>
                        <td>
                            @{{ item.value }}
                        </td>
                        <td>
                            @{{ item.interval }}
                        </td>
                        <td>
                            @{{ item.expired_at }}
                        </td>
                        <td>
                            <a href="/backend/{{$module}}/@{{ item.id }}/edit">
                                <i class="i">
                                    {!! file_get_contents(asset('images/svg/pencil.svg')) !!}
                                </i>
                            </a>
                        </td>
                        <td>
                            <a v-on:click="deleteRow(item.id, $event)">
                                <i class="i">
                                    {!! file_get_contents(asset('images/svg/rubbish-bin.svg')) !!}
                                </i>
                            </a>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </template>

    </section>
@stop