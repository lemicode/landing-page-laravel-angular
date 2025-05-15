<?php

namespace App\Exports;

use App\Models\Customer;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Facades\Excel;

class CustomerExport implements FromCollection, WithHeadings
{
    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        return Customer::select(
            'id',
            'name',
            'last_name',
            'identity_number',
            'department_id',
            'city_id',
            'phone_number',
            'email',
            'habeas_data_consent',
            'created_at',
            'updated_at'
        )->get();
    }

    public function headings(): array
    {
        return [
            'id',
            'name',
            'last_name',
            'identity_number',
            'department_id',
            'city_id',
            'phone_number',
            'email',
            'habeas_data_consent',
            'created_at',
            'updated_at'
        ];
    }

    public function download()
    {
        return Excel::download(new CustomerExport, 'customers.xlsx');
    }
}
