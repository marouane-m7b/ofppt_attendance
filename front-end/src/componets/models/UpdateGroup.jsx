import { useState } from "react";
import { useAppContext } from "../../config/context/ComponentContext";
import { axiosClient } from "../../config/Api/AxiosClient";
import { Modal, Box, TextField, Button, Typography, CircularProgress } from '@mui/material';
import PropTypes from "prop-types";
import { errorToast, successToast } from "../../config/Toasts/toasts";

const UpdateGroup = ({ open, onClose, group, getAllGroups, filieres }) => {
  const { setErrors, errors } = useAppContext();
  const [loading, setLoading] = useState(false);

  const updateGroup = async (e) => {
    setLoading(true);
    e.preventDefault();
    const { nom, filiere } = e.target.elements;
    try {
      await axiosClient.put(
        "admin/groups/" + group?.id,
        {
          nom: nom.value,
          filiere_id: filiere.value,
        }
      );
      await getAllGroups();
      onClose();
      successToast("Group updated successfully");
    } catch (error) {
      errorToast('An error occurred');
      setErrors(error?.response?.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ p: 4, backgroundColor: 'white', borderRadius: 1, maxWidth: 400, margin: 'auto', mt: 5 }}>
        <Typography variant="h6" component="h2" gutterBottom>
          Update Group
        </Typography>
        <form onSubmit={updateGroup}>
          <TextField
            label="Name"
            name="nom"
            defaultValue={group?.nom}
            fullWidth
            margin="normal"
            error={!!errors?.nom}
            helperText={errors?.nom}
          />
          <TextField
            select
            label="Filiere"
            name="filiere"
            defaultValue={group?.filiere_id}
            fullWidth
            margin="normal"
            SelectProps={{
              native: true,
            }}
          >
            <option value="">Select a filiere</option>
            {filieres.map((filiere) => (
              <option key={filiere.id} value={filiere.id}>
                {filiere.nom}
              </option>
            ))}
          </TextField>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Button onClick={onClose} variant="contained" color="secondary" sx={{ mr: 1 }}>
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary" disabled={loading}>
              {loading ? <CircularProgress size={12} /> : 'Update'}
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

UpdateGroup.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  group: PropTypes.object.isRequired,
  getAllGroups: PropTypes.func.isRequired,
  filieres: PropTypes.array.isRequired,
};

export default UpdateGroup;
