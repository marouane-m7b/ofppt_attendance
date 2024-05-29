import { useEffect, useState } from "react";
import { axiosClient } from "../../../config/Api/AxiosClient";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const AddAminQuestions = () => {

  const [questions, setQuestions] = useState([]);

  const [loading, setLodaing] = useState(false);

  const downloadQuestion = async (question) => {
    try {
      const res = await axiosClient.get(`/admin/download-questions/${question?.id}`, {
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      const pdfName = 'Exam_' + question?.file_path;
      link.setAttribute('download', pdfName);
      document.body.appendChild(link);
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
    }
  }

  const getQuestions = async () => {
    try {
      const { data } = await axiosClient.get("/admin/get-questions");
      setQuestions(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getQuestions();
  }, []);

  const deleteQuestion = async (question) => {
    try {
      setLodaing(true);
      const { data } = await axiosClient.delete(`/admin/delete-question/${question?.id}`);
      getQuestions();
      Swal.fire({
        icon: 'success',
        title: 'Question supprimé',
      })
      console.log(data);
      setLodaing(false);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Une erreur est survenue',
      })
      console.error(error);
      setLodaing(false);
    }
  };

  return (
    <div className="row g-3 w-100 m-auto">
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Question</th>
            <th scope="col">Description</th>
            <th scope="col">Concepteur</th>
            <th scope="col">Secteur</th>
            <th scope="col">Status</th>
            <th scope="col">Points</th>
            <th scope="col">Télécharger</th>
            <th scope="col">Commentaire</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((question, index) => (
            <tr key={index}>
              <td>{question?.file_name}</td>
              <td>{question?.description}</td>
              <td>{question?.designer?.first_name} {question?.designer?.last_name}</td>
              <td>{question?.secteur?.nom}</td>
              <td>{question?.is_visible ? question?.is_accepted ? <span style={{ color: "green", fontWeight: 'bold' }}>Accepte</span> : <span style={{ color: "red", fontWeight: 'bold' }}>Refuse</span> : <span style={{ color: "orange", fontWeight: 'bold' }}>En cours</span>}</td>
              <td>{question?.points}/90</td>
              <td><button className="btn btn-primary" onClick={() => downloadQuestion(question)}>Télécharger</button></td>
              <td>{question?.commentaire}</td>
              <td className="d-flex gap-2">
                <button className="btn btn-danger" onClick={() => deleteQuestion(question)}>{loading ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : "Supprimer"}</button>
                <Link to={`/administrateur/questions-managment/${question?.id}`} className="btn btn-primary">Afficher</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default AddAminQuestions
