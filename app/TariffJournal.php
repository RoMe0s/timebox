<?php

namespace App;

use Illuminate\Database\Eloquent\Model;


/**
 * App\TariffJournal
 *
 * @property integer $id
 * @property integer $admin_id
 * @property string $type
 * @property float $tariff
 * @property float $tariff_per_employee
 * @property string $valid_before
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @method static \Illuminate\Database\Query\Builder|\App\TariffJournal whereId($value)
 * @method static \Illuminate\Database\Query\Builder|\App\TariffJournal whereAdminId($value)
 * @method static \Illuminate\Database\Query\Builder|\App\TariffJournal whereType($value)
 * @method static \Illuminate\Database\Query\Builder|\App\TariffJournal whereTariff($value)
 * @method static \Illuminate\Database\Query\Builder|\App\TariffJournal whereTariffPerEmployee($value)
 * @method static \Illuminate\Database\Query\Builder|\App\TariffJournal whereValidBefore($value)
 * @method static \Illuminate\Database\Query\Builder|\App\TariffJournal whereCreatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|\App\TariffJournal whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class TariffJournal extends Model
{
    protected $table = 'tariff_journals';
	protected $fillable = ['admin_id', 'type', 'valid_before', 'tariff', 'tariff_per_employee'];
}
