import React, {useState} from 'react';
import {FaArrowCircleUp} from 'react-icons/fa';
import { Button } from './Styles';

const TopScroll = () =>{

const [visible, setVisible] = useState(false)

const toggleVisible = () => {
	const scrolled = document.documentElement.scrollTop;
	if (scrolled > 300){
	setVisible(true)
	}
	else if (scrolled <= 300){
	setVisible(false)
	}
};

const scrollToTop = () =>{
	window.scrollTo({
	top: 0,
	behavior: 'smooth' 
	});
};

window.addEventListener('scroll', toggleVisible);

return (
	<div className="mt-5 pt-3">
		<Button>
			<FaArrowCircleUp onClick={scrollToTop}
			style={{display: visible ? 'inline' : 'none'}} />
		</Button>
	</div>
);
}

export default TopScroll;