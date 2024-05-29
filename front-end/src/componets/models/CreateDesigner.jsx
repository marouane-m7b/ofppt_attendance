import { useRef, useState } from "react";
import { useAppContext } from "../../config/context/ComponentContext";
import { axiosClient } from "../../config/Api/AxiosClient";
import Swal from "sweetalert2";
import PropTypes from "prop-types";

const CreateDesigner = ({ targetModel, getAllDesigners }) => {
  const { setErrors, errors } = useAppContext();
  const [loading, setLoading] = useState(false);
  const cancelModel = useRef();
  const addDesigner = async (e) => {
    setLoading(true);
    e.preventDefault();
    const { first_name, last_name, email } = e.target.elements;
    try {
      const { data } = await axiosClient.post("admin/designers", {
        first_name: first_name.value,
        last_name: last_name.value,
        email: email.value,
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

  return (
    <div
      className="modal fade"
      id={targetModel}
      tabIndex={-1}
      aria-labelledby="CreateDesigner"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="CreateDesigner">
              Ajouter Une Concepteur
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
                    "form-control" + (errors?.first_name ? " is-invalid" : "")
                  }
                  name="first_name"
                />
                <span className="text text-danger">{errors?.first_name}</span>
              </div>

              <div data-mdb-input-init className="form-outline mb-4">
                <label className="form-label" htmlFor="form2Example2">
                  Prenom <span className="text text-danger">*</span>
                </label>
                <input
                  type="text"
                  id="form2Example2"
                  className={
                    "form-control" + (errors?.last_name ? " is-invalid" : "")
                  }
                  name="last_name"
                />
                <span className="text text-danger">{errors?.last_name}</span>
              </div>

              <div data-mdb-input-init className="form-outline mb-4">
                <label className="form-label" htmlFor="form2Example2">
                  E-mail <span className="text text-danger">*</span>
                </label>
                <input
                  type="email"
                  id="form2Example2"
                  className={
                    "form-control" + (errors?.email ? " is-invalid" : "")
                  }
                  name="email"
                />
                <span className="text text-danger">{errors?.email}</span>
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

CreateDesigner.propTypes = {
  targetModel: PropTypes.string.isRequired,
  getAllDesigners: PropTypes.func.isRequired,
};

export default CreateDesigner;
