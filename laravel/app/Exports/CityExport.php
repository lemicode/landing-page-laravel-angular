<?php

namespace App\Exports;

use App\Models\City;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Facades\Excel;

class CityExport implements FromCollection, WithHeadings
{
    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        return City::select(
            'id',
            'name',
            'department_id',
            'created_at',
            'updated_at'
        )->get();
    }

    public function headings(): array
    {
        return [
            'id',
            'name',
            'department_id',
            'created_at',
            'updated_at'
        ];
    }

    public function download()
    {
        return Excel::download(new CityExport, 'cities.xlsx');
    }
}
