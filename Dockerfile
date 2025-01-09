# Gunakan Node.js versi 18 alpine sebagai base image (ukuran kecil dan ringan)
FROM node:18-alpine

# Tentukan working directory di dalam container
WORKDIR /usr/src/app

# Salin file package.json dan package-lock.json ke dalam container
COPY package*.json ./

# Install semua dependensi yang ada di package.json
RUN npm install

# Salin semua file proyek ke dalam container
COPY . .

# Expose port yang digunakan aplikasi (misalnya 5000)
EXPOSE 5000

# Perintah untuk menjalankan aplikasi
CMD ["npm", "start"]
