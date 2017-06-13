@extends('layouts.layoutDirector')
@section('content')
    <section class="director-tarife director-main">

        <div class="director-content">
	        <form action="/backend/tariff/update" method="post">
		        {{csrf_field()}}
		        <label for="tariff">Tariff</label>
		        <input type="number" step="0.01"
		               id="tariff"
		               value="{{$director_tariff->tariff}}"
		               name="tariff">
		        <label for="employee_tariff">Employee tariff</label>
		        <input type="number" step="0.01"
		               id="employee_tariff"
		               value="{{$director_tariff->tariff_per_employee}}"
		               name="tariff_per_employee">
		        <input type="submit" value="Submit">
	        </form>
        </div>
    </section>
@stop