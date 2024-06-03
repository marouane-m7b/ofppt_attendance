import { useState } from "react";
import { useAppContext } from "../../config/context/ComponentContext";
import { axiosClient } from "../../config/Api/AxiosClient";
import Swal from "sweetalert2";
import { Modal, Box, TextField, Button, Typography, CircularProgress } from '@mui/material';
import PropTypes from "prop-types";

const CreateSecteur = ({ open, onClose, getAllSecteurs }) => {
  const { setErrors, errors } = useAppContext();
  const [loading, setLoading] = useState(false);

  const addSecteur = async (e) => {
    setLoading(true);
    e.preventDefault();
    const { nom } = e.target.elements;
    try {
      const { data } = await axiosClient.post("admin/secteurs", {
        nom: nom.value,
      });
      await getAllSecteurs();
      onClose();
      Swal.fire({
        title: data.message,
        icon: "success",
      });
    } catch (error) {
      setErrors(error.response.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ p: 4, backgroundColor: 'white', borderRadius: 1, maxWidth: 400, margin: 'auto', mt: 5 }}>
        <Typography variant="h6" component="h2" gutterBottom>
          Ajouter Une Secteur
        </Typography>
        <form onSubmit={addSecteur}>
          <TextField
            label="Nom"
            name="nom"
            fullWidth
            margin="normal"
            error={!!errors?.nom}
            helperText={errors?.nom}
          />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Button onClick={onClose} variant="contained" color="secondary" sx={{ mr: 1 }}>
              Annuler
            </Button>
            <Button type="submit" variant="contained" color="primary" disabled={loading}>
              {loading ? <CircularProgress size={12} /> : 'Ajouter'}
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

CreateSecteur.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  getAllSecteurs: PropTypes.func.isRequired,
}

export default CreateSecteur;
