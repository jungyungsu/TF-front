### node.js

https://nodejs.org/ko/download/

---

### yarn

https://heeeyomi.tistory.com/223

```bash
$ npm install -g yarn
```

---

### install

```bash
$ yarn install
```

---

### start

```bash
$ yarn start:local
```

---

### 프로젝트 구조

```bash
$ tree
.
├── Dockerfile
├── README.md
├── nginx.conf
├── package.json
├── public
│   ├── favicon.ico
│   ├── index.html
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   └── robots.txt
├── src
│   ├── App.css
│   ├── App.js
│   ├── App.test.js
│   ├── http-common.js
│   ├── index.css
│   ├── index.js
│   ├── logo.svg
│   ├── pages
│   │   ├── BoardListPage.js
│   │   ├── BoardUpdatePage.js
│   │   ├── BoardWritePage.js
│   │   └── MainPage.js
│   ├── reportWebVitals.js
│   ├── services
│   │   └── BoardService.js
│   └── setupTests.js
└── yarn.lock
```

---

### docker install

- https://www.docker.com/products/docker-desktop/
- https://docs.docker.com/desktop/install/windows-install/

### docker build

```bash
$ yarn build:docker
```

```bash
$ docker build -t topas-sm-frontend .
```

```bash
$ docker image ls
REPOSITORY           TAG       IMAGE ID       CREATED          SIZE
topas-sm-frontend   latest    3ada6712a521   8 seconds ago    136MB
```

### docker run

```bash
$ docker run -p 80:80 --name frontend-react topas-sm-frontend
```

```bash
$ docker ps
CONTAINER ID   IMAGE                COMMAND                  CREATED          STATUS          PORTS                      NAMES
9576a0e0bf5c   topas-sm-frontend   "/docker-entrypoint.…"   39 seconds ago   Up 37 seconds   0.0.0.0:80->80/tcp         frontend-react
```

### docker stop & remove

```bash
$ docker stop frontend-react
```

```bash
$ docker rm frontend-react
```

```bash
$ docker rmi topas-sm-frontend
```
