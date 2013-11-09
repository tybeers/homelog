<?php

class FoodController extends BaseController {

	public function getFoods() {
		return Response::json(Category::with('food')->orderBy('id', 'ASC')->get());
	}

	public function addFood() {
		try {
			$food = new Food();
			$food->name = Input::json('name');
			$food->category_id = Input::json('category_id');
			$food->family_id = Input::json('family_id');
			$food->status_id = Input::json('status_id');
			$food->save();
			return Response::json($food);
		} catch (Exception $e) {
			return Response::json(array('flash'=>'Insert failed '.$e),500);
		}
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