<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Subscription extends Model
{
    use HasFactory;

    /**
     * Get the user associated with the Subscription
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user(): BelongsTo
    {
        return $this->BelongsTo(User::class);
    }

    /**
     * Get the bundle that owns the Subscription
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function bundle(): HasOne
    {
        return $this->HasOne(Bundle::class);
    }
}
