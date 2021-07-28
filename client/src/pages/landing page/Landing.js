import React, { useEffect, Fragment } from 'react';
import Panner from '../../components/Panner/Panner';
import Categories from '../../pages/Categories/Categories';
import { listCats } from '../../actions/catActions';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../components/Loader/Loader';
import './assets/landingPage.css';
const Landing = () => {
	const dispatch = useDispatch();
	const { catList } = useSelector((state) => ({ ...state }));

	useEffect(() => {
		dispatch(listCats());
	}, [dispatch]);
	return (
		<Fragment>
			{!catList ? (
				<Loader />
			) : (
				catList && (
					<div className="landing">
						<div className="panner-container">
							<Panner cats={catList} className="panner" />
						</div>
						<Categories cats={catList} />
					</div>
				)
			)}
		</Fragment>
	);
};

export default Landing;
