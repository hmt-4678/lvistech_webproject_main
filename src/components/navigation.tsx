import React, { useState, useEffect } from 'react'
import { Link } from 'gatsby'
import tw, { styled } from 'twin.macro'
import colors from './colors'
import NavRoute from './navigationRoutes'
import { useServices } from '../hooks'
import "../components/custom.css"

import Button from '@material-ui/core/Button'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import Grow from '@material-ui/core/Grow'
import Paper from '@material-ui/core/Paper'
import Popper from '@material-ui/core/Popper'
import MenuItem from '@material-ui/core/MenuItem'
import MenuList from '@material-ui/core/MenuList'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import CompanyNav from '../pages/CompanyNav'
import ServicesNavMenu from '../pages/ServicesNavMenu'

const Navbar = styled.header`
  ${tw`flex items-center w-screen h-20  p-2 px-2 lg:px-6 lg:justify-between shadow-xl m-0 z-10`}
  background-color: ${colors.base};
  position: sticky;
  top: 0;
  width:  100%;
  z-index: 100;
`


const TitleButton = styled.button`
  ${tw`cursor-pointer lg:hidden `}
  &.invisibleButton {
    display: none;
  }
`

const NavigationView = styled.nav`
  ${tw`w-screen h-screen flex-col justify-center m-0 z-10  items-center inset-0 fixed flex
  transition-all duration-200 ease-in-out`}
  /* transition-all ease-in-out duration-500 */
  background-color: ${colors.accentDark};
  &.visibleNav {
    ${tw`flex `}/* ${tw`opacity-100 h-screen justify-center m-0`} */
  }

  &.invisibleNav {
    ${tw` w-0 py-0`}
  }
  &.invisibleNav > * {
    ${tw`invisible`}
  }
`

const ChildNav = styled.div`
  ${tw`invisible m-0 p-0 sm:pb-10 sm:px-32 absolute top-20 mt-2 left-0 flex flex-wrap justify-evenly
  shadow-lg`}
  background-color: ${colors.accentLight};
  overflow: auto;
  &.visibleChildNav {
    ${tw`h-auto w-screen visible`}
  }
`

const NavLink = styled.div`
  ${tw`p-3 text-2xl md:text-2xl`}
  color: ${colors.accentDark};
  text-decoration: none;
  &:hover {
    color: ${colors.accent};
  }
`

const NavLinkContainer = styled.div`
  ${tw`  m-0 p-0 mr-6 cursor-pointer hidden sm:flex`};
  &.visible:{
    flex
  }
`
const Icon = styled.svg`
  ${tw`m-auto transition-all duration-200 ease-in-out cursor-pointer`}

  &.rotate {
    transform: rotateX(180deg);
  }
`

const ServiceCard = styled.div`
  ${tw`text-center w-36 sm:w-full m-5 sm:mx-1 lg:w-1/4 cursor-pointer `};

  // &:hover > img {
  //   ${tw`shadow-lg p-4`}
  // }
`


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    paper: {
      marginRight: theme.spacing(2),
    },
  }),
);
  
