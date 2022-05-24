<?php

namespace App\QueryBuilder\Sorts\Users;

use Illuminate\Database\Eloquent\Builder;
use Spatie\QueryBuilder\Sorts\Sort;

class NameSort implements Sort
{
    public function __invoke(Builder $query, bool $descending, string $property): void
    {
        $direction = $descending ? 'desc' : 'asc';

        $query->orderByRaw("concat(first_name, ' ', last_name) $direction");
    }
}
