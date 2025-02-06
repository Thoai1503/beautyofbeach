<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('reviews', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('beachid')->unsigned();
            $table->bigInteger('accountid')->unsigned();
            $table->string('image_name')->nullable();
            $table->text('comment');
            $table->timestamps();
            $table->foreign('accountid')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('beachid')->references('id')->on('beaches')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reviews');
    }
};
