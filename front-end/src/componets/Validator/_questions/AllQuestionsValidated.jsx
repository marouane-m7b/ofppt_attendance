import { useEffect, useState } from "react";
import { axiosClient } from "../../../config/Api/AxiosClient";

const AllQuestionsValidated = () => {
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
      const { data } = await axiosClient.get("/validator/questionsValidated");
      setQuestions(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getQuestions();
  }, []);

  return (
    <div className="w-100 d-flex flex-column justify-content-center align-items-center container mt-5 pt-5">
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllQuestionsValidated;
