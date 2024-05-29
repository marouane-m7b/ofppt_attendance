import React, { useEffect } from "react";
import { axiosClient } from "../../../config/Api/AxiosClient";
import { Link } from "react-router-dom";
import CreateDesigner from "../../models/CreateDesigner";
import UpdateDesigner from "../../models/UpdateDesigner";
import { useAppContext } from "../../../config/context/ComponentContext";
import Swal from "sweetalert2";

const AllDesigners = () => {
  const [designers, setDesigners] = React.useState(null);
  const [deleteLoading, setDeleteLoading] = React.useState(false);
  const { setErrors } = useAppContext();
  const getAllDesigners = async () => {
    try {
      const { data } = await axiosClient.get("admin/designers");
      setDesigners(data);
      setErrors(null);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteDesigner = async (designer) => {
    setDeleteLoading(true);
    document.getElementById(
      "deleteBtnDesigners" + designer?.id
    ).disabled = true;
    document.getElementById(
      "deleteBtnDesigners" + designer?.id
    ).innerHTML = `<span
    class="spinner-border spinner-border-sm"
    role="status"
    aria-hidden="true"
  ></span>`;
    try {
      await axiosClient.delete(
        "admin/designers/" + designer?.id
      );
      await getAllDesigners();
    } catch (error) {
      console.log(error);
    } finally {
      document.getElementById(
        "deleteBtnDesigners" + designer?.id
      ).disabled = false;
      document.getElementById(
        "deleteBtnDesigners" + designer?.id
      ).innerHTML = `Supprimer`;
      setDeleteLoading(false);
    }
  };

  useEffect(() => {
    document.title = "Tous les concepteurs - OFPPT";
    getAllDesigners();
  }, []);

  const handleReset = async (validator) => {
    try {
      await axiosClient.put("admin/reset-designer/" + validator?.id);
      Swal.fire("Le mot de passe a bien été réinitialisé !", "Nouveau mot de passe: ofppt", "success");
      await getAllDesigners();
    } catch (error) {
      Swal.fire("Le mot de passe n'a pas pu être réinitialisé !", "Veuillez réessayer !", "error");
      console.log(error);
    }
  };

  return (
    <div className="container mt-5 pt-5">
      <button
        type="button"
        className="btn btn-primary mb-3"
        data-bs-toggle="modal"
        data-bs-target="#CreateDesigner"
      >
        Ajouter une concepteur
      </button>
      <CreateDesigner
        targetModel="CreateDesigner"
        getAllDesigners={getAllDesigners}
      />
      {!designers ? (
        <h1 className="text-center mt-5 pt-5">Chargement...</h1>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Prenom</th>
              <th>E-mail</th>
              <th>Les Actions</th>
            </tr>
          </thead>
          <tbody>
            {designers?.length > 0 ? (
              designers?.map((designer, i) => (
                <tr key={i}>
                  <td>{designer.first_name}</td>
                  <td>{designer.last_name}</td>
                  <td>
                    <Link to={"mailto:" + designer.email}>
                      {designer.email}
                    </Link>
                  </td>
                  <td>
                    <div className="d-flex gap-1 flex-nowrap">
                      <button
                        type="button"
                        className="btn btn-success"
                        data-bs-toggle="modal"
                        data-bs-target={"#UpdateDesigner" + designer.id}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger"
                        id={"deleteBtnDesigners" + designer.id}
                        disabled={deleteLoading}
                        onClick={() => deleteDesigner(designer)}
                      >
                        Supprimer
                      </button>
                      <UpdateDesigner
                        targetModel={"UpdateDesigner" + designer.id}
                        getAllDesigners={getAllDesigners}
                        designer={designer}
                      />
                      <button
                        onClick={() => handleReset(designer)}
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
              <h1 className="text-center mt-5 pt-5">Aucun concepteur</h1>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AllDesigners;
