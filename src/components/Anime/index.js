import Plane from './Plane';
import { ReactComponent as ArrowRight } from 'assets/svg/arrow_1.svg';
import { ReactComponent as ArrowLeft } from 'assets/svg/arrow_2.svg';
import './anime.scss';

const Anime = () => {
	const handleAnimSize = () => {
		const animContainer = document.querySelector('#anim');
		if (animContainer) {
			return animContainer.clientWidth;
		} else {
			console.error('Container not found');
			return 0;
		}
	};
	return (
		<div id='anim'>
			<Plane size={handleAnimSize} />
			<ArrowRight />
			<ArrowLeft />
		</div>
	);
};

export default Anime;
