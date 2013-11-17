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

	public function delEating() {
		try {
			$eat = DB::table('eatings')->where('id','=',Input::json('id'))->delete();
			return Response::json(array('flash'=>'Deleted'));
		} catch (Exception $e) {
			return Response::json(array('flash'=>'Delete Failed: '.$e),500);
		}
	}

	public function getDays() {
		$data = [];
		$sub = [];
		$count = 0;
		$count2 = 0;
		$dates = DB::table('days')
				->where('when','>=',Input::json('start_date'))
				->where('when','<=',Input::json('end_date'))
				->orderBy('when','ASC')
				->get();
		$categories = DB::table('categories')->orderBy('id','ASC')->get();
		foreach ($dates as $value) {
			foreach ($categories as $cat) {
				$numfood = 0;
				$food = DB::table('eatings')
				->join('foods', 'eatings.food_id','=','foods.id')
				->where('foods.category_id','=',$cat->id)
				->where('eatings.day_id','=',$value->id)
				->orderBy('foods.category_id','ASC')
				->get(array('foods.name', 'eatings.id', 'eatings.food_id'));
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