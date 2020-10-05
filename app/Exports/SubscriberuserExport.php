<?php

namespace App\Exports;

use App\Models\subscriberuser;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithMapping;
use PhpOffice\PhpSpreadsheet\Shared\Date;
use PhpOffice\PhpSpreadsheet\Style\NumberFormat;

class SubscriberuserExport implements FromCollection,WithMapping
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return subscriberuser::whereIn('user_id',[auth()->user()->id])
            ->latest()->distinct()->get();
    }


    public function headings(): array
    {
        return [
            'Email de l\'utilisateur',
            'IP',
            'Date d\'abonement',
        ];
    }

    public function map($invoice): array
    {
        return [
            $invoice->user_email,
            $invoice->ip,
            $invoice->created_at->format('m/d/Y'),
        ];
    }

    public function columnFormats(): array
    {
        return [
            'C' => NumberFormat::FORMAT_DATE_DDMMYYYY,
        ];
    }
}
