import { useRef, useState } from "react";
import { useAppContext } from "../../config/context/ComponentContext";
import { axiosClient } from "../../config/Api/AxiosClient";
import PropTypes from "prop-types";
import { errorToast, successToast } from "../../config/Toasts/toasts";

const UpdateFiliere = ({ targetModel, filiere, getAllFilieres, secteurs }) => {
  const { setErrors, errors } = useAppContext();
  const [loading, setLoading] = useState(false);
  const cancelModel = useRef();

  const UpdateFiliere = async (e) => {
    setLoading(true);
    e.preventDefault();
    const { nom, code, secteur } = e.target.elements;
    try {
      await axiosClient.put(
        "admin/filieres/" + filiere?.id,
        {
          nom: nom.value,
          code: code.value,
          secteur_id: secteur.value,
        }
      );
      await getAllFilieres();
      cancelModel.current.click();
      successToast("Filière modifie avec succes");
    } catch (error) {
      errorToast('Une erreur est survenue');
      setErrors(error?.response?.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="modal fade"
      id={targetModel}
      tabIndex={-1}
      aria-labelledby="UpdateFiliere"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="UpdateFiliere">
              Modifier Une Filière
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>
          <div className="modal-body">
            <form onSubmit={UpdateFiliere}>
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
                  defaultValue={filiere?.nom}
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
                  defaultValue={filiere?.code}
                  name="code"
                />
                <span className="text text-danger">{errors?.code}</span>
              </div>

              <div data-mdb-input-init className="form-outline mb-4">
                <label className="form-label" htmlFor="form2Example2">
                  Secteur <span className="text text-danger">*</span>
                </label>
                <br />
                <select defaultValue={filiere?.secteur_id} name="secteur" id="secteur" className="form-select">
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
                    "Modifier"
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

UpdateFiliere.propTypes = {
  targetModel: PropTypes.string.isRequired,
  filiere: PropTypes.object.isRequired,
  getAllFilieres: PropTypes.func.isRequired,
  secteurs: PropTypes.array.isRequired,
};

export default UpdateFiliere;
