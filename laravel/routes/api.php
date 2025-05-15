<?php

use App\Exports\CityExport;
use App\Exports\CustomerExport;
use App\Exports\DepartmentExport;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\V1\CustomerController;
use App\Http\Controllers\V1\DepartmentController;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

Route::prefix('v1')->group(function () {
    Route::resource('customers', CustomerController::class)->only(['index', 'store']);
    Route::get('customers/winner', [CustomerController::class, 'selectWinner']);
    Route::get('customers/excel', [CustomerExport::class, 'download']);

    Route::get('departments/excel', [DepartmentExport::class, 'download']);
    Route::resource('departments', DepartmentController::class)->only(['index', 'show']);
    
    Route::get('cities/excel', [CityExport::class, 'download']);
});
