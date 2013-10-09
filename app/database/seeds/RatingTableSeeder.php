<?php

class RatingTableSeeder extends Seeder {

    public function run()
    {
        DB::table('ratings')->delete();

        $stypes = array(
            array(
                'name'      => 'Terrible'
            ),
	     array(
                'name'      => 'Not Good'
            ),
	    array(
                'name'      => 'Average'
            ),
	    array(
		'name'	    => 'Pretty Good'
	    ),
	    array(
		'name'      => 'Awesome'
	    )
        );

        DB::table('ratings')->insert( $stypes );
    }

}

?>
