<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('customers', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('last_name');
            $table->bigInteger('identity_number');
            $table->unsignedBigInteger('department_id');
            $table->unsignedBigInteger('city_id');
            $table->bigInteger('phone_number');
            $table->string('email')->unique();
            $table->boolean('habeas_data_consent')->default(false);
            $table->timestamps();

            $table->foreign('department_id')->references('id')->on('departments')->onDelete('cascade');
            $table->foreign('city_id')->references('id')->on('cities')->onDelete('cascade');
        });

        /** 
         * Uncomment the following line to add a check constraint for habeas_data_consent.
         * This constraint ensures that the habeas_data_consent field is set to 1 (true) when a new customer is created.
         */
        // DB::statement('ALTER TABLE customers ADD CONSTRAINT chk_habeas_data_consent CHECK (habeas_data_consent = 1)');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        /** Drop the check constraint if it exists */
        // DB::statement('ALTER TABLE clientes DROP CONSTRAINT chk_activo');
        Schema::dropIfExists('customers');
    }
};
