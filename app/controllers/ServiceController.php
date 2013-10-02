<?php

class ServiceController extends BaseController {

	public function getServiceTypes() {
		return Response::json(DB::table('servicetypes')->get());
	}

	public function addServiceType() {
		try {
			$stype = new Servicetype();
			$stype->name = Input::json('name');
			$stype->save();
			return Response::json($stype);
		} catch (Exception $e) {
			return Response::json(array('flash'=>'Insert Failed'),500);
		}
	}
	public function delServiceType() {
		try {
			$stype = DB::table('servicetypes')->where('id','=',Input::json('id'))->delete();
			return Response::json(array('flash'=>'Deleted'));
		} catch (Exception $e) {
			 return Response::json(array('flash'=>'Delete Failed'),500);
		}
	}


	public function getServices() {
                //return Response::json(DB::table('services')->get());
		return Response::json(Service::with('servicetype')->get());
		/*$output['services'] = Service::with('servicetype')->get()->toArray();
		return $output;*/
        }
}
