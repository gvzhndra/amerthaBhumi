/**
 * Pura Amertha Bhumi GKN I Denpasar
 * Client-Side Smart Image Resizer & Compressor (HTML5 Canvas)
 * Mengompres foto kamera/smartphone sebelum diunggah ke Google Drive Pura
 * Menyelamatkan kuota Google Drive & mempercepat pengunggahan secara masif.
 */

const ImageCompressor = (() => {
  /**
   * Mengompres dan mengubah ukuran file foto
   * @param {File} file - Berkas gambar asli dari <input type="file">
   * @param {number} maxWidth - Lebar maksimal foto (default 1280px)
   * @param {number} maxHeight - Tinggi maksimal foto (default 1280px)
   * @param {number} quality - Kualitas kompresi JPEG (0.1 - 1.0, default 0.80)
   * @returns {Promise<{base64: string, blob: Blob, originalSize: number, compressedSize: number, width: number, height: number}>}
   */
  function compress(file, maxWidth = 1280, maxHeight = 1280, quality = 0.80) {
    return new Promise((resolve, reject) => {
      if (!file || !file.type.match(/image.*/)) {
        return reject(new Error("Berkas yang dipilih bukan gambar yang valid."));
      }

      const originalSize = file.size;
      const reader = new FileReader();

      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          let width = img.width;
          let height = img.height;

          // Menghitung rasio penskalaan proporsional
          if (width > height) {
            if (width > maxWidth) {
              height = Math.round((height * maxWidth) / width);
              width = maxWidth;
            }
          } else {
            if (height > maxHeight) {
              width = Math.round((width * maxHeight) / height);
              height = maxHeight;
            }
          }

          // Inisialisasi HTML5 Canvas
          const canvas = document.createElement("canvas");
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");

          // Gambar ulang ke canvas
          ctx.drawImage(img, 0, 0, width, height);

          // Ekspor ke JPEG Base64
          const base64 = canvas.toDataURL("image/jpeg", quality);

          // Hitung estimasi ukuran setelah kompresi
          const stringLength = base64.length - "data:image/jpeg;base64,".length;
          const sizeInBytes = 4 * Math.ceil(stringLength / 3) * 0.562489633438312;
          const compressedSize = Math.round(sizeInBytes);

          resolve({
            base64,
            originalSize,
            compressedSize,
            savedPercent: Math.round(((originalSize - compressedSize) / originalSize) * 100),
            width,
            height,
            fileName: file.name.replace(/\.[^/.]+$/, "") + ".jpg"
          });
        };

        img.onerror = () => reject(new Error("Gagal memuat berkas gambar."));
        img.src = e.target.result;
      };

      reader.onerror = () => reject(new Error("Gagal membaca berkas."));
      reader.readAsDataURL(file);
    });
  }

  /**
   * Format bytes ke ukuran yang mudah dibaca (KB / MB)
   */
  function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }

  return {
    compress,
    formatBytes
  };
})();
