import { useEffect, useState } from 'react';
import { axiosClient } from '../../../config/Api/AxiosClient';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const QuestionValidation = () => {

  const { id } = useParams();
  const [question, setQuestion] = useState({});
  const navigateTo = useNavigate();
  const [errors, setErrors] = useState({});

  const getQuestion = async () => {
    try {
      const { data } = await axiosClient.get(`/validator/questions/${id}`);
      setQuestion(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getQuestion();
  }, []);

  const [criteria, setCriteria] = useState({
    LEntêteestrespecté: false,
    Lafilièreestmentionnéeetcorrecte: false,
    Legroupeestmentionné: false,
    Laduréeestmentionnée: false,
    Lintitulédumoduleestmentionéetcorrecte: false,
    lebarèmeestmentionné: false,
    Lepreuverépondauxobjectifsdumodule: false,
    Laduréedelépreuveestsuffisante: false,
    Lasommationdubarèmeestcorrecte: false,
  });

  const handleChange = (event) => {
    const { name, checked } = event.target;
    setCriteria((prevCriteria) => ({
      ...prevCriteria,
      [name]: checked,
    }));
  };

  const validateQuestion = async (e) => {
    e.preventDefault();
    let totalPoints = 0;
    Object.values(criteria).forEach((isChecked) => {
      if (isChecked) {
        totalPoints += 10;
      }
    });
    const commentaire = e.target.commentaire.value;
    const criteria1 = "L'En-tête est respecté";
    const criteria2 = "La filière est mentionnée et correcte";
    const criteria3 = "Pertinence par Rapport au Contenu du Cours";
    const criteria4 = "La durée est mentionnée";
    const criteria5 = "L'intitulé du module est mentioné et correcte";
    const criteria6 = "Le barème est mentionné";
    const criteria7 = "L'epreuve répond aux objectifs du module";
    const criteria8 = "La durée de l'épreuve est suffisante";
    const criteria9 = "La sommation du barème est correcte";
    const criteria1IsChecked = criteria.LEntêteestrespecté;
    const criteria2IsChecked = criteria.Lafilièreestmentionnéeetcorrecte;
    const criteria3IsChecked = criteria.Legroupeestmentionné;
    const criteria4IsChecked = criteria.Laduréeestmentionnée;
    const criteria5IsChecked = criteria.Lintitulédumoduleestmentionéetcorrecte;
    const criteria6IsChecked = criteria.lebarèmeestmentionné;
    const criteria7IsChecked = criteria.Lepreuverépondauxobjectifsdumodule;
    const criteria8IsChecked = criteria.Laduréedelépreuveestsuffisante;
    const criteria9IsChecked = criteria.Lasommationdubarèmeestcorrecte;
    const Entete_commentaire = e.target.Entete_commentaire.value;
    const Filiere_commentaire = e.target.Filiere_commentaire.value;
    const Groupe_commentaire = e.target.Groupe_commentaire.value;
    const Duree_commentaire = e.target.Duree_commentaire.value;
    const Intitule_commentaire = e.target.Intitule_commentaire.value;
    const Bareme_commentaire = e.target.Bareme_commentaire.value;
    const Epreuve_commentaire = e.target.Epreuve_commentaire.value;
    const Duree_suffisante_commentaire = e.target.Duree_suffisante_commentaire.value;
    const Sommation_commentaire = e.target.Sommation_commentaire.value;

    try {
      const { data } = await axiosClient.put(`/validator/validateQuestion/${id}`, {
        questions_id: id, points: totalPoints, commentaire,
        criteria1, criteria2, criteria3, criteria4, criteria5, criteria6, criteria7, criteria8, criteria9,
        Entete_commentaire, Filiere_commentaire, Groupe_commentaire, Duree_commentaire, Intitule_commentaire, Bareme_commentaire, Epreuve_commentaire, Duree_suffisante_commentaire, Sommation_commentaire,
        criteria1IsChecked, criteria2IsChecked, criteria3IsChecked, criteria4IsChecked, criteria5IsChecked, criteria6IsChecked, criteria7IsChecked, criteria8IsChecked, criteria9IsChecked
      });
      Swal.fire({
        text: data.message,
        icon: "success",
      })
      navigateTo("/validator/questionsValidated", { replace: true });
    } catch (error) {
      setErrors(error.response.data);
    }
  };

  return (
    <form onSubmit={validateQuestion} className="container mt-3 mb-3 justify-content-center">
      <h2 className="text-center">Évaluation de l&apos;examen: {question?.file_name}</h2>
      <hr />
      <table className="table table-striped">
        <tbody>
          {[
            { name: "LEntêteestrespecté", label: "L'En-tête est respecté", commentaire: "Entete_commentaire" },
            { name: "Lafilièreestmentionnéeetcorrecte", label: "La filière est mentionnée et correcte", commentaire: "Filiere_commentaire" },
            { name: "Legroupeestmentionné", label: "Pertinence par Rapport au Contenu du Cours", commentaire: "Groupe_commentaire" },
            { name: "Laduréeestmentionnée", label: "La durée est mentionnée", commentaire: "Duree_commentaire" },
            { name: "Lintitulédumoduleestmentionéetcorrecte", label: "L'intitulé du module est mentioné et correcte", commentaire: "Intitule_commentaire" },
            { name: "lebarèmeestmentionné", label: "Le barème est mentionné", commentaire: "Bareme_commentaire" },
            { name: "Lepreuverépondauxobjectifsdumodule", label: "L'epreuve répond aux objectifs du module", commentaire: "Epreuve_commentaire" },
            { name: "Laduréedelépreuveestsuffisante", label: "La durée de l'épreuve est suffisante", commentaire: "Duree_suffisante_commentaire" },
            { name: "Lasommationdubarèmeestcorrecte", label: "La sommation du barème est correcte", commentaire: "Sommation_commentaire" }
          ].map((criterion, index) => (
            <>
            {index === 0 && <td className="text-center" colSpan="3"><h3>En-tête de l&apos;épreuve</h3></td>}
              {index === 6 && <td className="text-center" colSpan="3"><h3>Corps de l&apos;épreuve</h3></td>}
              <tr>
                <td className="align-middle">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={criterion.name}
                    name={criterion.name}
                    checked={criteria[criterion.name]}
                    onChange={handleChange}
                  />
                  {errors?.[criterion.name] && <div className="text text-danger text-center">{errors?.[criterion.name]}</div>}
                </td>
                <td className="align-middle">
                  <label className="form-check-label" htmlFor={criterion.name}>
                    {criterion.label}
                  </label>
                </td>
                <td>
                  <textarea
                    placeholder="Commentaire"
                    className="form-control mt-3 mb-3 w-100"
                    name={criterion.commentaire}
                  ></textarea>
                  <div className="text text-danger text-center">
                    {errors?.[criterion.commentaire]}
                  </div>
                </td>
              </tr>
            </>
          ))}
        </tbody>
      </table>
      <div>
        <textarea
          placeholder='Commentaire'
          className='form-control mt-3 mb-3 w-100 bg-light'
          name='commentaire'
        ></textarea>
        <div className='text text-danger text-center'>{errors?.commentaire}</div>
      </div>

      <div className="text-center mt-5">
        <button type="submit" className='btn btn-primary'>Soumettre</button>
      </div>
    </form>

  );
};

export default QuestionValidation;
