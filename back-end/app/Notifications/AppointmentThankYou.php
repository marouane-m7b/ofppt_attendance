<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Carbon\Carbon;

class AppointmentThankYou extends Notification
{
    use Queueable;

    protected $appointment;

    public function __construct($appointment)
    {
        $this->appointment = $appointment;
    }

    public function via($notifiable)
    {
        return ['mail'];
    }

    public function toMail($notifiable)
    {
        $etudiant = $this->appointment->etudiant;
        $rdv_time = Carbon::parse($this->appointment->rdv_time)->format('d-m-Y H:i');

        return (new MailMessage)
                    ->subject('Merci pour votre présence')
                    ->greeting('Bonjour,')
                    ->line("Merci d'avoir assisté au rendez-vous avec l'étudiant {$etudiant->prenom} {$etudiant->nom}.")
                    ->line("Le rendez-vous a eu lieu le {$rdv_time}.")
                    ->line('Cordialement,')
                    ->line('L\'équipe.');
    }
}
