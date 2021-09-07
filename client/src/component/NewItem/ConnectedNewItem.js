import { useState } from 'react';
import { useDispatch } from 'react-redux';
import './style.css';
import { createItem } from '../../api/item';
import { NEW_ITEM } from '../../store/types';
import NewItem from './NewItem';

const ConnectedNewItem = () => {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [error, setError] = useState(null);

    const onSubmit = async e => {
        e.preventDefault();
        try {
            const item = await createItem(name);
            dispatch({ type: NEW_ITEM, item });
            setName('');
            setError(null);
        } catch (err) {
            setError(err.message);
        }
    };

    return <NewItem name={name} setName={setName} onSubmit={onSubmit} error={error} />;
};

export default ConnectedNewItem;
