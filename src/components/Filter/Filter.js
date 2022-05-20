import { Component } from 'react';
import style from './Filter.module.css';

class Filter extends Component {
  handleInputChange = name => event => {
    this.props.onChange && this.props.onChange(name, event.target.value);
  };
  render() {
    return (
      <>
        <label htmlFor="filter" className={style.filter}>
          Find contacts by name
        </label>
        <input
          type="text"
          name="filter"
          id="filter"
          value={this.props.value}
          className={style.input}
          onChange={this.handleInputChange('filter')}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </>
    );
  }
}

export { Filter };
