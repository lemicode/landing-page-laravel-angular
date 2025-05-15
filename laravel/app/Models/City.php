<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class City extends Model
{   
    use HasFactory;

    protected $table = 'cities';
    protected $fillable = ['name', 'department_id'];
    # protected $hidden = ['created_at', 'updated_at'];

    public function department(): BelongsTo
    {
        return $this->belongsTo(Department::class);
    }
}
