import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { axiosClient } from '../../../config/Api/AxiosClient';
import { Container, MenuItem, Select, Button, InputLabel, FormControl, Typography } from '@mui/material';
import { errorToast, successToast } from '../../../config/Toasts/toasts';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

function Appointments() {
    const [date, setDate] = useState(new Date());
    const [appointments, setAppointments] = useState([]);
    const [etudiants, setEtudiants] = useState([]);
    const [newAppointment, setNewAppointment] = useState({
        etudiant_id: '',
        validator_id: '',
        date: date,
        status: 'pending',
    });

    const fetchAppointments = async () => {
        const response = await axiosClient.get('/validator/appointments');
        setAppointments(response.data);
    };

    const fetchEtudiants = async () => {
        const response = await axiosClient.get('/validator/etudiants');
        setEtudiants(response.data);
    };

    useEffect(() => {
        fetchAppointments();
        fetchEtudiants();
    }, []);

    const handleDateChange = (date) => {
        setDate(date);
        setNewAppointment({ ...newAppointment, date });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewAppointment({ ...newAppointment, [name]: value });
    };

    const handleStatusChange = async (id, status) => {
        try {
            await axiosClient.put(`/validator/appointments/${id}`, { status });
            successToast('Statut mis à jour');
            fetchAppointments();
        } catch (error) {
            errorToast(error.response.data.message);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formattedDate = newAppointment.date.toISOString().split('.')[0] + 'Z';
            await axiosClient.post('/validator/appointments', { ...newAppointment, date: formattedDate });
            successToast('Rendez-vous ajouté');
            fetchAppointments();
        } catch (error) {
            errorToast(error.response.data.message);
        }
    };

    const events = appointments.map((appointment) => ({
        id: appointment.id,
        title: `${appointment.etudiant.prenom} ${appointment.etudiant.nom}`,
        start: new Date(appointment.date),
        end: new Date(new Date(appointment.date).setHours(new Date(appointment.date).getHours() + 1)),
        status: appointment.status,
    }));

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Gérer les Rendez-vous
            </Typography>
            <form onSubmit={handleSubmit}>
                <FormControl fullWidth margin="normal">
                    <InputLabel id="etudiant-label">Étudiant</InputLabel>
                    <Select
                        labelId="etudiant-label"
                        name="etudiant_id"
                        value={newAppointment.etudiant_id}
                        onChange={handleInputChange}
                        required
                    >
                        {etudiants?.map((etudiant) => (
                            <MenuItem key={etudiant.id} value={etudiant.id}>
                                {etudiant?.prenom} {etudiant?.nom}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <DatePicker
                        selected={date}
                        onChange={handleDateChange}
                        showTimeSelect
                        dateFormat="MMMM d, yyyy h:mm aa"
                        timeFormat="HH:mm"
                        timeIntervals={60}
                        minTime={new Date().setHours(8, 0)}
                        maxTime={new Date().setHours(18, 0)}
                        timeCaption="time"
                    />
                </FormControl>
                <Button variant="contained" color="primary" type="submit">
                    Ajouter un rendez-vous
                </Button>
            </form>

            <Typography variant="h6" gutterBottom style={{ marginTop: '2rem' }}>
                Liste des rendez-vous
            </Typography>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500, margin: '50px' }}
                messages={{
                    next: "Suivant",
                    previous: "Précédent",
                    today: "Aujourd'hui",
                    month: "Mois",
                    week: "Semaine",
                    day: "Jour",
                }}
                eventPropGetter={(event) => ({
                    style: {
                        backgroundColor: event.status === 'passed' ? 'green' : event.status === 'cancelled' ? 'red' : 'blue',
                        color: 'white',
                    },
                })}
            />
        </Container>
    );
}

export default Appointments;
