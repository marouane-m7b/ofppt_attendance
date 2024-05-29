import React from "react";
import { FaUser, FaUserTie } from "react-icons/fa"; // Import des icônes Font Awesome
import { Link } from "react-router-dom";
export default function GuestHome() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between", // Utilisation de l'espace entre les éléments pour placer le footer en bas
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#fff", // Changement de la couleur de fond en blanc
        color: "#000", // Changement de la couleur du texte en noir
        padding: "20px",
        fontFamily: "Arial, sans-serif", // Changement de la police d'écriture
      }}
    >
      <div style={{ marginTop: "20px", width: "100%", maxWidth: "400px" }}>
        <img
          src={"./pictures/ista.png"}
          alt="ISTA Logo"
          style={{ width: "100%" }}
        />
      </div>
      <div style={{ textAlign: "center", marginTop: "100px" }}>
        <h2>
          Bienvenue à l'Institut Spécialisée de Technologie Appliquée SIDI
          MOUMEN
        </h2>
        <p>Nous sommes là pour vous offrir nos meilleurs services :</p>
        <div className="d-flex justify-content-center flex-wrap" 
          style={{
            marginTop: "100px",
          }}
        >
          <Link
            to="/concepteur/login"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "10px 20px",
              margin: "0 10px",
              backgroundColor: "#007bff",
              color: "#fff",
              textDecoration: "none",
              borderRadius: "5px",
              border: "2px solid #fff",
              transition: "background-color 0.3s ease",
            }}
          >
            <FaUser style={{ marginRight: "10px" }} /> Connexion Concepteur
          </Link>
          <Link
            to="/validateur/login"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "10px 20px",
              width: '234px',

              // margin: "0 10px",
              backgroundColor: "#007bff",
              color: "#fff",
              textDecoration: "none",
              borderRadius: "5px",
              border: "2px solid #fff",
              transition: "background-color 0.3s ease",
            }}
          >
            <FaUser style={{ marginRight: "10px" }} /> Connexion Validateur
          </Link>
        </div>
        <div className="pt-md-3 ms-lg-2 ms-md-2 ms-sm-0">
          <Link
            to="/administrateur/login"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "10px 20px",
              margin: "0 10px",
              backgroundColor: "#007bff",
              color: "#fff",
              textDecoration: "none",
              borderRadius: "5px",
              border: "2px solid #fff",
              transition: "background-color 0.3s ease",
            }}
          >
            <FaUserTie style={{ marginRight: "10px" }} /> Connexion Administrateur
          </Link>
        </div>
      </div>
      <footer
        style={{
          width: "100%",
          textAlign: "center",
          marginTop: "auto",
          fontSize: "0.8rem",
          color: "#999",
        }}
      >
        <p>&copy; ISTA SIDI MOUMEN</p>
      </footer>
    </div>
  );
}
