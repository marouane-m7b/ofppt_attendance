import { useState, useEffect } from "react";
import { useAppContext } from "../../config/context/ComponentContext";
import { axiosClient } from "../../config/Api/AxiosClient";
import { Modal, Box, TextField, Button, Typography, CircularProgress, MenuItem, IconButton } from '@mui/material';
import PropTypes from "prop-types";
import { errorToast, successToast } from "../../config/Toasts/toasts";
import { Add, Remove } from '@mui/icons-material';

const CreateGroup = ({ open, onClose, getAllGroups, filieres }) => {
  const { setErrors, errors } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [designers, setDesigners] = useState([]);
  const [assignedDesigners, setAssignedDesigners] = useState([{ id: '', modules: '' }]);

  useEffect(() => {
    const fetchDesigners = async () => {
      try {
        const { data } = await axiosClient.get("/admin/designers");
        setDesigners(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDesigners();
  }, []);

  const handleAddDesigner = () => {
    setAssignedDesigners([...assignedDesigners, { id: '', modules: '' }]);
  };

  const handleRemoveDesigner = (index) => {
    const newAssignedDesigners = [...assignedDesigners];
    newAssignedDesigners.splice(index, 1);
    setAssignedDesigners(newAssignedDesigners);
  };

  const handleDesignerChange = (index, field, value) => {
    const newAssignedDesigners = [...assignedDesigners];
    newAssignedDesigners[index][field] = value;
    setAssignedDesigners(newAssignedDesigners);
  };

  const addGroup = async (e) => {
    setLoading(true);
    e.preventDefault();
    const { nom, filiere } = e.target.elements;
    try {
      await axiosClient.post("admin/groups", {
        nom: nom.value,
        filiere_id: filiere.value,
        designers: assignedDesigners,
      });
      await getAllGroups();
      onClose();
      successToast("Group added successfully");
    } catch (error) {
      errorToast('An error occurred');
      setErrors(error?.response?.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ p: 4, backgroundColor: 'white', borderRadius: 1, maxWidth: 600, margin: 'auto', mt: 5 }}>
        <Typography variant="h6" component="h2" gutterBottom>
          Add Group
        </Typography>
        <form onSubmit={addGroup}>
          <TextField
            label="Name"
            name="nom"
            fullWidth
            margin="normal"
            error={!!errors?.nom}
            helperText={errors?.nom}
          />
          <TextField
            select
            label="Filiere"
            name="filiere"
            fullWidth
            margin="normal"
          >
            <MenuItem value="">Select a filiere</MenuItem>
            {filieres.map((filiere) => (
              <MenuItem key={filiere.id} value={filiere.id}>
                {filiere.nom}
              </MenuItem>
            ))}
          </TextField>
          <Typography variant="h6" component="h2" gutterBottom>
            Formateur
          </Typography>
          {assignedDesigners.map((designer, index) => (
            <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 2 }}>
              <TextField
                select
                label="Formateur"
                value={designer.id}
                onChange={(e) => handleDesignerChange(index, 'id', e.target.value)}
                fullWidth
                margin="normal"
                helperText="Sélectionnez un formateur"
              >
                <MenuItem value="">Select a formateur</MenuItem>
                {designers.map((designerOption) => (
                  <MenuItem key={designerOption.id} value={designerOption.id}>
                    {designerOption.first_name} {designerOption.last_name}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                label="Modules"
                value={designer.modules}
                onChange={(e) => handleDesignerChange(index, 'modules', e.target.value.split(','))}
                fullWidth
                margin="normal"
                helperText="Liste de modules séparés par des virgules"/>
              <IconButton onClick={() => handleRemoveDesigner(index)} color="error">
                <Remove />
              </IconButton>
            </Box>
          ))}
          <Button onClick={handleAddDesigner} variant="contained" color="primary" sx={{ mb: 2 }}>
            <Add /> Add Designer
          </Button>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Button onClick={onClose} variant="contained" color="secondary" sx={{ mr: 1 }}>
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary" disabled={loading}>
              {loading ? <CircularProgress size={12} /> : 'Add'}
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

CreateGroup.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  getAllGroups: PropTypes.func.isRequired,
  filieres: PropTypes.array.isRequired,
};

export default CreateGroup;
