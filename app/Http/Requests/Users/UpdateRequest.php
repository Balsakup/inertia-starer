<?php

namespace App\Http\Requests\Users;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Spatie\Permission\Models\Role;

class UpdateRequest extends FormRequest
{
    public function rules(): array
    {
        $emailRules = app()->isProduction()
            ? ['email:rfc,dns,spoof']
            : ['email'];

        return [
            'first_name' => ['required', 'string', 'max:255'],
            'last_name' => ['required', 'string', 'max:255'],
            'email' => ['required', Rule::unique(User::class)->ignore($this->user), ...$emailRules],
            'role_id' => ['nullable', Rule::exists(Role::class, 'id')],
        ];
    }
}
