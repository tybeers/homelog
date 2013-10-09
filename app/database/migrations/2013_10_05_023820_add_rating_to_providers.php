<?php

use Illuminate\Database\Migrations\Migration;

class AddRatingToProviders extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('ratings', function($table)
                {
                        $table->increments('id');
                        $table->text('name');

                });

		Schema::table('providers', function($table) {
			$table->unsignedInteger('rating_id');
			$table->text('notes');
			$table->foreign('rating_id')->references('id')->on('ratings');
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
			$table->drop_column('notes');
			$table->drop_column('rating_id');
		});

		Schema::drop('ratings');
	}

}
