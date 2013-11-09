<?php

class FoodController extends BaseController {

	public function getFoods() {
		return Response::json(Category::with('food')->orderBy('id', 'ASC')->get());
	}

	public function addCategory() {
		try {
			$cat = new Category();
			$cat->name = Input::json('name');
			$cat->save();
			return Response::json($cat);
		} catch (Exception $e) {
			return Response::json(array('flash'=>'Insert Failed '.$e),500);
		}
	}

}