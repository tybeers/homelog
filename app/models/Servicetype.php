<?php

class Servicetype extends Eloquent {

        /**
         * The database table used by the model.
         *
         * @var string
         */
        protected $table = 'servicetypes';

        /**
         * The attributes excluded from the model's JSON form.
         *
         * @var array
         */
        protected $hidden = array();

	    public function service()
    	{
        	return $this->hasMany('Service','service_type_id');
    	}
}
