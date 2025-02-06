<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('image_libraries', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('beachid')->unsigned();
            $table->string('img_url');
            $table->string('caption');
            $table->timestamps();
            $table->foreign('beachid')->references('id')->on('beaches');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('image_libraries');
    }
};
