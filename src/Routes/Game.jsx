import React from 'react';
import Layout from "../HOC/Layout/Layout";

const Game = (props) => {
	return (
		<Layout>
			<Layout.Nav />

			<Layout.Content>
				<h2>This is my Game</h2>
			</Layout.Content>

			<Layout.Footer>

			</Layout.Footer>
		</Layout>
	);
}

export default Game;