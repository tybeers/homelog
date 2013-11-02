<?php
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddBaseFoodTables extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('categories', function(Blueprint $table1)
		{
			$table1->increments('id');
			$table1->string('name');
		});
		Schema::create('families', function(Blueprint $table2)
		{
			$table2->increments('id');
			$table2->string('name');
		});
		Schema::create('statuses', function(Blueprint $table3)
		{
			$table3->increments('id');
			$table3->string('name');
		});
		Schema::create('foods', function(Blueprint $table4)
		{
			$table4->increments('id');
			$table4->string('name');
			$table4->unsignedInteger('category_id');
			$table4->unsignedInteger('family_id');
			$table4->unsignedInteger('status_id');
			$table4->foreign('category_id')->references('id')->on('categories');
			$table4->foreign('family_id')->references('id')->on('families');
			$table4->foreign('status_id')->references('id')->on('statuses');
		});
		Schema::create('eatings', function(Blueprint $table5)
		{
			$table5->increments('id');
			$table5->unsignedInteger('food_id');
			$table5->date('when');
			$table5->string('amount');
			$table5->text('notes');
			$table5->foreign('food_id')->references('id')->on('foods');
		});

	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('categories');
		Schema::drop('families');
		Schema::drop('statuses');
		Schema::drop('foods');
		Schema::drop('eatings');
	}

}