# Multimoney Brand Guidelines

> Documento de referencia para desarrollo frontend - Web Banking Platform
> Versión: 1.0 | Basado en Brand Kit 2022

---

## 📌 Índice

1. [Identidad de Marca](#identidad-de-marca)
2. [Logotipo](#logotipo)
3. [Paleta de Colores](#paleta-de-colores)
4. [Tipografía](#tipografía)
5. [Iconografía](#iconografía)
6. [Componentes UI](#componentes-ui)
7. [Estilo Fotográfico](#estilo-fotográfico)
8. [Espaciado y Retículas](#espaciado-y-retículas)

---

## Identidad de Marca

### Visión
> Un mundo en el cual todos se puedan realizar con libertad económica.

### Misión
> Desarrollar productos financieros honestos que permitan a las personas alcanzar sus metas.

### Slogan
**"Finanzas de estos tiempos"**

### Valores
- **Iniciamos por la gente** - Interés genuino por mejorar vidas
- **Ser amables es nuestra moneda** - Respetuosos, empáticos y generosos
- **Hacemos lo que decimos** - Transparentes y honestos
- **Defendemos nuestras ideas** - Exploramos nuevas formas
- **Perseguimos lo excepcional** - Mejora continua

### Personalidad de Marca
| Somos | No somos |
|-------|----------|
| Valientes | Imprudentes |
| Eficientes | Obsesivos |
| Seguros | Arrogantes |
| Honestos | Indiscretos |
| Expertos | Sabelotodo |
| Ingeniosos | Punzantes |
| Amables | Confianzudos |

---

## Logotipo

### Versiones Disponibles

```
Versión Principal:    ※ multi money    (Horizontal)
Versión BIZ:          ※ multi money BIZ
Ícono Solo:           ※
```

### Tamaños Mínimos

| Contexto | Tamaño Mínimo |
|----------|---------------|
| Web (logotipo completo) | 100px ancho |
| Ícono solo | 16px |
| Impreso | Mantener legibilidad |

### Área de Protección
- Margen mínimo: equivalente a la altura de la letra "m" del logotipo
- Entre marcas externas: 2x la altura de "m"

### Usos Incorrectos (EVITAR)
- ❌ Rotar o inclinar el logo
- ❌ Cambiar proporciones
- ❌ Aplicar gradientes
- ❌ Usar colores no autorizados
- ❌ Agregar efectos (sombras, 3D)
- ❌ Usar solo outline
- ❌ Aplicar texturas o patrones

---

## Paleta de Colores

### Colores Primarios

```css
:root {
  /* Primarios */
  --mm-black: #000000;
  --mm-white: #FFFFFF;
  --mm-green-primary: #00B100;
  
  /* Grises */
  --mm-gray-dark: #272727;
  --mm-gray-light: #F0F0F0;
  
  /* Verde secundario */
  --mm-green-light: #BAF2A9;
}
```

### Colores para Interfaces Digitales

```css
:root {
  /* Acento principal */
  --mm-accent-green: #00B100;
  
  /* Variantes */
  --mm-green-soft: #04C072;
  --mm-turquoise: #00B3AE;
  --mm-blue-light: #00A3F5;
  --mm-blue: #0F62FF;
}
```

### Paleta Redes Sociales / Marketing

```css
:root {
  /* Colores vibrantes para campañas */
  --mm-social-blue: #0000CA;
  --mm-social-blue-light: #72A8FF;
  --mm-social-violet: #694AE3;
  --mm-social-lilac: #DEACFF;
  --mm-social-coral: #FF7F53;
  --mm-social-orange: #FFCA5A;
  --mm-social-lime: #ABD100;
  --mm-social-lime-light: #E9ED88;
  --mm-social-teal: #00CF96;
  --mm-social-teal-light: #97FBDA;
  --mm-social-dark-green: #002E1D;
  --mm-social-gray-green: #476B50;
}
```

### Uso de Colores por Contexto

| Contexto | Color Principal | Fondo | Acento |
|----------|-----------------|-------|--------|
| App / Web Banking | `--mm-black` | `--mm-black` | `--mm-green-primary` |
| Fondos claros | `--mm-black` | `--mm-white` | `--mm-green-primary` |
| Botones primarios | `--mm-white` | `--mm-green-primary` | - |
| Botones secundarios | `--mm-black` | `--mm-white` | `--mm-black` (border) |
| Estados de éxito | `--mm-white` | `--mm-green-primary` | - |
| Texto principal | `--mm-white` (dark mode) / `--mm-black` (light mode) | - | - |

---

## Tipografía

### Familia Principal: Circular

```css
/* Configuración tipográfica */
@font-face {
  font-family: 'Circular';
  /* Pesos disponibles: Book, Medium, Bold */
}

:root {
  --font-primary: 'Circular', 'Plus Jakarta Sans', sans-serif;
}
```

### Jerarquía Tipográfica

| Elemento | Peso | Uso |
|----------|------|-----|
| Títulos | **Bold** | Encabezados principales |
| Subtítulos | **Medium** | Encabezados secundarios |
| Cuerpo | **Book** | Texto de contenido |
| Destacados | **Medium Italic** | Énfasis, citas |

### Tipografía Web Alternativa

Si Circular no está disponible, usar **Plus Jakarta Sans** (Google Fonts):

```css
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;700&display=swap');

:root {
  --font-fallback: 'Plus Jakarta Sans', sans-serif;
}
```

### Reglas de Uso

✅ **Correcto:**
- Títulos en minúsculas (solo primera letra mayúscula)
- Jerarquía clara con pesos diferentes
- Alineación a la izquierda

❌ **Incorrecto:**
- TODO EN MAYÚSCULAS en títulos largos
- Mezclar tipografías no autorizadas
- Texto rotado o distorsionado
- Tipografías decorativas o serif

---

## Iconografía

### Estilo de Íconos
- Línea con terminaciones mixtas (redondas y planas)
- Consistente con el estilo del logotipo
- Peso visual uniforme

### Íconos de Sistema Recomendados

```
Inicio          🏠  home
Mi cuenta       👤  user
Movimientos     📊  chart / activity
Ajustes         ⚙️  settings
Chat en vivo    💬  message-circle
Información     ℹ️  info
Transferencias  ↔️  arrows / send
Notificaciones  🔔  bell
Seguridad       🔒  lock
```

### Implementación Sugerida
Usar **Lucide Icons** o **Heroicons** con estilo outline para consistencia.

---

## Componentes UI

### Botones

```css
/* Botón Primario */
.btn-primary {
  background-color: var(--mm-green-primary);
  color: var(--mm-white);
  border: none;
  border-radius: 50px; /* Pill shape */
  padding: 12px 24px;
  font-family: var(--font-primary);
  font-weight: 500;
}

/* Botón Secundario */
.btn-secondary {
  background-color: transparent;
  color: var(--mm-black);
  border: 2px solid var(--mm-black);
  border-radius: 50px;
  padding: 12px 24px;
}

/* Botón en Dark Mode */
.btn-primary-dark {
  background-color: var(--mm-green-primary);
  color: var(--mm-black);
}
```

### Cards / Contenedores

```css
.card {
  background-color: var(--mm-white);
  border-radius: 24px; /* Esquinas muy redondeadas */
  padding: 24px;
  box-shadow: none; /* Estilo flat */
}

.card-dark {
  background-color: var(--mm-gray-dark);
  color: var(--mm-white);
}
```

### Campos de Formulario

```css
.input-field {
  background-color: var(--mm-gray-light);
  border: none;
  border-radius: 12px;
  padding: 16px;
  font-family: var(--font-primary);
}

.input-field:focus {
  outline: 2px solid var(--mm-green-primary);
}
```

---

## Estilo Fotográfico

### Características
- **Natural y aspiracional** - Personas reales, momentos genuinos
- **Iluminación cálida** - Luz natural preferida
- **Tonos positivos** - Expresiones de felicidad, logro
- **Diversidad** - Representación de diferentes personas

### Categorías de Imágenes

1. **Retratos** - Frontales o de perfil, sonrientes, naturales
2. **Interacciones cotidianas** - Uso de dispositivos móviles
3. **Emprendimiento** - Negocios, comercios, transacciones
4. **Momentos aspiracionales** - Viajes, familia, logros

### Tratamiento de Imágenes
- Sin filtros pesados
- Colores fieles a la realidad
- Evitar imágenes de stock genéricas
- Priorizar autenticidad sobre perfección

---

## Espaciado y Retículas

### Sistema de Retícula

```css
:root {
  /* Grid de 12 columnas */
  --grid-columns: 12;
  
  /* Margen base: 10% del lado más corto */
  --margin-base: 10%;
  
  /* Espaciado */
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 32px;
  --space-2xl: 48px;
  --space-3xl: 64px;
}
```

### Border Radius

```css
:root {
  /* Radios consistentes con la marca */
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 24px;
  --radius-xl: 32px;
  --radius-full: 9999px; /* Para botones pill */
}
```

### Frames / Marcos Decorativos
Los marcos con esquinas redondeadas son un elemento distintivo de la marca:
- Radio de curva = lado más corto de una celda de la retícula
- Pueden contener imágenes o bloques de color
- Crean contraste y dinamismo visual

---

## Implementación en Tailwind CSS

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        'mm-black': '#000000',
        'mm-white': '#FFFFFF',
        'mm-green': {
          DEFAULT: '#00B100',
          light: '#BAF2A9',
          soft: '#04C072',
        },
        'mm-gray': {
          dark: '#272727',
          light: '#F0F0F0',
        },
        'mm-accent': {
          turquoise: '#00B3AE',
          blue: '#00A3F5',
          'blue-dark': '#0F62FF',
        }
      },
      fontFamily: {
        sans: ['Circular', 'Plus Jakarta Sans', 'sans-serif'],
      },
      borderRadius: {
        'mm-sm': '8px',
        'mm-md': '12px',
        'mm-lg': '24px',
        'mm-xl': '32px',
      }
    }
  }
}
```

---

## Checklist de Implementación

### ✅ Antes de Producción
- [ ] Logotipo en formato SVG cargado correctamente
- [ ] Fuentes Circular instaladas (o fallback Jakarta Sans)
- [ ] Variables CSS de colores implementadas
- [ ] Componentes siguiendo border-radius de marca
- [ ] Íconos consistentes con estilo de línea
- [ ] Dark mode como tema principal de la app
- [ ] Botón primario verde con texto blanco/negro
- [ ] Esquinas redondeadas en cards y contenedores

---

## Recursos

- **Logotipo SVG**: `/assets/brand/logo-multimoney.svg`
- **Ícono SVG**: `/assets/brand/icon-multimoney.svg`
- **Fuentes**: `/assets/fonts/circular/`
- **Íconos**: Lucide Icons / Heroicons (outline)

---

*Documento generado para el proyecto Web Banking - Banco Multimoney*
*Última actualización: Enero 2026*