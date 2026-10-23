/*
  Portafolio de proyectos.
  Para agregar un proyecto, copia un objeto y edita sus campos:
    title     Nombre del proyecto
    category  Etiqueta corta (ej. "SaaS", "Web", "App móvil", "ERP")
    summary   Descripción de 1-2 frases
    tags      Tecnologías o características clave
    icon      Nombre de ícono: clock | cart | chart | users | box | shield | phone | globe | truck | code
    link      URL opcional (deja "" si no hay)
    featured  true para mostrarlo destacado
*/
window.AYIPEY_PROJECTS = [
  {
    title: "Reloj Checador por WhatsApp",
    category: "SaaS multiempresa",
    summary:
      "Control de asistencia que responde a la reforma laboral sobre el registro electrónico de la jornada. Entradas, salidas y comida desde WhatsApp, con validación GPS y registros firmados e inalterables.",
    tags: ["WhatsApp API", "Geolocalización", "Firma digital", "Reportes Excel/PDF", "Multiempresa"],
    icon: "clock",
    link: "#reloj-checador",
    featured: true,
  },
  {
    title: "Sistema de Nómina Multi-RFC",
    category: "SaaS multiempresa",
    summary:
      "Nómina web para personas físicas y morales con base de datos por RFC. Calcula ISR, subsidio, IMSS, INFONAVIT e impuesto estatal sobre nómina, y emite la prenómina en Excel y el CFDI de nómina 1.2.",
    tags: ["CFDI Nómina 1.2", "ISR / IMSS / INFONAVIT", "Finiquitos", "Multi-RFC", "Roles y usuarios"],
    icon: "users",
    link: "#nomina",
    featured: true,
  },
  {
    title: "Conta: contabilidad electrónica en línea",
    category: "SaaS multiempresa",
    summary:
      "Contabilidad para empresas y personas con actividad empresarial a partir de las facturas descargadas del SAT. Aprende cómo se registra cada cliente y proveedor, revisa listas negras, prepara la DIOT y hace los cierres de mes y año.",
    tags: ["Descarga masiva SAT", "Pólizas automáticas", "Listas 69-B", "DIOT", "Multi-despacho", "Migración CONTPAQi"],
    icon: "chart",
    link: "#conta",
    featured: true,
  },
  {
    title: "Consolidación de Pedidos, Punto de Venta y Cobranza",
    category: "Software a la medida",
    summary:
      "Administra la operación diaria: pedidos de clientes, pesaje de piezas, ventas de contado y a crédito, cobranza de notas pendientes, catálogo de productos, clientes y proveedores, cálculo de impuestos y reportes diarios y semanales.",
    tags: ["Punto de venta", "Pesaje", "Crédito y cobranza", "Pre-facturación", "Permisos por puesto", "Auto-actualización"],
    icon: "cart",
    link: "",
    featured: false,
  },
];
