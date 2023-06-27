import ThemeCustomization from 'themes';
import ScrollTop from 'components/ScrollTop';
import AppContainer from 'AppContainer';
// ==============================|| APP - THEME, ROUTER, LOCAL  ||============================== //

const App = () => (
  <ThemeCustomization>
    <ScrollTop>
      <AppContainer />
    </ScrollTop>
  </ThemeCustomization>
);
export default App;
