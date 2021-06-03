const Select = (props) => {
  return (
    <div>
      <label>{props.label ? props.label : 'Select Option'}</label>
      <select value={props.value} onChange={props.changed} className="form-control">
        <option hidden>Select your {props.label ? props.label : 'Option'}</option>
        {props.options.map((option) => (
          <option key={option._id} value={option._id}>{option.title}</option>
        ))}
      </select>
    </div>
  )
}

export default Select