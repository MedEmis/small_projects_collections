import React from 'react'
import './App.scss';
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom'
import { Navigation, routes } from './PAGES/Navigation';

function App() {
	const routeComponents = routes.map(({ path, component }) => <Route exact path={"/" + path} component={component} key={path} />);
	return (
		<div className="App">
			<BrowserRouter>
				<Navigation />
				<div className="App-body">
					<Switch>
						{routeComponents}
						<Redirect exact from="/" to="Posts" />
					</Switch>
				</div>
			</BrowserRouter>
		</div>
	);
}


export default App;
