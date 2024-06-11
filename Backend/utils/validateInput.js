const Validator = require('validator');
const isEmpty = require('is-empty');

exports.validateCustomerInput = (data) => {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : '';
  data.email = !isEmpty(data.email) ? data.email : '';

  if (Validator.isEmpty(data.name)) {
    errors.name = 'Name field is required';
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email field is required';
  } else if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }

  return { errors, isValid: isEmpty(errors) };
};

exports.validateOrderInput = (data) => {
  let errors = {};

  data.customer_id = !isEmpty(data.customer_id) ? data.customer_id : '';
  data.amount = !isEmpty(data.amount) ? data.amount : '';
  data.order_date = !isEmpty(data.order_date) ? data.order_date : '';

  if (Validator.isEmpty(data.customer_id)) {
    errors.customer_id = 'Customer ID field is required';
  }

  if (Validator.isEmpty(data.amount)) {
    errors.amount = 'Amount field is required';
  }

  if (Validator.isEmpty(data.order_date)) {
    errors.order_date = 'Order date field is required';
  }

  return { errors, isValid: isEmpty(errors) };
};
