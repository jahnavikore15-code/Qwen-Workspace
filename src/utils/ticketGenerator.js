/**
 * Ticket Generation Utility (Frontend Edition)
 */

export const generateTicketCanvas = async (name, role, photoFile) => {
  return new Promise((resolve, reject) => {
    try {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      // Template Image
      const TEMPLATE_URL = "/template.png";

      // ==========================
      // PHOTO SETTINGS
      // ==========================
      const PHOTO_X = 355;
      const PHOTO_Y = 455;
      const PROFILE_SIZE = 520;
      const CORNER_RADIUS = 40;

      // ==========================
      // NAME & ROLE POSITION
      // ==========================
      const CENTER_X = PHOTO_X + PROFILE_SIZE / 2;
      const NAME_Y = PHOTO_Y + PROFILE_SIZE + 40;
      const ROLE_Y = NAME_Y + 55;

      const imgTemplate = new Image();
      const imgUser = new Image();

      imgTemplate.onload = () => {
        canvas.width = imgTemplate.width;
        canvas.height = imgTemplate.height;

        // Draw template
        ctx.drawImage(imgTemplate, 0, 0);

        const reader = new FileReader();

        reader.onload = (event) => {
          imgUser.onload = () => {

            // ==========================
            // Draw User Photo
            // ==========================

            ctx.save();

            ctx.beginPath();
            ctx.roundRect(
              PHOTO_X,
              PHOTO_Y,
              PROFILE_SIZE,
              PROFILE_SIZE,
              CORNER_RADIUS
            );
            ctx.clip();

            // Cover image perfectly
            const scale = Math.max(
              PROFILE_SIZE / imgUser.width,
              PROFILE_SIZE / imgUser.height
            );

            const scaledWidth = imgUser.width * scale;
            const scaledHeight = imgUser.height * scale;

            const dx = PHOTO_X + (PROFILE_SIZE - scaledWidth) / 2;
            const dy = PHOTO_Y + (PROFILE_SIZE - scaledHeight) / 2;

            ctx.drawImage(
              imgUser,
              dx,
              dy,
              scaledWidth,
              scaledHeight
            );

            ctx.restore();

            // ==========================
            // Draw Name
            // ==========================

            ctx.textAlign = "center";
            ctx.textBaseline = "top";

            ctx.fillStyle = "#111111";
            ctx.font = "bold 42px Arial";
            ctx.fillText(name.trim(), CENTER_X, NAME_Y);

            // ==========================
            // Draw Role
            // ==========================

            if (role && role.trim() !== "") {
              ctx.fillStyle = "#555555";
              ctx.font = "30px Arial";
              ctx.fillText(role.trim(), CENTER_X, ROLE_Y);
            }

            resolve(canvas.toDataURL("image/png"));
          };

          imgUser.onerror = () => {
            reject(new Error("Unable to load uploaded image."));
          };

          imgUser.src = event.target.result;
        };

        reader.onerror = () => {
          reject(new Error("Unable to read uploaded image."));
        };

        if (!(photoFile instanceof File)) {
          reject(new Error("Invalid image file."));
          return;
        }

        console.log("Photo File:", photoFile);
        reader.readAsDataURL(photoFile);
      };

      imgTemplate.onerror = () => {
        reject(new Error("Template image not found: " + TEMPLATE_URL));
      };

      imgTemplate.src = TEMPLATE_URL;
    } catch (err) {
      reject(err);
    }
  });
};
