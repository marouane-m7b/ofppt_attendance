import { useRef, useState } from "react";
import { useAppContext } from "../../config/context/ComponentContext";
import { axiosClient } from "../../config/Api/AxiosClient";
import Swal from "sweetalert2";
import PropTypes from "prop-types";

const CreateSecteur = ({ targetModel, getAllSecteurs }) => {
  const { setErrors, errors } = useAppContext();
  const [loading, setLoading] = useState(false);
  const cancelModel = useRef();

  const addDesigner = async (e) => {
    setLoading(true);
    e.preventDefault();
    const { nom } = e.target.elements;
    try {
      const { data } = await axiosClient.post("admin/secteurs", {
        nom: nom.value,
      });
      await getAllSecteurs();
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

  return (
    <div
      className="modal fade"
      id={targetModel}
      tabIndex={-1}
      aria-labelledby="CreateSecteur"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="CreateSecteur">
              Ajouter Une Secteur
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>
          <div className="modal-body">
            <form onSubmit={addDesigner}>
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

CreateSecteur.propTypes = {
  targetModel: PropTypes.string.isRequired,
  getAllSecteurs: PropTypes.func.isRequired,
};

export default CreateSecteur;
