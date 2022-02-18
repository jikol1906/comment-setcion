import { ThemeUICSSObject } from "theme-ui";

export const opacityHover : ThemeUICSSObject = {
    "&:hover,&:focus": {
        opacity:.6
    }
}

export const buttonReset : ThemeUICSSObject = {
    outline:'none',
    cursor: 'pointer',
    fontFamily:'main',
}