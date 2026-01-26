
import { Role, CrossImpact, CadenceMeeting } from './types';

export const MISSION = "El Cliente es el centro. Velar por la satisfacción del cliente, brindándole una experiencia memorable, resolutiva, coherente y sostenible en el tiempo.";
export const VISION = "Convertirse en el Centro de Soporte y referencia estratégica de la Organización mediante la coordinación entre necesidades del cliente y objetivos del negocio, escucha continua, análisis de datos, anticipación y mejora continua.";

export const VALUES = [
  { title: "Voz del Cliente", desc: "Somos el canal de entrada de las necesidades reales del mercado." },
  { title: "Voz de la Organización", desc: "Proyectamos los valores y objetivos de negocio hacia el exterior." },
  { title: "Soluciones Sostenibles", desc: "Buscamos el equilibrio, no el 'sí' indiscriminado." }
];

export const POLICIES = [
  { 
    title: "Clientes", 
    items: [
      { name: "Omnicanalidad", desc: "Un cliente, una historia, múltiples canales." },
      { name: "Agilidad Proactiva", desc: "Menos reacción, más prevención." },
      { name: "Equidad", desc: "No todos los casos son iguales, pero casos iguales se tratan igual." },
      { name: "Gestión de Excepciones", desc: "Las excepciones existen, pero no se improvisan." }
    ] 
  },
  { 
    title: "Sistemas", 
    items: [
      { name: "CRM 360", desc: "No preguntamos dos veces lo que ya sabemos." },
      { name: "Data-Driven Improvement", desc: "Lo que no se mide, no se mejora." },
      { name: "Automatización Inteligente", desc: "Automatizar para mejorar, no para deshumanizar." }
    ] 
  }
];

