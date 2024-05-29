import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";

// Pages
import GuestHome from "./componets/Guest/GuestHome";
import AllDesigners from "./componets/admin/_designers/AllDesigners";
import AllValidators from "./componets/admin/_validators/AllValidators";
import AddQuestions from "./componets/designer/questions/AddQuestions";
import VoirQuestions from "./componets/designer/questions/VoirQuestions";
import AllQuestions from "./componets/Validator/_questions/AllQuestions";

// Auth Components
import ConcepteurLogin from "./componets/Auth/designer/ConcepteurLogin";
import ValidateurLogin from "./componets/Auth/Validator/ValidateurLogin";
import AdministrateurLogin from "./componets/Auth/admin/AdministrateurLogin";

//Layouts
import GuestIndex from "./layouts/Guest/GuestIndex";
import ConcepteurIndex from "./layouts/designer/ConcepteurIndex";
import ValidateurIndex from "./layouts/Validator/ValidateurIndex";
import AdminIndex from "./layouts/admin/AdminIndex";
import AllQuestionsValidated from "./componets/Validator/_questions/AllQuestionsValidated";
import QuestionValidation from "./componets/Validator/_questions/QuestionValidation";
import AllAdminQuestions from "./componets/admin/questions/AllAdminQuestions";
import AllSecteurs from "./componets/admin/secteurs/AllSecteurs";
import AllFilieres from "./componets/admin/filieres/AllFilieres";
import AdminQuestion from "./componets/admin/questions/AdminQuestion";
import DesignerQuestion from "./componets/designer/questions/DesignerQuestion";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<GuestIndex />}>
          <Route index element={<GuestHome />} />
          <Route path="concepteur/login" element={<ConcepteurLogin />} />
          <Route path="validateur/login" element={<ValidateurLogin />} />
          <Route
            path="administrateur/login"
            element={<AdministrateurLogin />}
          />
        </Route>
        <Route path="/administrateur" element={<AdminIndex />}>
          <Route
            index
            element={<Navigate to={"/administrateur/concepteurs-managment"} />}
          />
          <Route path="concepteurs-managment" element={<AllDesigners />} />
          <Route path="validateurs-managment" element={<AllValidators />} />
          <Route path="questions-managment" element={<AllAdminQuestions />} />
          <Route path="questions-managment/:id" element={<AdminQuestion />} />
          <Route path="secteurs-managment" element={<AllSecteurs />} />
          <Route path="filieres-managment" element={<AllFilieres />} />
        </Route>

        <Route path="/concepteur" element={<ConcepteurIndex />}>
          <Route
            index
            element={<Navigate to={"/concepteur/ajouter-questions"} />}
          />
          <Route path="ajouter-questions" element={<AddQuestions />} />
          <Route path="voir-questions" element={<VoirQuestions />} />
          <Route path="voir-questions/:id" element={<DesignerQuestion />} />
        </Route>

        <Route path="/validateur" element={<ValidateurIndex />}>
          <Route
            index
            element={<Navigate to={"/validateur/questions-meanagment"} />}
          />
          <Route path="questions-meanagment" element={<AllQuestions />} />
          <Route path="questions-meanagment/:id" element={<QuestionValidation />} />
          <Route path="questions-validated" element={<AllQuestionsValidated />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
