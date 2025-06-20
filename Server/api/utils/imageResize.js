import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import sharp from "sharp";
import fs from 'fs/promises';


  // Helper to resize image with Sharp
  export const resizeImage = async (inputPath) => {        
    const resizedPath = path.join(path.dirname(inputPath), `${uuidv4()}_resized.jpg`);   
    
    await sharp(inputPath)
      .resize({ width: 500 })
      .jpeg({ quality: 60 })
      .toFile(resizedPath);
    
    await fs.unlink(inputPath);
    return resizedPath;
  };