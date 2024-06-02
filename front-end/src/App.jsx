import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";

// Pages
import GuestHome from "./componets/Guest/GuestHome";
import AllDesigners from "./componets/admin/_designers/AllDesigners";
import AllValidators from "./componets/admin/_validators/AllValidators";
import AddQuestions from "./componets/designer/questions/AddQuestions";
import VoirQuestions from "./componets/designer/questions/VoirQuestions";

// Auth Components
import ConcepteurLogin from "./componets/Auth/designer/ConcepteurLogin";
import ValidateurLogin from "./componets/Auth/Validator/ValidateurLogin";
import AdministrateurLogin from "./componets/Auth/admin/AdministrateurLogin";

//Layouts
import GuestIndex from "./layouts/Guest/GuestIndex";
import ConcepteurIndex from "./layouts/formateur/FormateurIndex";
import ValidateurIndex from "./layouts/gestionnaire/GestionnaireIndex";
import AdminIndex from "./layouts/admin/AdminIndex";
import AllAdminQuestions from "./componets/admin/questions/AllAdminQuestions";
import AllSecteurs from "./componets/admin/secteurs/AllSecteurs";
import AllFilieres from "./componets/admin/filieres/AllFilieres";
import AdminQuestion from "./componets/admin/questions/AdminQuestion";
import DesignerQuestion from "./componets/designer/questions/DesignerQuestion";
import EtudiantList from "./componets/designer/questions/EtudiantListFormateur";
import EtudiantListFormateur from "./componets/designer/questions/EtudiantListFormateur";
import EtudiantListGestionnaire from "./componets/Validator/EtudiantListGestionnaire";
import AllEtudiant from "./componets/admin/etudiants/AllEtudiant";
import { useState } from "react";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import Invoices from "./scenes/invoices";
import Contacts from "./scenes/contacts";
import Bar from "./scenes/bar";
import Form from "./scenes/form";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import FAQ from "./scenes/faq";
import Geography from "./scenes/geography";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import DashboardAdmin from "./layouts/admin/dashboard";
import FormateurIndex from "./layouts/formateur/FormateurIndex";
import DashboardFormateur from "./layouts/formateur/dashboard";
import DashboardGestionnaire from "./layouts/gestionnaire/dashboard";
import AbsencesByDaySeanceGroup from "./componets/Validator/AbsencesByDaySeanceGroup";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
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
                element={<DashboardAdmin />}
              />
              <Route path="etudiants" element={<AllEtudiant />} />
              <Route path="validateurs" element={<AllValidators />} />
              <Route path="designers" element={<AllDesigners />} />
              <Route path="questions" element={<AllAdminQuestions />} />
              <Route path="questions/:id" element={<AdminQuestion />} />
              <Route path="secteurs" element={<AllSecteurs />} />
              <Route path="filieres" element={<AllFilieres />} />
            </Route>

            <Route path="/concepteur" element={<FormateurIndex />}>
              <Route
                index
                element={<DashboardFormateur />}
              />
              <Route path="etudiants" element={<EtudiantListFormateur />} />
              <Route path="questions" element={<VoirQuestions />} />
              <Route path="questions/:id" element={<DesignerQuestion />} />
              <Route path="team" element={<Team />} />
              <Route path="contacts" element={<Contacts />} />
              <Route path="invoices" element={<Invoices />} />
              <Route path="form" element={<Form />} />
              <Route path="bar" element={<Bar />} />
              <Route path="pie" element={<Pie />} />
              <Route path="line" element={<Line />} />
              <Route path="faq" element={<FAQ />} />
              <Route path="geography" element={<Geography />} />
            </Route>

            <Route path="/validateur" element={<ValidateurIndex />}>
              <Route
                index
                element={<DashboardGestionnaire />}
              />
              <Route path="etudiants" element={<EtudiantListGestionnaire />} />
              <Route path="absences" element={<AbsencesByDaySeanceGroup />} />
            </Route>
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
          {/* 
          <div className="app">
          <Sidebar isSidebar={isSidebar} />
            <main className="content">
              <Topbar setIsSidebar={setIsSidebar} />
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/team" element={<Team />} />
                <Route path="/contacts" element={<Contacts />} />
                <Route path="/invoices" element={<Invoices />} />
                <Route path="/form" element={<Form />} />
                <Route path="/bar" element={<Bar />} />
                <Route path="/pie" element={<Pie />} />
                <Route path="/line" element={<Line />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/geography" element={<Geography />} />
              </Routes>
            </main>
          </div>
            */}
        </ThemeProvider>

      </ColorModeContext.Provider>
    </>
  );
}

export default App;
