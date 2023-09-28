import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ReactComponent as NextArrow } from 'assets/svg/arrow-next-small-svgrepo-com.svg';
import { ReactComponent as PrevArrow } from 'assets/svg/arrow-prev-small-svgrepo-com.svg';

export const SliderContainer = ({ children, amount }) => {
	const [next, setNext] = useState(false);
	const [prev, setPrev] = useState(false);
	const [isMouseDown, setIsMouseDown] = useState(false);
	const containerRef = useRef(null);
	const prevRef = useRef(null);
	const nextRef = useRef(null);

	const handleSlide = useCallback((amount, behavior) => {
		if (containerRef.current) {
			containerRef.current.scrollBy({ left: amount, behavior });
		}
	}, []);

	const handleMouseMove = useCallback(
		e => {
			if (isMouseDown) {
				handleSlide(-e.movementX, 'auto');
			}
		},
		[handleSlide, isMouseDown],
	);

	const handleMouseDown = useCallback(() => {
		setIsMouseDown(true);
	}, []);

	const handleMouseUp = useCallback(() => {
		setIsMouseDown(false);
	}, []);

	useEffect(() => {
		const observer = new IntersectionObserver(
			entries => {
				entries.forEach(entry => {
					if (entry.target === prevRef.current) {
						setPrev(!entry.isIntersecting);
					} else if (entry.target === nextRef.current) {
						setNext(!entry.isIntersecting);
					}
				});
			},
			{
				root: containerRef.current,
				rootMargin: '10px',
			},
		);

		if (prevRef.current) {
			observer?.observe(prevRef.current);
		}
		if (nextRef.current) {
			observer?.observe(nextRef.current);
		}

		return () => {
			observer.disconnect();
		};
	}, []);

	useEffect(() => {
		document.addEventListener('mousemove', handleMouseMove);
		document.addEventListener('mouseup', handleMouseUp);

		return () => {
			document.removeEventListener('mousemove', handleMouseMove);
			document.removeEventListener('mouseup', handleMouseUp);
		};
	}, [handleMouseMove, handleMouseUp, isMouseDown]);

	return (
		<div className='slider-container'>
			<div className='slider'>
				<div
					ref={containerRef}
					onMouseDown={handleMouseDown}
					style={{ cursor: 'grabbing', userSelect: 'none' }}
					className='slider__container'
				>
					<span ref={prevRef} />
					{children}
					<span ref={nextRef} />
				</div>
			</div>
			<div className='slider__buttons'>
				{prev && (
					<button onClick={() => handleSlide(-amount, 'smooth')} className='prevButton'>
						<PrevArrow />
					</button>
				)}
				{next && (
					<button onClick={() => handleSlide(amount, 'smooth')} className='nextButton'>
						<NextArrow />
					</button>
				)}
			</div>
		</div>
	);
};

export default SliderContainer;
