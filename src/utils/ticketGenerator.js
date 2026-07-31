/**
 * Ticket Generation Utility (Frontend Edition)
 */

export const generateTicketCanvas = async (name, role, photoFile) => {
  return new Promise((resolve, reject) => {
    try {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      // Background Template
      const TEMPLATE_URL = "/template.png";

      // Photo Position (Adjust if needed)
      const PHOTO_X = 430;
      const PHOTO_Y = 655;
      const PROFILE_SIZE = 300;

      const imgTemplate = new Image();
      const imgUser = new Image();

      imgTemplate.onload = () => {
        canvas.width = imgTemplate.width;
        canvas.height = imgTemplate.height;

        // Draw Template
        ctx.drawImage(imgTemplate, 0, 0);

        const reader = new FileReader();

        reader.onload = (event) => {
          imgUser.onload = () => {

            // -------- Crop Image Perfectly --------
            const sourceSize = Math.min(imgUser.width, imgUser.height);

            const sx = (imgUser.width - sourceSize) / 2;
            const sy = (imgUser.height - sourceSize) / 2;

            ctx.save();

            ctx.beginPath();

            ctx.roundRect(
              PHOTO_X,
              PHOTO_Y,
              PROFILE_SIZE,
              PROFILE_SIZE,
              25
            );

            ctx.clip();

            ctx.drawImage(
              imgUser,
              sx,
              sy,
              sourceSize,
              sourceSize,
              PHOTO_X,
              PHOTO_Y,
              PROFILE_SIZE,
              PROFILE_SIZE
            );

            ctx.restore();

            // -------- Name & Role --------

            const CENTER_X = PHOTO_X + PROFILE_SIZE / 2;

            // Leave more space under image
            const NAME_Y = PHOTO_Y + PROFILE_SIZE + 35;

            const ROLE_Y = NAME_Y + 45;

            ctx.textAlign = "center";
            ctx.textBaseline = "top";

            // Name
            ctx.fillStyle = "#1A1A1A";
            ctx.font = "bold 34px Poppins";

            ctx.fillText(name, CENTER_X, NAME_Y);

            // Role
            if (role && role.trim() !== "") {

              ctx.fillStyle = "#444";

              ctx.font = "26px Poppins";

              ctx.fillText(role, CENTER_X, ROLE_Y);

            }

            resolve(canvas.toDataURL("image/png"));
          };

          imgUser.onerror = () => {
            reject(new Error("Failed to load uploaded image."));
          };

          imgUser.src = event.target.result;
        };

        reader.onerror = () => {
          reject(new Error("Unable to read uploaded image."));
        };

        reader.readAsDataURL(photoFile);
      };

      imgTemplate.onerror = () => {
        reject(new Error("Template image not found."));
      };

      imgTemplate.src = TEMPLATE_URL;
    } catch (err) {
      reject(err);
    }
  });
};
