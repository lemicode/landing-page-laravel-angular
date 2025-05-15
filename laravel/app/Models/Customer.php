<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Customer extends Model
{
    use HasFactory;

    protected $table = 'customers';
    protected $fillable = [
        'name',
        'last_name',
        'identity_number',
        'department_id',
        'city_id',
        'phone_number',
        'email',
        'habeas_data_consent'
    ];
    # protected $hidden = ['created_at', 'updated_at'];

    public function department(): BelongsTo
    {
        return $this->belongsTo(Department::class);
    }

    public function city(): BelongsTo
    {
        return $this->belongsTo(City::class);
    }
}
