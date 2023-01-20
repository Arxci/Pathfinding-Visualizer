import React from 'react'

const Button = ({ name, onClicked }) => {
	return (
		<button className="button" onClick={() => onClicked()}>
			{name}
		</button>
	)
}

Button.defaultProps = {
	name: 'Button',
}

export default Button
