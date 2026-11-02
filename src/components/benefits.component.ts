import { Component } from "@angular/core";
import { IconComponent } from "../shared/icon.component";
import { BENEFITS } from "../data/models";

@Component({
  selector: "app-benefits",
  imports: [IconComponent],
  template: `
    <section class="section benefits-section">
      <div class="container">
        <div class="section-header">
          <h2>Por qué unirte a CollabHub</h2>
          <p>Cuatro beneficios que te acompañan desde tu primera colaboración</p>
        </div>

        <div class="benefits-grid">
          @for (benefit of benefits; track benefit.id) {
            <article class="benefit-card">
              <div class="benefit-photo-wrap">
                <img
                  [src]="benefit.photo"
                  [alt]="benefit.title"
                  class="benefit-photo"
                  loading="lazy"
                />
                <div class="benefit-photo-overlay"></div>
                <div class="benefit-icon">
                  <app-icon [name]="benefit.icon" [size]="24" />
                </div>
              </div>
              <div class="benefit-body">
                <h3>{{ benefit.title }}</h3>
                <p>{{ benefit.description }}</p>
              </div>
            </article>
          }
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .benefits-section {
        background: var(--gray-50);
      }
      .benefits-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 24px;
      }
      .benefit-card {
        background: #fff;
        border: 1px solid var(--gray-200);
        border-radius: var(--radius-lg);
        overflow: hidden;
        display: flex;
        flex-direction: column;
        transition: all 0.3s var(--ease);
      }
      .benefit-card:hover {
        border-color: var(--blue-200);
        box-shadow: var(--shadow-lg);
        transform: translateY(-6px);
      }

      /* Imagen interactiva */
      .benefit-photo-wrap {
        position: relative;
        height: 160px;
        overflow: hidden;
      }
      .benefit-photo {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
        display: block;
        transition: transform 0.6s var(--ease-out);
      }
      .benefit-card:hover .benefit-photo {
        transform: scale(1.12);
      }
      .benefit-photo-overlay {
        position: absolute;
        inset: 0;
        background: linear-gradient(180deg, rgba(29, 78, 216, 0.1) 0%, rgba(29, 78, 216, 0.55) 100%);
        transition: background 0.3s var(--ease);
      }
      .benefit-card:hover .benefit-photo-overlay {
        background: linear-gradient(180deg, rgba(29, 78, 216, 0.2) 0%, rgba(29, 78, 216, 0.7) 100%);
      }
      .benefit-icon {
        position: absolute;
        bottom: -24px;
        left: 24px;
        width: 56px;
        height: 56px;
        border-radius: var(--radius-md);
        background: var(--blue-100);
        color: var(--blue-600);
        display: flex;
        align-items: center;
        justify-content: center;
        border: 3px solid #fff;
        box-shadow: var(--shadow-sm);
        transition: all 0.3s var(--ease);
        z-index: 2;
      }
      .benefit-card:hover .benefit-icon {
        background: var(--blue-600);
        color: #fff;
        transform: scale(1.1);
      }
      .benefit-body {
        padding: 36px 24px 28px;
        text-align: center;
      }
      .benefit-card h3 {
        font-size: 17px;
        margin-bottom: 10px;
      }
      .benefit-card p {
        font-size: 14px;
        color: var(--gray-500);
        line-height: 1.6;
      }
      @media (max-width: 880px) {
        .benefits-grid {
          grid-template-columns: repeat(2, 1fr);
        }
      }
      @media (max-width: 480px) {
        .benefits-grid {
          grid-template-columns: 1fr;
        }
      }
    `,
  ],
})
export class BenefitsComponent {
  benefits = BENEFITS;
}
