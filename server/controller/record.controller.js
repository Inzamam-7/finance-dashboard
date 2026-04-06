import * as recordService from '../services/recordService.js'
import {successResponse} from '../helpers/responseHandler.js'
import { asyncHandler} from '../middleware/asyncHandler.js'

//  Create
export const createRecord = asyncHandler(async (req, res) => {
  const record = await recordService.createRecord(req.body, req.user.id);

  return successResponse(res, {
    statusCode: 201,
    message: "Record created",
    data: record,
  });
});


//  Get All (with filters)
export const getRecords = asyncHandler(async (req, res) => {
  const records = await recordService.getRecords(req.query);

  return successResponse(res, {
    message: "Records fetched",
    data: records,
  });
});


//  Update
export const updateRecord = asyncHandler(async (req, res) => {
  const record = await recordService.updateRecord(
    req.params.id,
    req.body
  );

  return successResponse(res, {
    message: "Record updated",
    data: record,
  });
});


//  Delete
export const deleteRecord = asyncHandler(async (req, res) => {
  await recordService.deleteRecord(req.params.id);

  return successResponse(res, {
    message: "Record deleted",
  });
});