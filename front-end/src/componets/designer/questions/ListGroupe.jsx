import { Link } from "react-router-dom";
import { axiosClient } from "../../../config/Api/AxiosClient";
import { useEffect, useState } from 'react'

export default function ListGroupe() {
    const [loadingPage, setLoadingPage] = useState(false)
    const [classes, setClasses] = useState([])
    const [errors, setErrors] = useState([])

    const getClasses = async () => {
        try {
            const { data } = await axiosClient.get("designer/classes");

            setClasses(data);
            setLoadingPage(false);
        } catch (error) {
            console.error(error);
            setErrors(error.response.data.errors);
        }
    }

    const displayClasses = () => {
        if (classes?.length > 0) {
            return classes.map((classe) => {
                console.log(classe);
                return (
                    <tr key={classe?.id}>
                        <td>
                            {classe?.class_name} ({classe?.etudiants?.length} etudiant)
                        </td>
                        <td>
                            <Link to={`/concepteur/classe/${classe?.id}`}>
                                <button className="btn btn-success btn-sm">Detail</button>
                            </Link>
                        </td>
                    </tr>
                )
            })
        } else {
            return <option>Aucune classe</option>
        }
    }

    useEffect(() => {
        getClasses()
    }, [])


    return (
        <div>
            <div className="row">
                {errors.length > 0 && (
                    <div className="alert alert-danger">
                        {errors.map((error, index) => (
                            <p key={index}>{error.msg}</p>
                        ))}
                    </div>
                )}
            </div>
            <div className="row g-3 w-75 m-auto">
                <div className="d-flex align-items-center justify-content-between">
                    <h1 className="text-center">List Classes</h1>
                    <button
                        className="btn btn-primary btn-sm shadow-sm"
                        data-bs-toggle="modal"
                        data-bs-target="#CreateAbsence">Ajouter</button>
                </div>
                {!loadingPage ? (
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Classe Name</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {displayClasses()}
                        </tbody>
                    </table>

                ) : (
                    "loading List..."
                )}
            </div>
        </div>
    )
}
