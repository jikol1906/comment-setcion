import { gridTemplateColumns } from "styled-system";
import { ThemeUICSSObject } from "theme-ui";
import { opacityHover } from "../../defaultStyles";

export const commentStylePresent : ThemeUICSSObject = {
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
    ...opacityHover,
    '& svg': {
        fill:'currentcolor'
    }
}