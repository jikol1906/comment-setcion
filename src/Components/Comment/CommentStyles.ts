import { gridTemplateColumns } from "styled-system";
import { ThemeUICSSObject } from "theme-ui";

export const commentStyle : ThemeUICSSObject = {
    gap:1,
    gridTemplateAreas:`
        "userinfo userinfo"
        "content content"
        "likedislike actions"
    `,
    gridTemplateColumns:"1fr auto"
}

export const buttonStyles : ThemeUICSSObject = {
    display: 'flex',
    alignItems:'center',
    "&:hover,&:focus": {
        opacity:.6
    },
    '& svg': {
        fill:'currentcolor'
    }
}