import { useEffect, useRef, useState } from "react";
import { useAppContext } from "../../config/context/ComponentContext";
import { axiosClient } from "../../config/Api/AxiosClient";
import Swal from "sweetalert2";
import PropTypes from "prop-types";

const CreateFiliere = ({ targetModel, getAllFilieres }) => {
  const { setErrors, errors } = useAppContext();
  const [loading, setLoading] = useState(false);
  const cancelModel = useRef();
  const [secteurs, setSecteurs] = useState([]);

  const addFiliere = async (e) => {
    setLoading(true);
    e.preventDefault();
    const { nom, code, secteur } = e.target.elements;
    try {
      const { data } = await axiosClient.post("admin/filieres", {
        nom: nom.value,
        code: code.value,
        secteur_id: secteur.value,
      });
      await getAllFilieres();
      cancelModel.current.click();
      console.log(data.message);
      Swal.fire({
        title: data.message,
        icon: "success",
      });
      console.log(data);
    } catch (error) {
      setErrors(error.response.data);
    } finally {
      setLoading(false);
    }
  };

  const getSecteurs = async () => {
    try {
      const { data } = await axiosClient.get("/secteur");
      setSecteurs(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSecteurs();
  }, []);

  return (
    <div
      className="modal fade"
      id={targetModel}
      tabIndex={-1}
      aria-labelledby="CreateFiliere"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="CreateFiliere">
              Ajouter Une Filiere
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>
          <div className="modal-body">
            <form onSubmit={addFiliere}>
              <div data-mdb-input-init className="form-outline mb-4">
                <label className="form-label" htmlFor="form2Example1">
                  Nom <span className="text text-danger">*</span>
                </label>
                <input
                  type="text"
                  id="form2Example1"
                  className={
                    "form-control" + (errors?.nom ? " is-invalid" : "")
                  }
                  name="nom"
                />
                <span className="text text-danger">{errors?.nom}</span>
              </div>

              <div data-mdb-input-init className="form-outline mb-4">
                <label className="form-label" htmlFor="form2Example2">
                  Code <span className="text text-danger">*</span>
                </label>
                <input
                  type="text"
                  id="form2Example2"
                  className={
                    "form-control" + (errors?.code ? " is-invalid" : "")
                  }
                  name="code"
                />
                <span className="text text-danger">{errors?.code}</span>
              </div>

              <div data-mdb-input-init className="form-outline mb-4">
                <label className="form-label" htmlFor="form2Example2">
                  Secteur <span className="text text-danger">*</span>
                </label>
                <br />
                <select name="secteur" id="secteur" className="form-select">
                  <option value="">Selectionner une secteur</option>
                  {secteurs?.map((secteur) => (
                    <option key={secteur.id} value={secteur.id}>
                      {secteur.nom}
                    </option>
                  ))}
                </select>
                <span className="text text-danger">{errors?.secteur_id}</span>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  ref={cancelModel}
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? (
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    />
                  ) : (
                    "Ajouter"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

CreateFiliere.propTypes = {
  targetModel: PropTypes.string.isRequired,
  getAllFilieres: PropTypes.func.isRequired,
};

export default CreateFiliere;
