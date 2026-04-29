import api from "./api";

const appendField = (formData, key, value) => {
  if (value === undefined || value === null || value === "") {
    return;
  }

  if (Array.isArray(value)) {
    formData.append(key, value.join(","));
    return;
  }

  formData.append(key, value);
};

const toMedicineFormData = (payload) => {
  const formData = new FormData();

  Object.entries(payload).forEach(([key, value]) => appendField(formData, key, value));

  return formData;
};

export const listMedicines = () => api.get("/medicines").then((response) => response.data);
export const getMedicineById = (id) => api.get(`/medicines/${id}`).then((response) => response.data);
export const searchMedicines = (query) => api.get("/medicines/search", { params: query }).then((response) => response.data);
export const createMedicine = (payload) =>
  api.post("/medicines", toMedicineFormData(payload), {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  }).then((response) => response.data);
export const updateMedicine = (id, payload) =>
  api.patch(`/medicines/${id}`, toMedicineFormData(payload), {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  }).then((response) => response.data);
export const deleteMedicine = (id) => api.delete(`/medicines/${id}`).then((response) => response.data);