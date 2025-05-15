<?php

namespace App\Exports;

use App\Models\Department;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Facades\Excel;

class DepartmentExport implements FromCollection, WithHeadings
{
    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        return Department::select(
            'id',
            'name',
            'created_at',
            'updated_at'
        )->get();
    }

    public function headings(): array
    {
        return [
            'id',
            'name',
            'created_at',
            'updated_at'
        ];
    }

    public function download()
    {
        return Excel::download(new DepartmentExport, 'departments.xlsx');
    }
}
