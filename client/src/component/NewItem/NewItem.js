import './style.css';

const NewItem = ({ name, setName, error, onSubmit }) => {
    return (
        <form className="new-item-form" onSubmit={onSubmit}>
            <label htmlFor="new-item-field">Item name</label>
            <div className="field">
                <input id="new-item-field" type="text" value={name} onChange={e => setName(e.target.value)} />
                <button data-test-id="save-button" className="btn btn-primary" type="submit">
                    Add
                </button>
            </div>
            {error && <div className="error">{error}</div>}
        </form>
    );
};

export default NewItem;
