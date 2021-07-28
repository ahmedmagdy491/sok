import React from 'react';
import { Tabs, Timeline } from 'antd';
const { TabPane } = Tabs;

const TabsLayout = ({ reviews, description }) => {
	return (
		<div className="mt-3">
			<Tabs tabPosition="left">
				<TabPane tab="Description" key="Description">
					{description}
				</TabPane>
				<TabPane tab="Reviews" key="Reviews">
					<Timeline>
						{reviews &&
							reviews.map((r) => (
								<Timeline.Item>{r.comment}</Timeline.Item>
							))}
					</Timeline>
				</TabPane>
			</Tabs>
		</div>
	);
};

export default TabsLayout;
