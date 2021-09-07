import axios from 'axios';
import { BASE_URL } from '../config.js';

export const fetchItems = async () => {
    let response;
    try {
        response = await axios.get(`${BASE_URL}/item`);
    } catch (err) {
        // For simplicity I'm just using the error response body as an error message.
        throw new Error(err.response.data);
    }

    if (response.status === 200) {
        return response.data;
    }

    // I usually create custom error types to distinguish the type of error, I often
    // create a UserFriendlyError which contains a message that is friendly to display
    // to the user.
    throw new Error('Failed to fetch items');
};

export const createItem = async name => {
    let response;
    try {
        response = await axios.post(`${BASE_URL}/item`, { name });
    } catch (err) {
        throw new Error(err.response.data.replace('"name"', 'Item name'));
    }

    if (response.status === 201) {
        return response.data;
    }

    throw new Error('Failed to create item');
};

export const updateItem = async ({ id, name, isComplete }) => {
    let response;
    try {
        response = await axios.put(`${BASE_URL}/item/${id}`, { name, isComplete });
    } catch (err) {
        throw new Error(err.response.data.replace('"name"', 'Item name'));
    }

    if (response.status === 200) {
        return response.data;
    }

    throw new Error('Failed to update item');
};
