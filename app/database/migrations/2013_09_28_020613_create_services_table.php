<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateServicesTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('services', function(Blueprint $table)
		{
			$table->increments('id');
			$table->text('notes');
                        $table->unsignedInteger('service_type_id');
                        $table->decimal('cost',5,2);
                        $table->date('start_date');
                        $table->date('end_date');
			$table->timestamps();
			$table->foreign('service_type_id')->references('id')->on('servicetypes');
		});

	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('services');
	}

}
