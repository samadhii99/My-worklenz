import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "../ThemeContext";

const ThemeSensitiveLogo: React.FC = () => {
  const { theme } = useTheme();
  const [processedLogo, setProcessedLogo] = useState<string | null>(null);
  const [originalLoaded, setOriginalLoaded] = useState(false);
  const originalLogoRef = useRef<HTMLImageElement | null>(null);

  // Process the logo to change only black parts to white
  useEffect(() => {
    if (theme === "light") {
      setProcessedLogo(null);
      return;
    }

    const img = new Image();
    img.crossOrigin = "Anonymous"; // This is needed if your image is from a different domain
    img.src = "/logo.png";

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      if (!ctx) return;

      canvas.width = img.width;
      canvas.height = img.height;

      // Draw the original image
      ctx.drawImage(img, 0, 0);

      // Get image data to manipulate pixels
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      // Loop through each pixel
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        // If the pixel is dark/black (but not blue)
        // This threshold can be adjusted based on your logo's specific black
        if (r < 60 && g < 60 && b < 60) {
          // Change to white
          data[i] = 255; // R
          data[i + 1] = 255; // G
          data[i + 2] = 255; // B
          // Alpha remains the same
        }
        // Blue pixels remain unchanged
      }

      // Put the processed image data back on the canvas
      ctx.putImageData(imageData, 0, 0);

      // Convert canvas to data URL
      const dataUrl = canvas.toDataURL("image/png");
      setProcessedLogo(dataUrl);
    };

    originalLogoRef.current = img;
  }, [theme]);

  // Handle original logo load state
  useEffect(() => {
    const img = new Image();
    img.src = "/logo.png";
    img.onload = () => setOriginalLoaded(true);
  }, []);

  // Display loading state if needed
  if (!originalLoaded) {
    return <div className="logo-container" style={{ height: "40px" }}></div>;
  }

  return (
    <div className="logo-container">
      {theme === "dark" && processedLogo ? (
        <img src={processedLogo} alt="Company Logo" className="auth-logo" />
      ) : (
        <img src="/logo.png" alt="Company Logo" className="auth-logo" />
      )}
    </div>
  );
};

export default ThemeSensitiveLogo;
