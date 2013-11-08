<?php

class FoodController extends BaseController {

	public function getFoods() {
		return Response::json(Category::with('food')->orderBy('id', 'ASC')->get());
	}

}