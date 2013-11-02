<?php

class MedicineController extends BaseController {

	public function getMedicines() {
		return Response::json(DB::table('medicines')->get());
	}


	public function addMedicine() {
		try {
			$med = new Medicine();
			$med->name = Input::json('name');
			$med->brand = Input::json('brand');
			$med->dosage = Input::json('dosage');
			$med->units = Input::json('units');
			$med->frequency = Input::json('frequency');
			$med->start_date = Input::json('start');
			$med->end_date = Input::json('end');
			$med->notes = Input::json('notes');
			$med->save();
			return Response::json($med);
		} catch (Exception $e) {
			return Response::json(array('flash'=>'Insert Failed'),500);
		}
	}

	public function editMedicine() {
		try {
				return Response::json(DB::table('medicines')->where('id',Input::json('id'))
									  ->update(array('brand' => Input::json('brand')
												   ,'name' => Input::json('name')
												   ,'start_date' => Input::json('start_date')
												   ,'end_date' => Input::json('end_date')
											      )
									        )
									  );
		} catch (Exception $e) {
			return Response::json(array('flash'=>'Update Failed'),500);	
		}
	}
}
