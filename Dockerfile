# Temel görüntü olarak Node.js'i kullan
FROM node:18-alpine

# Çalışma dizinini ayarla
WORKDIR /app

# package.json ve yarn.lock dosyalarını kopyala
COPY package.json yarn.lock ./

# Bağımlılıkları yükle
RUN yarn install

# Bcrypt modülünü yeniden derle
RUN yarn add bcrypt --build-from-source


# Uygulama kodunu kopyala
COPY . .

# Portu ayarla
EXPOSE 3000


# Uygulamayı başlat
CMD ["yarn", "start:dev"]
