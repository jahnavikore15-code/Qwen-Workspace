/**
 * Ticket Generation Utility
 */

export const generateTicketCanvas = async (name, role, photoFile) => {
  return new Promise((resolve, reject) => {
    try {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      // Template
      const TEMPLATE_URL = "/template.png";

      // -------------------------
      // PHOTO AREA
      // -------------------------
      const PHOTO_X = 385;
      const PHOTO_Y = 435;
      const PROFILE_SIZE = 305;
      const CORNER_RADIUS = 28;

      // -------------------------
      // TEXT POSITION
      // -------------------------
      const CENTER_X = PHOTO_X + PROFILE_SIZE / 2;
      const NAME_Y = PHOTO_Y + PROFILE_SIZE + 55;
      const ROLE_Y = NAME_Y + 60;

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

            // -------------------------
            // Draw Uploaded Photo
            // -------------------------

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

            // Fit image perfectly inside frame
            const scale = Math.max(
              PROFILE_SIZE / imgUser.width,
              PROFILE_SIZE / imgUser.height
            );

            const drawWidth = imgUser.width * scale;
            const drawHeight = imgUser.height * scale;

            const drawX =
              PHOTO_X + (PROFILE_SIZE - drawWidth) / 2;

            const drawY =
              PHOTO_Y + (PROFILE_SIZE - drawHeight) / 2;

            ctx.drawImage(
              imgUser,
              drawX,
              drawY,
              drawWidth,
              drawHeight
            );

            ctx.restore();

            // -------------------------
            // Draw Name
            // -------------------------

            ctx.textAlign = "center";
            ctx.textBaseline = "top";

            ctx.fillStyle = "#111111";
            ctx.font = "bold 48px Arial";

            ctx.fillText(
              name.trim(),
              CENTER_X,
              NAME_Y
            );

            // -------------------------
            // Draw Role
            // -------------------------

            if (role && role.trim() !== "") {
              ctx.fillStyle = "#555555";
              ctx.font = "bold 34px Arial";

              ctx.fillText(
                role.trim(),
                CENTER_X,
                ROLE_Y
              );
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
