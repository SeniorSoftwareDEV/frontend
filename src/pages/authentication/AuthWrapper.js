import PropTypes from 'prop-types';

// material-ui
import { Box, Grid, Typography } from '@mui/material';

// project import
import AuthCard from './AuthCard';
import Logo from 'components/Logo';
import AuthFooter from 'components/cards/AuthFooter';

// assets
import AuthBackground from 'assets/images/auth/AuthBackground';

// ==============================|| AUTHENTICATION - WRAPPER ||============================== //

const AuthWrapper = ({ children }) => (
  <Box sx={{ minHeight: '100vh', bgcolor: '#161313' }}>
    <AuthBackground />
    <Grid
      container
      direction="column"
      justifyContent="flex-end"
      sx={{
        minHeight: '100vh'
      }}
    >
      <Grid item xs={12} sx={{ ml: 3, mt: 3 }}>
        <Logo />
      </Grid>
      <Grid item xs={12}>
        <Grid
          item
          xs={12}
          container
          justifyContent="center"
          alignItems="center"
          sx={{ minHeight: { xs: 'calc(100vh - 134px)', md: 'calc(100vh - 112px)' }, display: 'flex', flexDirection: 'column' }}
        >
          <Typography variant="h1" sx={{ fontWeight: 'bold', color: '#009788' }}>
            Trading Buddy
          </Typography>
          <Typography variant="h4" sx={{ color: '#009788' }}>
            Tools
          </Typography>
          <Grid item>
            <AuthCard>{children}</AuthCard>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sx={{ m: 3, mt: 1 }}>
        <AuthFooter />
      </Grid>
    </Grid>
  </Box>
);

AuthWrapper.propTypes = {
  children: PropTypes.node
};

export default AuthWrapper;
