import React from 'react';

import List from './List';

export default {
    title: 'Item List',
    component: List
};

const Template = args => <List {...args} />;

export const Empty = Template.bind({});
Empty.args = { items: [], onChange: () => () => {} };

export const WithItems = Template.bind({});
WithItems.args = {
    items: [
        {
            id: 1,
            name: 'Item 1',
            isComplete: true
        },
        {
            id: 2,
            name: 'Item 2',
            isComplete: false
        },
        {
            id: 3,
            name: 'Item 3',
            isComplete: true
        },
        {
            id: 4,
            name: 'Item 4',
            isComplete: false
        }
    ],
    onChange: () => () => {}
};
