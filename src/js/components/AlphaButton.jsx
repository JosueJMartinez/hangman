import React, { Component } from 'react';

export default class AlphaButton extends Component {
	render() {
		const { idx, ltr, handleGuess, isGuessed } = this.props;
		return (
			<button
				idx={idx}
				value={ltr}
				onClick={handleGuess}
				disabled={isGuessed}
			>
				{ltr}
			</button>
		);
	}
}
