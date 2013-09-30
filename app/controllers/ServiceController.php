<?php

class ServiceController extends BaseController {

	public function getServiceTypes() {
		return Response::json(DB::table('servicetypes')->get());
	}

	public function addServiceType() {
		/*if (DB::insert('insert into servicetypes (name) values (?)', array(Input::json('name')))) {
			return  Response::json(array('flash'=>'Success'));
		} else {
			return Response::json(array('flash'=>'Insert Failed'),500);
		}*/
		try {
			$stype = new Servicetype();
			$stype->name = Input::json('name');
			$stype->save();
			return Response::json($stype);
		} catch (Exception $e) {
			return Response::json(array('flash'=>'Insert Failed'),500);
		}
	}

}
