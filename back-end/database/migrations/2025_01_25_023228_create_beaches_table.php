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
        Schema::create('beaches', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('avartar_url');
            $table->text('description');
            $table->bigInteger('nationid')->unsigned();
            $table->string('visitor')->nullable()->default(0);
            $table->double('ratingScore')->unsigned()->default(0);
            $table->string('map_html_code', 1000)->nullable();
            $table->timestamps();
            $table->foreign('nationid')->references('id')->on('nations');
        
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('beaches');
    }
};
