import React, { Component } from 'react';

export default class AlphaButton extends Component {
	render() {
		const { ltr, handleGuess, isGuessed } = this.props;
		return (
			<button value={ltr} onClick={handleGuess} disabled={isGuessed}>
				{ltr}
			</button>
		);
	}
}
