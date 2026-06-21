/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from './axios';

// ─── GET ──────────────────────────────────────────────────────
export const apiGet = async (endpoint: string, params?: any) => {
  try {
    const response = await axiosInstance.get(endpoint, { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// ─── POST (supports JSON and FormData) ───────────────────────
export const apiPost = async (endpoint: string, payload: any) => {
  try {
    const isFormData = payload instanceof FormData;

    const response = await axiosInstance.post(endpoint, payload, {
      headers: isFormData
        ? { 'Content-Type': 'multipart/form-data' }
        : { 'Content-Type': 'application/json' },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

// ─── PUT ─────────────────────────────────────────────────────
export const apiPut = async (endpoint: string, payload: any) => {
  try {
    const response = await axiosInstance.put(endpoint, payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// ─── PATCH ───────────────────────────────────────────────────
export const apiPatch = async (endpoint: string, payload: any) => {
  try {
    const response = await axiosInstance.patch(endpoint, payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// ─── DELETE ──────────────────────────────────────────────────
export const apiDelete = async (endpoint: string) => {
  try {
    const response = await axiosInstance.delete(endpoint);
    return response.data;
  } catch (error) {
    throw error;
  }
};
