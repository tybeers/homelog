<?php

class ServiceTypeTableSeeder extends Seeder {

    public function run()
    {
        DB::table('servicetypes')->delete();

        $stypes = array(
            array(
                'name'      => 'Appliance',
                'created_at' => new DateTime,
                'updated_at' => new DateTime
            ),
	     array(
                'name'      => 'HVAC',
                'created_at' => new DateTime,
                'updated_at' => new DateTime
            ),
	    array(
                'name'      => 'Exterior',
                'created_at' => new DateTime,
                'updated_at' => new DateTime
            )
        );

        DB::table('servicetypes')->insert( $stypes );
    }

}

?>
