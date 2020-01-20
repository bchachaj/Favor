import React from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { useLocalStorage } from './useLocalStorage'; 

export const useThemeToggle = () => {
    const preferedMode = useMediaQuery('(prefers-color-scheme: dark)') ? 'dark' : 'light';

    const [localTheme, setLocalTheme] = useLocalStorage('material_theme');
    const enabledPref = localTheme !== 'undefined' ? localTheme : preferedMode; 


    return [enabledPref, setLocalTheme]; 
};