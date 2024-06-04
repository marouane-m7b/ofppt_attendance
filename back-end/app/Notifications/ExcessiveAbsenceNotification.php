<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ExcessiveAbsenceNotification extends Notification
{
    use Queueable;

    protected $etudiant;
    protected $totalDuree;
    protected $role;

    public function __construct($etudiant, $totalDuree, $role)
    {
        $this->etudiant = $etudiant;
        $this->totalDuree = $totalDuree;
        $this->role = $role;
    }

    public function via($notifiable)
    {
        return ['mail'];
    }

    public function toMail($notifiable)
    {
        $mailMessage = new MailMessage;

        switch ($this->role) {
            case 'consultant':
                $mailMessage->subject('Avertissement d\'absences excessives')
                    ->line("L'étudiant {$this->etudiant->prenom} {$this->etudiant->nom} a dépassé {$this->totalDuree} heures d'absence non justifiée.")
                    ->line('Veuillez prendre les mesures nécessaires.')
                    ->action('Planifier un RDV', url('http://localhost:3000/gestionnaire/rdvs'))
                    ->line('Merci pour votre attention.');
                break;
            case 'cgcp':
                $mailMessage->subject('Avertissement d\'absences excessives')
                    ->line("L'étudiant {$this->etudiant->prenom} {$this->etudiant->nom} a dépassé {$this->totalDuree} heures d'absence non justifiée.")
                    ->line('Veuillez attendre un RDV du consultant.')
                    ->line('Merci pour votre attention.');
                break;
            case 'etudiant':
                $mailMessage->subject('Avertissement d\'absences excessives')
                    ->line("Vous avez dépassé {$this->totalDuree} heures d'absence non justifiée.")
                    ->line('Veuillez contacter votre consultant pour un RDV.')
                    ->line('Merci pour votre attention.');
                break;
            default:
                $mailMessage->subject('Avertissement d\'absences excessives')
                    ->line("L'étudiant {$this->etudiant->prenom} {$this->etudiant->nom} a dépassé {$this->totalDuree} heures d'absence non justifiée.")
                    ->line('Merci pour votre attention.');
                break;
        }

        return $mailMessage;
    }
}
