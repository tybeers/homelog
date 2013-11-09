<?php

class Eating extends Eloquent {

        /**
         * The database table used by the model.
         *
         * @var string
         */
        protected $table = 'eatings';

        /**
         * The attributes excluded from the model's JSON form.
         *
         * @var array
         */
        protected $hidden = array();

        public $timestamps = false;

        public function days()
        {
                return $this->belongsTo('Day','day_id');
        }

}