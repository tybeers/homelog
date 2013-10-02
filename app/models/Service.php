<?php

class Service extends Eloquent {

        /**
         * The database table used by the model.
         *
         * @var string
         */
        protected $table = 'services';

        /**
         * The attributes excluded from the model's JSON form.
         *
         * @var array
         */
        protected $hidden = array();


	public function servicetype()
        {
        	return $this->belongsTo('Servicetype', 'service_type_id');
        }
}
