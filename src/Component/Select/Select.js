const Select = (props) => {
  return (
    <div>
      <select value={props.value} onChange={props.changed} className="form-control">
        {props.options.map((option) => (
          <option key={option._id} value={option._id}>{option.title}</option>
        ))}
      </select>
    </div>
  )
}

export default Select