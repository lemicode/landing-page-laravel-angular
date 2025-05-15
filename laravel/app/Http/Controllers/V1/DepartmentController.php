<?php

namespace App\Http\Controllers\V1;

use App\Http\Controllers\Controller;
use App\Models\Department;

class DepartmentController extends Controller
{
    /**
     * Display a listing of the departments.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $departments = Department::all();

        return response()->json([
            'departments' => $departments
        ]);
    }

    /**
     * Display the specified department.
     *
     * @param  int  $id  The ID of the department to retrieve.
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $department = Department::with('cities')->find($id);

        return response()->json([
            'department' => $department
        ]);
    }
}
