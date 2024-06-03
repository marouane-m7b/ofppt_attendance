import { useState } from "react";
import { useAppContext } from "../../config/context/ComponentContext";
import { axiosClient } from "../../config/Api/AxiosClient";
import PropTypes from "prop-types";
import { Box, Button, CircularProgress, TextField, Typography } from "@mui/material";
import { errorToast, successToast } from "../../config/Toasts/toasts";

const UpdateDesigner = ({ designer, getAllDesigners, handleClose }) => {
  const { setErrors, errors } = useAppContext();
  const [loading, setLoading] = useState(false);

  const updateDesigner = async (e) => {
    setLoading(true);
    e.preventDefault();
    const { first_name, last_name, email } = e.target.elements;
    try {
      const { data } = await axiosClient.put(
        "admin/designers/" + designer?.id,
        {
          first_name: first_name.value,
          last_name: last_name.value,
          email: email.value,
        }
      );
      await getAllDesigners();
      handleClose();
      successToast(data.message, 5000, "top-right");
    } catch (error) {
      errorToast("Une erreur est survenue");
      setErrors(error.response.data.errors);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={updateDesigner} sx={{ p: 2 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>Modifier Une Formateur</Typography>
      <TextField
        label="Nom"
        fullWidth
        name="first_name"
        defaultValue={designer?.first_name}
        error={!!errors?.first_name}
        helperText={errors?.first_name}
        margin="normal"
      />
      <TextField
        label="Prenom"
        fullWidth
        name="last_name"
        defaultValue={designer?.last_name}
        error={!!errors?.last_name}
        helperText={errors?.last_name}
        margin="normal"
      />
      <TextField
        label="E-mail"
        fullWidth
        name="email"
        defaultValue={designer?.email}
        error={!!errors?.email}
        helperText={errors?.email}
        margin="normal"
      />
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
        <Button onClick={handleClose} variant="contained" color="secondary" sx={{ mr: 2 }}>
          Annuler
        </Button>
        <Button type="submit" variant="contained" color="primary" disabled={loading}>
          {loading ? <CircularProgress size={24} /> : 'Modifier'}
        </Button>
      </Box>
    </Box>
  );
};

UpdateDesigner.propTypes = {
  designer: PropTypes.object.isRequired,
  getAllDesigners: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default UpdateDesigner;
