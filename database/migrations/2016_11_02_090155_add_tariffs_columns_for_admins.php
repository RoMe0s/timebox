<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddTariffsColumnsForAdmins extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('tariff_journals', function (Blueprint $table) {
            $table->float('tariff')->default(23)->after('type');
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
        Schema::table('tariff_journals', function (Blueprint $table) {
            $table->dropColumn(['tariff', 'tariff_per_employee']);
        });
    }
}
