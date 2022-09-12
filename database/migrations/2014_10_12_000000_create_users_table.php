<?php

use App\Models\Classroom;
use App\Models\Role;
use App\Models\Subscription;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('email')->unique();
            $table->string('password');

            $table->string('phone')->nullable();
            $table->string('first_name');
            $table->string('last_name')->nullable();
            $table->date('dob');
            $table->string('gender', 22);
            $table->string('photo')->nullable();

            $table->foreignIdFor(Role::class);
            $table->foreignIdFor(Classroom::class)->nullable();

            $table->boolean('verified')->default(false);
            $table->boolean("active")->default(true);
            $table->string("status")->default("CREATED");// CREATED, ACTIVE, SUSPENDED,
            $table->timestamp('email_verified_at')->nullable();
            $table->timestamp('created_at')->default(DB::raw('CURRENT_TIMESTAMP'));
            $table->timestamp('updated_at')->default(DB::raw('CURRENT_TIMESTAMP'));
            $table->rememberToken();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
};
