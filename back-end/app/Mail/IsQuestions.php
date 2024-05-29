<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class IsQuestions extends Mailable
{
    use Queueable, SerializesModels;

    protected $questions;
    protected $isAccepted;

    /**
     * Create a new message instance.
     */
    public function __construct($questions, $isAccepted)
    {
        $this->questions = $questions;
        $this->isAccepted = $isAccepted;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        if ($this->isAccepted) {
            return new Envelope(
                subject: 'Votre file a bien été acceptée',
            );
        }
        return new Envelope(
            subject: 'Votre file a été refusee',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'Emails.IsQuestions',
            with: [
                'questions' => $this->questions,
                'isAccepted' => $this->isAccepted
            ]
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
