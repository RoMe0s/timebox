<style>
	.wrap {
		width: 700px;
		margin: 0 auto;
		padding: 0;
	}

	.document {
		padding: 30px;
	}

	p {
		font-size: 14px;
	}

	header {
		box-sizing: border-box;
		margin-bottom: 25px;
		width: 100%;
	}

	header h3 {
		line-height: 50px;
		padding: 0;
		margin: 0;
	}

	header p {
		padding: 0;
		margin: 0;
	}

	table {
		width: 100%;
	}

	.left-sm {
		width: 40%;
	}

	.logo {
		width: 200px;
	}

	.bold {
		font-weight: bold;
	}

	.info-item p {
		margin: 0;
	}

	.text {
		margin-bottom: 50px;
	}

	.address p {
		margin: 0 0 2px 0;
	}

	.data {
		border-spacing: 0 10px;
	}

	.left-lg {
		width: 65%;
		font-weight: bold;
		vertical-align: bottom;
	}

	.link {
		color: #000;
		font-weight: bold;
		text-decoration: none;
	}

	footer {
		margin-top: 50px;
	}

	.clearfix:after {
		content: "";
		display: table;
		clear: both;
	}
</style>

<div class="wrap">
	<div class="document">
		<table>
			<tr>
				<td><h3>SEPA-Lastschrift-Mandat</h3></td>
				<td style="text-align: right;"><img class="logo" src="{{public_path() . $bank_details->logo}}" alt=""></td>
			</tr>
		</table>
		<table style="margin-bottom:20px;">
			<tr>
				<td class="bold left-sm">Mandatsreferenz:</td>
				<td>{{$admin_details->id}}</td>
			</tr>
		</table>
		<table style="margin-bottom:50px;">
			<tr>
				<td class="bold left-sm">Gläubiger-<br>Identifikationsnummer:</td>
				<td>{{$bank_details->creditor_id_number}}</td>
			</tr>
		</table>
		<div class="address">
			<p>GrafikonDesign UG (haftungsbeschränkt)</p>
			<p>Vyacheslav Onopchenko</p>
			<p>Rochusstr. 64</p>
			<p>53123 Bonn</p>
		</div>
		<div class="text">
			<p>Ich ermächtige/ Wir ermächtigen (A) GrafikonDesign UG, Zahlungen von meinem/ unserem Konto mittels
			   Lastschrift einzuziehen. Zugleich (B) weise ich mein/ weisen wir unser Kreditinstitut an, die von
			   Google auf mein/ unser Konto gezogenen Lastschriften einzulösen. Hinweis: Ich kann/ Wir können
			   innerhalb von acht Wochen, beginnend mit dem Belastungsdatum, die Erstattung des belasteten
			   Betrages verlangen. Es gelten dabei die mit meinem/ unserem Kreditinstitut vereinbarten Bedingungen.
			   Hinweis: Meine/ Unsere Rechte zu dem obigen Mandat sind in einem Merkblatt enthalten,
			   das ich/ wir von meinem/ unserem Kreditinstitut erhalten kann/ können.
			</p>
		</div>
		<table class="data" style="margin-bottom:20px;">
			<tr>
				<td class="left-lg">Anschrift des Zahlungspflichtigen:</td>
				<td class="right">{{$admin_bank_details->legal_firm_name}}<br>
					{{$admin_bank_details->legal_street}}<br>{{$admin_bank_details->legal_post_index}}<br>
					{{$admin_bank_details->country->name}}</td>
			</tr>
			<tr>
				<td class="left-lg">Name des Zahlungspflichtigen:</td>
				<td class="right">{{$admin_details->firstname . ' ' . $admin_details->lastname}}</td>
			</tr>
			<tr>
				<td class="left-lg">Bankleitzahl des Instituts des Zahlungspflichtigen:</td>
				<td class="right">{{$admin_bank_details->bic}}</td>
			</tr>
			<tr>
				<td class="left-lg">IBAN des Zahlungspflichtigen:</td>
				<td class="right">{{$admin_bank_details->iban}}</td>
			</tr>
			<tr>
				<td class="left-lg">Unterzeichner der Einzugsermächtigung:</td>
				<td class="right">{{$admin_details->firstname . ' ' . $admin_details->lastname}}</td>
			</tr>
			<tr>
				<td class="left-lg">Zahlungsart:</td>
				<td class="right">Wiederkehrende Zahlung</td>
			</tr>
			<tr>
				<td class="left-lg">Datum:</td>
				<td class="right">{{date('Y-m-d', strtotime($admin_bank_details->updated_at))}}</td>
			</tr>
		</table>
		<footer>Zugestimmt von <a class="link" href="">{{$admin_details->email}}</a></footer>
	</div>
</div>