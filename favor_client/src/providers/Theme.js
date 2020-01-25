import React, { useMemo } from 'react';
import { ThemeProvider as MaterialProvider, createMuiTheme } from '@material-ui/core/styles';
import { useThemeToggle } from './../hooks/useThemeToggle';

export const ThemeContext = React.createContext(null);

export const CustomThemeProvider = ({ children }) => {
    const [themePref, setThemePref] = useThemeToggle();

    const theme = useMemo(
        () =>
            createMuiTheme({
                palette: {
                    type: themePref,
                //     primary: {
                //         main: '#0d47a1',
                //     },
                //     secondary: {
                //         main: '#00bcd4',
                //     },
                        primary: {
                            // main: '#4e33eb',
                            main: '#0B6FCC'
                            // main: '#5DBCD6',
                        },
                        secondary: {
                            // main: '#80deea',
                            main: '#FFA400',
                        },
                },
            }),
        [themePref],
    );

    return (
        <ThemeContext.Provider value={{ themePref, setThemePref }}>
            <MaterialProvider theme={theme}>
                {children}
            </MaterialProvider>
        </ThemeContext.Provider>
    )
};

