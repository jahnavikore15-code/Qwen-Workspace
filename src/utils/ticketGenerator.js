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
      const PHOTO_X = 355;
      const PHOTO_Y = 455;
      const PROFILE_SIZE = 520;

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
            )
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

            // ===========================
            // DRAW NAME
            // ===========================

            const CENTER_X = PHOTO_X + PROFILE_SIZE / 2;

            ctx.textAlign = "center";
            ctx.textBaseline = "top";

            ctx.fillStyle = "#111111";
            ctx.font = "bold 42px Arial";
            ctx.fillText(name.trim(), CENTER_X, NAME_Y);

            // ===========================
            // DRAW ROLE
            // ===========================

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
