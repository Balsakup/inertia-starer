<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Users\StoreRequest;
use App\Http\Requests\Users\UpdateRequest;
use App\Models\User;
use App\QueryBuilder\Filters\Users\SearchFilter;
use App\QueryBuilder\Sorts\Users\NameSort;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\Permission\Models\Role;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\AllowedSort;
use Spatie\QueryBuilder\QueryBuilder;

class UsersController extends Controller
{
    public function __construct()
    {
        $this->authorizeResource(User::class);
    }

    public function index(Request $request): Response
    {
        $paginator = QueryBuilder::for(User::class, $request)
            ->select([
                'id',
                'first_name',
                'last_name',
                'email',
                'created_at',
                'updated_at',
                'email_verified_at',
            ])
            ->with([
                'roles:name,color',
            ])
            ->allowedSorts([
                AllowedSort::custom('name', new NameSort()),
                'email',
                'created_at',
                'updated_at',
            ])
            ->allowedFilters([
                AllowedFilter::custom('search', new SearchFilter()),
            ])
            ->paginate($request->get('limit', 10))
            ->through(static fn(User $user) => $user->append([
                'full_name',
                'formatted_created_at',
                'formatted_updated_at',
                'thumb_avatar_url',
            ]));

        return Inertia::render('Users/Index', [
            'title' => __('Users'),
            'actions' => [
                [
                    'label' => __('Add user'),
                    'variant' => 'primary',
                    'route' => 'admin::users.create',
                    'type' => 'create',
                ],
            ],
            'paginator' => $paginator,
        ]);
    }

    public function create(): Response
    {
        $roles = Role::select(['id', 'name'])->orderBy('name')->get();

        return Inertia::render('Users/Create', [
            'title' => __('Create user'),
            'actions' => [
                [
                    'label' => __('Cancel'),
                    'variant' => 'danger',
                    'route' => 'admin::users.index',
                    'type' => 'cancel',
                ],
                [
                    'label' => __('Save'),
                    'variant' => 'success',
                    'type' => 'save',
                ],
            ],
            'roles' => $roles,
        ]);
    }

    public function store(StoreRequest $request): RedirectResponse
    {
        $user = User::create($request->validated());

        if ($request->role_id) {
            $user->assignRole($request->role_id);
        }

        return redirect()
            ->route('admin::users.index')
            ->with('toast.success', __('User :full_name has been created', ['full_name' => $user->full_name]));
    }

    public function edit(User $user): Response
    {
        $roles = Role::select(['id', 'name'])->orderBy('name')->get();

        $user->loadMissing('roles:id');

        return Inertia::render('Users/Edit', [
            'title' => __('Create user'),
            'actions' => [
                [
                    'label' => __('Cancel'),
                    'variant' => 'danger',
                    'route' => 'admin::users.index',
                    'type' => 'cancel',
                ],
                [
                    'label' => __('Save'),
                    'variant' => 'success',
                    'type' => 'save',
                ],
            ],
            'user' => $user,
            'roles' => $roles,
        ]);
    }

    public function update(UpdateRequest $request, User $user): RedirectResponse
    {
        $user->update($request->validated());

        if ($request->role_id) {
            $user->syncRoles($request->role_id);
        }

        return redirect()
            ->route('admin::users.index')
            ->with('toast.success', __('User :full_name has been updated', ['full_name' => $user->full_name]));
    }

    public function destroy(User $user): RedirectResponse
    {
        $user->delete();

        return back()->with('toast.success', __('User :full_name has been deleted', ['full_name' => $user->full_name]));
    }
}
