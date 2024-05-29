import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosClient } from "../../../config/Api/AxiosClient";
import moment from "moment";

function AdminQuestion() {

    const { id } = useParams();
    const [question, setQuestion] = useState({});

    const getQuestion = async () => {
        try {
            const { data } = await axiosClient.get(`/admin/get-questions/${id}`);
            console.log(data);
            setQuestion(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getQuestion();
    }, []);


    return (

        <div className="container mt-4">
            <div className="card mb-4">
                <div className="card-body">
                    <h1 className="card-title">{question?.file_name}</h1>
                    <p className="card-text">{question?.description}</p>
                    <p className="card-text">
                        <strong>Points:</strong> {question?.points}/90
                    </p>
                    <p className="card-text">
                        <strong>Filiere:</strong> {question?.filiere?.nom}
                    </p>
                    <p className="card-text">
                        <strong>Secteur:</strong> {question?.secteur?.nom}
                    </p>
                    <p className="card-text">
                        <strong>Crée le:</strong> {moment(question?.created_at).format("DD/MM/YYYY")}
                    </p>
                    <p className="card-text">
                        <strong>Concepteur:</strong> {question?.designer?.first_name} {question?.designer?.last_name}
                    </p>
                    <p className="card-text">
                        <strong>Email:</strong> {question?.designer?.email}
                    </p>
                </div>
            </div>

            <div className="card">
                <div className="card-body">
                    <h2 className="card-title">Critères</h2>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Valid</th>
                                <th>Critère</th>
                                <th>Commentaire</th>
                            </tr>
                        </thead>
                        <tbody>
                            {question?.criteres?.map((critere, index) => (
                                <tr key={index}>
                                    <td>{critere?.is_valid ? "✔️" : "❌"}</td>
                                    <td>{critere?.name}</td>
                                    <td>{critere?.description}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="card mt-5 mb-5">
                <div className="card-body">
                    <h2 className="card-title">Décision </h2>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Valid</th>
                                <th>Commentaire</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{question?.is_accepted ? "✔️" : "❌"}</td>
                                <td>{question?.commentaire}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="card mt-5 mb-5">
                <div className="card-body">
                    <h2 className="card-title">Membres de la commission de validation </h2>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Nom</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{question?.validator?.first_name} {question?.validator?.last_name}</td>
                                <td>{question?.validator?.email}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default AdminQuestion