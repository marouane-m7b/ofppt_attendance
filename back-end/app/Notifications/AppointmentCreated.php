<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class AppointmentCreated extends Notification
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
        $mailMessage = new MailMessage;

        $date = $this->appointment->date;
        $etudiant = $this->appointment->etudiant;

        if ($notifiable->is_consultant) {
            $mailMessage->subject('Notification de rendez-vous créé')
                ->greeting('Bonjour,')
                ->line('Nous avons envoyé des emails à l\'étudiant et au CGCP.')
                ->line('Merci pour votre attention.');
        } elseif ($notifiable->is_cgcp) {
            $mailMessage->subject('Notification de rendez-vous étudiant')
                ->greeting('Bonjour,')
                ->line("Veuillez venir pour gérer l'étudiant {$etudiant->prenom} {$etudiant->nom} le {$date}.")
                ->line('Merci pour votre attention.');
        } else {
            $mailMessage->subject('Notification de rendez-vous')
                ->greeting('Bonjour,')
                ->line("Vous avez un rendez-vous programmé le {$date}.")
                ->line('Merci pour votre attention.');
        }

        return $mailMessage;
    }
}
