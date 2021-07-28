import React from 'react';
import { Table } from 'react-bootstrap';
import Theader from './Theader';
import Tbody from './Tbody';
const DetailsTable = ({ productInfo }) => {
	return (
		<Table striped bordered hover className="mt-3">
			<Theader productInfo={productInfo} />
			{/* <Tbody productInfo={productInfo} /> */}
		</Table>
	);
};

export default DetailsTable;
