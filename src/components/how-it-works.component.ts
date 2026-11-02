import { Component } from "@angular/core";
import { IconComponent, IconName } from "../shared/icon.component";
import { STEPS } from "../data/models";

@Component({
  selector: "app-how-it-works",
  imports: [IconComponent],
  template: `
    <section id="como-funciona" class="section">
      <div class="container">
        <div class="section-header">
          <h2>¿Cómo funciona?</h2>
          <p>Cuatro pasos para pasar de una idea a un proyecto real con tu equipo</p>
        </div>

        <div class="steps-grid">
          <div class="steps-line" aria-hidden="true"></div>
          @for (step of steps; track step.id) {
            <article class="step">
              <div class="step-number">{{ step.id }}</div>
              <div class="step-icon">
                <app-icon [name]="step.icon" [size]="26" />
              </div>
              <h3>{{ step.title }}</h3>
              <p>{{ step.description }}</p>
            </article>
          }
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .steps-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 28px;
        position: relative;
      }
      .steps-line {
        position: absolute;
        top: 32px;
        left: 12.5%;
        right: 12.5%;
        height: 2px;
        background: linear-gradient(90deg, var(--blue-200), var(--sky-200), var(--blue-200), var(--blue-200));
        z-index: 0;
      }
      .step {
        text-align: center;
        position: relative;
        z-index: 1;
      }
      .step-number {
        position: absolute;
        top: -8px;
        right: 50%;
        transform: translateX(48px);
        width: 28px;
        height: 28px;
        background: #fff;
        border: 2px solid var(--blue-200);
        color: var(--blue-700);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 13px;
        font-weight: 800;
        font-family: var(--font-heading);
      }
      .step-icon {
        width: 64px;
        height: 64px;
        margin: 0 auto 20px;
        border-radius: var(--radius-lg);
        background: linear-gradient(135deg, var(--blue-500), var(--sky-500));
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: var(--shadow-violet);
        transition: transform 0.3s var(--ease);
      }
      .step:hover .step-icon {
        transform: scale(1.08) rotate(-4deg);
      }
      .step h3 {
        font-size: 17px;
        margin-bottom: 10px;
      }
      .step p {
        font-size: 14.5px;
        color: var(--gray-500);
        line-height: 1.6;
      }
      @media (max-width: 880px) {
        .steps-grid {
          grid-template-columns: repeat(2, 1fr);
          gap: 36px;
        }
        .steps-line {
          display: none;
        }
      }
      @media (max-width: 480px) {
        .steps-grid {
          grid-template-columns: 1fr;
        }
      }
    `,
  ],
})
export class HowItWorksComponent {
  steps = STEPS;
}
