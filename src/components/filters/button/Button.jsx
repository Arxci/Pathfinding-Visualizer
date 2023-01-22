import React from 'react'

const Button = ({ name, onClicked, color }) => {
	return (
		<button className={'button ' + color} onClick={() => onClicked()}>
			{name}
		</button>
	)
}

Button.defaultProps = {
	name: 'Button',
	color: 'default',
}

export default Button
