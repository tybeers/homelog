<?php
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddAdditionalFoodTables extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('foods', function($table1) {
			$table1->text('notes');
		});
		Schema::create('days', function(Blueprint $table2)
		{
			$table2->increments('id');
			$table2->date('when');
			$table2->text('notes');
			$table2->integer('rating');
		});
		Schema::table('eatings', function($table3) {
			$table3->unsignedInteger('day_id');
			$table3->foreign('day_id')->references('id')->on('days');
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('days');
	}

}