import { useEffect, useState } from "react";
import { 
  Box, 
  Typography, 
  useTheme, 
  Grid, 
  LinearProgress,
  Skeleton, 
  styled 
} from "@mui/material";
import Header from "../../../components/Header";
import { axiosClient } from "../../../config/Api/AxiosClient";
import { 
  PeopleAlt, 
  School, 
  Warning, 
  Schedule 
} from "@mui/icons-material";

const StatCard = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: '16px',
  padding: theme.spacing(4),
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[8]
  }
}));

const DashboardAdmin = () => {
  const theme = useTheme();
  const [stats, setStats] = useState({
    students: 0,
    absences: 0,
    alerts: 0,
    formateurs: 0
  });
  const [loading, setLoading] = useState(true);

  // Safe color getter function
  const getColor = (colorName) => {
    return theme.palette[colorName]?.main || theme.palette.primary.main;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [studentsRes, absencesRes, alertsRes, designersRes] = await Promise.all([
          axiosClient.get('/dashboard/total-students'),
          axiosClient.get('/dashboard/total-absences'),
          axiosClient.get('/dashboard/total-alerts'),
          axiosClient.get('/dashboard/total-designers'),
        ]);

        setStats({
          students: studentsRes.data.total,
          absences: absencesRes.data.total,
          alerts: alertsRes.data.total,
          formateurs: designersRes.data.total
        });
      } catch (error) {
        console.error('Error fetching dashboard data', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Box sx={{ p: 4 }}>
      {/* Welcome Header */}
      <Box sx={{ mb: 6, textAlign: 'center' }}>
        <Header 
          title="Tableau de Bord Administratif" 
          subtitle="Bienvenue dans votre portail de gestion" 
        />
        <Typography variant="body1" sx={{ mt: 2, color: 'text.secondary' }}>
          Surveillance en temps réel des indicateurs clés de performance
        </Typography>
      </Box>

      {/* Stats Grid */}
      <Grid container spacing={4} justifyContent="center">
        {[
          { 
            icon: <School sx={{ fontSize: 40, color: getColor('primary') }} />,
            title: "Étudiants",
            value: stats.students,
            color: getColor('primary')
          },
          { 
            icon: <PeopleAlt sx={{ fontSize: 40, color: getColor('secondary') }} />,
            title: "Formateurs",
            value: stats.formateurs,
            color: getColor('secondary')
          },
          { 
            icon: <Schedule sx={{ fontSize: 40, color: getColor('error') }} />,
            title: "Absences",
            value: stats.absences,
            color: getColor('error')
          },
          { 
            icon: <Warning sx={{ fontSize: 40, color: getColor('warning') }} />,
            title: "Alertes",
            value: stats.alerts,
            color: getColor('warning')
          },
        ].map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <StatCard>
              {loading ? (
                <>
                  <Skeleton variant="circular" width={40} height={40} />
                  <Skeleton variant="text" sx={{ mt: 2, fontSize: '2rem' }} />
                  <Skeleton variant="text" width="60%" />
                </>
              ) : (
                <>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    {stat.icon}
                    <Typography variant="h4" sx={{ fontWeight: 700, color: stat.color }}>
                      {stat.value}
                    </Typography>
                  </Box>
                  <Typography variant="h6" sx={{ mt: 1 }}>
                    {stat.title}
                  </Typography>
                  <LinearProgress 
                    variant="determinate" 
                    value={Math.min((stat.value / 1000) * 100, 100)}
                    sx={{ 
                      mt: 2,
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: theme.palette.action.hover,
                      '& .MuiLinearProgress-bar': {
                        backgroundColor: stat.color
                      }
                    }}
                  />
                </>
              )}
            </StatCard>
          </Grid>
        ))}
      </Grid>

      {/* Status Bar */}
      {!loading && (
        <Box sx={{ 
          mt: 6,
          p: 3,
          borderRadius: 4,
          backgroundColor: 'background.default',
          textAlign: 'center'
        }}>
          <Typography variant="body2" color="text.secondary">
            Dernière mise à jour: {new Date().toLocaleTimeString()}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default DashboardAdmin;