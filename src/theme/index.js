import { extendTheme } from "@chakra-ui/react";

export const myNewTheme = extendTheme({
    colors: {
        primary: {
            100: '#4FA095',
        },
        secondery: {
            100: '#E0E0E0',
            200: '#90A4AE',
        },
        third: {
            100: '#03A9F4',
        },
    },
    textStyles: {
        h1: {
            fontSize: ['15px','20px', '30px'],
            fontWeight: 'bold',
            letterSpacing: 'wide',
            fontFamily: 'Exo 2',
            color: 'black'
        },
        h2: {
            color: 'blackAlpha.500',
            fontSize: ['8px','10px', '15px'],
            fontWeight: 'bold',
            letterSpacing: 'wide',
            fontFamily: 'Exo 2',
        },
    },
    components: {
        Button: {
            sizes: {
                sm: {
                    bg: 'black',
                }
            },
            variants: {
                base: {
                    w:'100%',
                },
                sm: {
                    w:'60%',

                },
                md: {
                    w:'80%',

                },
                lg: {
                    w:'100%',

                },
            },
            defaultProps: {
                size: 'sm',
                variant: 'base',
            },
        }
    },
});