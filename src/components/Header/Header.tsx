import React, { Component } from 'react'
import './Header.css'
import HeaderLogo from './HeaderLogo'
import Clock from './Clock'
import LanguageSelector from './LanguageSelector'

export default class Header extends Component {
	render() {
		return (
			<header className='header'>
				<HeaderLogo/>
				<Clock/>
				<LanguageSelector/>
			</header>
		)
	}
}
