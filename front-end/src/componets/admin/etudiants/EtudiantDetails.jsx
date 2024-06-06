import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CircularProgress, Typography, Box, Paper, Grid, Card, CardContent, CardHeader, Divider, Button } from '@mui/material';
import { axiosClient } from '../../../config/Api/AxiosClient';
import { errorToast, successToast } from '../../../config/Toasts/toasts';

function EtudiantDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [etudiant, setEtudiant] = useState(null);
    const [loading, setLoading] = useState(true);
    const [totalDureeAbsences, setTotalDureeAbsences] = useState(0);

    useEffect(() => {
        const fetchEtudiantData = async () => {
            try {
                const { data } = await axiosClient.get(`admin/getEtudiantData/${id}`);
                setEtudiant(data.etudiant);
                setTotalDureeAbsences(data.total_duree_absences);
            } catch (error) {
                errorToast('Une erreur s\'est produite lors de la récupération des données de l\'étudiant');
            } finally {
                setLoading(false);
            }
        };

        fetchEtudiantData();
    }, [id]);

    const handleSendAlert = async () => {
        try {
            await axiosClient.post('admin/sendAlert', {
                etudiant_id: id,
                total_absences: totalDureeAbsences
            });
            successToast('Alerte envoyée avec succès');
        } catch (error) {
            errorToast('Une erreur s\'est produite lors de l\'envoi de l\'alerte');
        }
    };

    if (loading) {
        return <CircularProgress />;
    }

    if (!etudiant) {
        return <Typography>Aucune donnée étudiante trouvée</Typography>;
    }

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>Détails de l&apos;étudiant</Typography>

            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardHeader title="Informations Générales" />
                        <Divider />
                        <CardContent>
                            <Typography variant="h6">CIN: {etudiant.cin}</Typography>
                            <Typography variant="h6">Nom: {etudiant.nom} {etudiant.prenom}</Typography>
                            <Typography variant="h6">Email: {etudiant.email}</Typography>
                            <Typography variant="h6">Numéro de Stagiaire: {etudiant.numero_stagiaire}</Typography>
                            <Typography variant="h6">Numéro de Parent: {etudiant.numero_parent}</Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Card>
                        <CardHeader title="Informations Académiques" />
                        <Divider />
                        <CardContent>
                            <Typography variant="h6">Groupe: {etudiant.group.nom}</Typography>
                            <Typography variant="h6">Filière: {etudiant.group.filiere.nom}</Typography>
                            <Typography variant="h6">Durée Totale des Absences: {totalDureeAbsences} heures</Typography>
                            {totalDureeAbsences > 5 && (
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={handleSendAlert}
                                    sx={{ mt: 2 }}
                                >
                                    Envoyer une alerte
                                </Button>
                            )}
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12}>
                    <Card>
                        <CardHeader title="Alertes" />
                        <Divider />
                        <CardContent>
                            {etudiant?.alerts?.length > 0 ? (
                                etudiant?.alerts?.map(alert => (
                                    <Paper key={alert?.id} sx={{ mb: 2, p: 2 }}>
                                        <Typography>ID de l&apos;Alerte: {alert.id}</Typography>
                                        <Typography>Durée: {alert?.duree}</Typography>
                                        <Typography>Commentaire: {alert?.commentaire}</Typography>
                                        <Typography>Validée: {alert?.is_validated ? 'Oui' : 'Non'}</Typography>
                                    </Paper>
                                ))
                            ) : (
                                <Typography>Aucune alerte</Typography>
                            )}
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12}>
                    <Card>
                        <CardHeader title="Absences" />
                        <Divider />
                        <CardContent>
                            {etudiant?.absences.length > 0 ? (
                                etudiant?.absences?.map(absence => (
                                    <Paper key={absence.id} sx={{ mb: 2, p: 2 }}>
                                        <Typography>ID de l&apos;Absence: {absence?.id}</Typography>
                                        <Typography>Date: {absence?.date}</Typography>
                                        <Typography>Durée: {absence?.duree}</Typography>
                                        <Typography>Certificat: {absence?.certificat}</Typography>
                                        <Typography>Commentaire: {absence?.commentaire}</Typography>
                                        <Typography>Statut: {absence?.statut}</Typography>
                                        <Typography>Justifiée: {absence?.is_justified ? 'Oui' : 'Non'}</Typography>
                                        <Button
                                            variant="outlined"
                                            onClick={() => navigate(`/administrateur/absence/${absence.id}`)}
                                        >
                                            Justifier l&apos;absence
                                        </Button>
                                    </Paper>
                                ))
                            ) : (
                                <Typography>Aucune absence</Typography>
                            )}
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12}>
                    <Card>
                        <CardHeader title="Observations" />
                        <Divider />
                        <CardContent>
                            <Typography variant="h6">Observations du Formateur: {etudiant?.observations_formateur || 'N/A'}</Typography>
                            <Typography variant="h6">Observations du Conseiller: {etudiant?.observations_conseiller || 'N/A'}</Typography>
                            <Typography variant="h6">Observations du CGCP: {etudiant?.observations_cgcp || 'N/A'}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
}

export default EtudiantDetails;
