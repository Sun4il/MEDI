import api from "./api";

export const uploadPrescription = (file) => {
  const formData = new FormData();
  formData.append("prescription", file);

  return api
    .post("/prescriptions/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => response.data);
};