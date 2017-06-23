<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCodesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('codes', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id')->unsigned()->nullable();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade')->onUpdate('cascade');
            $table->string('code', 255);
            $table->enum('category', ['employee', 'sms', 'tariff']);
            $table->enum('type', ['present', 'discount']);
            $table->enum('count', ['percent', 'currency', 'considered'])->nullable();
            $table->string('value')->nullable();
            $table->date('expired_at')->nullable();
            $table->date('from')->nullable();
            $table->date('to')->nullable();
            $table->integer('period')->unsigned()->nullable();
            $table->timestamps();
        });
        Schema::create('users_codes', function(Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id')->unsigned();
            $table->integer('code_id')->unsigned();

            $table->index(['user_id', 'code_id']);
            $table->unique(['user_id', 'code_id']);

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('code_id')->references('id')->on('codes')->onDelete('cascade')->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users_codes');
        Schema::drop('codes');
    }
}
