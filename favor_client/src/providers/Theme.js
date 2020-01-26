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
                        primary: {
                            main: '#0B6FCC'
                        },
                        secondary: {
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

