import { useRef, useState } from "react";
import { useAppContext } from "../../config/context/ComponentContext";
import { axiosClient } from "../../config/Api/AxiosClient";
import Swal from "sweetalert2";
import PropTypes from "prop-types";

const UpdateEtudiant = ({ targetModel, etudiant, getAllDesigners, groups }) => {
  const { setErrors, errors } = useAppContext();
  const [loading, setLoading] = useState(false);
  const cancelModel = useRef();

  const updateEtudiant = async (e) => {
    setLoading(true);
    e.preventDefault();
    const { cin, nom, prenom, numero_parent, numero_stagiaire, group } = e.target.elements;
    try {
      const { data } = await axiosClient.put(
        "admin/etudiants/" + etudiant?.id,
        {
          nom: nom?.value,
          prenom: prenom?.value,
          cin: cin?.value,
          group_id: group?.value,
          numero_parent: numero_parent?.value,
          numero_stagiaire: numero_stagiaire?.value,
        }
      );
      await getAllDesigners();
      cancelModel.current.click();
      Swal.fire({
        title: data.message,
        text: data.message,
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

  return (
    <div
      className="modal fade"
      id={targetModel}
      tabIndex={-1}
      aria-labelledby="UpdateEtudiant"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="UpdateEtudiant">
              Modifier Une Etudiant
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>
          <div className="modal-body">
            <form onSubmit={updateEtudiant}>
              <div data-mdb-input-init className="form-outline mb-4">
                <label className="form-label" htmlFor="form2Example2">
                  Nom <span className="text text-danger">*</span>
                </label>
                <input type="text" name="nom" id="form2Example2"
                  defaultValue={etudiant?.nom}
                  className={
                    "form-control" + (errors?.nom ? " is-invalid" : "")
                  } />
                <span className="text text-danger">{errors?.nom}</span>
              </div>

              <div data-mdb-input-init className="form-outline mb-4">
                <label className="form-label" htmlFor="form2Example2">
                  Prenom <span className="text text-danger">*</span>
                </label>
                <input type="text" name="prenom" id="form2Example2"
                  defaultValue={etudiant?.prenom}
                  className={
                    "form-control" + (errors?.prenom ? " is-invalid" : "")
                  } />
                <span className="text text-danger">{errors?.prenom}</span>
              </div>

              <div data-mdb-input-init className="form-outline mb-4">
                <label className="form-label" htmlFor="form2Example2">
                  Cin <span className="text text-danger">*</span>
                </label>
                <input type="text" name="cin" id="form2Example2"
                  defaultValue={etudiant?.cin}
                  className={
                    "form-control" + (errors?.cin ? " is-invalid" : "")
                  } />
                <span className="text text-danger">{errors?.cin}</span>
              </div>

              <div data-mdb-input-init className="form-outline mb-4">
                <label className="form-label" htmlFor="form2Example2">
                  Groupe <span className="text text-danger">*</span>
                </label>
                <select className={`form-select form-select-lg ${(errors?.designer_id ? " is-invalid" : "")}`}
                  defaultValue={etudiant?.group_id}
                  name="group" id="form2Example2"
                >
                  <option selected defaultValue={null}>Select one</option>
                  {groups.map((group) => (
                    <option key={group?.id} value={group?.id}>{group?.nom}</option>
                  ))}
                </select>
                <span className="text text-danger">{errors?.message1}</span>
              </div>

              <div data-mdb-input-init className="form-outline mb-4">
                <label className="form-label" htmlFor="form2Example2">
                  Numero Parent <span className="text text-danger">*</span>
                </label>
                <input type="text" name="numero_parent" id="form2Example2"
                  defaultValue={etudiant?.numero_parent}
                  className={
                    "form-control" + (errors?.numero_parent ? " is-invalid" : "")
                  } />
                <span className="text text-danger">{errors?.numero_parent}</span>
              </div>

              <div data-mdb-input-init className="form-outline mb-4">
                <label className="form-label" htmlFor="form2Example2">
                  Numero Stagiaire <span className="text text-danger">*</span>
                </label>
                <input type="text" name="numero_stagiaire" id="form2Example2"
                  defaultValue={etudiant?.numero_stagiaire}
                  className={
                    "form-control" + (errors?.numero_stagiaire ? " is-invalid" : "")
                  } />
                <span className="text text-danger">{errors?.numero_stagiaire}</span>
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
                    "modifier"
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

UpdateEtudiant.propTypes = {
  targetModel: PropTypes.object.isRequired,
  etudiant: PropTypes.object.isRequired,
  getAllDesigners: PropTypes.func.isRequired,
  groups: PropTypes.func.isRequired,
};

export default UpdateEtudiant;
