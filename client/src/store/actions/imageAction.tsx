import { AppDispatch } from "..";
import { uploadImageS3 } from "../../services/image.service";

const uploadImageByS3 = (fileInput: any) => async (dispatch: AppDispatch) => {
    try {
        if (!fileInput) {
            throw new Error('File input is null or undefined.');
        }
        // Access the files property from the FileList
        const file = fileInput.files && fileInput.files[0];
        console.log(file);
        if (!file) {
            throw new Error('No file selected.');
        }

        let formData = new FormData();
        formData.append('file', file);

        // console.log(formData);

        const upload = await uploadImageS3(formData);

        // Dispatch action to update state if needed
        // Example: 
        dispatch({ type: "SET_IMAGE", payload: upload.data });

        return upload;
    } catch (error) {
        console.error('Error uploading image to S3:', error);
        throw error; // Rethrow the error for potential handling in components
    }
};

export { uploadImageByS3 }