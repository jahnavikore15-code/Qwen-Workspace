/**
 * Ticket Generation Utility (Frontend Edition)
 */

export const generateTicketCanvas = async (name, role, photoFile) => {
  return new Promise((resolve, reject) => {
    try {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      const TEMPLATE_URL = "/template.png";

      const PHOTO_X = 435;
      const PHOTO_Y = 675;
      const PROFILE_SIZE = 290;

      const imgTemplate = new Image();
      const imgUser = new Image();

      imgTemplate.onload = () => {
        canvas.width = imgTemplate.width;
        canvas.height = imgTemplate.height;

        ctx.drawImage(imgTemplate, 0, 0);

        const reader = new FileReader();

        reader.onload = (event) => {
          imgUser.onload = () => {
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

            const CENTER_X = PHOTO_X + PROFILE_SIZE / 2;
            const NAME_Y = PHOTO_Y + PROFILE_SIZE + 20;
            const ROLE_Y = NAME_Y + 55;

            ctx.textAlign = "center";
            ctx.textBaseline = "top";

            ctx.fillStyle = "#000";
            ctx.font = "bold 28px Arial";
            ctx.fillText(name, CENTER_X, NAME_Y);

            if (role) {
              ctx.font = "bold 24px Arial";
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
          reject(new Error("Failed to read uploaded image."));
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
