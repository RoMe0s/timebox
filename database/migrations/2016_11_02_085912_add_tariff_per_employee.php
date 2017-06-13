<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddTariffPerEmployee extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('director_bank_details', function (Blueprint $table) {
            $table->float('tariff_per_employee')->default(5)->after('tariff');
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
            $table->dropColumn('tariff_per_employee');
        });
    }
}
