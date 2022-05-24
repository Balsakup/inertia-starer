<?php

namespace App\Models;

use Illuminate\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Str;
use Laravel\Sanctum\HasApiTokens;
use Laravolt\Avatar\Facade as Avatar;
use Spatie\Image\Manipulations;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable implements HasMedia
{
    use HasApiTokens;
    use HasFactory;
    use Notifiable;
    use SoftDeletes;
    use InteractsWithMedia;
    use HasRoles;
    use MustVerifyEmail;

    /** @var array<int, string> */
    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'password',
    ];

    /** @var array<int, string> */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /** @var array<string, string> */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function registerMediaCollections(): void
    {
        $this
            ->addMediaCollection('avatar')
            ->useFallbackUrl(Avatar::create($this->full_name)
                ->setDimension(100, 100)
                ->setShape('square')
                ->setFontSize(50)
                ->toBase64())
            ->acceptsMimeTypes(['image/webp', 'image/jpeg', 'image/png'])
            ->singleFile();
    }

    /** @throws \Spatie\Image\Exceptions\InvalidManipulation */
    public function registerMediaConversions(Media $media = null): void
    {
        $this->addMediaConversion('thumb')
            ->fit(Manipulations::FIT_CROP, 40, 40)
            ->format('webp')
            ->performOnCollections('avatar');
    }

    protected function firstName(): Attribute
    {
        return Attribute::make(
            set: fn(string $firstName) => Str::title($firstName)
        );
    }

    protected function lastName(): Attribute
    {
        return Attribute::make(
            set: fn(string $lastName) => Str::upper($lastName)
        );
    }

    protected function fullName(): Attribute
    {
        return Attribute::make(
            get: fn() => "$this->first_name $this->last_name"
        );
    }

    protected function formattedCreatedAt(): Attribute
    {
        return Attribute::make(
            get: fn() => $this->created_at->format('d/m/Y H:i')
        );
    }

    protected function formattedUpdatedAt(): Attribute
    {
        return Attribute::make(
            get: fn() => $this->updated_at->format('d/m/Y H:i')
        );
    }

    protected function thumbAvatarUrl(): Attribute
    {
        return Attribute::make(
            get: fn() => $this->getFirstMediaUrl('avatar', 'thumb')
        );
    }
}
