<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Carbon\Carbon;

class AppointmentApology extends Notification
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
                    ->subject('Désolé pour l\'annulation')
                    ->greeting('Bonjour,')
                    ->line("Nous sommes désolés d'annoncer que le rendez-vous avec l'étudiant {$etudiant->prenom} {$etudiant->nom} prévu pour le {$rdv_time} a été annulé.")
                    ->line('Cordialement,')
                    ->line('L\'équipe.');
    }
}
