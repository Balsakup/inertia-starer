<?php

namespace App\MediaLibrary\Support\PathGenerators;

use Spatie\MediaLibrary\MediaCollections\Models\Media;
use Spatie\MediaLibrary\Support\PathGenerator\DefaultPathGenerator;

class UserPathGenerator extends DefaultPathGenerator
{
    protected function getBasePath(Media $media): string
    {
        if ($media->collection_name === 'avatar') {
            return "avatar/$media->model_id";
        }

        return parent::getBasePath($media);
    }
}
