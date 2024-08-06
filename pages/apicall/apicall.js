import { createAsyncThunk } from "@reduxjs/toolkit"; //createAsyncThunk handle asynconomous function 
import axios from "axios";
import { toast } from "react-toastify";

// My API 
const apiurl = 'http://127.0.0.1:3003/jsinterview'

// Call Api for Add Product
export const addquestion = createAsyncThunk("addquestion", async (data, { rejectWithValue }) => {
    try {
        const response = await axios.post(apiurl, data);
        console.log("Fetching Add  data", response);
        toast.success("Question Added Successfully")
        return response.data;
    } catch (error) {
        console.log("Error Fetching Add Todo data", error);
        toast.error("Todo Is Not Added ")
        return rejectWithValue(error.response.data);
    }
});

// Call Api for Show All Product
export const allanswer = createAsyncThunk("allanswer", async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get(apiurl);
        console.log("Fetching All Answer data", response);
        return response?.data;
    } catch (error) {
        console.log("Error Fetching All Answer data", error);
        return rejectWithValue(error.response.data);
    }
});

// Call Api for Details Question
export const singlequestion = createAsyncThunk("singlequestion", async (id, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${apiurl}/${id}`)
        console.log("Fetching Single data", response);
        return response?.data;
    } catch (error) {
        console.log("Error Fetching Single data", error);
        return rejectWithValue(error.response.data);
    }
});

// Call Api for Edit Product
export const editquestion = createAsyncThunk("editquestion", async ({ data, id }, { rejectWithValue }) => {
    try {
        const response = await axios.put(`${apiurl}/${id}`, data);
        console.log("Fetching Edit  data", response);
        toast.success("Edit  Successfully");
        return response?.data;
    } catch (error) {
        console.log("Error Fetching Edit  data", error);
        toast.error("Edit Is Not Make");
        return rejectWithValue(error.response.data);
    }
});

// Call Api for Delete Todo
export const deleteanswer = createAsyncThunk("deleteanswer", async (id, { rejectWithValue }) => {
    try {
        const response = await axios.delete(`${apiurl}/${id}`)
        console.log("Fetching Delete Answer", response);
        return response?.data
    } catch (error) {
        console.log("Error Fetching Delete Answer data", error);
        return rejectWithValue(error.response.data);
    }
});