<?php

class Provider extends Eloquent {

        /**
         * The database table used by the model.
         *
         * @var string
         */
        protected $table = 'providers';

        /**
         * The attributes excluded from the model's JSON form.
         *
         * @var array
         */
        protected $hidden = array();

        public function service()
        {
                return $this->hasMany('Service','provider_id');
        }

        public function rating()
        {
                return $this->belongsTo('Rating','rating_id');
        }
}
