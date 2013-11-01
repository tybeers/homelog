<?php

class ProviderController extends BaseController {

	public function getProviders() {
		return Response::json(DB::table('providers')->get());
	}

	public function getRatings() {
		return Response::json(DB::table('ratings')->get());
	}

	public function addProvider() {
		try {
			$prov = new Provider();
			$prov->name = Input::json('name');
			$prov->rating_id = Input::json('rating');
			$prov->email = Input::json('email');
			$prov->website = Input::json('website');
			$prov->phone = Input::json('phone');
			$prov->notes = Input::json('notes');
			$prov->save();
			return Response::json($prov);
		} catch (Exception $e) {
			return Response::json(array('flash'=>'Insert Failed'),500);
		}
	}
}
