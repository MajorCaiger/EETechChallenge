import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import List from './List';
import { fetchItems, updateItem } from '../../api/item';
import { SET_ITEMS, UPDATE_ITEM } from '../../store/types';

const ConnectedList = () => {
    const dispatch = useDispatch();
    const items = useSelector(state => state.items);
    useEffect(() => {
        async function fetchData() {
            const fetchedItems = await fetchItems();
            dispatch({ type: SET_ITEMS, items: fetchedItems });
        }
        fetchData();
    }, []);

    const onChange = item => async isChecked => {
        const updatedItem = { ...item, isComplete: isChecked };
        await updateItem(updatedItem);
        dispatch({ type: UPDATE_ITEM, item: updatedItem });
    };
    return (
        <List items={items || []} onChange={onChange} />
    );
};

export default ConnectedList;
