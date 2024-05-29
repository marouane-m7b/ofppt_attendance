import React, { useEffect } from "react";
import { axiosClient } from "../../../config/Api/AxiosClient";
import { Link } from "react-router-dom";
import { useAppContext } from "../../../config/context/ComponentContext";
import UpdateValidator from "../../models/UpdateValidator";
import CreateValidator from "../../models/CreateValidator";
import Swal from "sweetalert2";

const AllValidators = () => {
  const [validators, setValidators] = React.useState(null);
  const [deleteLoading, setDeleteLoading] = React.useState(false);
  const { setErrors } = useAppContext();
  const getAllValidators = async () => {
    try {
      const { data } = await axiosClient.get("admin/validators");
      setValidators(data);
      setErrors(null);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteValidator = async (validator) => {
    setDeleteLoading(true);
    document.getElementById(
      "deleteBtnValidator" + validator?.id
    ).disabled = true;
    document.getElementById(
      "deleteBtnValidator" + validator?.id
    ).innerHTML = `<span
    class="spinner-border spinner-border-sm"
    role="status"
    aria-hidden="true"
  ></span>`;
    try {
      await axiosClient.delete("admin/validators/" + validator?.id);
      await getAllValidators();
    } catch (error) {
      console.log(error);
    } finally {
      document.getElementById(
        "deleteBtnValidator" + validator?.id
      ).disabled = false;
      document.getElementById(
        "deleteBtnValidator" + validator?.id
      ).innerHTML = `Supprimer`;
      setDeleteLoading(false);
    }
  };

  useEffect(() => {
    document.title = "Tous les validateurs - OFPPT";
    getAllValidators();
  }, []);

  const handleReset = async (validator) => {
    try {
      await axiosClient.put("admin/reset-validator/" + validator?.id);
      Swal.fire("Le mot de passe a bien été réinitialisé !", "Nouveau mot de passe: ofppt", "success");
      await getAllValidators();
    } catch (error) {
      Swal.fire("Une erreur est survenue !", error.response.data.message, "error");
      console.log(error);
    }
  };

  return (
    <div className="container mt-5 pt-5">
      <button
        type="button"
        className="btn btn-primary mb-3"
        data-bs-toggle="modal"
        data-bs-target="#CreateValidator"
      >
        Ajouter une Validateur
      </button>
      <CreateValidator
        targetModel="CreateValidator"
        getAllValidators={getAllValidators}
      />
      {!validators ? (
        <h1 className="text-center mt-5 pt-5">Chargement...</h1>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Prenom</th>
              <th>E-mail</th>
              <th>Secteur</th>
              <th>Les Actions</th>
            </tr>
          </thead>
          <tbody>
            {validators?.length > 0 ? (
              validators?.map((validator, i) => (
                <tr key={i}>
                  <td>{validator.first_name}</td>
                  <td>{validator.last_name}</td>
                  <td>
                    <Link to={"mailto:" + validator.email}>
                      {validator.email}
                    </Link>
                  </td>
                  <td>{validator.secteur.nom}</td>
                  <td>
                    <div className="d-flex gap-1 flex-nowrap">
                      <button
                        type="button"
                        className="btn btn-success"
                        data-bs-toggle="modal"
                        data-bs-target={"#UpdateValidator" + validator.id}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger"
                        id={"deleteBtnValidator" + validator.id}
                        disabled={deleteLoading}
                        onClick={() => deleteValidator(validator)}
                      >
                        Supprimer
                      </button>
                      <UpdateValidator
                        targetModel={"UpdateValidator" + validator.id}
                        getAllValidators={getAllValidators}
                        validator={validator}
                      />
                      <button
                        onClick={() => handleReset(validator)}
                        type="button"
                        className="btn btn-primary"
                      >
                        Reset mot de Passe
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <h1 className="text-center mt-5 pt-5">Aucun Validateur</h1>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AllValidators;
