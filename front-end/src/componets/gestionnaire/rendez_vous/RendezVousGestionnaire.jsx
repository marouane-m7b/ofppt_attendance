import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { axiosClient } from '../../../config/Api/AxiosClient';
import { Container, MenuItem, Select, Button, InputLabel, FormControl, Typography, List, ListItem, ListItemText, ListItemSecondaryAction } from '@mui/material';
import { errorToast, successToast } from '../../../config/Toasts/toasts';

function Appointments() {
    const [date, setDate] = useState(new Date());
    const [appointments, setAppointments] = useState([]);
    const [etudiants, setEtudiants] = useState([]);
    const [validators, setValidators] = useState([]);
    const [newAppointment, setNewAppointment] = useState({
        etudiant_id: '',
        validator_id: '',
        date: new Date(),
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

    const fetchValidators = async () => {
        const response = await axiosClient.get('/validator/validators');
        setValidators(response.data);
    };

    useEffect(() => {
        fetchAppointments();
        fetchEtudiants();
        fetchValidators();
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
                    <InputLabel id="validator-label">Consultant</InputLabel>
                    <Select
                        labelId="validator-label"
                        name="validator_id"
                        value={newAppointment.validator_id}
                        onChange={handleInputChange}
                        required
                    >
                        {validators?.map((validator) => (
                            <MenuItem key={validator.id} value={validator.id}>
                                {validator?.first_name} {validator?.last_name}
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
                        minTime={new Date().setHours(9, 0)}
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
            <List>
                {appointments.map((appointment) => (
                    <ListItem key={appointment.id}>
                        <ListItemText
                            primary={`${appointment.etudiant.prenom} ${appointment.etudiant.nom} avec ${appointment.validator.first_name} ${appointment.validator.last_name}`}
                            secondary={`${appointment.date} - ${appointment.status}`}
                        />
                        <ListItemSecondaryAction>
                            <FormControl>
                                <Select
                                    value={appointment.status}
                                    onChange={(e) => handleStatusChange(appointment.id, e.target.value)}
                                >
                                    <MenuItem value="pending">En attente</MenuItem>
                                    <MenuItem value="passed">Passé</MenuItem>
                                    <MenuItem value="cancelled">Annulé</MenuItem>
                                </Select>
                            </FormControl>
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>
        </Container>
    );
}

export default Appointments;
