import { Box, Button, Container, Grid, Typography, useTheme } from '@mui/material';
import { FaUser, FaUserTie, FaChartLine, FaMobileAlt, FaRegClock, FaChalkboardTeacher } from "react-icons/fa";
import { Link } from "react-router-dom";
import { styled } from '@mui/system';
import { useRef } from 'react';

const HeroSection = styled('section')(({ theme }) => ({
  minHeight: '70vh',
  display: 'flex',
  alignItems: 'center',
  background: `linear-gradient(rgba(146, 164, 255, 0.72), rgba(136, 193, 255, 0.9)), url('../public/pictures/students.jpg')`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  color: theme.palette.common.white,
  padding: theme.spacing(10, 2),
}));

const FeatureCard = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  backgroundColor: theme.palette.common.white,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[4],
  transition: 'transform 0.3s ease',
  textAlign: 'center',
  '&:hover': {
    transform: 'translateY(-8px)'
  }
}));

const LoginCard = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[2],
  transition: 'all 0.3s ease',
  textAlign: 'center',
  '&:hover': {
    boxShadow: theme.shadows[6],
    backgroundColor: theme.palette.action.hover
  }
}));


export default function GuestHome() {
  const loginSectionRef = useRef(null);
  const theme = useTheme();

  return (
    <Box sx={{ backgroundColor: theme.palette.grey[50] }}>
      {/* Hero Section */}
      <HeroSection sx={{ height: '100vh' }}>
        <Container maxWidth="md">
          <Box textAlign="center">
            <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
              Système Intelligent de Gestion de Présence
            </Typography>
            <Typography variant="h5" component="p" sx={{ mb: 4 }}>
              Suivi en temps réel, analyse des performances, et gestion simplifiée des étudiants
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="large"
              startIcon={<FaChalkboardTeacher />}
              onClick={() => loginSectionRef.current?.scrollIntoView({ behavior: "smooth" })}
              sx={{
                py: 2,
                px: 5,
                borderRadius: 50,
                fontWeight: 700,
                textTransform: 'uppercase'
              }}
            >
              Commencer maintenant
            </Button>
          </Box>
        </Container>
      </HeroSection>

      {/* Features Section */}
      <Container sx={{ py: 8 }}>
        <Typography variant="h3" component="h2" textAlign="center" gutterBottom sx={{ fontWeight: 700 }}>
          Fonctionnalités Clés
        </Typography>
        <Grid container spacing={4} sx={{ mt: 2 }}>
          {[
            { icon: <FaRegClock />, title: "Suivi en Temps Réel", text: "Surveillance instantanée de la présence des étudiants" },
            { icon: <FaChartLine />, title: "Analyses Détaillées", text: "Statistiques et rapports de performance détaillés" },
            { icon: <FaMobileAlt />, title: "Accès Multi-Plateforme", text: "Disponible sur ordinateur, tablette et mobile" },
          ].map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <FeatureCard>
                <Box sx={{ color: 'primary.main', fontSize: 40, mb: 2 }}>
                  {feature.icon}
                </Box>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                  {feature.title}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {feature.text}
                </Typography>
              </FeatureCard>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Login Sections */}
      <Box ref={loginSectionRef} sx={{ py: 8, backgroundColor: 'background.paper' }}>
        <Container>
          <Typography variant="h3" component="h2" textAlign="center" gutterBottom sx={{ fontWeight: 700 }}>
            Accès Personnel
          </Typography>
          <Grid container spacing={4} sx={{ mt: 2 }}>
            {[
              { role: "Administrateur", path: "/administrateur/login", icon: <FaUserTie /> },
              { role: "Gestionnaire", path: "/gestionnaire/login", icon: <FaUser /> },
              { role: "Formateur", path: "/formateur/login", icon: <FaUser /> },
            ].map((login, index) => (
              <Grid item xs={12} md={4} key={index}>
                <LoginCard>
                  <Box sx={{ color: 'primary.main', fontSize: 40, mb: 2 }}>
                    {login.icon}
                  </Box>
                  <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                    {login.role}
                  </Typography>
                  <Button
                    component={Link}
                    to={login.path}
                    variant="contained"
                    color="primary"
                    sx={{
                      borderRadius: 50,
                      px: 4,
                      fontWeight: 600
                    }}
                  >
                    Se Connecter
                  </Button>
                </LoginCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ py: 6, backgroundColor: 'primary', color: 'common.white' }}>
        <Container>
          <Box textAlign="center">
            <img
              src="./pictures/ofppt.png"
              alt="ISTA Logo"
              style={{
                height: 60,
                marginBottom: theme.spacing(2),
              }}
            />
            <Typography variant="body1" paragraph color="text.secondary">
              Institut Spécialisée de Technologie Appliquée SIDI MOUMEN
            </Typography>
            <Typography variant="body2" color="text.secondary">
              © {new Date().getFullYear()} Tous droits réservés
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}