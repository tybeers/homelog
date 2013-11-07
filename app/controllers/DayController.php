<?php

class DayController extends BaseController {

	public function getDates() {
		return Response::json(DB::table('days')
			->where('when','>=',Input::json('start'))
			->where('when','<=',Input::json('end'))
			->get());
	}

	public function getDays() {
		$data = [];
		$sub = [];
		$count = 0;
		$count2 = 0;
		$dates = DB::table('days')
				->where('when','>=',Input::json('start'))
				->where('when','<=',Input::json('end'))
				->get();
		$categories = DB::table('categories')->get();
		foreach ($dates as $value) {
			foreach ($categories as $cat) {
				$food = DB::table('eatings')
				->join('foods', 'eatings.food_id','=','foods.id')
				->where('foods.category_id','=',$cat->id)
				->where('eatings.day_id','=',$value->id)
				->get();
				$sub[$count2] = array('id'=>$cat->id, 'name'=>$cat->name, 'foods'=>$food);
				$count2++;			
			}
			$data[$count] = array('id'=>$value->id, 'when'=>$value->when, 'eatings'=>$sub);
			$sub = [];
			$count++;
		}
		return Response::json($data);
	}
}