<?php

namespace App\QueryBuilder\Filters\Users;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Spatie\QueryBuilder\Filters\Filter;

class SearchFilter implements Filter
{
    public function __invoke(Builder $query, $value, string $property): void
    {
        $value = Str::upper($value);

        $query->when($value, static fn(Builder $searchQuery) => $searchQuery
            ->orWhere(DB::raw('upper(first_name)'), 'like', "%$value%")
            ->orWhere(DB::raw('upper(last_name)'), 'like', "%$value%")
            ->orWhere(DB::raw('upper(email)'), 'like', "%$value%"));
    }
}
