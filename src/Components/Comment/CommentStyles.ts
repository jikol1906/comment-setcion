import { ThemeUICSSObject } from "theme-ui";
import { opacityHover } from "../../defaultStyles";

export const baseCommentGridAreas =`
"userinfo userinfo"
"content content"
"likedislike actions"
`

export const commentStylePresent : ThemeUICSSObject = {
    gap:1,
    gridTemplateAreas:`
        "userinfo userinfo"
        "content content"
        "likedislike actions"
    `,
    gridTemplateColumns:"1fr auto"
}
export const commentStyleEdit : ThemeUICSSObject = {
    gap:1,
    gridTemplateAreas:`
        "userinfo userinfo"
        "textarea textarea"
        "likedislike updatebtn"
    `,
    gridTemplateColumns:"1fr auto"
}

export const buttonStyles : ThemeUICSSObject = {
    display: 'flex',
    alignItems:'center',
    padding:'.5em 0',
    ...opacityHover,
    '& svg': {
        fill:'currentcolor'
    }
}

export const youBadge : ThemeUICSSObject = {
    color:'white', 
    bg:'moderateblue',
    borderRadius:'5px',
    padding:'1px 7px'
}

export const commentGridStyle = "grid grid-cols-[1fr__auto] gap-4"