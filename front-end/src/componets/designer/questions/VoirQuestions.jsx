import { useEffect, useState } from "react";
import { axiosClient } from "../../../config/Api/AxiosClient";
import { Link } from "react-router-dom";

const AddQuestions = () => {
  const [lodaing, setLodaing] = useState(true);
  const [questions, setQuestions] = useState([]);

  const downloadQuestion = async (question) => {
    try {
      const res = await axiosClient.get(
        `/designer/download-questions/${question.id}`,
        {
          responseType: "blob",
        }
      );
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      const pdfName = "Exam_" + question?.file_path ;
      link.setAttribute("download", pdfName);
      document.body.appendChild(link);
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
    }
  };

  const getQuestions = async () => {
    try {
      const { data } = await axiosClient.get("/designer/get-questions");
      setQuestions(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLodaing(false);
    }
  };

  useEffect(() => {
    getQuestions();
  }, []);

  return (
    <div className="d-flex container mt-5 pt-5">
      {!lodaing ? (
        questions.length > 0 ? (
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Question</th>
                <th scope="col">Description</th>
                <th scope="col">Secteur</th>
                <th scope="col">Status</th>
                <th scope="col">Points</th>
                <th scope="col">Télécharger</th>
                <th scope="col">Commentaire</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {questions.map((question, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{question.file_name}</td>
                  <td>{question.description}</td>
                  <td>{question.secteur.nom}</td>
                  <td>
                    {question.is_visible ? (
                      question.is_accepted ? (
                        <span style={{ color: "green", fontWeight: "bold" }}>
                          Accepte
                        </span>
                      ) : (
                        <span style={{ color: "red", fontWeight: "bold" }}>
                          Refuse
                        </span>
                      )
                    ) : (
                      <span style={{ color: "orange", fontWeight: "bold" }}>
                        En cours
                      </span>
                    )}
                  </td>
                  <td>{question.points}/90</td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() => downloadQuestion(question)}
                    >
                      Télécharger
                    </button>
                  </td>
                  <td>{question.commentaire}</td>
                  <td>
                    <Link
                      to={`/concepteur/voir-questions/${question.id}`}
                      className="btn btn-primary"
                    >
                      Afficher
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <h1>Non questions disponible</h1>
        )
      ) : (
        "loading..."
      )}
    </div>
  );
};

export default AddQuestions;
