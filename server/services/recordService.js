import Record from '../models/record.models.js'
import AppError from '../helpers/AppError.js'

//  Create Record
export const createRecord = async (data, userId) => {
  const { amount, type, category, date } = data;

  if (!amount || !type || !category || !date) {
    throw new AppError("All required fields must be provided", 400);
  }

  const record = await Record.create({
    ...data,
    createdBy: userId,
  });

  return record;
};


//  Get Records (with filtering)
export const getRecords = async (query) => {
  const filters = { isDeleted: false };

  if (query.type) filters.type = query.type;
  if (query.category) filters.category = query.category;

  if (query.startDate && query.endDate) {
    filters.date = {
      $gte: new Date(query.startDate),
      $lte: new Date(query.endDate),
    };
  }

  return await Record.find(filters).sort({ date: -1 });
};


// 🔹 Update Record
export const updateRecord = async (id, data) => {
  const record = await Record.findById(id);

  if (!record) {
    throw new AppError("Record not found", 404);
  }

  Object.assign(record, data);
  await record.save();

  return record;
};


// 🔹 Delete Record (Soft Delete)
export const deleteRecord = async (id) => {
  const record = await Record.findById(id);

  if (!record) {
    throw new AppError("Record not found", 404);
  }

  record.isDeleted = true;
  await record.save();

  return;
};