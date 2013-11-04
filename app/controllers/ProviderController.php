<?php

class ProviderController extends BaseController {

	public function getProviders() {
		return Response::json(Provider::with('rating')->get());
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

	public function editProvider() {
		try {
				return Response::json(DB::table('providers')->where('id',Input::json('id'))
									  ->update(array('name' => Input::json('name')
									  				,'email' => Input::json('email')
									  				,'website' => Input::json('website')
									  				,'phone' => Input::json('phone')
									  				,'rating_id' => Input::json('rating_id')
									  	)));
		} catch (Exception $e) {
			return Response::json(array('flash'=>'Update Failed'),500);	
		}
	}
}
