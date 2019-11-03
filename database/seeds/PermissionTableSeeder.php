<?php

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class PermissionTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Reset cached roles and permissions
        app()['cache']->forget('spatie.permission.cache');

        // Create roles (Please don't delete this it's verry important !)

        Role::create(['guard_name' => 'web', 'name' => 'user']);
        Role::create(['guard_name' => 'web', 'name' => 'visitor']);
        Role::create(['guard_name' => 'web', 'name' => 'editor']);
        Role::create(['guard_name' => 'web', 'name' => 'advertiser']);
        Role::create(['guard_name' => 'web', 'name' => 'moderator']);
        Role::create(['guard_name' => 'web', 'name' => 'admin']);



        //Create permissions Dashboard
        Permission::create(['guard_name' => 'web' , 'name' => 'dashboard']);

        Permission::create(['guard_name' => 'web' , 'name' => 'auditing']);

        Permission::create(['guard_name' => 'web' , 'name' => 'activity']);

        Permission::create(['guard_name' => 'web' , 'name' => 'administration']);

        Permission::create(['guard_name' => 'web' , 'name' => 'setting-task']);

        //Create permissions Administrations
        Permission::create(['guard_name' => 'web' , 'name' => 'view-administrator']);
        Permission::create(['guard_name' => 'web' , 'name' => 'create-administrator']);
        Permission::create(['guard_name' => 'web' , 'name' => 'edit-administrator']);
        Permission::create(['guard_name' => 'web' , 'name' => 'delete-administrator']);

        //Create Permissions Faqs
        Permission::create(['guard_name' => 'web' , 'name' => 'create-faq']);
        Permission::create(['guard_name' => 'web' , 'name' => 'edit-faq']);
        Permission::create(['guard_name' => 'web' , 'name' => 'delete-faq']);
        Permission::create(['guard_name' => 'web' , 'name' => 'publish-faq']);

        //Create permissions roles
        Permission::create(['guard_name' => 'web' , 'name' => 'all-role']);
        Permission::create(['guard_name' => 'web' , 'name' => 'create-role']);
        Permission::create(['guard_name' => 'web' , 'name' => 'edit-role']);
        Permission::create(['guard_name' => 'web' , 'name' => 'delete-role']);

        //Create permissions permissions
        Permission::create(['guard_name' => 'web' , 'name' => 'all-permission']);
        Permission::create(['guard_name' => 'web' , 'name' => 'create-permission']);
        Permission::create(['guard_name' => 'web' , 'name' => 'edit-permission']);
        Permission::create(['guard_name' => 'web' , 'name' => 'delete-permission']);

        //Viea Subcribe Newletters permissions
        Permission::create(['guard_name' => 'web' , 'name' => 'view-email']);
        //View permission and role
        Permission::create(['guard_name' => 'web' , 'name' => 'view-role-permission']);



        // create roles and assign created permissions

        $role = Role::create(['guard_name' => 'web', 'name' => 'super-admin']);
        $role->givePermissionTo(Permission::all());


    }
}
