<?php

namespace App\Http\Controllers\V1;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use App\Http\Requests\CustomerRequest;

class CustomerController extends Controller
{
    /**
     * Retrieve a list of customers with their associated department and city.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $customers = Customer::with(['department', 'city'])->get();

        return response()->json([
            'customers' => $customers
        ]);
    }

    /**
     * Store a new customer in the database.
     *
     * The data is validated using the CustomerRequest class.
     *
     * @param CustomerRequest $request
     * @return \Illuminate\Http\Response
     */
    public function store(CustomerRequest $request)
    {
        $customer = Customer::create($request->validated());

        return response()->json([
            'customer' => $customer->only(['name', 'last_name'])
        ], 201);
    }

    /**
     * Select a random winner from the customers if there are at least 5.
     *
     * @return \Illuminate\Http\Response
     */
    public function selectWinner()
    {
        $winner = false;
        $customerTotal = Customer::count();

        if ($customerTotal >= 5) {
            $winner = Customer::inRandomOrder()->first();
        }

        return response()->json([
            'winner' => $winner,
            'customerTotal' => $customerTotal
        ]);
    }
}
