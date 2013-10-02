<?php

class ProviderController extends BaseController {

	public function getProviders() {
		return Response::json(DB::table('providers')->get());
	}
}
