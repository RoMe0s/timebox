<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ChangeDirectorBankDetailsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
	    Schema::table('director_bank_details', function (Blueprint $table) {
		    $table->string('creditor_id_number')->after('tax_number');
	    });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
	    Schema::table('director_bank_details', function (Blueprint $table) {
		    $table->dropColumn('creditor_id_number');
	    });
    }
}
