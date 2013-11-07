<?php

class Day extends Eloquent {

        /**
         * The database table used by the model.
         *
         * @var string
         */
        protected $table = 'days';

        /**
         * The attributes excluded from the model's JSON form.
         *
         * @var array
         */
        protected $hidden = array();

        public function eatings()
        {
                return $this->hasMany('Eating','day_id');
        }

}