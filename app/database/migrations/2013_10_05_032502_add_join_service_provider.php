<?php

use Illuminate\Database\Migrations\Migration;

class AddJoinServiceProvider extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('services', function($table) {
			$table->unsignedInteger('provider_id');
			$table->foreign('provider_id')->references('id')->on('providers');
		});

	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		
	}

}