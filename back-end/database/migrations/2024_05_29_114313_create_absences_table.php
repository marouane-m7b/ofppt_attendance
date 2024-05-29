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
        Schema::create('absences', function (Blueprint $table) {
            $table->id();
            $table->double('duree');
            $table->string('commentaire');
            $table->boolean('is_justified')->default(false);
            $table->foreignId('etudiant_id')->nullable()->constrained('etudiants')->cascadeOnDelete();
            $table->foreignId('designer_id')->nullable()->constrained('designers')->cascadeOnDelete();
            $table->foreignId('validator_id')->nullable()->constrained('validators')->cascadeOnDelete();
            $table->string('certificat')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('absences');
    }
};
