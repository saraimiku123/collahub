// ===== ProxoraHub — Modelos de datos =====
// Estos modelos están diseñados para coincidir con la futura API REST (Java + Spring Boot).

import { IconName } from "../shared/icon.component";

export type DifficultyLevel =
  | "Principiante"
  | "Intermedio"
  | "Avanzado"
  | "Principiante-intermedio";

export interface Project {
  id: number;
  name: string;
  description: string;
  technologies: string[];
  level: DifficultyLevel;
  currentCollaborators: number;
  maxCollaborators: number;
  rolesNeeded: string[];
  category: string;
  authorName: string;
  publishedDate: string;
}

export interface Collaborator {
  id: number;
  name: string;
  role: string;
  knows: string[];
  wantsToLearn: string[];
  projectType: string;
  bio: string;
  avatarColor: string;
  photo: string;
}

export interface Benefit {
  id: number;
  icon: IconName;
  title: string;
  description: string;
  photo: string;
}

export interface HowItWorksStep {
  id: number;
  icon: IconName;
  title: string;
  description: string;
}

// ===== Datos de demostración (ficticios) =====

export const PROJECTS: Project[] = [
  {
    id: 1,
    name: "Sistema de gestión de bibliotecas",
    description:
      "Aplicación para administrar libros, usuarios y préstamos de una biblioteca escolar o comunitaria.",
    technologies: ["Java", "Spring Boot", "Angular"],
    level: "Principiante-intermedio",
    currentCollaborators: 2,
    maxCollaborators: 4,
    rolesNeeded: ["Backend", "Frontend"],
    category: "Desarrollo web",
    authorName: "María Fernanda López",
    publishedDate: "Hace 3 días",
  },
  {
    id: 2,
    name: "Datos para el campo",
    description:
      "Plataforma para visualizar y analizar datos de producción agrícola de pequeñas comunidades rurales.",
    technologies: ["Python", "SQL", "Power BI"],
    level: "Principiante",
    currentCollaborators: 1,
    maxCollaborators: 3,
    rolesNeeded: ["Analista de datos", "Frontend"],
    category: "Ciencia de datos",
    authorName: "Carlos Eduardo Ruiz",
    publishedDate: "Hace 1 semana",
  },
  {
    id: 3,
    name: "Organiza tu evento",
    description:
      "Aplicación para administrar eventos, invitados, presupuestos y recordatorios de manera sencilla.",
    technologies: ["Angular", "Java", "MySQL"],
    level: "Intermedio",
    currentCollaborators: 2,
    maxCollaborators: 5,
    rolesNeeded: ["Backend", "Frontend", "Diseño UI/UX"],
    category: "Productividad",
    authorName: "Andrea Sofía Méndez",
    publishedDate: "Hace 5 días",
  },
  {
    id: 4,
    name: "EcoTrack",
    description:
      "Aplicación para registrar hábitos sostenibles y visualizar el impacto ambiental positivo de cada acción.",
    technologies: ["JavaScript", "Angular", "Firebase"],
    level: "Principiante",
    currentCollaborators: 1,
    maxCollaborators: 4,
    rolesNeeded: ["Frontend", "Diseño UI/UX"],
    category: "Sostenibilidad",
    authorName: "Diego Alejandro Torres",
    publishedDate: "Hace 2 días",
  },
  {
    id: 5,
    name: "Control de inventario",
    description:
      "Sistema para administrar productos, existencias y movimientos de inventario de una pequeña tienda.",
    technologies: ["Java", "Spring Boot", "PostgreSQL"],
    level: "Intermedio",
    currentCollaborators: 3,
    maxCollaborators: 4,
    rolesNeeded: ["Backend"],
    category: "Desarrollo web",
    authorName: "Valentina Cruz",
    publishedDate: "Hace 4 días",
  },
  {
    id: 6,
    name: "Aprende en equipo",
    description:
      "Plataforma para organizar sesiones de estudio en grupo y compartir recursos educativos entre estudiantes.",
    technologies: ["Angular", "TypeScript", "Node.js"],
    level: "Principiante",
    currentCollaborators: 2,
    maxCollaborators: 4,
    rolesNeeded: ["Frontend", "Backend"],
    category: "Educación",
    authorName: "Sebastián Herrera",
    publishedDate: "Hace 6 días",
  },
];

