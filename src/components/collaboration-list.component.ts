import { Component, inject } from "@angular/core";
import { IconComponent } from "../shared/icon.component";
import { ModalService } from "../shared/modal.service";
import { COLLABORATORS, Collaborator } from "../data/models";

@Component({
  selector: "app-collaboration-list",
  imports: [IconComponent],
  template: `
    <section id="busco-colaborar" class="section collab-section">
      <div class="container">
        <div class="section-header">
          <h2>Tú también puedes formar parte de algo grande</h2>
          <p>Comparte lo que sabes, descubre nuevas tecnologías y encuentra un equipo con el que puedas crecer</p>
        </div>

        <div class="collab-grid">
          @for (person of collaborators; track person.id) {
            <article class="collab-card">
              <!-- Foto en la parte superior -->
              <div class="collab-photo-wrap">
                <img
                  [src]="person.photo"
                  [alt]="person.name"
                  class="collab-photo"
                  loading="lazy"
                />
                <div class="collab-photo-overlay"></div>
              </div>

              <!-- Nombre debajo de la foto, con buen contraste -->
              <div class="collab-body">
                <div class="collab-name-block">
                  <span class="collab-avatar" [style.background]="person.avatarColor">
                    {{ person.name.charAt(0) }}
                  </span>
                  <div class="collab-name">
                    <h3>{{ person.name }}</h3>
                    <p>{{ person.role }}</p>
                  </div>
                </div>

                <p class="collab-bio">{{ person.bio }}</p>

                <div class="collab-section-block">
                  <span class="block-label">
                    <app-icon name="check-circle" [size]="15" />
                    Sabe
                  </span>
                  <div class="tag-row">
                    @for (tech of person.knows; track tech) {
                      <span class="chip chip-blue">{{ tech }}</span>
                    }
                  </div>
                </div>

                <div class="collab-section-block">
                  <span class="block-label">
                    <app-icon name="trending-up" [size]="15" />
                    Quiere aprender
                  </span>
                  <div class="tag-row">
                    @for (tech of person.wantsToLearn; track tech) {
                      <span class="chip chip-sky">{{ tech }}</span>
                    }
                  </div>
                </div>

                <div class="collab-section-block">
                  <span class="block-label">
                    <app-icon name="target" [size]="15" />
                    Busca
                  </span>
                  <p class="seek-text">{{ person.projectType }}</p>
                </div>

                <button class="btn btn-primary card-btn" type="button" (click)="viewProfile(person)">
                  Ver perfil
                  <app-icon name="arrow-right" [size]="18" />
                </button>
              </div>
            </article>
          }
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .collab-section {
        background: var(--gray-50);
      }
      .collab-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 24px;
      }
      .collab-card {
        background: #fff;
        border: 1px solid var(--gray-200);
        border-radius: var(--radius-lg);
        padding: 0;
        display: flex;
        flex-direction: column;
        transition: all 0.3s var(--ease);
        overflow: hidden;
      }
      .collab-card:hover {
        border-color: var(--blue-200);
        box-shadow: var(--shadow-lg);
        transform: translateY(-4px);
      }

      /* Foto en la parte superior */
      .collab-photo-wrap {
        position: relative;
        height: 200px;
        overflow: hidden;
      }
      .collab-photo {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center 25%;
        display: block;
        transition: transform 0.6s var(--ease-out);
      }
      .collab-card:hover .collab-photo {
        transform: scale(1.08);
      }
      .collab-photo-overlay {
        position: absolute;
        inset: 0;
        background: linear-gradient(180deg, transparent 60%, rgba(0, 0, 0, 0.12));
        pointer-events: none;
      }

      /* Cuerpo de la tarjeta */
      .collab-body {
        padding: 20px 24px 24px;
        display: flex;
        flex-direction: column;
        flex: 1;
      }

      /* Nombre debajo de la foto con avatar inicial */
      .collab-name-block {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 16px;
      }
      .collab-avatar {
        width: 48px;
        height: 48px;
        border-radius: var(--radius-md);
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        font-size: 20px;
        font-weight: 700;
        font-family: var(--font-heading);
        flex-shrink: 0;
        box-shadow: var(--shadow-sm);
      }
      .collab-name h3 {
        font-size: 17px;
        font-weight: 700;
        color: var(--gray-900);
        margin-bottom: 2px;
        line-height: 1.25;
      }
      .collab-name p {
        font-size: 13.5px;
        color: var(--gray-500);
      }

      .collab-bio {
        font-size: 14px;
        color: var(--gray-600);
        line-height: 1.6;
        margin-bottom: 18px;
        padding-bottom: 18px;
        border-bottom: 1px solid var(--gray-100);
      }
      .collab-section-block {
        margin-bottom: 14px;
      }
      .block-label {
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 12px;
        font-weight: 700;
        color: var(--gray-600);
        text-transform: uppercase;
        letter-spacing: 0.03em;
        margin-bottom: 8px;
      }
      .block-label app-icon {
        color: var(--blue-500);
      }
      .tag-row {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
      }
      .seek-text {
        font-size: 13.5px;
        color: var(--gray-700);
        line-height: 1.55;
        background: var(--blue-50);
        padding: 10px 12px;
        border-radius: var(--radius-md);
      }
      .card-btn {
        margin-top: auto;
        width: 100%;
      }

      @media (max-width: 980px) {
        .collab-grid {
          grid-template-columns: repeat(2, 1fr);
        }
      }
      @media (max-width: 640px) {
        .collab-grid {
          grid-template-columns: 1fr;
          max-width: 460px;
          margin: 0 auto;
        }
      }
    `,
  ],
})
export class CollaborationListComponent {
  private modal = inject(ModalService);
  collaborators = COLLABORATORS;

  viewProfile(person: Collaborator) {
    this.modal.openCollaboratorDetail(person);
  }

  openPublish() {
    this.modal.openPublish("collaborator");
  }
}
