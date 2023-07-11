import React, { Component } from 'react'
import logo from '../../assets/logo.svg'
import "./Header.css"

export default class HeaderLogo extends Component {
    render() {
        return (
            <img src={logo} alt="логотип" className='logo'/>
        )
    }
}
