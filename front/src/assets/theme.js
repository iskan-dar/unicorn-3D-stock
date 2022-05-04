import { createTheme } from '@mui/material';
import { red } from '@mui/material/colors';

const primaryColor = '#141517';
const secondaryColor = '#0054FF';
const dangerColor = red[900];
const appBarBgColor = '#1E1F24';
const appBarColor = '#FFFFFF';

const theme = createTheme({
	palette: {
		primary: {
			main: primaryColor,
		},
		secondary: {
			main: secondaryColor,
		},
		error: {
			main: dangerColor,
		},
	},
	components: {
		MuiAppBar: {
			styleOverrides: {
				colorPrimary: {
					background: appBarBgColor,
					color: appBarColor,
				},
				colorSecondary: {
					background: dangerColor,
					marginBottom: 50,
				},
			},
		},
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          background: secondaryColor,
        }
      }
    },
    // MuiPaper: {
    //   styleOverrides: {
    //     elevation6: {
    //       background: primaryColor,
    //     }
    //   }
    // },
    // MuiInputBase: {
    //   styleOverrides: {
    //     input: {
    //       borderColor: 'white'
    //     }
    //   }
    // }
	},
});

export default theme;
