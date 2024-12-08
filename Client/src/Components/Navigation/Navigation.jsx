import React from 'react'
import styles from './Navigation.module.css'
import { NavLink } from 'react-router-dom'

export const Navigation = ({ setActiveNav }) => {
  return (
    <nav id='navigation' className={styles.navigation}>
      <div id='navigationbg1'></div>
      <div id='navigationbg2'>
        <NavLink onClick={()=>setActiveNav(false)} className="nav-link" style={{"--dataText": "'home'"}} to='/'>home</NavLink>
        <NavLink onClick={()=>setActiveNav(false)} className="nav-link" style={{"--dataText": "'about'"}} to='/about'>about</NavLink>
        <NavLink onClick={()=>setActiveNav(false)} className="nav-link" style={{"--dataText": "'portfolio'"}} to='/project'>portfolio</NavLink>
        <NavLink onClick={()=>setActiveNav(false)} className="nav-link" style={{"--dataText": "'youtube video'"}} to='/youtube-video'>youtube video</NavLink>
      </div>
    </nav>
  )
}
