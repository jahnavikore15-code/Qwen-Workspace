/**
 * Ticket Generation Utility (Frontend Edition)
 */

export const generateTicketCanvas = async (name, role, photoFile) => {
  return new Promise((resolve, reject) => {
    try {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      // Template
      const TEMPLATE_URL = "/template.png";

      // ===========================
      // PHOTO POSITION
      // ===========================
      const PHOTO_X = 430;
      const PHOTO_Y = 610;
      const PROFILE_SIZE = 360;
      const CORNER_RADIUS = 35;

      // ===========================
      // TEXT POSITION
      // ===========================
      const NAME_Y = 1035;
      const ROLE_Y = 1085;

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

            // ===========================
            // DRAW PHOTO
            // ===========================

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

            // Cover Algorithm (Fits image perfectly)
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

            // ===========================
            // DRAW NAME
            // ===========================

            const CENTER_X = PHOTO_X + PROFILE_SIZE / 2;

            ctx.textAlign = "center";
            ctx.textBaseline = "middle";

            ctx.fillStyle = "#111111";
            ctx.font = "bold 38px Arial";

            ctx.fillText(
              name.trim(),
              CENTER_X,
              NAME_Y
            );

            // ===========================
            // DRAW ROLE
            // ===========================

            if (role && role.trim() !== "") {
              ctx.fillStyle = "#555555";
              ctx.font = "28px Arial";

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
