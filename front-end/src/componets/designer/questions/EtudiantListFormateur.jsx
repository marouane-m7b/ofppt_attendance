import { useEffect, useState } from "react"
import CreateAbsence from "../../models/CreateAbsence";
import { axiosClient } from "../../../config/Api/AxiosClient";

export default function EtudiantListFormateur() {
    const [loadingPage, setLoadingPage] = useState(false)
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState([]);
    const [absence, setAbsence] = useState([]);
    const [etudiants, setEtudiants] = useState([]);

    const getEtudiants = async () => {
        try {
            const { data } = await axiosClient.get("designer/etudiants");
            setEtudiants(data);
            setErrors(null);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getEtudiants();
    }, []);

    const displayEtudiant = () => {
        if (etudiants?.length > 0) {
            return (
                etudiants?.map((etudiant) => {
                    return (
                        <tr key={etudiant?.id}>
                            <th>{etudiant?.nom}</th>
                            <th>{etudiant?.prenom}</th>
                            <th>{etudiant?.filiere?.nom}</th>
                            <th>{etudiant?.cin}</th>
                            <th>{etudiant?.numero_stagiaire}</th>
                            <th>{etudiant?.numero_parent}</th>
                        </tr>
                    )
                })
            )
        } else {
            return (
                <tr key={0}>
                    <td colSpan={5}>No etudiant</td>
                </tr>
            )
        }
    }

    const getAllDesigners = async () => {
        try {
            const { data } = await axiosClient.get("admin/designers");
            setAbsence(data);
            setErrors(null);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <>
            <div className="row g-3 w-75 m-auto">
                <div className="d-flex align-items-center justify-content-between">
                    <h1 className="text-center">List Etudiant</h1>
                    <button
                        className="btn btn-primary btn-sm shadow-sm"
                        data-bs-toggle="modal"
                        data-bs-target="#CreateAbsence">Ajouter</button>
                </div>
                {!loadingPage ? (
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Nom</th>
                                <th>Prenom</th>
                                <th>Filiere</th>
                                <th>Cin</th>
                                <th>Numero de Telephone</th>
                                <th>Numero de Parent</th>
                            </tr>
                        </thead>
                        <tbody>
                            {displayEtudiant()}
                        </tbody>
                    </table>

                ) : (
                    "loading List..."
                )}
            </div>
            <div className="container mt-5 pt-5">
                <CreateAbsence
                    role="designer"
                    targetModel="CreateAbsence"
                    getAllDesigners={getAllDesigners}
                />
            </div>
        </>
    )
}
