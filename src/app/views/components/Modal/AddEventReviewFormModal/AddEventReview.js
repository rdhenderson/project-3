import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm, formValueSelector} from 'redux-form';
import {RadioButton} from 'material-ui/RadioButton';
import MenuItem from 'material-ui/MenuItem';
import {AutoComplete as MUIAutoComplete} from 'material-ui';
import { Spinner } from '../../../components'
import {
  AutoComplete,
  Checkbox,
  DatePicker,
  TimePicker,
  RadioButtonGroup,
  SelectField,
  Slider,
  TextField,
  Toggle,
} from 'redux-form-material-ui';

// validation functions
const required = value => (value == null ? 'Required' : undefined);
const email = value =>
  (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email'
    : undefined);

class AddEventReviewForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: false,
    };
  }

  componentWillReceiveProps(nextProps) {
      if (nextProps) {
          this.setState({ data: true });
      }
  }
  componentDidMount() {
    this.refs.venue // the Field
      .getRenderedComponent() // on Field, returns ReduxFormMaterialUITextField
      .getRenderedComponent() // on ReduxFormMaterialUITextField, returns TextField
      .focus(); // on TextField
  }

  render() {
    const {onSubmit, handleSubmit, pristine, survey, reset, submitting} = this.props;
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <br />
          <button type="submit" disabled={submitting}>Submit</button>
          <button
            type="button"
            disabled={pristine || submitting}
            onClick={reset}
          >
            Clear
          </button>
        </div>
        <div>
          <Field
            name="venue"
            component={AutoComplete}
            floatingLabelText="Venue"
            openOnFocus
            filter={MUIAutoComplete.fuzzyFilter}
            dataSource={this.props.venues}
            dataSourceConfig={ {text: 'name', value: '_id'}  }
            ref="venue"
            withRef
          />
        </div>
        <div>
          <Field name="event.type" component={RadioButtonGroup}>
            <RadioButton value="private" label="Private Event" />
            <RadioButton value="public" label="Public Event" />
          </Field>
        </div>
        <div>How would you rate the event on a scale of 1-10?</div>
        {survey && <div>Crowd: {survey && survey.crowd}</div>}
        <div>
          <Field
            name="survey.crowd"
            component={Slider}
            defaultValue={0}
            format={null}
            min={0}
            max={10}
            step={1}
          />
        </div>
        {survey && <div>Acoustics: {survey.acoustics}</div>}
        <div>
          <Field
            name="survey.acoustics"
            component={Slider}
            defaultValue={0}
            format={null}
            min={0}
            max={10}
            step={1}
          />
        </div>
        <div>
          <Field
            name="group"
            component={SelectField}
            hintText="Group"
            floatingLabelText="Group"
          >
            <MenuItem value="alice@redux-pizza.com" primaryText="Alice" />
            <MenuItem value="bob@redux-pizza.com" primaryText="Bob" />
            <MenuItem value="carl@redux-pizza.com" primaryText="Carl" />
          </Field>
        </div>
        <div>
          <Field name="pepperoni" component={Checkbox} label="Pepperoni" />
        </div>
        <div>
          <Field name="mushrooms" component={Checkbox} label="Mushrooms" />
        </div>
        <div>
          <Field name="peppers" component={Checkbox} label="Peppers" />
        </div>
        <div>
          <Field
            name="date"
            component={DatePicker}
            format={null}
            hintText="Event Date"
            validate={required}
          />
        </div>
        <div>
          <Field
            name="time"
            component={TimePicker}
            format={null}
            defaultValue={null} // TimePicker requires an object,
            // and redux-form defaults to ''
            hintText="Event Time"
            validate={required}
          />
        </div>
        <div>
          <Field
            name="description"
            component={TextField}
            hintText="Event description"
            floatingLabelText="Event description"
            multiLine
            rows={3}
          />
        </div>

        <div>
          <Field
            name="referral"
            component={AutoComplete}
            floatingLabelText="How did you book the event?"
            openOnFocus
            filter={MUIAutoComplete.fuzzyFilter}
            dataSourceConfig={{text: 'name', value: 'id'}}
            dataSource={[
              {id: 0, name: 'Facebook'},
              {id: 1, name: 'Yelp'},
              {id: 2, name: 'TV Ad'},
              {id: 3, name: 'Friend'},
              {id: 4, name: 'Other'},
            ]}
          />
        </div>

      </form>
    );
  }
}

const selector = formValueSelector('addEventReviewForm');

AddEventReviewForm = connect(state => ({
  survey: selector(state, 'survey'),
}))(AddEventReviewForm);

AddEventReviewForm = reduxForm({
  form: 'addEventReview',
  initialValues: {
    name: 'Jane Doe',
    survey: {acoustics: 0, crowd: 0}
  },
})(AddEventReviewForm);

export default AddEventReviewForm;
