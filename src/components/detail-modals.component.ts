import { Component, inject } from "@angular/core";
import { IconComponent } from "../shared/icon.component";
import { ModalService } from "../shared/modal.service";
import { Project, Collaborator } from "../data/models";

function levelClass(level: string): string {
  if (level === "Principiante") return "level-principiante";
  if (level === "Intermedio") return "level-intermedio";
  return "level-principiante-intermedio";
}

@Component({
  selector: "app-detail-modals",
  imports: [IconComponent],
  template: `
    <!-- Project detail -->
    @if (modal.activeProject(); as project) {
      <div class="modal-backdrop" (click)="closeProject($event)">
        <div class="modal-panel detail-modal">
          <div class="detail-hero">
            <div class="detail-hero-bg"></div>
            <button class="close-btn" type="button" aria-label="Cerrar" (click)="modal.closeProjectDetail()">
              <app-icon name="x" [size]="20" />
            </button>
            <div class="detail-hero-content">
              <div class="detail-icon">
                <app-icon name="rocket" [size]="28" />
              </div>
              <span class="chip chip-blue">{{ project.category }}</span>
            </div>
          </div>

          <div class="detail-body">
            <div class="detail-tags">
              <span class="detail-level" [class]="levelClass(project.level)">{{ project.level }}</span>
              <span class="detail-meta">
                <app-icon name="calendar" [size]="14" />
                {{ project.publishedDate }}
              </span>
              <span class="detail-meta">
                <app-icon name="user" [size]="14" />
                {{ project.authorName }}
              </span>
            </div>

            <h2>{{ project.name }}</h2>
            <p class="detail-desc">{{ project.description }}</p>

            <div class="detail-section">
              <span class="detail-label">Tecnologías</span>
              <div class="detail-chips">
                @for (tech of project.technologies; track tech) {
                  <span class="chip chip-blue">{{ tech }}</span>
                }
              </div>
            </div>

            <div class="detail-section">
              <span class="detail-label">Perfiles que busca el equipo</span>
              <div class="detail-chips">
                @for (role of project.rolesNeeded; track role) {
                  <span class="chip chip-blue">{{ role }}</span>
                }
              </div>
            </div>

            <div class="detail-section">
              <span class="detail-label">Equipo actual</span>
              <div class="team-bar">
                <div class="team-avatars">
                  @for (i of teamSlots(project); track i) {
                    <span class="team-avatar" [class.filled]="i < project.currentCollaborators">
                      @if (i < project.currentCollaborators) {
                        {{ ['A', 'B', 'C', 'D', 'E'][i] }}
                      } @else {
                        <app-icon name="plus" [size]="14" />
                      }
                    </span>
                  }
                </div>
                <span class="team-count">{{ project.currentCollaborators }}/{{ project.maxCollaborators }} colaboradores</span>
              </div>
              <div class="progress-bar">
                <div class="progress-fill" [style.width.%]="(project.currentCollaborators / project.maxCollaborators) * 100"></div>
              </div>
            </div>

<div class="detail-actions">
  <button
    class="btn btn-ghost"
    type="button"
    (click)="modal.closeProjectDetail()"
  >
    Cerrar
  </button>

  <button
    class="btn btn-primary"
    type="button"
    (click)="modal.closeProjectDetail(); modal.openPublish('project')"
  >
    <app-icon name="send" [size]="18" />
    Quiero unirme
  </button>
  </div>
          </div>
        </div>
      </div>
    }
    <!-- Collaborator detail -->
    @if (modal.activeCollaborator(); as person) {
      <div class="modal-backdrop" (click)="closeCollab($event)">
        <div class="modal-panel detail-modal">
          <div class="detail-hero collab-hero">
            <div class="detail-hero-bg collab-bg"></div>
            <button class="close-btn" type="button" aria-label="Cerrar" (click)="modal.closeCollaboratorDetail()">
              <app-icon name="x" [size]="20" />
            </button>
            <div class="collab-hero-content">
              <span class="collab-avatar-lg" [style.background]="person.avatarColor">
                {{ person.name.charAt(0) }}
              </span>
              <div>
                <h2>{{ person.name }}</h2>
                <p>{{ person.role }}</p>
              </div>
            </div>
          </div>

          <div class="detail-body">
            <p class="detail-desc">{{ person.bio }}</p>

            <div class="detail-section">
              <span class="detail-label">
                <app-icon name="check-circle" [size]="15" />
                Tecnologías que conoce
              </span>
              <div class="detail-chips">
                @for (tech of person.knows; track tech) {
                  <span class="chip chip-blue">{{ tech }}</span>
                }
              </div>
            </div>

            <div class="detail-section">
              <span class="detail-label">
                <app-icon name="trending-up" [size]="15" />
                Quiere aprender
              </span>
              <div class="detail-chips">
                @for (tech of person.wantsToLearn; track tech) {
                  <span class="chip chip-blue">{{ tech }}</span>
                }
              </div>
            </div>

            <div class="detail-section">
              <span class="detail-label">
                <app-icon name="target" [size]="15" />
                Tipo de proyecto que busca
              </span>
              <p class="seek-block">{{ person.projectType }}</p>
            </div>

            <div class="detail-actions">
              <button class="btn btn-ghost" type="button" (click)="modal.closeCollaboratorDetail()">Cerrar</button>
              <button class="btn btn-primary" type="button" 
              (click)="modal.closeCollaboratorDetail()";
              (click)="modal.openPublish('collaborator')">
                <app-icon name="message-square" [size]="18" />
                Contactar
              </button>
            </div>
          </div>
        </div>
      </div>
    }
  `,
  styles: [
    `
      .detail-modal {
        max-width: 540px;
        overflow: hidden;
        padding: 0;
      }
      .detail-hero {
        position: relative;
        padding: 32px 28px 20px;
        background: var(--blue-50);
      }
      .collab-hero {
        background: var(--blue-50);
      }
      .detail-hero-bg {
        position: absolute;
        inset: 0;
        background: linear-gradient(135deg, var(--blue-100), var(--sky-100));
        opacity: 0.6;
      }
      .collab-bg {
        background: linear-gradient(135deg, var(--blue-100), var(--sky-100));
      }
      .close-btn {
        position: absolute;
        top: 16px;
        right: 16px;
        z-index: 2;
        width: 40px;
        height: 40px;
        border-radius: var(--radius-md);
        background: rgba(255, 255, 255, 0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--gray-600);
        transition: all 0.2s;
      }
      .close-btn:hover {
        background: #fff;
        color: var(--gray-900);
      }
      .detail-hero-content {
        position: relative;
        z-index: 1;
        display: flex;
        align-items: center;
        gap: 16px;
      }
      .detail-icon {
        width: 56px;
        height: 56px;
        border-radius: var(--radius-lg);
        background: var(--blue-600);
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: var(--shadow-violet);
      }
      .collab-hero-content {
        position: relative;
        z-index: 1;
        display: flex;
        align-items: center;
        gap: 16px;
      }
      .collab-avatar-lg {
        width: 64px;
        height: 64px;
        border-radius: var(--radius-lg);
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        font-size: 28px;
        font-weight: 700;
        font-family: var(--font-heading);
        flex-shrink: 0;
      }
      .collab-hero-content h2 {
        font-size: 22px;
        margin-bottom: 4px;
      }
      .collab-hero-content p {
        font-size: 15px;
        color: var(--gray-600);
      }
      .detail-body {
        padding: 24px 28px 28px;
      }
      .detail-tags {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 10px;
        margin-bottom: 16px;
      }
      .detail-level {
        font-size: 12.5px;
        font-weight: 600;
        padding: 4px 12px;
        border-radius: var(--radius-full);
      }
      .detail-meta {
        display: flex;
        align-items: center;
        gap: 5px;
        font-size: 13px;
        color: var(--gray-500);
      }
      .detail-body h2 {
        font-size: 24px;
        margin-bottom: 12px;
      }
      .detail-desc {
        font-size: 15px;
        color: var(--gray-600);
        line-height: 1.65;
        margin-bottom: 24px;
        padding-bottom: 24px;
        border-bottom: 1px solid var(--gray-100);
      }
      .detail-section {
        margin-bottom: 22px;
      }
      .detail-label {
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 12.5px;
        font-weight: 700;
        color: var(--gray-600);
        text-transform: uppercase;
        letter-spacing: 0.03em;
        margin-bottom: 10px;
      }
      .detail-label app-icon {
        color: var(--blue-500);
      }
      .detail-chips {
        display: flex;
        flex-wrap: wrap;
        gap: 7px;
      }
      .team-bar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 10px;
      }
      .team-avatars {
        display: flex;
      }
      .team-avatar {
        width: 34px;
        height: 34px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 13px;
        font-weight: 700;
        border: 2px solid #fff;
        margin-left: -8px;
        background: var(--gray-200);
        color: var(--gray-500);
      }
      .team-avatar:first-child {
        margin-left: 0;
      }
      .team-avatar.filled {
        background: var(--blue-500);
        color: #fff;
      }
      .team-count {
        font-size: 13.5px;
        font-weight: 600;
        color: var(--gray-600);
      }
      .progress-bar {
        height: 8px;
        background: var(--gray-100);
        border-radius: var(--radius-full);
        overflow: hidden;
      }
      .progress-fill {
        height: 100%;
        background: linear-gradient(90deg, var(--blue-500), var(--sky-500));
        border-radius: var(--radius-full);
      }
      .seek-block {
        font-size: 14.5px;
        color: var(--gray-700);
        line-height: 1.6;
        background: var(--blue-50);
        padding: 14px 16px;
        border-radius: var(--radius-md);
        border: 1px solid var(--blue-100);
      }
      .detail-actions {
        display: flex;
        justify-content: flex-end;
        gap: 10px;
        margin-top: 24px;
        padding-top: 20px;
        border-top: 1px solid var(--gray-100);
      }
    `,
  ],
})
export class DetailModalsComponent {
  modal = inject(ModalService);

  closeProject(e: Event) {
    if (e.target === e.currentTarget) this.modal.closeProjectDetail();
  }
  closeCollab(e: Event) {
    if (e.target === e.currentTarget) this.modal.closeCollaboratorDetail();
  }

  teamSlots(project: Project): number[] {
    return Array.from({ length: project.maxCollaborators }, (_, i) => i);
  }

  levelClass(level: string): string {
    if (level === "Principiante") return "level-principiante";
    if (level === "Intermedio") return "level-intermedio";
    return "level-principiante-intermedio";
  }
}
