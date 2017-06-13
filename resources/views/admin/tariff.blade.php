@extends('layouts.layoutAdmin')
@section('content')
	<section class="admin-settings director-main">
		<h1 class="director-content__heading heading heading__h1">{{trans('tariff.tariff_info')}}</h1>

		<div class="director-content">

			<div class="remodal remodal--alert" id="freezeAlertModal">
				<p>{{trans('tariff.message_freeze_tariff')}}</p>
				<div>
					<button data-remodal-action="close" class="btn btn--red">{{trans('common.ok')}}</button>
				</div>
			</div>

			<tariff-vue></tariff-vue>

		</div>

	</section>

	<template id="tariff-temlate">

		<confirm-vue
				:is-confirm.sync="isConfirmChangeTariff"
				:show.sync="showConfirmChangeTariff">
			<p>{{trans('tariff.message_confirm')}}</p>
		</confirm-vue>

		<alert
				:show.sync="showDangerTarif"
				:duration="5000"
				type="danger"
				width="400px"
				placement="top-right"
				dismissable
		>
			<span class="icon-ok-circled alert-icon-float-left"></span>
			<strong>{{trans('tariff.message_change_tariff_error')}}</strong>
			<p>@{{ dangerReason }}</p>
		</alert>
		<div class="block">

			<ul class="block__nav">
				<li data-tab="tab-1" class="block__item is-active">{{trans('tariff.current_tariff')}}</li>
				@if($tariff_type === 'free')
					<li data-tab="tab-2" class="block__item">{{trans('tariff.change_tariff')}}</li>
				@endif
				@if($tariff_type === 'paid')
					<li data-tab="tab-3" class="block__item">{{trans('tariff.freeze_tariff')}}</li>
				@endif

			</ul>

			<div data-tab-id="tab-1" class="tab-content is-active">
				<div class="tarif">
					@if($tariff_type === 'free')
						<h2 class="tarif__heading">{{trans('tariff.free')}}</h2>
					@else
						<h2 class="tarif__heading">{{trans('tariff.paid')}}</h2>
					@endif
					<ul class="tarif__list">
						<li class="tarif__item"><i></i>{{trans('tariff.calendar')}}</li>
						<li class="tarif__item"><i></i>{{trans('tariff.customer_management')}}</li>
						<li class="tarif__item"><i></i>{{trans('tariff.email_reminder')}}</li>
						<li class="tarif__item"><i></i>{{trans('tariff.booking_website')}}</li>
						<li class="tarif__item"><i></i>{{trans('tariff.services_info')}}</li>
						<li class="tarif__item"><i></i>{{trans('tariff.dashboard_info')}}</li>
						<li class="tarif__item"><i></i>{{trans('tariff.newsletter_info')}}
						</li>
						@if($tariff_type === 'free')
							<li class="tarif__item"><i></i>{{trans('tariff.employee_info', ['count' => 2])}}</li>
						@else
							<li class="tarif__item"><i></i>{{trans('tariff.employee_info', ['count' => 'Unlimited'])}}
							</li>
						@endif

					</ul>
				</div>

				<div class="tarif-info">
					<table class="table tarif-info__table none_hover">
						@if($tariff_type === 'paid')

							<tr>
								<td><h2>{{$tariff_price}} EUR</h2>
										<span style="font-weight: 300; font-size: 12px;">(zzgl. 19% MwSt)</span>
								</td>
							</tr>

							<tr>
								<td>{{trans('tariff.registered_from')}}:</td>
								<td>{{date('Y-m-d', strtotime($admin->created_at))}}</td>
							</tr>

							<tr>
								<td>{{trans('tariff.paid_from')}}:</td>
								<td>{{$paid_from}}</td>
							</tr>
						@else
							<tr>
								<td>{{trans('tariff.free')}}</td>
							</tr>
						@endif
					</table>
				</div>

				@if($tariff_type === 'free')
					<a
							@click.stop.prevent="step2"
							class="admin-settings__btn btn btn--red f-right"
							href="javascript:void(0);">{{trans('tariff.change_tariff')}}</a>
				@endif
			</div>

			@if($tariff_type === 'free')
				<div data-tab-id="tab-2" class="tab-content">

					<div class="change-tarif">

						<p v-if="showAgree"
						   class="admin-settings__text">{{trans('tariff.message_change_tariff_head')}}</p>

						<div v-if="!showAgree" class="change-tarif__tarif">

							<div class="tarif">
								<h2 class="tarif__heading">{{trans('tariff.free')}}</h2>

								<ul class="tarif__list">
									<li class="tarif__item"><i></i>{{trans('tariff.calendar')}}</li>
									<li class="tarif__item"><i></i>{{trans('tariff.customer_management')}}</li>
									<li class="tarif__item"><i></i>{{trans('tariff.email_reminder')}}</li>
									<li class="tarif__item"><i></i>{{trans('tariff.booking_website')}}</li>
									<li class="tarif__item"><i></i>{{trans('tariff.services_info')}}</li>
									<li class="tarif__item"><i></i>{{trans('tariff.dashboard_info')}}</li>
									<li class="tarif__item"><i></i>{{trans('tariff.newsletter_info')}}</li>
									<li class="tarif__item"><i></i>{{trans('tariff.employee_info', ['count' => 2])}}
									</li>
								</ul>

							</div>
						</div>
						<div class="change-tarif__tarif">
							<div class="tarif">
								<h2 class="tarif__heading">{{trans('tariff.paid')}}</h2>

								<ul class="tarif__list">
									<li class="tarif__item"><i></i>{{trans('tariff.calendar')}}</li>
									<li class="tarif__item"><i></i>{{trans('tariff.customer_management')}}</li>
									<li class="tarif__item"><i></i>{{trans('tariff.email_reminder')}}</li>
									<li class="tarif__item"><i></i>{{trans('tariff.booking_website')}}</li>
									<li class="tarif__item"><i></i>{{trans('tariff.services_info')}}</li>
									<li class="tarif__item"><i></i>{{trans('tariff.dashboard_info')}}</li>
									<li class="tarif__item"><i></i>{{trans('tariff.newsletter_info')}}</li>
									<li class="tarif__item">
										<i></i>{{trans('tariff.employee_info', ['count' => 'Unlimited'])}}</li>
								</ul>
								<div class="tarif__price">{{trans('tariff.price')}}:
									{{$director_tariff}} € <span style="font-weight: 300; font-size: 12px;">(zzgl. 19% MwSt)</span>
								</div>
							</div>
						</div>

					</div>
					<div v-if="showAgree" class="tarif-block">
						<input @change="isDisabled = !isDisabled" v-model="isAgreeChangeTariff" type="checkbox" class="
					              tarif-block__checkbox">
						<div class="tarif-block__desc">
							<h3 class="tarif-block__heading">{{trans('tariff.message_change_tariff_footer')}}</h3>
							<p class="tarif-block__text">{{trans('tariff.message_change_tariff_footer_2')}}</p>
						</div>
					</div>
					<a
							@click.stop.prevent="setNewTariff"
							href="javascript:void(0);"
							class="admin-settings__btn btn btn--red f-right"
							:class="{'is-disabled': isDisabled}"
							:disabled="{'is-disabled': isDisabled}">{{trans('common.change')}}</a>

				</div>
			@endif

			<div data-tab-id="tab-3" class="tab-content">

				<div class="tarif-step1">{!! trans('tariff.message_freeze_tariff_1') !!}</div>

				<div class="tarif-step2">
					<table class="table table--striped">

						<tr>
							<td>Vertragsinhaber</td>
							<td>{{$admin->firstname . ' ' . $admin->lastname}}</td>
						</tr>

						<tr>
							<td>Tarif</td>
							<td>{{trans('tariff.paid')}}</td>
						</tr>

						@if($tariff_type === 'paid')
							<tr>
								<td>Vertrag aktiv seit</td>
								<td>{{$paid_from}}</td>
							</tr>
						@endif

					</table>
					<select class="tarif-step2__select" name="">
						<option value="">{{trans('tariff.technical_problem')}}</option>
						<option value="">{{trans('tariff.tariff_problem')}}</option>
						<option value="">{{trans('common.billing')}}</option>
						<option value="">{{trans('tariff.no_information')}}</option>
					</select>
				</div>

				<a @click.prevent.stop="freeze" href="javascript:void(0);"
				   class="admin-settings__btn btn btn--red f-right">Jetzt ändern</a>
			</div>

		</div>
	</template>
@stop