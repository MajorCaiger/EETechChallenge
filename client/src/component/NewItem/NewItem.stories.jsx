import React from 'react';

import NewItem from './NewItem';

export default {
    title: 'New Item',
    component: NewItem
};

const Template = args => <NewItem {...args} />;

export const Standard = Template.bind({});
Standard.args = { onSubmit: e => e.preventDefault() };

export const WithError = Template.bind({});
WithError.args = { onSubmit: e => e.preventDefault(), error: 'Woops something went wrong' };
