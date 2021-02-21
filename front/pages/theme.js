// https://material-ui.com/customization/default-theme/
// https://www.materialpalette.com/blue/orange
import { createMuiTheme } from '@material-ui/core'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#2196f3',
      dark: '#1976d2',
      light: '#bbdefb',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#ff9800',
      contrastText: '#FFFFFF',
    },
    text: {
      primary: '#212121',
      secondary: '#757575',
    },
    divider: '#BDBDBD',
  },
  typography: {
    button: {
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: '4px',
  },
})

export default theme
