import './style.css';

const List = ({ items, onChange }) => {
    if (items.length < 1) {
        return null;
    }

    return (
        <div>
            {items.map(item => (
                <div className={`item${item.isComplete ? ' complete' : ''}`} key={item.id}>
                    <input
                        id={`item-${item.id}`}
                        type="checkbox"
                        value="1"
                        onChange={e => onChange(item)(e.target.checked)}
                        defaultChecked={item.isComplete}
                    />
                    <label htmlFor={`item-${item.id}`}>{item.name}</label>
                </div>
            ))}
        </div>
    );
};

export default List;
