import { Component, computed, signal, inject } from "@angular/core";
import { IconComponent } from "../shared/icon.component";
import { ModalService } from "../shared/modal.service";
import { ProjectCardComponent } from "./project-card.component";
import {
  PROJECTS,
  ALL_TECHNOLOGIES,
  ALL_CATEGORIES,
  ALL_LEVELS,
  Project,
} from "../data/models";

@Component({
  selector: "app-project-list",
  imports: [IconComponent, ProjectCardComponent],
  template: `
    <section id="explorar-proyectos" class="section">
      <div class="container">
        <div class="section-header">
          <h2>Ideas que están esperando convertirse en realidad</h2>
          <p>Encuentra un proyecto que coincida con tus intereses y ayuda a construirlo</p>
        </div>

        <!-- Toolbar -->
        <div class="toolbar">
          <div class="search-box">
            <app-icon name="search" [size]="18" />
            <input
              type="text"
              placeholder="Buscar por nombre o descripción..."
              [value]="searchTerm()"
              (input)="onSearch($event)"
              aria-label="Buscar proyectos"
            />
            @if (searchTerm()) {
              <button class="clear-btn" type="button" aria-label="Limpiar búsqueda" (click)="clearSearch()">
                <app-icon name="x" [size]="16" />
              </button>
            }
          </div>

          <button class="filter-toggle" type="button" (click)="toggleFilters()">
            <app-icon name="filter" [size]="16" />
            Filtros
            <app-icon name="chevron-down" [size]="16" [style.transform]="filtersOpen() ? 'rotate(180deg)' : 'none'" />
          </button>
        </div>

        <!-- Filters panel -->
        <div class="filters" [class.open]="filtersOpen()">
          <div class="filter-group">
            <label>Tecnología</label>
            <div class="filter-options">
              @for (tech of technologies; track tech) {
                <button
                  type="button"
                  class="filter-chip"
                  [class.active]="selectedTech() === tech"
                  (click)="toggleTech(tech)"
                >
                  {{ tech }}
                </button>
              }
            </div>
          </div>
          <div class="filter-group">
            <label>Categoría</label>
            <div class="filter-options">
              <button
                type="button"
                class="filter-chip"
                [class.active]="selectedCategory() === ''"
                (click)="selectCategory('')"
              >
                Todas
              </button>
              @for (cat of categories; track cat) {
                <button
                  type="button"
                  class="filter-chip"
                  [class.active]="selectedCategory() === cat"
                  (click)="selectCategory(cat)"
                >
                  {{ cat }}
                </button>
              }
            </div>
          </div>
          <div class="filter-group">
            <label>Nivel</label>
            <div class="filter-options">
              <button
                type="button"
                class="filter-chip"
                [class.active]="selectedLevel() === ''"
                (click)="selectLevel('')"
              >
                Todos
              </button>
              @for (level of levels; track level) {
                <button
                  type="button"
                  class="filter-chip"
                  [class.active]="selectedLevel() === level"
                  (click)="selectLevel(level)"
                >
                  {{ level }}
                </button>
              }
            </div>
          </div>
        </div>

        <!-- Active filter summary -->
        @if (hasActiveFilters()) {
          <div class="active-filters">
            <span>{{ filteredProjects().length }} proyecto(s) encontrado(s)</span>
            <button class="link-reset" type="button" (click)="resetFilters()">
              <app-icon name="x" [size]="14" />
              Limpiar filtros
            </button>
          </div>
        }

        <!-- Grid -->
        @if (visibleProjects().length > 0) {
          <div class="projects-grid">
            @for (project of visibleProjects(); track project.id) {
              <app-project-card
                [project]="project"
                [index]="$index"
                (view)="openDetail(project)"
              />
            }
          </div>
        } @else {
          <div class="empty-state">
            <app-icon name="search" [size]="40" />
            <h3>No encontramos proyectos con esos criterios</h3>
            <p>Prueba cambiando los filtros o la búsqueda.</p>
            <button class="btn btn-secondary" type="button" (click)="resetFilters()">
              Limpiar filtros
            </button>
          </div>
        }

        <!-- Show all toggle -->
        @if (!showAll() && filteredProjects().length > 6) {
          <div class="show-all">
            <button class="btn btn-secondary btn-lg" type="button" (click)="showAll.set(true)">
              Ver todos los proyectos
              <app-icon name="chevron-down" [size]="18" />
            </button>
          </div>
        } @else if (showAll() && filteredProjects().length > 6) {
          <div class="show-all">
            <button class="btn btn-ghost" type="button" (click)="showAll.set(false)">
              Mostrar menos
            </button>
          </div>
        }
      </div>
    </section>
  `,
  styles: [
    `
      .toolbar {
        display: flex;
        gap: 14px;
        margin-bottom: 20px;
        flex-wrap: wrap;
        align-items: center;
      }
      .search-box {
        flex: 1;
        min-width: 260px;
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 0 16px;
        height: 48px;
        background: #fff;
        border: 1.5px solid var(--gray-200);
        border-radius: var(--radius-md);
        color: var(--gray-400);
        transition: border-color 0.2s;
      }
      .search-box:focus-within {
        border-color: var(--blue-400);
        box-shadow: 0 0 0 3px var(--blue-100);
      }
      .search-box input {
        flex: 1;
        border: none;
        outline: none;
        background: none;
        font-size: 15px;
        color: var(--gray-800);
        min-width: 0;
      }
      .search-box input::placeholder {
        color: var(--gray-400);
      }
      .clear-btn {
        display: flex;
        color: var(--gray-400);
        padding: 4px;
        border-radius: var(--radius-sm);
        transition: color 0.2s;
      }
      .clear-btn:hover {
        color: var(--gray-700);
      }
      .filter-toggle {
        display: flex;
        align-items: center;
        gap: 8px;
        height: 48px;
        padding: 0 18px;
        background: #fff;
        border: 1.5px solid var(--gray-200);
        border-radius: var(--radius-md);
        font-size: 14.5px;
        font-weight: 600;
        color: var(--gray-700);
        transition: all 0.2s;
      }
      .filter-toggle:hover {
        border-color: var(--blue-300);
        background: var(--blue-50);
      }
      .filter-toggle app-icon:last-child {
        transition: transform 0.3s var(--ease);
      }
      .filters {
        max-height: 0;
        overflow: hidden;
        opacity: 0;
        transition: all 0.35s var(--ease);
        margin-bottom: 0;
      }
      .filters.open {
        max-height: 360px;
        opacity: 1;
        margin-bottom: 24px;
        overflow-y: auto;
      }
      .filter-group {
        padding: 16px 0;
        border-bottom: 1px solid var(--gray-100);
      }
      .filter-group:last-child {
        border-bottom: none;
      }
      .filter-group label {
        display: block;
        font-size: 13px;
        font-weight: 700;
        color: var(--gray-600);
        text-transform: uppercase;
        letter-spacing: 0.04em;
        margin-bottom: 10px;
      }
      .filter-options {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
      }
      .filter-chip {
        padding: 8px 14px;
        border-radius: var(--radius-full);
        font-size: 13.5px;
        font-weight: 500;
        background: var(--gray-100);
        color: var(--gray-600);
        border: 1.5px solid transparent;
        transition: all 0.2s var(--ease);
      }
      .filter-chip:hover {
        background: var(--gray-200);
      }
      .filter-chip.active {
        background: var(--blue-600);
        color: #fff;
        border-color: var(--blue-600);
      }
      .active-filters {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        padding: 12px 16px;
        background: var(--blue-50);
        border-radius: var(--radius-md);
        margin-bottom: 24px;
        font-size: 14px;
        font-weight: 500;
        color: var(--blue-700);
      }
      .link-reset {
        display: flex;
        align-items: center;
        gap: 5px;
        font-size: 13.5px;
        font-weight: 600;
        color: var(--blue-700);
        padding: 6px 10px;
        border-radius: var(--radius-sm);
        transition: background 0.2s;
      }
      .link-reset:hover {
        background: var(--blue-100);
      }
      .projects-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 20px;
      }
      .empty-state {
        text-align: center;
        padding: 64px 20px;
        color: var(--gray-500);
      }
      .empty-state app-icon {
        color: var(--gray-300);
        margin-bottom: 16px;
      }
      .empty-state h3 {
        font-size: 20px;
        margin-bottom: 8px;
      }
      .empty-state p {
        margin-bottom: 20px;
      }
      .show-all {
        text-align: center;
        margin-top: 40px;
      }
      @media (max-width: 880px) {
        .projects-grid {
          grid-template-columns: repeat(2, 1fr);
        }
      }
      @media (max-width: 600px) {
        .projects-grid {
          grid-template-columns: 1fr;
          max-width: 420px;
          margin: 0 auto;
        }
      }
    `,
  ],
})
export class ProjectListComponent {
  private modal = inject(ModalService);

