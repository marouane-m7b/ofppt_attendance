import { useRef, useState } from "react";
import { useAppContext } from "../../config/context/ComponentContext";
import { axiosClient } from "../../config/Api/AxiosClient";
import Swal from "sweetalert2";
import PropTypes from "prop-types";

const UpdateSecteur = ({ targetModel, secteur, getAllSecteurs }) => {
  const { setErrors, errors } = useAppContext();
  const [loading, setLoading] = useState(false);
  const cancelModel = useRef();

  const UpdateSecteur = async (e) => {
    setLoading(true);
    e.preventDefault();
    const { nom, description } = e.target.elements;
    try {
      const { data } = await axiosClient.put(
        "admin/secteurs/" + secteur?.id,
        {
          nom: nom.value,
          description: description.value,
        }
      );
      await getAllSecteurs();
      cancelModel.current.click();
      Swal.fire({
        // title: ,
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
      aria-labelledby="UpdateSecteur"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="UpdateSecteur">
              Modifier Une Secteur
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>
          <div className="modal-body">
            <form onSubmit={UpdateSecteur}>
              <div data-mdb-input-init className="form-outline mb-4">
                <label className="form-label" htmlFor="form2Example1">
                  Nom <span className="text text-danger">*</span>
                </label>
                <input
                  type="text"
                  id="form2Example1"
                  defaultValue={secteur?.nom}
                  className={
                    "form-control" + (errors?.nom ? " is-invalid" : "")
                  }
                  name="nom"
                />
                <span className="text text-danger">{errors?.nom}</span>
              </div>

              <div data-mdb-input-init className="form-outline mb-4">
                <label className="form-label" htmlFor="form2Example2">
                  Description <span className="text text-danger">*</span>
                </label>
                <input
                  type="text"
                  id="form2Example2"
                  defaultValue={secteur?.description}
                  className={
                    "form-control" + (errors?.description ? " is-invalid" : "")
                  }
                  name="description"
                />
                <span className="text text-danger">{errors?.description}</span>
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

UpdateSecteur.propTypes = {
  targetModel: PropTypes.string.isRequired,
  secteur: PropTypes.object.isRequired,
  getAllSecteurs: PropTypes.func.isRequired,
};

export default UpdateSecteur;
