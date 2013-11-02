<?php
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddBaseMedicineTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('medicines', function(Blueprint $table)
		{
			$table->increments('id');
			$table->text('notes');
            $table->decimal('dosage',5,2);
            $table->string('units');
            $table->string('frequency');
            $table->date('start_date');
            $table->date('end_date');
			$table->timestamps();
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('medicines');
	}

}