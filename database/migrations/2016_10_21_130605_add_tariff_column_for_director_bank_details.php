<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddTariffColumnForDirectorBankDetails extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('director_bank_details', function (Blueprint $table) {
            $table->float('tariff')->after('logo')->default(23);
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
            $table->dropColumn('tariff');
        });
    }
}
