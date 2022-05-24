<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Laravolt\Avatar\Facade as Avatar;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    public function definition(): array
    {
        return [
            'first_name' => $this->faker->firstName(),
            'last_name' => $this->faker->lastName(),
            'email' => $this->faker->unique()->safeEmail(),
            'email_verified_at' => now(),
            'password' => Hash::make('secret'),
            'remember_token' => Str::random(10),
        ];
    }

    public function unverified(): UserFactory
    {
        return $this->state(fn() => [
            'email_verified_at' => null,
        ]);
    }

    public function deleted(): UserFactory
    {
        return $this->state(fn() => [
            'deleted_at' => now(),
        ]);
    }

    public function withAvatar(): UserFactory
    {
        return $this->afterCreating(function (User $user) {
            $avatar = Avatar::create($user->full_name)
                ->setDimension(100, 100)
                ->setShape('square')
                ->setFontSize(50)
                ->toBase64();

            $user
                ->addMediaFromBase64($avatar)
                ->setFileName(Str::slug($user->full_name) . '.png')
                ->toMediaCollection('avatar');
        });
    }

    public function withRole(string $role): UserFactory
    {
        return $this->afterMaking(fn(User $user) => $user->assignRole($role));
    }
}
