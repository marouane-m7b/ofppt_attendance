import React, { useState } from "react";
import { useAppContext } from "../../config/context/ComponentContext";
import { axiosClient } from "../../config/Api/AxiosClient";
import Swal from "sweetalert2";
import { Modal, Box, TextField, Button, Typography } from '@mui/material';
import PropTypes from "prop-types";

const UpdateValidator = ({ open, onClose, validator, getAllGestionnaires }) => {
  const { setErrors, errors } = useAppContext();
  const [loading, setLoading] = useState(false);

  const updateValidator = async (e) => {
    setLoading(true);
    e.preventDefault();
    const { first_name, last_name, email } = e.target.elements;
    try {
      const { data } = await axiosClient.put(
        "admin/validators/" + validator.id,
        {
          first_name: first_name.value,
          last_name: last_name.value,
          email: email.value,
        }
      );
      await getAllGestionnaires();
      onClose();
      Swal.fire({
        text: data.message,
        icon: "success",
      });
    } catch (error) {
      setErrors(error.response.data.errors);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ p: 4, backgroundColor: 'white', borderRadius: 1, maxWidth: 400, margin: 'auto', mt: 5 }}>
        <Typography variant="h6" component="h2" gutterBottom>
          Modifier Une Validateur
        </Typography>
        <form onSubmit={updateValidator}>
          <TextField 
            label="Nom" 
            name="first_name" 
            defaultValue={validator?.first_name} 
            fullWidth 
            margin="normal" 
            error={!!errors?.first_name} 
            helperText={errors?.first_name}
          />
          <TextField 
            label="Prenom" 
            name="last_name" 
            defaultValue={validator?.last_name} 
            fullWidth 
            margin="normal" 
            error={!!errors?.last_name} 
            helperText={errors?.last_name}
          />
          <TextField 
            label="E-mail" 
            name="email" 
            type="email" 
            defaultValue={validator?.email} 
            fullWidth 
            margin="normal" 
            error={!!errors?.email} 
            helperText={errors?.email}
          />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Button onClick={onClose} variant="contained" color="secondary" sx={{ mr: 1 }}>
              Annuler
            </Button>
            <Button type="submit" variant="contained" color="primary" disabled={loading}>
              {loading ? 'Modification...' : 'Modifier'}
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

UpdateValidator.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  validator: PropTypes.object.isRequired,
  getAllGestionnaires: PropTypes.func.isRequired,
};

export default UpdateValidator;
