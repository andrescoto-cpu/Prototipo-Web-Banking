# 🏦 Prototipo Web Banking - Banco Multimoney

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://semver.org)
[![Next.js](https://img.shields.io/badge/Next.js-14-black.svg)](https://nextjs.org/)
[![NestJS](https://img.shields.io/badge/NestJS-10-red.svg)](https://nestjs.com/)

> Prototipo funcional de plataforma de banca digital con datos emulados

---

## 🚀 Inicio Rápido

```bash
# Instalar dependencias
npm run install:all

# Ejecutar en modo desarrollo
npm run dev

# Frontend: http://localhost:3000
# Backend: http://localhost:4000
```

## 📁 Estructura del Proyecto

```
Prototipo-Web-Banking/
├── frontend/          # Next.js 14 + TypeScript + TailwindCSS
├── backend/           # NestJS 10 + TypeScript
├── Docs/              # Documentación técnica y brand guidelines
└── docker-compose.yml # Orquestación de servicios
```

## ✨ Módulos Implementados

- ✅ **Autenticación**: Login + MFA simulado
- ✅ **Cuentas**: Ahorro y Corriente
- ✅ **Transferencias**: Entre cuentas, a terceros, ACH
- ✅ **CDP**: Certificados de depósito
- ✅ **Estados de Cuenta**: Consulta y descarga PDF
- ✅ **Notificaciones**: Email y SMS simuladas

## 🎨 Brand Guidelines

Ver [Docs/BRAND_GUIDELINES.md](Docs/BRAND_GUIDELINES.md)

## 📖 Documentación

- [Especificaciones Técnicas](Docs/TECHNICAL_SPEC.md)
- [Guía del Proyecto](Docs/GUIA.md)

## 🔐 Usuarios de Prueba

```
Usuario: demo@multimoney.com
Contraseña: Demo123!
OTP: 123456 (cualquier código funciona)
```

---

**Nota**: Este es un prototipo con datos emulados. No conecta a bases de datos reales.
