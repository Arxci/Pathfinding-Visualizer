import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

const Tooltip = ({ backgroundColor, icon, tooltip, info }) => {
	const [isHovering, setIsHovering] = useState(false)
	const [currentFade, setCurrentFade] = useState('')

	useEffect(() => {
		if (isHovering) {
			setCurrentFade('fade-in')
		} else {
			setCurrentFade('fade-out')
		}
	}, [isHovering])

	return (
		<div
			className="tooltip"
			onMouseLeave={() => setIsHovering(false)}
			onMouseEnter={() => setIsHovering(true)}
		>
			<div className={'tooltip__wrapper ' + backgroundColor}>
				<i className={'tooltip__icon ' + icon} />
				<p className={'tooltip__wrapper__info has-fade ' + currentFade}>
					{info}
				</p>
			</div>
			<p className="tooltip__text">{tooltip}</p>
		</div>
	)
}

Tooltip.defaultProps = {
	tooltip: 'This is a tooltip',
	backgroundColor: 'default',
	info: 'CTRL left click',
}
export default Tooltip
