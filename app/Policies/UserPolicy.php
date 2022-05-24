<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class UserPolicy
{
    use HandlesAuthorization;

    public function viewAny(): bool
    {
        return true;
    }

    public function create(): bool
    {
        return true;
    }

    public function update(User $auth, User $user): bool
    {
        return $auth->id !== $user->id;
    }

    public function delete(User $auth, User $user): bool
    {
        return $auth->id !== $user->id;
    }
}
