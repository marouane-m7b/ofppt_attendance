import { useEffect, useState } from "react";
import { useAppContext } from "../../../config/context/ComponentContext";
import { axiosClient } from "../../../config/Api/AxiosClient";
import Swal from "sweetalert2";
import CreateEtudiant from "../../models/CreateEtudiant";
import { Link } from "react-router-dom";
import UpdateEtudiant from "../../models/UpdateEtudiant";

export default function AllEtudiant() {
    const [etudiants, setEtudiants] = useState([]);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const { setErrors } = useAppContext();
    const getAllDesigners = async () => {
        try {
            const { data } = await axiosClient.get("admin/etudiants");

            setEtudiants(data);
            setErrors(null);
        } catch (error) {
            console.log(error);
        }
    };
    const deleteEtudiant = async (etudiant) => {
        setDeleteLoading(true);
        document.getElementById(
            "deleteBtnEtudiants" + etudiant?.id
        ).disabled = true;
        document.getElementById(
            "deleteBtnEtudiants" + etudiant?.id
        ).innerHTML = `<span
      class="spinner-border spinner-border-sm"
      role="status"
      aria-hidden="true"
    ></span>`;
        try {
            await axiosClient.delete(
                "admin/etudiants/" + etudiant?.id
            );
            Swal.fire({
                text: "Etudiant supprime avec success",
                icon: "success",
            });
            await getAllDesigners();
        } catch (error) {
            console.log(error);
        } finally {
            document.getElementById(
                "deleteBtnEtudiants" + etudiant?.id
            ).disabled = false;
            document.getElementById(
                "deleteBtnEtudiants" + etudiant?.id
            ).innerHTML = `Supprimer`;
            setDeleteLoading(false);
        }
    };

    useEffect(() => {
        document.title = "Tous les etudiants - OFPPT";
        getAllDesigners();
    }, []);
    return (
        <div className="container mt-5 pt-5">
            <button
                type="button"
                className="btn btn-primary mb-3"
                data-bs-toggle="modal"
                data-bs-target="#CreateEtudiant"
            >
                Ajouter une etudiant
            </button>
            <CreateEtudiant
                targetModel="CreateEtudiant"
                getAllDesigners={getAllDesigners}
            />
            {!etudiants ? (
                <h1 className="text-center mt-5 pt-5">Chargement...</h1>
            ) : (
                <>

                    <h1 className="text-center">List Etudiant</h1>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Nom</th>
                                <th>Prenom</th>
                                <th>Numero Stagiare</th>
                                <th>Numero Parent</th>
                                <th>Filiere</th>
                                <th>Formateur</th>
                                <th>Les Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {etudiants?.length > 0 ? (
                                etudiants?.map((etudiant, i) => (
                                    <tr key={i}>
                                        <td>{etudiant?.nom}</td>
                                        <td>{etudiant?.prenom}</td>
                                        <td>
                                            +212 {etudiant?.numero_stagiaire}
                                        </td>
                                        <td>
                                            +212 {etudiant?.numero_parent}
                                        </td>
                                        <td>
                                            {etudiant?.filiere?.nom}
                                        </td>
                                        <td>
                                            {etudiant?.designer}
                                        </td>
                                        <td>
                                            <div className="d-flex gap-1 flex-nowrap">
                                                <button
                                                    type="button"
                                                    className="btn btn-success"
                                                    data-bs-toggle="modal"
                                                    data-bs-target={"#UpdateEtudiant" + etudiant?.id}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    type="button"
                                                    className="btn btn-danger"
                                                    id={"deleteBtnEtudiants" + etudiant?.id}
                                                    disabled={deleteLoading}
                                                    onClick={() => deleteEtudiant(etudiant)}
                                                >
                                                    Supprimer
                                                </button>
                                                <UpdateEtudiant
                                                    targetModel={"UpdateEtudiant" + etudiant?.id}
                                                    getAllDesigners={getAllDesigners}
                                                    etudiant={etudiant}
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <h1 className="text-center mt-5 pt-5">Aucun Etudiant</h1>
                            )}
                        </tbody>
                    </table>
                </>
            )}
        </div>
    )
}
