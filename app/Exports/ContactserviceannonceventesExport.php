<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\Exportable;

class ContactserviceannonceventesExport implements FromCollection,ShouldAutoSize,WithMapping,WithHeadings
{

    use Exportable;

    private $user;
    private $annoncevente;

    public function __construct($user,$annoncevente)
    {
        $this->user = $user;
        $this->annoncevente = $annoncevente;
    }

    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        $contactservices = $this->annoncevente->contactservices()
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
