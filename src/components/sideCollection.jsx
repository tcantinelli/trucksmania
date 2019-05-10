import React from 'react';
import { Link } from 'react-router-dom';

//Style
const collectioItemStyle = {
	//padding: '0px'
};

const rowStyle = {
	margin: '0px' 
};

const SideCollection = ({path, title, icon, count}, key) => {
	return (
		<li className="collection-item" style={collectioItemStyle} key={key}>
			<div className="row valign-wrapper" style={rowStyle}>
				<div className="col s2">
					<i className="small material-icons">{icon}</i>
				</div>
				<div className="col s7 valign-wrapper">
					<Link className="nav-link" to={path}>{title}</Link>
				</div>
				<div className="col s3 valign-wrapper">
					{count
						? <span className="new badge blue" data-badge-caption="" style={rowStyle}>{count}</span>
						: null					
					}
				</div>
			</div>	
		</li>
	);
};

export default SideCollection;


