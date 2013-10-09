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
		return Response::json(Service::with('servicetype','provider')->get());
        }

    public function addService() {
    	try {
    		$serv = new Service();
    		$serv->notes = Input::json('note');
    		$serv->service_type_id = Input::json('stype');
    		$serv->provider_id = Input::json('provider');
    		$serv->start_date = Input::json('start');
    		$serv->end_date = Input::json('end');
    		$serv->cost = Input::json('cost');
    		$serv->save();
    		return Response::json($serv);
    	} catch (Exception $e) {
    		return Response::json(array('flash'=>'Insert Failed'),500);
    	}

    }
}
