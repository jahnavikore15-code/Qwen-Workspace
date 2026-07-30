/**
 * Ticket Generation Utility (Frontend Edition)
 * Replaces the Python/Pillow backend logic for 100% mobile compatibility.
 */

export const generateTicketCanvas = async (name, role, photoFile) => {
  console.log("Name:", name);
  console.log("Role:", role);
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    // Config Constants (Matching Python Logic)
    const TEMPLATE_URL = "/template.png";
    const PHOTO_X = 435;
    const PHOTO_Y = 675;
    const PROFILE_SIZE = 290;
    const NAME_X = 200;
    const NAME_START_Y = 340;
    const MAX_TEXT_WIDTH = 500;
    
    const imgTemplate = new Image();
    const imgUser = new Image();
    
    imgTemplate.crossOrigin = "anonymous";
    imgUser.crossOrigin = "anonymous";
    
    imgTemplate.onload = () => {
      console.log("Canvas Width:", canvas.width);
      console.log("Canvas Height:", canvas.height);
      canvas.width = imgTemplate.width;
      canvas.height = imgTemplate.height;
      
      // 1. Draw Template
      ctx.drawImage(imgTemplate, 0, 0);
      
      const reader = new FileReader();
      reader.onload = (e) => {
        imgUser.onload = () => {
          // 2. Draw User Photo

const aspect = imgUser.width / imgUser.height;

let drawWidth;
let drawHeight;
let offsetX = 0;
let offsetY = 0;

if (aspect > 1) {
  drawHeight = PROFILE_SIZE;
  drawWidth = PROFILE_SIZE * aspect;
  offsetX = -(drawWidth - PROFILE_SIZE) / 2;
} else {
  drawWidth = PROFILE_SIZE;
  drawHeight = PROFILE_SIZE / aspect;
  offsetY = -(drawHeight - PROFILE_SIZE) / 2;
}

ctx.save();

ctx.beginPath();
ctx.roundRect(
  PHOTO_X,
  PHOTO_Y,
  PROFILE_SIZE,
  PROFILE_SIZE,
  35
);

ctx.clip();

ctx.drawImage(
  imgUser,
  PHOTO_X + offsetX,
  PHOTO_Y + offsetY,
  drawWidth,
  drawHeight
);

ctx.restore();
          
          
          // 3. Draw Name
const CENTER_X = PHOTO_X + PROFILE_SIZE / 2;
const NAME_Y = PHOTO_Y + PROFILE_SIZE + 20;
const ROLE_Y = NAME_Y + 55; // Increased spacing

ctx.textAlign = "center";
ctx.textBaseline = "top";

// Name
ctx.fillStyle = "#000000"; // Black
ctx.font = "bold 28px Arial";
ctx.fillText(name, CENTER_X, NAME_Y);

// Role
if (role) {
  ctx.fillStyle = "#000000"; // Black
  ctx.font = "bold 24px Arial";
  ctx.fillText(role, CENTER_X, ROLE_Y);
}
          
          resolve(canvas.toDataURL('image/png', 1.0));
        };
        imgUser.src = e.target.result;
      };
      reader.readAsDataURL(photoFile);
    };
    
    imgTemplate.onerror = () => reject("Failed to load template image");
    imgTemplate.src = TEMPLATE_URL;
  });
};
