import React from 'react';

import './style.scss';
import Helmet from './helmet';
import Header from './header';
import Midsection from './midsection';
import Navbar from './navbar';

const Layout = ({ children }) => (
	<div>
		<Helmet />
		<Navbar />
		<Header />
		<Midsection />
	</div>
);

export default Layout;
