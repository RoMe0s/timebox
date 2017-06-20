@extends('layouts.layoutAdmin')
@section('content')
	<section class="director-benachrichtigung director-main">

		<employees-index></employees-index>

		@include('components.employees.index')

	</section>
@stop