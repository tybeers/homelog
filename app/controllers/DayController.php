<?php

class DayController extends BaseController {

	public function getDates() {
		return Response::json(DB::table('days')
			->where('when','>=',Input::json('start'))
			->where('when','<=',Input::json('end'))
			->get());
	}

	public function addEating() {
		try {
			$eat = new Eating();
			$eat->food_id = Input::json('food_id');
			$eat->day_id = Input::json('day_id');
			$eat->amount = '';
			$eat->notes = '';
			$eat->save();
			return Response::json($eat);
		} catch (Exception $e) {
			return Response::json(array('flash'=>'Insert Failed: '.$e),500);
		}
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
				$numfood = 0;
				$food = DB::table('eatings')
				->join('foods', 'eatings.food_id','=','foods.id')
				->where('foods.category_id','=',$cat->id)
				->where('eatings.day_id','=',$value->id)
				->get();
				$numfood = count($food);
				$sub[$count2] = array('id'=>$cat->id, 'name'=>$cat->name, 'entries'=>$numfood,'foods'=>$food);
				$count2++;			
			}
			$data[$count] = array('id'=>$value->id, 'when'=>$value->when, 'eatings'=>$sub);
			$sub = [];
			$count++;
		}
		return Response::json($data);
	}
}