FROM node:10.13.0

RUN npm config set registry https://registry.npm.taobao.org

WORKDIR /data/server

# 2. 只有部分文件如 package.json 发生变更的时候，才重新执行 npm install
COPY package.json package-lock.json ./
RUN npm install

# 复制剩余文件
COPY . .

# RUN npm run dev
ENTRYPOINT [ "npm", "run", "dev" ]
