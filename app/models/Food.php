<?php

class Food extends Eloquent {

        /**
         * The database table used by the model.
         *
         * @var string
         */
        protected $table = 'foods';

        /**
         * The attributes excluded from the model's JSON form.
         *
         * @var array
         */
        protected $hidden = array();


	public function eating()
        {
                return $this->hasMany('Eating','food_id');
        }

        public function category()
        {
                return $this->belongsTo('Category','category_id');
        }
}
