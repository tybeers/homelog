<?php
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddReactionsTables extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('symptoms', function(Blueprint $table1)
		{
			$table1->increments('id');
			$table1->string('name');
		});
		Schema::create('severities', function(Blueprint $table2)
		{
			$table2->increments('id');
			$table2->string('name');
		});
		Schema::create('reactions', function(Blueprint $table3)
		{
			$table3->increments('id');
			$table3->unsignedInteger('day_id');
			$table3->unsignedInteger('symptom_id');
			$table3->unsignedInteger('severity_id');
			$table3->text('notes');
			$table3->foreign('day_id')->references('id')->on('days');
			$table3->foreign('symptom_id')->references('id')->on('symptoms');
			$table3->foreign('severity_id')->references('id')->on('severities');
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('reactions');
		Schema::drop('severities');
		Schema::drop('symptoms');
	}

}