import React, { useEffect, useState } from 'react';
import SliderContainer from 'components/Slider/SliderContainer';
import { ReactComponent as User } from 'assets/svg/user-svgrepo-com.svg';
import data from 'assets/data.json';
import './slider.scss';

const Slider = () => {
	const [userData, setUserData] = useState([]);
	useEffect(() => {
		setUserData(data?.slice(0, 4));
	}, []);

	const filterUser = type => () => {
		switch (type) {
			case '30':
				setUserData(data?.filter(item => +item.age > 30));
				break;
			case '50':
				setUserData(data?.filter(item => +item.age < 50));
				break;
			case 'it':
				setUserData(data?.filter(item => item.profession === 'IT'));
				break;
			case 'no it':
				setUserData(data?.filter(item => item.profession !== 'IT'));
				break;
			case 'men':
				setUserData(data?.filter(item => item.gender === 'men'));
				break;
			case 'women':
				setUserData(data?.filter(item => item.gender === 'women'));
				break;
			default:
				setUserData(data?.slice(0, 4));
				break;
		}
	};

	return (
		<>
			<div className='slider__content'>
				<SliderContainer amount={650}>
					{userData?.map(({ name, gender, age, profession }, index) => (
						<div id='slide' key={index}>
							<User />
							<div className='user__info'>
								<div className='slide__name'>
									<span>{`name:${name}`}</span>
									<br />
									<span className='data'></span>
								</div>
								<div className='slide__gender'>
									<span>{`gender:${gender}`}</span>
									<br />
									<span className='data'></span>
								</div>
								<div className='slide__age'>
									<span>{`age:${age}`}</span>
									<br />
									<span className='data'></span>
								</div>
								<div className='slide__profession'>
									<span>{`profession:${profession}`}</span>
									<br />
									<span className='data'></span>
								</div>
							</div>
						</div>
					))}
				</SliderContainer>
				<div id='slider-btns'>
					<button onClick={filterUser('30')}>{`> 30 years`}</button>
					<button onClick={filterUser('50')}>{`< 50 years`}</button>
					<button onClick={filterUser('it')}>IT</button>
					<button onClick={filterUser('no it')}>No IT</button>
					<button onClick={filterUser('men')}>Men</button>
					<button onClick={filterUser('women')}>Women</button>
				</div>
			</div>
		</>
	);
};

export default Slider;