export const MOCK_ROLES: Role[] = [
  {
    id: 'area-manager',
    title: 'Área Manager O.S.A.C.',
    level: 'L2',
    area: 'O.S.A.C.',
    subarea: 'Dirección Operativa',
    dependency: 'Dirección General / COO',
    supervision: ['Jefe Equipo FrontOffice', 'Jefe Equipo Backoffice'],
    functions: ['Definición estratégica del área', 'Control presupuestario', 'Interlocución estratégica'],
    responsibilities: ['Garantizar SLA Global', 'Mantener satisfacción (CSAT)', 'Fidelidad y marca (NPS)'],
    requirements: ['Grado Superior / Máster', 'Experiencia > 5 años en gestión operativa', 'Liderazgo estratégico'],
    kpis: [
      { id: 'am-sla', name: 'Cumplimiento SLA global', formula: '% tickets gestionados en tiempo', frequency: 'Mensual', source: 'Zendesk', unit: '%', agreed: true, threshold: { target: 95, warning: 90, danger: 85 } },
      { id: 'am-tmr', name: 'Tiempo medio de resolución global', formula: 'Promedio tiempo cierre ticket', frequency: 'Mensual', source: 'Zendesk', unit: 'h', agreed: true, threshold: { target: 24, warning: 48, danger: 72 } },
      { id: 'am-csat', name: 'CSAT global OSAC', formula: 'Media satisfacción encuestas', frequency: 'Mensual', source: 'Zendesk (Encuestas CSAT)', unit: '/5', agreed: true, threshold: { target: 4.5, warning: 4, danger: 3.5 } },
      { id: 'am-nps', name: 'NPS OSAC / Brand', formula: 'Probabilidad recomendación marca', frequency: 'Trimestral', source: 'Encuestas de marca', unit: 'Pts', agreed: true, threshold: { target: 50, warning: 30, danger: 10 } }
    ]
  },
  {
    id: 'lead-front',
    title: 'Jefe Equipo FrontOffice',
    level: 'L3',
    area: 'O.S.A.C.',
    subarea: 'FrontOffice',
    dependency: 'Área Manager O.S.A.C.',
    supervision: ['Agentes FrontOffice'],
    functions: ['Gestión diaria del equipo', 'QA Coaching', 'Control de recursos'],
    responsibilities: ['Organización del trabajo', 'Correcta asignación de recursos', 'Consistencia del servicio'],
    requirements: ['Experiencia > 2 años liderando equipos', 'Alta capacidad comunicativa'],
    kpis: [
      { id: 'lf-sla', name: 'SLA del equipo', formula: '% tickets equipo en plazo', frequency: 'Semanal', source: 'Zendesk', unit: '%', agreed: true, threshold: { target: 98, warning: 94, danger: 90 } },
      { id: 'lf-fcr', name: 'Resolución en primer contacto (FCR)', formula: '% casos resueltos sin escalado', frequency: 'Semanal', source: 'Zendesk', unit: '%', agreed: true, threshold: { target: 75, warning: 70, danger: 60 } },
      { id: 'lf-csat', name: 'CSAT del equipo', formula: 'Media satisfacción clientes equipo', frequency: 'Semanal', source: 'Zendesk', unit: '%', agreed: true, threshold: { target: 90, warning: 85, danger: 80 } },
      { id: 'lf-qa', name: 'Calidad del equipo (QA)', formula: 'Media puntuación auditorías internas', frequency: 'Mensual', source: 'Auditorías internas', unit: '%', agreed: true, threshold: { target: 95, warning: 90, danger: 85 } }
    ]
  },
  {
    id: 'agent-front',
    title: 'Agente FrontOffice',
    level: 'L4',
    area: 'O.S.A.C.',
    subarea: 'FrontOffice',
    dependency: 'Jefe Equipo FrontOffice',
    supervision: [],
    functions: ['Atención multicanal', 'Tipificación precisa', 'Documentación inmediata'],
    responsibilities: ['Productividad individual', 'Calidad en la documentación', 'Cumplimiento de protocolos'],
    requirements: ['Orientación al cliente', 'Agilidad multicanal'],
    kpis: [
      { id: 'af-tickets', name: 'Tickets gestionados', formula: 'Nº tickets cerrados', frequency: 'Diaria', source: 'Zendesk', unit: 'Ud', agreed: true, threshold: { target: 40, warning: 30, danger: 20 } },
      { id: 'af-tmh', name: 'Tiempo medio de gestión', formula: 'Tiempo medio dedicado a cada ticket', frequency: 'Diaria', source: 'Zendesk', unit: 'min', agreed: true, threshold: { target: 8, warning: 12, danger: 15 } },
      { id: 'af-qa', name: 'Calidad individual (QA)', formula: 'Puntuación calidad respuestas', frequency: 'Semanal', source: 'Auditorías internas', unit: '%', agreed: true, threshold: { target: 90, warning: 85, danger: 80 } },
      { id: 'af-csat', name: 'CSAT individual (ponderado)', formula: 'Satisfacción percibida del cliente', frequency: 'Semanal', source: 'Zendesk', unit: '%', agreed: true, threshold: { target: 85, warning: 80, danger: 75 } }
    ]
  },
  {
    id: 'lead-back',
    title: 'Jefe Equipo Backoffice',
    level: 'L3',
    area: 'O.S.A.C.',
    subarea: 'BackOffice',
    dependency: 'Área Manager O.S.A.C.',
    supervision: ['Agentes Backoffice'],
    functions: ['Control de casos complejos', 'Fiabilidad operativa', 'Reducción de incidencias'],
    responsibilities: ['Eficiencia en incidencias complejas', 'Reducción de riesgo operativo', 'Protección reputacional'],
    requirements: ['Perfil analítico', 'Conocimientos avanzados ERP'],
    kpis: [
      { id: 'lb-tmr', name: 'Tiempo medio de resolución Backoffice', formula: 'Media cierre casos complejos', frequency: 'Semanal', source: 'Zendesk', unit: 'h', agreed: true, threshold: { target: 48, warning: 72, danger: 96 } },
      { id: 'lb-backlog', name: 'Backlog y antigüedad', formula: 'Volumen y tiempo casos abiertos', frequency: 'Semanal', source: 'Zendesk', unit: 'días', agreed: true, threshold: { target: 2, warning: 5, danger: 10 } },
      { id: 'lb-qa', name: 'Calidad de documentación (QA)', formula: 'Rigor en trazabilidad casos', frequency: 'Mensual', source: 'Auditorías internas', unit: '%', agreed: true, threshold: { target: 98, warning: 95, danger: 90 } },
      { id: 'lb-claims', name: 'Reclamaciones resueltas en plazo', formula: '% reclamaciones críticas cerradas', frequency: 'Semanal', source: 'Zendesk', unit: '%', agreed: true, threshold: { target: 100, warning: 95, danger: 90 } }
    ]
  },
  {
    id: 'agent-back',
    title: 'Agente Backoffice',
    level: 'L4',
    area: 'O.S.A.C.',
    subarea: 'BackOffice',
    dependency: 'Jefe Equipo Backoffice',
    supervision: [],
    functions: ['Gestión técnica expedientes', 'Resolución N2', 'Rigor administrativo'],
    responsibilities: ['Precisión y fiabilidad', 'Cumplimiento de políticas', 'Seguridad en la gestión'],
    requirements: ['Atención al detalle', 'Capacidad analítica profunda'],
    kpis: [
      { id: 'ab-cases', name: 'Casos cerrados', formula: 'Nº casos finalizados correctamente', frequency: 'Diaria', source: 'Zendesk', unit: 'Ud', agreed: true, threshold: { target: 15, warning: 10, danger: 5 } },
      { id: 'ab-tmr', name: 'Tiempo medio de resolución', formula: 'Tiempo necesario para cerrar caso', frequency: 'Diaria', source: 'Zendesk', unit: 'min', agreed: true, threshold: { target: 20, warning: 30, danger: 45 } },
      { id: 'ab-errors', name: 'Errores / reprocesos', formula: 'Nº casos reabiertos por error', frequency: 'Semanal', source: 'Zendesk / Auditorías', unit: 'Ud', agreed: true, threshold: { target: 0, warning: 2, danger: 5 } },
      { id: 'ab-qa', name: 'Calidad individual (QA)', formula: 'Validaciones y documentación', frequency: 'Semanal', source: 'Auditorías internas', unit: '%', agreed: true, threshold: { target: 95, warning: 90, danger: 85 } }
    ]
  }
];

