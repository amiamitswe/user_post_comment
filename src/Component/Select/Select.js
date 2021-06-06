import PropTypes from 'prop-types'

const Select = ({ label, value, changed, options }) => (
  <>
    <label>{label ? label : 'Select Option'}</label>
    <select
      value={value}
      onChange={changed}
      className="form-control"
    >
      <option hidden>Select your {label ? label : 'Option'}</option>
      {options.map((option) => (
        <option
          key={option._id}
          value={option._id}
        >
          {option.title}
        </option>
      ))}
    </select>
  </>
)

export default Select

Select.propTypes = {
  value: PropTypes.any.isRequired,
  changed: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
}