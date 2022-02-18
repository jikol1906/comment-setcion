import type { Theme } from "theme-ui";
import { opacityHover } from "./defaultStyles";

export const theme: Theme = {
  fonts: {
    main: "'Rubik', sans-serif;",
  },
  colors: {
    moderateblue: "hsl(238, 40%, 52%)",
    softRed: "hsl(358, 79%, 66%)",
    lightgrayishblue: "hsl(239, 57%, 85%)",
    palered: "hsl(357, 100%, 86%)",
    darkblue: "hsl(212, 24%, 26%)",
    grayishBlue: "hsl(211, 10%, 45%)",
    lightgray: "hsl(223, 19%, 93%)",
    verylightgray: "hsl(228, 33%, 97%)",
    white: "hsl(0, 0%, 100%)",
  },
  space:["0","1.8rem","2rem","4rem","6rem","8rem","10rem"],
  lineHeights: {
    heading:1,
    body:'1.5'
  },
  buttons: {
    primary: {
      bg:'moderateblue',
      fontSize:'1.3rem',
      textTransform:'uppercase',
      fontWeight:'bolder',
      borderRadius:7,
      letterSpacing:.4,
      p:"1.5rem 2rem",
      cursor: 'pointer',
      ...opacityHover
    },
    blank: {
      outline:'none',
      cursor: 'pointer',
      bg:'transparent',
      fontWeight:'bold',
      fontFamily:'main',
      fontSize:1,
    },
    icon: {
      cursor: 'pointer',
      height: "auto",
      outline:"none",
      p:"1rem",
      "& svg" : {
        transition: 'transform .2s ease',
      },
      "&:hover svg,&:focus svg": {
        transform: 'translateY(-2px) scale(1.05)'
      }
    }
  },
  forms: {
    textarea: {
      p:".5rem 1rem",
      fontSize:1,
      fontFamily:'main',
      color:'grayishBlue',
      resize:'none',
      outline: 'moderateblue',
      lineHeight:'body'
    }
  },  
  fontSizes:["1rem","1.6rem"],
  fontWeights: {
    normal:'400',
    bold:'500',
    bolder:'700'
  },
  images: {
    avatar: {
        width: 35,
    }
  },
  text: {
      default: {
        fontFamily:'main',
        lineHeight:'body',
        fontSize:1
      },
      muted: {
        fontFamily:'main',
        lineHeight:'body',
        fontSize:1,
        color:'grayishBlue'
      },
      heading: {
          fontFamily:'main',
          fontWeight:'bold',    
          lineHeight:'heading',
      }
  },
  styles: {
      root: {
          bg:'lightgray',
          fontSize:'50%'
      },
  }
  
};
