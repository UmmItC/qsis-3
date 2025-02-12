import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import Logo from "../Branding/logo";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { IconAddressBook, IconBallBasketball, IconBooks, IconCheckbox, IconChevronCompactLeft, IconChevronCompactRight, IconDoorExit, IconFilePencil, IconHome, IconPhoto, IconProgressHelp, IconSettings, IconShield, IconUserCircle } from "@tabler/icons-react";

type NavItemProps = {
  tab: String
  children: React.ReactNode
}

const NavItem = ({tab, children}: NavItemProps) => {
  
  const currentTab = window.location.pathname.split('/')[2]
  const navItemRef = useRef<HTMLAnchorElement>(null)
  const navigate = useNavigate()

  let isTab

  if (currentTab === tab) {isTab = true}

  return (
    <a
      onClick={()=>{
        if (tab !== "logout") {
          navigate(`/dashboard/${tab}`)
        } else {navigate('/login')}
      }}
      className={`
        text-md
        ${isTab ? "text-zinc-50" : ""}
        w-[240px]
        md:w-[260px]
        mt-[1px]
        ${isTab ? "bg-sky-700/60" : "hover:bg-sky-700/15 active:bg-sky-700/30"}
        rounded-full
        py-3
        px-3
        flex
        items-center
        duration-150
        cursor-pointer
        select-none
      `}
      ref={navItemRef}>
      <span className="
        flex
        flex-row
        gap-2
        justify-start
        items-center
        ">
        {children}
      </span>
    </a>
  )
}

const Dashboard = ({children}: {children: React.ReactNode}) => {

  const [navVisibility, setNavVisibility] = useState(true)
  const navRef = useRef<HTMLElement>(null)

  return (
    <div className="w-svw h-svh flex">
      <nav className={`
        bg-sky-50
        border-r-1
        border-r-zinc-200
        ${navVisibility ? "flex" : "hidden"}
        flex-row
        pl-2
      `} ref={navRef}>
        <div className="h-full flex flex-col pt-8 overflow-scroll">
          <div className="mt-2 md:mt-6 mb-4 border-b-sky-700 flex flex-col gap-8 items-center pb-4">
            <Logo logoSize={36} />
            <span className="text-blue-800 text-4xl font-bold">QSIS 3</span>
          </div>
          <NavItem tab="home">
            <IconHome stroke={1.5}/>
            Home
          </NavItem>
          <NavItem tab="profile">
            <IconAddressBook stroke={1.5} />
            Student Profile
          </NavItem>
          <NavItem tab="homework">
            <IconFilePencil stroke={1.5} />
            Homework
          </NavItem>
          <NavItem tab="ec">
            <IconBallBasketball stroke={1.5} />
            Extension Curriculum
          </NavItem>
          <NavItem tab="reading">
            <IconBooks stroke={1.5} />
            Reading
          </NavItem>
          <NavItem tab="ss">
            <IconCheckbox stroke={1.5} />
            Subject Selection
          </NavItem>
          <NavItem tab="support">
            <IconProgressHelp stroke={1.5} />
            Student Support
          </NavItem>
          <NavItem tab="album">
            <IconPhoto stroke={1.5} />
            Album
          </NavItem>
          <hr class="my-3 rounded-full border-2 border-sky-700/60"/>
          <div className="pb-3">
            <NavItem tab="admin">
              <IconShield stroke={1.5} />
              Administration
            </NavItem>
            <NavItem tab="settings">
              <IconSettings stroke={1.5} />
              Settings
            </NavItem>
            <NavItem tab="logout">
              <IconDoorExit stroke={1.5} />
              Logout
            </NavItem>
            <NavItem tab="profile">
              <IconUserCircle stroke={1.5} />
              3A-34 I don't know
            </NavItem>
          </div>
        </div>
        <div className="h-full flex flex-col justify-center">
          <IconChevronCompactLeft stroke={1.5} className="
            cursor-pointer
          " onClick={()=>{
            setNavVisibility(false)
          }} />
        </div>
      </nav>
      <main className="w-full h-full bg-blue-50 p-3 md:p-5">
        <span className={`h-full ${navVisibility ? "hidden" : "flex"} flex-col justify-center absolute top-0`}>
          <IconChevronCompactRight stroke={1.5} className={`cursor-pointer ${navVisibility ? "hidden" : ""}`} onClick={()=>{
            setNavVisibility(true)
          }} />
        </span>
        <div className={`
          w-full
          h-full
          border-3
          border-sky-700/60
          rounded-lg
          shadow-[inset_0_0_6px_rgba(0,0,0,.25)]
          ${navVisibility ? "blur-sm sm:blur-none" : ""}
        `}>
          <div className="w-full h-full">
            {children}
          </div>
        </div>
      </main>
    </div>
  )
}

export default Dashboard
