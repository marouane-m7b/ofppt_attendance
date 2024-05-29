import { useEffect, useRef, useState } from "react";
import { useAppContext } from "../../config/context/ComponentContext";
import { axiosClient } from "../../config/Api/AxiosClient";
import PropTypes from "prop-types";
import Swal from "sweetalert2";

const CreateEtudiant = ({ targetModel, getAllDesigners }) => {
  const { setErrors, errors } = useAppContext();
  const [loading, setLoading] = useState(false);
  const cancelModel = useRef();
  const addEtudiant = async (e) => {
    setLoading(true);

    e.preventDefault();
    const { cin, designer, filiere, nom, prenom, numero_parent, numero_stagiaire } = e.target.elements;

    try {
      const data = await axiosClient.post("admin/etudiants", {
        nom: nom?.value,
        prenom: prenom?.value,
        cin: cin?.value,
        designer_id: designer?.value,
        filiere_id: filiere?.value,
        numero_parent: numero_parent?.value,
        numero_stagiaire: numero_stagiaire?.value,
      });

      console.log(data);
      Swal.fire({
        title: data.message,
        text: data.message,
        icon: "success",
        timer: 1500
      })
      await getAllDesigners();
      cancelModel.current.click();
    } catch (error) {
      console.error(error);
      setErrors(error.response.data);
      console.log(error.response.data);
    } finally {
      setLoading(false);
    }
  };
  const [formateurs, setFormateurs] = useState([]);
  const [filieres, setFilieres] = useState([]);
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
      aria-labelledby="CreateAbsence"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="CreateAbsence">
              Ajouter Une Etudiant
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>
          <div className="modal-body">
            <form onSubmit={addEtudiant}>
              <div data-mdb-input-init className="form-outline mb-4">
                <label className="form-label" htmlFor="form2Example2">
                  Nom <span className="text text-danger">*</span>
                </label>
                <input type="text" name="nom" id="form2Example2"
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

CreateEtudiant.propTypes = {
  targetModel: PropTypes.string.isRequired,
  getAllDesigners: PropTypes.func.isRequired,
};

export default CreateEtudiant;
