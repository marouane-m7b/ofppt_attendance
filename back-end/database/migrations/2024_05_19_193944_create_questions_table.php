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
        Schema::create('questions', function (Blueprint $table) {
            $table->id();
            $table->string('file_name');
            $table->string('description');
            $table->string('commentaire')->nullable();
            $table->string('file_path');
            $table->boolean('is_visible')->default(0);
            $table->boolean('is_accepted')->default(0);
            $table->integer('points')->default(0);
            $table->foreignId('secteur_id')->constrained('secteurs')->cascadeOnDelete();
            $table->foreignId('filiere_id')->nullable()->constrained('filieres')->cascadeOnDelete();
            $table->foreignId('designer_id')->constrained('designers')->cascadeOnDelete();
            $table->foreignId('validator_id')->nullable()->constrained('validators')->cascadeOnDelete();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('questions');
    }
};
