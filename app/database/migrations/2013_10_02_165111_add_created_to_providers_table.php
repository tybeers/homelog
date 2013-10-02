<?php

use Illuminate\Database\Migrations\Migration;

class AddCreatedToProvidersTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('providers', function($table) {
			$table->timestamp('created_at');
			$table->timestamp('updated_at');
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('providers', function($table) {
			$table->drop_column('created_at');
			$table->drop_column('updated_at');
		});
	}

}