export const MOCK_IMPACTS: CrossImpact[] = [
  {
    kpiId: 'am-sla',
    kpiName: 'SLA Global',
    impacts: [
      { department: 'Comercial', description: 'Afecta directamente a la retención de clientes y renovaciones.', level: 'Alto' },
      { department: 'Finanzas', description: 'Impacto en penalizaciones contractuales por demoras.', level: 'Medio' }
    ]
  },
  {
    kpiId: 'lb-backlog',
    kpiName: 'Antigüedad Backlog',
    impacts: [
      { department: 'Logística', description: 'Retrasos en BO suelen indicar cuellos de botella operativos.', level: 'Alto' },
      { department: 'Marketing', description: 'Impacto en reputación de marca por falta de resolución.', level: 'Bajo' }
    ]
  }
];

export const MOCK_CADENCE: CadenceMeeting[] = [
  {
    id: 'daily-sync',
    title: 'Daily Sync OSAC',
    frequency: 'Diaria (10 min)',
    owners: ['Jefes de Equipo'],
    attendees: ['Agentes'],
    objectives: ['Bloqueos del día', 'Volumen esperado', 'Repaso de alertas críticas']
  },
  {
    id: 'weekly-ops',
    title: 'Comité Operativo Semanal',
    frequency: 'Semanal (1h)',
    owners: ['Área Manager'],
    attendees: ['Jefes de Equipo'],
    objectives: ['Análisis KPI semanal', 'Desviaciones y acciones correctoras', 'Planificación recursos']
  }
];
