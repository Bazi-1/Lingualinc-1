// multer.config.ts or similar file
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { v4 as uuidv4 } from 'uuid'; // Add this import
 

/**
 * Configuration for multer, which is a node.js middleware for handling multipart/form-data.
 * It is primarily used for uploading files.
 */
export const multerConfig = {
  storage: diskStorage({
     /**
     * Sets the destination directory for the uploaded files.
     */
    destination: join(__dirname, '../../../frontend/src/Components/Images/'), // Adjust the path
     /**
     * Generates a unique filename for each uploaded file.
     * @param req - The request object.
     * @param file - The uploaded file.
     * @param callback - A callback function to return the filename.
     */
    filename: (req, file, callback) => {
      const fileExtName = extname(file.originalname);
      const randomName = uuidv4(); // Generate a unique filename
      callback(null, `${randomName}${fileExtName}`);
    },
  }),
};