import { Component, input, output, computed } from "@angular/core";
import { IconComponent } from "../shared/icon.component";
import { Project, DifficultyLevel } from "../data/models";

function levelClass(level: DifficultyLevel): string {
  if (level === "Principiante") return "level-principiante";
  if (level === "Intermedio") return "level-intermedio";
  return "level-principiante-intermedio";
}

@Component({
  selector: "app-project-card",
  imports: [IconComponent],
  template: `
    <article class="card" [style.animation-delay.ms]="index() * 70">
      <div class="card-top">
        <span class="card-cat">{{ project().category }}</span>
        <span class="card-level" [class]="levelClass()">{{ project().level }}</span>
      </div>
      <h3>{{ project().name }}</h3>
      <p class="card-desc">{{ project().description }}</p>

      <div class="card-techs">
        @for (tech of project().technologies; track tech) {
          <span class="chip">{{ tech }}</span>
        }
      </div>

      <div class="card-roles">
        <span class="roles-label">Busca:</span>
        @for (role of project().rolesNeeded; track role) {
          <span class="role-tag">{{ role }}</span>
        }
      </div>

      <div class="card-meta">
        <div class="collab-bar">
          <app-icon name="users" [size]="16" />
          <span>{{ project().currentCollaborators }}/{{ project().maxCollaborators }} colaboradores</span>
          <div class="progress">
            <div class="progress-fill" [style.width.%]="progress()"></div>
          </div>
        </div>
        <span class="card-date">
          <app-icon name="calendar" [size]="14" />
          {{ project().publishedDate }}
        </span>
      </div>

      <button class="btn btn-primary card-btn" type="button" (click)="view.emit()">
        Ver proyecto
        <app-icon name="arrow-right" [size]="18" />
      </button>
    </article>
  `,
  styles: [
    `
      .card {
        background: #fff;
        border: 1px solid var(--gray-200);
        border-radius: var(--radius-lg);
        padding: 24px;
        display: flex;
        flex-direction: column;
        transition: all 0.3s var(--ease);
        animation: fadeInUp 0.5s var(--ease-out) both;
      }
      .card:hover {
        border-color: var(--blue-200);
        box-shadow: var(--shadow-lg);
        transform: translateY(-4px);
      }
      .card-top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 14px;
        gap: 8px;
      }
      .card-cat {
        font-size: 12.5px;
        font-weight: 600;
        color: var(--gray-500);
        text-transform: uppercase;
        letter-spacing: 0.04em;
      }
      .card-level {
        font-size: 12px;
        font-weight: 600;
        padding: 4px 11px;
        border-radius: var(--radius-full);
        white-space: nowrap;
      }
      h3 {
        font-size: 18.5px;
        font-weight: 700;
        margin-bottom: 10px;
        line-height: 1.3;
      }
      .card-desc {
        font-size: 14.5px;
        color: var(--gray-500);
        line-height: 1.55;
        margin-bottom: 16px;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
      .card-techs {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
        margin-bottom: 14px;
      }
      .card-techs .chip {
        background: var(--blue-50);
        color: var(--blue-700);
        font-size: 12.5px;
      }
      .card-roles {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 6px;
        margin-bottom: 16px;
      }
      .roles-label {
        font-size: 13px;
        font-weight: 600;
        color: var(--gray-500);
      }
      .role-tag {
        font-size: 12.5px;
        font-weight: 500;
        color: var(--blue-700);
        background: var(--blue-50);
        padding: 4px 10px;
        border-radius: var(--radius-sm);
      }
      .card-meta {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
        padding: 14px 0;
        border-top: 1px solid var(--gray-100);
        margin-bottom: 16px;
        flex-wrap: wrap;
      }
      .collab-bar {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 13px;
        font-weight: 500;
        color: var(--gray-600);
      }
      .progress {
        width: 64px;
        height: 6px;
        background: var(--gray-100);
        border-radius: var(--radius-full);
        overflow: hidden;
      }
      .progress-fill {
        height: 100%;
        background: linear-gradient(90deg, var(--blue-500), var(--sky-500));
        border-radius: var(--radius-full);
        transition: width 0.4s var(--ease);
      }
      .card-date {
        display: flex;
        align-items: center;
        gap: 5px;
        font-size: 12.5px;
        color: var(--gray-400);
      }
      .card-btn {
        margin-top: auto;
        width: 100%;
      }
    `,
  ],
})
export class ProjectCardComponent {
  project = input.required<Project>();
  index = input<number>(0);
  view = output<void>();

  levelClass = computed(() => levelClass(this.project().level));
  progress = computed(() =>
    (this.project().currentCollaborators / this.project().maxCollaborators) * 100,
  );
}
