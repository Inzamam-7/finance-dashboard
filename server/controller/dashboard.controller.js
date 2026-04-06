import { successResponse } from '../helpers/responseHandler.js';
import * as dashboardService from '../services/dashboardService.js'
import {asyncHandler} from '../middleware/asyncHandler.js'

export const getSummary = asyncHandler(async (req, res) => {
  const data = await dashboardService.getSummary();

  return successResponse(res, { data });
});


export const getCategoryTotals = asyncHandler(async (req, res) => {
  const data = await dashboardService.getCategoryTotals();

  return successResponse(res, { data });
});


export const getMonthlyTrends = asyncHandler(async (req, res) => {
  const data = await dashboardService.getMonthlyTrends();

  return successResponse(res, { data });
});