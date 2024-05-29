import React, { useEffect } from "react";
import { axiosClient } from "../../../config/Api/AxiosClient";
import { useAppContext } from "../../../config/context/ComponentContext";
import CreateSecteur from "../../models/CreateSecteur";
import UpdateSecteur from "../../models/UpdateSecteur";

const AllSecteurs = () => {
  const [secteurs, setSecteurs] = React.useState(null);
  const [deleteLoading, setDeleteLoading] = React.useState(false);
  const { setErrors } = useAppContext();
  const getAllSecteurs = async () => {
    try {
      const { data } = await axiosClient.get("admin/secteurs");
      setSecteurs(data);
      setErrors(null);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteSecteur = async (secteur) => {
    setDeleteLoading(true);
    document.getElementById(
      "deleteBtnSecteur" + secteur?.id
    ).disabled = true;
    document.getElementById(
      "deleteBtnSecteur" + secteur?.id
    ).innerHTML = `<span
    class="spinner-border spinner-border-sm"
    role="status"
    aria-hidden="true"
  ></span>`;
    try {
      await axiosClient.delete("admin/secteurs/" + secteur?.id);
      await getAllSecteurs();
    } catch (error) {
      console.log(error);
    } finally {
      document.getElementById(
        "deleteBtnSecteur" + secteur?.id
      ).disabled = false;
      document.getElementById(
        "deleteBtnSecteur" + secteur?.id
      ).innerHTML = `Supprimer`;
      setDeleteLoading(false);
    }
  };

  useEffect(() => {
    document.title = "Tous les validateurs - OFPPT";
    getAllSecteurs();
  }, []);

  return (
    <div className="container mt-5 pt-5">
      <button
        type="button"
        className="btn btn-primary mb-3"
        data-bs-toggle="modal"
        data-bs-target="#CreateSecteur"
      >
        Ajouter une secteur
      </button>
      <CreateSecteur
        targetModel="CreateSecteur"
        getAllSecteurs={getAllSecteurs}
      />
      {!secteurs ? (
        <h1 className="text-center mt-5 pt-5">Chargement...</h1>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Les Actions</th>
            </tr>
          </thead>
          <tbody>
            {secteurs?.length > 0 ? (
              secteurs?.map((secteur, i) => (
                <tr key={i}>
                  <td>{secteur.nom}</td>
                  <td>
                    <div className="d-flex gap-1 flex-nowrap">
                      <button
                        type="button"
                        className="btn btn-success"
                        data-bs-toggle="modal"
                        data-bs-target={"#UpdateSecteur" + secteur.id}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger"
                        id={"deleteBtnSecteur" + secteur.id}
                        disabled={deleteLoading}
                        onClick={() => deleteSecteur(secteur)}
                      >
                        Supprimer
                      </button>
                      <UpdateSecteur
                        targetModel={"UpdateSecteur" + secteur.id}
                        getAllSecteurs={getAllSecteurs}
                        secteur={secteur}
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

export default AllSecteurs;
