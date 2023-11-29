const FormItem = ({label, stateName, inputHandler, formData, type}) => {
    return (
        <div className="mb-3">
            <label className="form-label">{label}</label>
            <input
            type={type}
            class="form-control"
            value={formData[stateName]}
            onInput={(e) => inputHandler(e, stateName)}
            />
        </div>
    );
}

export default FormItem;