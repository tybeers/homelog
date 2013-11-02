<?php

use Illuminate\Database\Migrations\Migration;

class AddFieldsToMedicine extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('medicines', function($table) {
			$table->string('name');
			$table->string('brand');
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		//
	}

}