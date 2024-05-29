import { useEffect, useRef, useState } from "react";
import { useAppContext } from "../../config/context/ComponentContext";
import { axiosClient } from "../../config/Api/AxiosClient";
import Swal from "sweetalert2";
import PropTypes from "prop-types";

const CreateAbsence = ({ targetModel, getAllDesigners }) => {
  const { setErrors, errors } = useAppContext();
  const [loading, setLoading] = useState(false);
  const cancelModel = useRef();
  const addAbsence = async (e) => {
    setLoading(true);
    e.preventDefault();
    const { etudiant, commantaire, duree } = e.target.elements;
    try {
      const { data } = await axiosClient.post("admin/designers", {
        etudiant: etudiant.value,
        commantaire: commantaire.value,
        duree: duree.value,
      });
      await getAllDesigners();
      cancelModel.current.click();
      Swal.fire({
        title: data.message,
        text: "Mote de passe : " + data.password,
        icon: "success",
      });
      console.log(data);
    } catch (error) {
      console.log(error);
      setErrors(error.response.data.errors);
    } finally {
      setLoading(false);
    }
  };
  const [etudiants, setEtudiants] = useState([
    {
      nom: 'zakaria',
      prenom: 'el houmidi',
      filiere: 'full stack',
      cin: 'bj2020',
      numero_telephone: '0632287513',
      numero_parent: '0632287513',
    },
    {
      nom: 'marwan',
      prenom: 'mahboub',
      filiere: 'full stack',
      cin: 'bj2020',
      numero_telephone: '0632287513',
      numero_parent: '0632287513',
    }
  ]);

  return (
    <div
      className="modal fade"
      id={targetModel}
      tabIndex={-1}
      aria-labelledby="CreateAbsence"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="CreateAbsence">
              Ajouter Une Absence
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>
          <div className="modal-body">
            <form onSubmit={addAbsence}>
              <div data-mdb-input-init className="form-outline mb-4">
                <label className="form-label" htmlFor="form2Example2">
                  Etudiant <span className="text text-danger">*</span>
                </label>
                <div className="mb-3">
                  <select
                    className={`form-select form-select-lg ${(errors?.etudiant ? " is-invalid" : "")}`}
                    type="etudiant"
                    id="form2Example2"
                    name="etudiant"
                  >
                    <option selected>Select one</option>
                    {etudiants?.map((etudiant) => (
                      <option key={etudiant?.id} value={etudiant?.id}>{etudiant?.nom} {etudiant?.prenom}</option>
                    ))}
                  </select>
                </div>

                <span className="text text-danger">{errors?.etudiant}</span>
              </div>

              <div data-mdb-input-init className="form-outline mb-4">
                <label className="form-label" htmlFor="form2Example2">
                  Commentaire <span className="text text-danger">*</span>
                </label>
                <textarea type="commentaire" name="commentaire" id="form2Example2"
                  className={
                    "form-control" + (errors?.commentaire ? " is-invalid" : "")
                  }></textarea>
                <span className="text text-danger">{errors?.commentaire}</span>
              </div>

              <div data-mdb-input-init className="form-outline mb-4">
                <label className="form-label" htmlFor="form2Example2">
                  Duree <span className="text text-danger">*</span>
                </label>
                <input type="number" name="duree" id="form2Example2"
                  className={
                    "form-control" + (errors?.duree ? " is-invalid" : "")
                  } />
                <span className="text text-danger">{errors?.duree}</span>
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

CreateAbsence.propTypes = {
  targetModel: PropTypes.string.isRequired,
  getAllDesigners: PropTypes.func.isRequired,
};

export default CreateAbsence;
