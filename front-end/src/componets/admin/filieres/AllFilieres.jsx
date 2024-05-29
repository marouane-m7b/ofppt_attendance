import React, { useEffect } from "react";
import { axiosClient } from "../../../config/Api/AxiosClient";
import { useAppContext } from "../../../config/context/ComponentContext";
import CreateFiliere from "../../models/CreateFiliere";
import UpdateFiliere from "../../models/UpdateFiliere";

const AllFilieres = () => {
  const [filieres, setFilieres] = React.useState(null);
  const [deleteLoading, setDeleteLoading] = React.useState(false);
  const { setErrors } = useAppContext();
  const getAllFilieres = async () => {
    try {
      const { data } = await axiosClient.get("admin/filieres");
      setFilieres(data);
      setErrors(null);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteFiliere = async (filiere) => {
    setDeleteLoading(true);
    document.getElementById(
      "deleteBtnFiliere" + filiere?.id
    ).disabled = true;
    document.getElementById(
      "deleteBtnFiliere" + filiere?.id
    ).innerHTML = `<span
    class="spinner-border spinner-border-sm"
    role="status"
    aria-hidden="true"
  ></span>`;
    try {
      await axiosClient.delete("admin/filieres/" + filiere?.id);
      await getAllFilieres();
    } catch (error) {
      console.log(error);
    } finally {
      document.getElementById(
        "deleteBtnFiliere" + filiere?.id
      ).disabled = false;
      document.getElementById(
        "deleteBtnFiliere" + filiere?.id
      ).innerHTML = `Supprimer`;
      setDeleteLoading(false);
    }
  };

  useEffect(() => {
    document.title = "Tous les validateurs - OFPPT";
    getAllFilieres();
  }, []);

  return (
    <div className="container mt-5 pt-5">
      <button
        type="button"
        className="btn btn-primary mb-3"
        data-bs-toggle="modal"
        data-bs-target="#CreateFiliere"
      >
        Ajouter une filiere
      </button>
      <CreateFiliere
        targetModel="CreateFiliere"
        getAllFilieres={getAllFilieres}
      />
      {!filieres ? (
        <h1 className="text-center mt-5 pt-5">Chargement...</h1>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Code</th>
              <th>Secteur</th>
              <th>Les Actions</th>
            </tr>
          </thead>
          <tbody>
            {filieres?.length > 0 ? (
              filieres?.map((filiere, i) => (
                <tr key={i}>
                  <td>{filiere.nom}</td>
                  <td>{filiere.code}</td>
                  <td>{filiere.secteur?.nom}</td>
                  <td>
                    <div className="d-flex gap-1 flex-nowrap">
                      <button
                        type="button"
                        className="btn btn-success"
                        data-bs-toggle="modal"
                        data-bs-target={"#UpdateFiliere" + filiere.id}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger"
                        id={"deleteBtnFiliere" + filiere.id}
                        disabled={deleteLoading}
                        onClick={() => deleteFiliere(filiere)}
                      >
                        Supprimer
                      </button>
                      <UpdateFiliere
                        targetModel={"UpdateFiliere" + filiere.id}
                        getAllFilieres={getAllFilieres}
                        filiere={filiere}
                      />
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

export default AllFilieres;
