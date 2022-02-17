import type { Theme } from "theme-ui";

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
      color:'moderateblue',
      cursor: 'pointer',
      bg:'transparent',
      fontWeight:'bold',
      fontFamily:'main',
      fontSize:1
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
      heading: {
          fontFamily:'main',
          fontWeight:'bold',    
          lineHeight:'heading',
      }
  },
  styles: {
      root: {
          bg:'lightgray',
          fontSize:'62.5%'
      },
  }
  
};
