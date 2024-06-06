<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class AbsenceAlert extends Notification
{
    use Queueable;

    protected $hours;

    public function __construct($hours)
    {
        $this->hours = $hours;
    }

    public function via($notifiable)
    {
        return ['mail'];
    }

    public function toMail($notifiable)
    {
        return (new MailMessage)
                    ->subject('Alerte d\'Absence')
                    ->line('Vous avez dépassé ' . $this->hours . ' heures d\'absence.')
                    ->action('Consulter vos absences', url('/etudiant/absences'))
                    ->line('Merci de votre attention.');
    }
}