export default function Navigation(): JSX.Element {

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: React.MouseEvent<EventTarget>) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus();
    }

    prevOpen.current = open;
  }, [open]);

  
  const [services] = useState(useServices())
  const [visible, setVisibility] = useState(false)
  const [expanded, setExpanded] = useState(false)
  useEffect(() => {
    if (window.matchMedia('(min-width: 770px)').matches) {
      setVisibility(true)
    }
  })

  return (
    <>
      <Navbar>
        {/* <TitleButton
          onClick={() => {
            setVisibility(!visible)
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 3H22" stroke="white" strokeWidth="3" strokeLinecap="round" />
            <path d="M2 12H22" stroke="white" strokeWidth="3" strokeLinecap="round" />
            <path d="M2 21H22" stroke="white" strokeWidth="3" strokeLinecap="round" />
          </svg>
        </TitleButton> */}
        <Link tw="h-8 ml-2 lg:ml-4 my-auto" to="/">
          <svg width="134" height="29" viewBox="0 0 134 29" fill="none">
            <path
              d="M0.882812 28V2.26562H6.38477V23.3242H15.1738V28H0.882812ZM22.4512 28L15.4375 10.7559H21.2207L24.1387 19.7207C24.373 20.4473 24.5605 21.1211 24.7012 21.7422C24.8418 22.3633 24.9414 22.9727 25 23.5703C25.1406 22.668 25.2812 21.9004 25.4219 21.2676C25.5625 20.6348 25.7266 20.0605 25.9141 19.5449L28.8496 10.7559H34.5449L27.4609 28H22.4512ZM36.4785 3.67188C36.4785 2.875 36.7656 2.18945 37.3398 1.61523C37.9141 1.04102 38.5996 0.753906 39.3965 0.753906C40.2051 0.753906 40.8965 1.04102 41.4707 1.61523C42.0566 2.17773 42.3496 2.86328 42.3496 3.67188C42.3496 4.48047 42.0566 5.17187 41.4707 5.74609C40.8965 6.32031 40.2051 6.60742 39.3965 6.60742C38.5996 6.60742 37.9141 6.31445 37.3398 5.72852C36.7656 5.14258 36.4785 4.45703 36.4785 3.67188ZM36.918 28V10.7559H41.9102V28H36.918ZM45.3027 24.9766L49.1523 22.9902C49.2812 23.6582 49.627 24.1855 50.1895 24.5723C50.752 24.959 51.4492 25.1523 52.2812 25.1523C53.1016 25.1523 53.7461 25.0059 54.2148 24.7129C54.6836 24.4082 54.918 23.9922 54.918 23.4648C54.918 22.6328 54.0859 21.9355 52.4219 21.373C51.9062 21.1973 51.4961 21.0508 51.1914 20.9336C49.1641 20.1719 47.7578 19.4043 46.9727 18.6309C46.1992 17.8574 45.8125 16.9023 45.8125 15.7656C45.8125 14.0781 46.4746 12.7129 47.7988 11.6699C49.123 10.627 50.8691 10.1055 53.0371 10.1055C54.584 10.1055 55.9199 10.416 57.0449 11.0371C58.1816 11.6582 59.0078 12.5371 59.5234 13.6738L55.8496 15.502C55.6504 14.8574 55.3047 14.3711 54.8125 14.043C54.3203 13.7031 53.7051 13.5332 52.9668 13.5332C52.2285 13.5332 51.6309 13.6855 51.1738 13.9902C50.7168 14.2949 50.4883 14.6934 50.4883 15.1855C50.4883 16.041 51.625 16.8379 53.8984 17.5762C54.168 17.6582 54.373 17.7227 54.5137 17.7695C56.4004 18.3906 57.7422 19.1172 58.5391 19.9492C59.3359 20.7695 59.7344 21.8184 59.7344 23.0957C59.7344 24.8066 59.0723 26.166 57.748 27.1738C56.4238 28.1816 54.6367 28.6855 52.3867 28.6855C50.6055 28.6855 49.082 28.3574 47.8164 27.7012C46.5625 27.0332 45.7246 26.125 45.3027 24.9766ZM73.4629 6.94141V28H67.9434V6.94141H61.6504V2.26562H79.791V6.94141H73.4629ZM91.1816 17.5938C91.041 16.5039 90.6426 15.6836 89.9863 15.1328C89.3418 14.5703 88.457 14.2891 87.332 14.2891C86.207 14.2891 85.3047 14.5703 84.625 15.1328C83.957 15.6836 83.5293 16.5039 83.3418 17.5938H91.1816ZM96.1387 20.6172H83.1836C83.3828 21.8594 83.834 22.791 84.5371 23.4121C85.2402 24.0215 86.1953 24.3262 87.4023 24.3262C88.3164 24.3262 89.1016 24.1504 89.7578 23.7988C90.4258 23.4473 90.9824 22.9141 91.4277 22.1992L95.4707 24.2207C94.5332 25.7324 93.3965 26.8574 92.0605 27.5957C90.7246 28.3223 89.1367 28.6855 87.2969 28.6855C84.5078 28.6855 82.2988 27.8535 80.6699 26.1895C79.041 24.5254 78.2266 22.2871 78.2266 19.4746C78.2266 16.7676 79.0762 14.541 80.7754 12.7949C82.4863 11.0488 84.6719 10.1758 87.332 10.1758C90.0742 10.1758 92.2422 10.9961 93.8359 12.6367C95.4297 14.2656 96.2266 16.4922 96.2266 19.3164C96.2266 19.4688 96.2207 19.6387 96.209 19.8262C96.1973 20.002 96.1738 20.2656 96.1387 20.6172ZM112.645 27.4902C111.965 27.9004 111.25 28.1992 110.5 28.3867C109.75 28.5859 108.93 28.6855 108.039 28.6855C105.32 28.6855 103.105 27.8242 101.395 26.1016C99.6836 24.3672 98.8281 22.1172 98.8281 19.3516C98.8281 16.6445 99.6895 14.4414 101.412 12.7422C103.135 11.0312 105.367 10.1758 108.109 10.1758C109.023 10.1758 109.844 10.2637 110.57 10.4395C111.297 10.6152 111.988 10.8906 112.645 11.2656L112.609 16.293C112.082 15.7539 111.473 15.3379 110.781 15.0449C110.09 14.752 109.357 14.6055 108.584 14.6055C107.178 14.6055 106.053 15.0391 105.209 15.9062C104.365 16.7617 103.943 17.8984 103.943 19.3164C103.943 20.7695 104.371 21.9297 105.227 22.7969C106.094 23.6523 107.26 24.0801 108.725 24.0801C109.533 24.0801 110.248 23.9336 110.869 23.6406C111.502 23.3477 112.082 22.8906 112.609 22.2695L112.645 27.4902ZM116.424 28V0.753906H121.328V10.4395C121.328 10.9785 121.311 11.5176 121.275 12.0566C121.24 12.584 121.188 13.0996 121.117 13.6035C122.148 12.3965 123.18 11.5234 124.211 10.9844C125.254 10.4453 126.414 10.1758 127.691 10.1758C129.027 10.1758 130.152 10.4043 131.066 10.8613C131.992 11.3184 132.707 12.0039 133.211 12.918C133.469 13.3984 133.65 13.9434 133.756 14.5527C133.873 15.1504 133.932 16.0938 133.932 17.3828V17.9277V28H128.922V19.4746C128.922 17.3535 128.676 15.9531 128.184 15.2734C127.691 14.5938 126.848 14.2539 125.652 14.2539C124.961 14.2539 124.322 14.4004 123.736 14.6934C123.162 14.9746 122.682 15.3789 122.295 15.9062C121.99 16.3164 121.768 16.7852 121.627 17.3125C121.498 17.8398 121.434 18.6426 121.434 19.7207V20.4062V28H116.424Z"
              fill="#413973"
            />
          </svg>
        </Link>

        {/* <TitleButton
          className={visible ? 'right-corner' : 'invisibleButton'}
          onClick={() => {
            setVisibility(!visible)
            setExpanded(false)
          }}
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L21 21M21 1L1 21" stroke="#FBFBFB" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </TitleButton> */}
     

        {/* <NavigationView className={visible ? '' : 'invisibleNav'}>
          <NavRoute to="/" setVisibility={setVisibility}>
          About Us
        </NavRoute> */}

        
        {/* </NavigationView> */} 
        
      
        <div tw="flex m-6 space-x-8 ">
       
        <ServicesNavMenu/>
       
        <CompanyNav/>
        
      
        <Link to="/contact" tw="text-2xl m-7  p-3"  style={{ color: colors.blue }} > Contact Us</Link>
      </div>
   
        
    



      
      <ChildNav
          onMouseEnter={() => {
            setExpanded(true)
          }}
          onMouseLeave={() => {
            setExpanded(!expanded)
          }}
          className={expanded ? 'visibleChildNav' : ''}
        >
          {services.map(service => (
            <ServiceCard key={service.id}>
              <img tw="m-auto w-16 sm:w-28 mt-8 mb-6" src={service.featuredImage.src} />
              <span tw="text-xl">{service.title}</span>
            </ServiceCard>
          ))}
        </ChildNav>
      </Navbar>
    </>
  )
}
