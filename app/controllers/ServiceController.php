<?php

class ServiceController extends BaseController {

	public function getServiceTypes() {
		return Response::json(DB::table('servicetypes')->get());
	}

	public function addServiceType() {
		if (DB::insert('insert into servicetypes (name) values (?)', array(Input::json('name')))) {
			return  Response::json(array('flash'=>'Success'));
		} else {
			return Response::json(array('flash'=>'Insert Failed'),500);
		}
	}

}