export const COLLABORATORS: Collaborator[] = [
  {
    id: 1,
    name: "Lucía Ramírez",
    role: "Desarrolladora backend",
    knows: ["Java", "SQL", "Git"],
    wantsToLearn: ["Spring Boot", "Microservicios", "Docker"],
    projectType:
      "Un proyecto backend donde pueda aplicar buenas prácticas y aprender arquitectura limpia.",
    bio: "Recién egresada de Ingeniería en Sistemas. Me apasiona construir APIs robustas y aprender de equipos con más experiencia.",
    avatarColor: "var(--blue-600)",
    photo: "https://images.pexels.com/photos/32106638/pexels-photo-32106638.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  },
  {
    id: 2,
    name: "Mateo Vargas",
    role: "Desarrollador frontend",
    knows: ["HTML", "CSS", "JavaScript"],
    wantsToLearn: ["Angular", "TypeScript", "Diseño de interfaces"],
    projectType:
      "Un proyecto frontend con Angular donde pueda practicar componentes y consumo de APIs.",
    bio: "Estudiante de diseño web. Quiero dar el salto de páginas estáticas a aplicaciones interactivas de verdad.",
    avatarColor: "var(--blue-500)",
    photo: "https://images.pexels.com/photos/6942776/pexels-photo-6942776.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  },
  {
    id: 3,
    name: "Daniela Ortega",
    role: "Analista de datos",
    knows: ["SQL", "Excel", "Estadística"],
    wantsToLearn: ["Python", "Power BI", "Visualización de datos"],
    projectType:
      "Un proyecto de análisis de datos donde pueda transformar datos en decisiones.",
    bio: "Egresada de Estadística. Me encanta encontrar historias escondidas dentro de los datos y contarlas con claridad.",
    avatarColor: "var(--sky-500)",
    photo: "https://images.pexels.com/photos/11701102/pexels-photo-11701102.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  },
];
export const BENEFITS: Benefit[] = [
  {
    id: 1,
    icon: "rocket",
    title: "Adquiere experiencia práctica",
    description:
      "Trabaja en proyectos reales y supera el círculo de «necesitas experiencia para conseguir experiencia».",
    photo: "https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  },
  {
    id: 2,
    icon: "layers",
    title: "Aprende nuevas tecnologías",
    description:
      "Descubre herramientas modernas de la mano de personas que ya las están usando en sus proyectos.",
    photo: "https://images.pexels.com/photos/10638069/pexels-photo-10638069.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  },
  {
    id: 3,
    icon: "users",
    title: "Conoce personas con intereses similares",
    description:
      "Conecta con una comunidad que comparte tu entusiasmo por aprender, crear y crecer profesionalmente.",
    photo: "https://images.pexels.com/photos/3861563/pexels-photo-3861563.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  },
  {
    id: 4,
    icon: "briefcase",
    title: "Construye proyectos para tu portafolio",
    description:
      "Cada colaboración se convierte en una pieza tangible que puedes mostrar a futuros empleadores.",
    photo: "https://images.pexels.com/photos/16313659/pexels-photo-16313659.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  },
];

export const STEPS: HowItWorksStep[] = [
  {
    id: 1,
    icon: "lightbulb",
    title: "Comparte tu idea o encuentra un proyecto",
    description:
      "Publica lo que quieres crear o explora proyectos que ya están buscando colaboradores.",
  },
  {
    id: 2,
    icon: "search",
    title: "Descubre personas con intereses similares",
    description:
      "Filtra por tecnologías, niveles y perfiles para encontrar el equipo que encaja contigo.",
  },
  {
    id: 3,
    icon: "kanban",
    title: "Forma un equipo y organiza las tareas",
    description:
      "Acuerda responsabilidades, distribuye el trabajo y mantén el proyecto avanzando en conjunto.",
  },
  {
    id: 4,
    icon: "trophy",
    title: "Colabora, aprende y muestra tus resultados",
    description:
      "Lleva la idea hasta el final, aprende del proceso y añade el proyecto a tu portafolio.",
  },
];

export const ALL_TECHNOLOGIES = [
  "Angular",
  "Java",
  "Spring Boot",
  "TypeScript",
  "Node.js",
  "JavaScript",
  "Python",
  "SQL",
  "MySQL",
  "PostgreSQL",
  "Firebase",
  "Power BI",
].sort();

export const ALL_CATEGORIES = [
  "Desarrollo web",
  "Ciencia de datos",
  "Productividad",
  "Sostenibilidad",
  "Educación",
].sort();

export const ALL_LEVELS: DifficultyLevel[] = [
  "Principiante",
  "Intermedio",
  "Principiante-intermedio",
];
