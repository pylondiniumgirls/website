import React from 'react';
import { FaGithub } from 'react-icons/fa';

import './style.scss';

import gatsbyLogo from '../images/gatsby-icon.png';
import bulmaLogo from '../images/bulma-logo.png';

const Header = () => (
	<section className="hero is-medium is-primary is-bold">
		<div className="hero-body">
			<p className="title has-text-centered is-1 is-spaced">Pylondinium Girls</p>
			<p className="subtitle has-text-centered is-5">Django workshop</p>
		</div>
	</section>
);

export default Header;
