import { useEffect, useState } from "react";
import { axiosClient } from "../../../config/Api/AxiosClient";
import { Link } from "react-router-dom";

const AllQuestions = () => {
  const [questions, setQuestions] = useState([]);

  const downloadQuestion = async (question) => {
    try {
      const res = await axiosClient.get(
        `/validator/download-questions/${question.id}`,
        {
          responseType: "blob",
        }
      );
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      const pdfName = "Exam_" + question?.file_path;
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
      const { data } = await axiosClient.get("/validator/questionsToValidate");
      setQuestions(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getQuestions();
  }, []);

  return (
    <div className="w-100 d-flex flex-column justify-content-center align-items-center  container mt-5 pt-5">
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Question</th>
            <th scope="col">Description</th>
            <th scope="col">Secteur</th>
            <th scope="col">Filiere</th>
            <th scope="col">Télécharger</th>
            <th scope="col">Valider</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((question, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{question?.file_name}</td>
              <td>{question?.description}</td>
              <td>{question?.secteur?.nom}</td>
              <td>{question?.filiere?.nom}</td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => downloadQuestion(question)}
                >
                  Télécharger
                </button>
              </td>
              <td>
                <Link
                  to={`/validateur/questions-meanagment/${question.id}`}
                  className="btn btn-success"
                >
                  Valider
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllQuestions;
