import { gridTemplateColumns } from "styled-system";
import { ThemeUICSSObject } from "theme-ui";

export const commentStyle : ThemeUICSSObject = {
    gap:1,
    p:1,
    borderRadius:10,
    bg:"white",
    gridTemplateAreas:`
        "userinfo userinfo"
        "content content"
        "likedislike actions"
    `,
    gridTemplateColumns:"1fr auto"
}