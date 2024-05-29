import { useEffect, useRef, useState } from "react";
import { useAppContext } from "../../config/context/ComponentContext";
import { axiosClient } from "../../config/Api/AxiosClient";
import Swal from "sweetalert2";

const UpdateEtudiant = ({ targetModel, etudiant, getAllDesigners }) => {
  const { navigateTo, setErrors, errors } = useAppContext();
  const [loading, setLoading] = useState(false);
  const cancelModel = useRef();
  const [formateurs, setFormateurs] = useState([]);
  const [filieres, setFilieres] = useState([]);

  const updateEtudiant = async (e) => {
    setLoading(true);
    e.preventDefault();
    const { cin, designer, filiere, nom, prenom, numero_parent, numero_stagiaire } = e.target.elements;
    try {
      const { data } = await axiosClient.put(
        "admin/etudiants/" + etudiant?.id,
        {
          nom: nom?.value,
          prenom: prenom?.value,
          cin: cin?.value,
          designer_id: designer?.value,
          filiere_id: filiere?.value,
          numero_parent: numero_parent?.value,
          numero_stagiaire: numero_stagiaire?.value,
        }
      );
      await getAllDesigners();
      cancelModel.current.click();
      Swal.fire({
        title: 'Etudiant modifié',
        text: 'Etudiant modifié avec succes',
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
  const getFormateur = async () => {
    const { data } = await axiosClient.get("admin/designers");
    setFormateurs(data);
  };
  const getFiliere = async () => {
    const { data } = await axiosClient.get("admin/filieres");
    setFilieres(data);
  };
  useEffect(() => {
    getFormateur()
    getFiliere()
  }, [])

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
                  Formateur <span className="text text-danger">*</span>
                </label>
                <select className={`form-select form-select-lg ${(errors?.designer_id ? " is-invalid" : "")}`}
                  defaultValue={etudiant?.designer_id}
                  name="designer" id="form2Example2"
                >
                  <option selected defaultValue={null}>Select one</option>
                  {formateurs.map((formateur) => (
                    <option key={formateur?.id} value={formateur?.id}>{formateur?.first_name} {formateur?.last_name}</option>
                  ))}
                </select>
                <span className="text text-danger">{errors?.message1}</span>
              </div>

              <div data-mdb-input-init className="form-outline mb-4">
                <label className="form-label" htmlFor="form2Example2">
                  Filiere <span className="text text-danger">*</span>
                </label>
                <select className={`form-select form-select-lg ${(errors?.designer_id ? " is-invalid" : "")}`}
                  defaultValue={etudiant?.filiere_id}
                  name="filiere" id="form2Example2"
                >
                  <option selected>Select one</option>
                  {filieres.map((filiere) => (
                    <option key={filiere?.id} value={filiere?.id}>{filiere?.nom}</option>
                  ))}
                </select>
                <span className="text text-danger">{errors?.message2}</span>
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

export default UpdateEtudiant;