  projects = signal<Project[]>(PROJECTS);
  searchTerm = signal("");
  selectedTech = signal("");
  selectedCategory = signal("");
  selectedLevel = signal("");
  filtersOpen = signal(true);
  showAll = signal(false);

  technologies = ALL_TECHNOLOGIES;
  categories = ALL_CATEGORIES;
  levels = ALL_LEVELS;

  hasActiveFilters = computed(
    () =>
      this.searchTerm() !== "" ||
      this.selectedTech() !== "" ||
      this.selectedCategory() !== "" ||
      this.selectedLevel() !== "",
  );

  filteredProjects = computed(() => {
    const term = this.searchTerm().toLowerCase().trim();
    const tech = this.selectedTech();
    const cat = this.selectedCategory();
    const level = this.selectedLevel();

    return this.projects().filter((p) => {
      const matchesTerm =
        !term ||
        p.name.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term);
      const matchesTech = !tech || p.technologies.includes(tech);
      const matchesCat = !cat || p.category === cat;
      const matchesLevel = !level || p.level === level;
      return matchesTerm && matchesTech && matchesCat && matchesLevel;
    });
  });

  visibleProjects = computed(() =>
    this.showAll() ? this.filteredProjects() : this.filteredProjects().slice(0, 6),
  );

  onSearch(e: Event) {
    this.searchTerm.set((e.target as HTMLInputElement).value);
  }

  clearSearch() {
    this.searchTerm.set("");
  }

  toggleFilters() {
    this.filtersOpen.set(!this.filtersOpen());
  }

  toggleTech(tech: string) {
    this.selectedTech.set(this.selectedTech() === tech ? "" : tech);
  }

  selectCategory(cat: string) {
    this.selectedCategory.set(cat);
  }

  selectLevel(level: string) {
    this.selectedLevel.set(level);
  }

  resetFilters() {
    this.searchTerm.set("");
    this.selectedTech.set("");
    this.selectedCategory.set("");
    this.selectedLevel.set("");
  }

  openDetail(project: Project) {
    this.modal.openProjectDetail(project);
  }
}
