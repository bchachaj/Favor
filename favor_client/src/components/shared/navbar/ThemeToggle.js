import React, { useContext } from 'react'
import Brightness4SharpIcon from '@material-ui/icons/Brightness4Sharp';
import Brightness5TwoToneIcon from '@material-ui/icons/Brightness5TwoTone';
import IconButton from '@material-ui/core/IconButton';
import { ThemeContext } from './../../../providers/Theme';

export default function ThemeToggle() {
    const { themePref, setThemePref } = useContext(ThemeContext);

    const toggleTheme = (curr) => {
        const val = (curr === 'dark' ? 'light' : 'dark');
        setThemePref(val);
    }

    const toggleIcon = (themePref) => {
        if (themePref === 'light') {
            return <Brightness4SharpIcon onClick={() => toggleTheme(themePref)} />
        } else {
            return <Brightness5TwoToneIcon onClick={() => toggleTheme(themePref)} />
        }
    }

    return (
        <IconButton>
            {toggleIcon(themePref)}
        </IconButton>
    )
}
