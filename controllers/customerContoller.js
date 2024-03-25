const Customer = require("../models/customerModel");

const getCustomers = async (req, res) => {
  try {
    const queryObject = {...req.query}
    const excludedColumn = ['page', 'sort', 'limit', 'fields']
    excludedColumn.forEach(el => delete queryObject[el]);

    console.log(req.query, queryObject);

    const customers = await Customer.find(queryObject);

    res.status(200).json({
      status: "success",
      requestAt: req.requestTime,
      totalData: customers.length,
      data: {
        customers,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "error",
      message: error.message,
    });
  }
};

const getCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const customer = await Customer.findById(id);

    res.status(200).json({
      status: "success",
      data: {
        customer,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

const updateCustomer = async (req, res) => {
  try {
    const { id } = req.params;

    const customer = await Customer.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: "success",
      message: "berhasil update data",
      data: {
        customer,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};
 
const deleteCustomer = async (req, res) => {
  try {
    const id = req.params.id;
    const customer = await Customer.findByIdAndDelete(id);
    res.status(204).json({
      status: "success",
      message: "Delete data success!",
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error.message,
    });
  }
};

const createCustomer = async (req, res) => {
  try {
    const newCustomer = await Customer.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        customer: newCustomer,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

module.exports = {
  createCustomer,
  getCustomer,
  getCustomers,
  deleteCustomer,
  updateCustomer,
};
