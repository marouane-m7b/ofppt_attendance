import { useEffect, useState } from "react"
import CreateAbsence from "../../models/CreateAbsence";
import { axiosClient } from "../../../config/Api/AxiosClient";
import { useParams } from "react-router-dom";
import { Switch } from "../../../minicomponent/Switch/Switch";

export default function EtudiantListFormateur() {
    const [loadingPage, setLoadingPage] = useState(false)
    const [errors, setErrors] = useState([]);
    const [etudiants, setEtudiants] = useState([]);
    const [classe, setClasse] = useState({});
    const { id } = useParams();
    const [status, setStatus] = useState(false);
    const [absence, setAbsence] = useState({
        etudiant_id: "",
        periode: "",
        status: false
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAbsence((prevAbsence) => ({ ...prevAbsence, [name]: value }));
    };

    const getClasse = async () => {
        try {
            const { data } = await axiosClient.get(`designer/classe/${id}`);
            setClasse(data);
            setEtudiants(data?.etudiants);
            setLoadingPage(false);
        } catch (error) {
            console.error(error);
            setErrors(error.response.data.errors);
        }
    }
    useEffect(() => {
        getClasse();
    }, [id]);

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
                            <th>
                                <select defaultValue={absence?.periode} onChange={handleChange} name="periode" className="form-select form-select-sm">
                                    <option defaultValue={null}>Time</option>
                                    <option>8:30 - 11:00</option>
                                    <option>11:00 - 13:30</option>
                                    <option>13:30 - 16:00</option>
                                    <option>16:00 - 18:30</option>
                                </select>
                            </th>
                            <th>
                                <Switch isChecked={true} handleCheck={handleCheck} />
                            </th>
                        </tr>
                    )
                })
            )
        } else {
            return (
                <tr key={0}>
                    <td colSpan={8}>No etudiant</td>
                </tr>
            )
        }
    }

    const handleCheck = () => {
        setStatus(!status)
    }
    return (
        <>
            <div className="row g-3 w-75 m-auto">
                <div className="d-flex align-items-center justify-content-between">
                    <h1 className="text-center">List Etudiant <b className="fs-4">{classe?.class_name}</b> Classe</h1>
                    {/* <button
                        className="btn btn-primary btn-sm shadow-sm"
                        data-bs-toggle="modal"
                        data-bs-target="#CreateAbsence">Ajouter
                    </button> */}
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
                                {/* <th>Day</th> */}
                                <th>Time</th>
                                <th>statut</th>
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
            {/* <div className="container mt-5 pt-5">
                <CreateAbsence
                    role="designer"
                    targetModel="CreateAbsence"
                />
            </div> */}
        </>
    )
}
