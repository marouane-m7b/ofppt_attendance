import React, { useRef, useState } from "react";
import { useAppContext } from "../../config/context/ComponentContext";
import { axiosClient } from "../../config/Api/AxiosClient";

const UpdateEtudiant = ({ targetModel, etudiant, getAllDesigners }) => {
  const { navigateTo, setErrors, errors } = useAppContext();
  const [loading, setLoading] = useState(false);
  const cancelModel = useRef();

  const updateEtudiant = async (e) => {
    setLoading(true);
    e.preventDefault();
    const { first_name, last_name, email } = e.target.elements;
    try {
      const { data } = await axiosClient.put(
        "admin/designers/" + etudiant?.id,
        {
          first_name: first_name.value,
          last_name: last_name.value,
          email: email.value,
        }
      );
      await getAllDesigners();
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
      aria-labelledby="UpdateEtudiant"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="UpdateEtudiant">
              Modifier Une Concepteur
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
                <label className="form-label" htmlFor="form2Example1">
                  Nom <span className="text text-danger">*</span>
                </label>
                <input
                  type="text"
                  id="form2Example1"
                  defaultValue={etudiant?.first_name}
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
                  defaultValue={etudiant?.last_name}
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
                  defaultValue={etudiant?.email}
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

export default UpdateEtudiant;
