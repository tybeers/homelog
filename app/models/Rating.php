<?php

class Rating extends Eloquent {

        /**
         * The database table used by the model.
         *
         * @var string
         */
        protected $table = 'ratings';

        /**
         * The attributes excluded from the model's JSON form.
         *
         * @var array
         */
        protected $hidden = array();

	    public function provider()
    	{
        	return $this->hasMany('Provider','rating_id');
    	}
}
