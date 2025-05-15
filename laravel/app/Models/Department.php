<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Department extends Model
{
    use HasFactory;

    protected $table = 'departments';
    protected $fillable = ['name'];
    # protected $hidden = ['created_at', 'updated_at'];

    public function cities(): HasMany
    {
        return $this->hasMany(City::class);
    }
}
