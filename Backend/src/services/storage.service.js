import ImageKit from '@imagekit/nodejs';
import { config } from '../config/config.js';

// Initialize ImageKit client for cloud image storage
const client = new ImageKit({
  privateKey: config.IMAGE_KIT_PRIVATE_KEY
});

// Upload image file to ImageKit cloud storage
// Converts buffer to file and stores in ShopeLane folder
// Returns image URL and metadata for database storage
export async function uploadFile({ buffer, fileName, folder = 'ShopeLane' }) {

  const result = await client.files.upload({
    file: await ImageKit.toFile(buffer),
    fileName,
    folder
  })

  return result

}