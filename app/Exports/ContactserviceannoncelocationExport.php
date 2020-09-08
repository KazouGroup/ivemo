<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use PhpOffice\PhpSpreadsheet\Shared\Date;
use Maatwebsite\Excel\Concerns\Exportable;
use PhpOffice\PhpSpreadsheet\Style\NumberFormat;

class ContactserviceannoncelocationExport implements FromCollection,ShouldAutoSize,WithMapping,WithHeadings
{

    use Exportable;

    private $user;
    private $annoncelocation;

    public function __construct($user,$annoncelocation)
    {
        $this->user = $user;
        $this->annoncelocation = $annoncelocation;
    }

    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        $contactservices = $this->annoncelocation->contactservices()
        ->whereIn('to_id', [$this->user->id])
        ->orderByDesc('created_at')->get();

        return $contactservices;

    }


    public function headings(): array
    {
        return [
            'Nom complet',
            'Numéro de téléfone',
            'Adresse électronique',
            'Date',
        ];
    }

    public function map($item): array
    {
        return [
            $item->full_name,
            $item->phone,
            $item->email,
            $item->created_at->format('d/m/Y'),
        ];
    }
}
