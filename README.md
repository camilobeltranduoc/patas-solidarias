
# 🐾 Patas Solidarias – Front‑End + Mock API

Aplicación SPA Angular que permite gestionar campañas de ayuda para animales y recibir donaciones.  
Los datos de las campañas se sirven desde un **JSON Server** local, mientras que las donaciones y usuarios se guardan en **Firebase (Auth + Firestore)**.

---

## ✨ Funcionalidades

| Rol | Vista | Acciones |
|-----|-------|----------|
| Visitante | Inicio / Campañas / Donar | Registro · Login |
| Usuario | Donar | Realizar donación<br>Ver **Mis donaciones** |
| Admin  | Campañas (panel) | Crear / editar / eliminar campaña |

Otras características:

* **Validación fuerte de contraseñas** (mín. 6 car., mayús, minús, número, especial).  
* Recuperar contraseña por correo.  
* Navegación protegida por **Role Guard**.  
* 4 pruebas unitarias (Jasmine + Karma).  
* Docker Compose: `ui` (Angular + Vite) y `api` (JSON Server).

---

## 🛠 Tecnologías

* Angular 20 (stand‑alone components, Vite builder)  
* Firebase v10 (`@angular/fire`)  
* JSON Server 0.18  
* Bootstrap 5 + SCSS  
* Docker 24 / Compose v2  
* Jasmine & Karma

---

## ⚡ Rápido inicio

### 1. Clonar e instalar

```bash
git clone https://github.com/<TU‑USUARIO>/patas-solidarias.git
cd patas-solidarias
npm install
```

### 2. Variables de entorno Firebase

> **Por seguridad** el archivo no está en el repo.

1. Crea `src/environments/environment.ts`:

```ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000',
  firebase: {
    apiKey: '…',
    authDomain: '…',
    projectId: '…',
    storageBucket: '…',
    messagingSenderId: '…',
    appId: '…'
  }
};
```

2. Repite con `environment.prod.ts` si necesitas config separada de producción.

### 3. Modo desarrollador (Angular + API)

```bash
npm run dev          # = concurrently "ng serve" "json-server …"
```

* UI 👉 <http://localhost:4200>  
* API 👉 <http://localhost:3000/campaigns>

---

## 🧪 Tests

```bash
npm run test
```

Ejecución de Jasmine + Karma (watch).

---

## 🐳 Docker

```bash
docker compose up --build
# ui  : http://localhost:8080
# api : http://localhost:3000/campaigns
```

Archivos relevantes:

* `Dockerfile` – build Angular → Nginx  
* `docker-compose.yml` – define `ui` + `api`  
* `.dockerignore`

---

## 📂 Estructura (resumen)

```
src/
├ app/ (core, pages, shared)
├ environments/
api/campaigns.json
Dockerfile
docker-compose.yml
```

---

## 📜 Licencia

MIT © 2025 Patas Solidarias Team
