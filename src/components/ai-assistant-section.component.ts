import { Component } from "@angular/core";
import { IconComponent } from "../shared/icon.component";

@Component({
  selector: "app-ai-assistant",
  imports: [IconComponent],
  template: `
    <section class="section ai-section">
      <div class="container">
        <div class="ai-card">
          <div class="ai-content">
            <span class="ai-badge">
              <app-icon name="sparkles" [size]="14" />
              Próximamente
            </span>
            <h2>De una idea a un proyecto con ayuda de IA</h2>
            <p>
              Transforma una idea inicial en una propuesta más clara, identifica las habilidades
              que necesitas y descubre qué perfiles podrían ayudarte a desarrollarla.
            </p>
            <button class="btn btn-primary btn-lg" type="button">
              <app-icon name="sparkles" [size]="18" />
              Descubrir cómo funciona
            </button>
            <p class="ai-note">
              <app-icon name="info" [size]="14" />
              Función visual de demostración. La integración con IA aún no está disponible.
            </p>
          </div>

          <div class="ai-visual" aria-hidden="true">
            <div class="ai-window">
              <div class="ai-window-bar">
                <span class="dot red"></span>
                <span class="dot yellow"></span>
                <span class="dot green"></span>
                <span class="ai-title">Asistente CollabHub</span>
              </div>
              <div class="ai-body">
                <div class="ai-message ai-user">
                  <span class="ai-avatar ai-user-avatar">Tú</span>
                  <div class="ai-bubble ai-user-bubble">
                    Quiero crear una app para organizar tareas de estudio en equipo.
                  </div>
                </div>
                <div class="ai-message ai-bot">
                  <span class="ai-avatar ai-bot-avatar">
                    <app-icon name="sparkles" [size]="16" />
                  </span>
                  <div class="ai-bubble ai-bot-bubble">
                    <strong>¡Buena idea!</strong> Aquí tienes una propuesta inicial:
                    <ul>
                      <li>
                        <app-icon name="check" [size]="14" />
                        <span>Plataforma de gestión de tareas colaborativas</span>
                      </li>
                      <li>
                        <app-icon name="check" [size]="14" />
                        <span>Tecnologías sugeridas: Angular, Spring Boot, PostgreSQL</span>
                      </li>
                      <li>
                        <app-icon name="check" [size]="14" />
                        <span>Perfiles recomendados: 1 backend, 1 frontend, 1 diseño UX</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="ai-input-area">
                  <span class="ai-input-placeholder">
                    Escribe tu idea...
                  </span>
                  <span class="ai-send">
                    <app-icon name="send" [size]="16" />
                  </span>
                </div>
              </div>
            </div>
            <div class="ai-glow"></div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .ai-section {
        background: #fff;
      }
      .ai-card {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 56px;
        align-items: center;
        background: linear-gradient(135deg, var(--blue-600), var(--sky-500));
        border-radius: var(--radius-xl);
        padding: 56px;
        position: relative;
        overflow: hidden;
      }
      .ai-card::before {
        content: "";
        position: absolute;
        top: -60px;
        right: -60px;
        width: 280px;
        height: 280px;
        background: radial-gradient(circle, rgba(255, 255, 255, 0.15), transparent 70%);
        border-radius: 50%;
      }
      .ai-content {
        position: relative;
        z-index: 1;
        color: #fff;
      }
      .ai-badge {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 6px 14px;
        border-radius: var(--radius-full);
        background: rgba(255, 255, 255, 0.2);
        border: 1px solid rgba(255, 255, 255, 0.3);
        color: #fff;
        font-size: 13px;
        font-weight: 600;
        margin-bottom: 20px;
      }
      .ai-content h2 {
        color: #fff;
        font-size: clamp(26px, 3.5vw, 34px);
        margin-bottom: 16px;
      }
      .ai-content > p {
        color: rgba(255, 255, 255, 0.85);
        font-size: 16px;
        line-height: 1.65;
        margin-bottom: 28px;
      }
      .ai-content .btn-primary {
        background: #fff;
        color: var(--blue-700);
      }
      .ai-content .btn-primary:hover {
        background: var(--blue-50);
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
      }
      .ai-note {
        display: flex;
        align-items: center;
        gap: 6px;
        margin-top: 18px;
        font-size: 13px;
        color: rgba(255, 255, 255, 0.7);
      }

      /* Visual */
      .ai-visual {
        position: relative;
        z-index: 1;
      }
      .ai-glow {
        position: absolute;
        inset: -20px;
        background: radial-gradient(circle, rgba(255, 255, 255, 0.2), transparent 60%);
        filter: blur(20px);
        z-index: -1;
      }
      .ai-window {
        background: #fff;
        border-radius: var(--radius-lg);
        box-shadow: 0 24px 60px rgba(0, 0, 0, 0.25);
        overflow: hidden;
        animation: floatY 5s ease-in-out infinite;
      }
      .ai-window-bar {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 12px 16px;
        background: var(--gray-50);
        border-bottom: 1px solid var(--gray-200);
      }
      .dot {
        width: 11px;
        height: 11px;
        border-radius: 50%;
      }
      .dot.red { background: #ff5f57; }
      .dot.yellow { background: #febc2e; }
      .dot.green { background: #28c840; }
      .ai-title {
        margin-left: 8px;
        font-size: 13px;
        font-weight: 600;
        color: var(--gray-500);
      }
      .ai-body {
        padding: 20px;
        display: flex;
        flex-direction: column;
        gap: 14px;
      }
      .ai-message {
        display: flex;
        gap: 10px;
        align-items: flex-start;
      }
      .ai-avatar {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        font-weight: 700;
        flex-shrink: 0;
      }
      .ai-user-avatar {
        background: var(--gray-300);
        color: var(--gray-700);
      }
      .ai-bot-avatar {
        background: linear-gradient(135deg, var(--blue-500), var(--sky-400));
        color: #fff;
      }
      .ai-bubble {
        padding: 12px 16px;
        border-radius: var(--radius-md);
        font-size: 14px;
        line-height: 1.55;
        max-width: 92%;
      }
      .ai-user-bubble {
        background: var(--gray-100);
        color: var(--gray-700);
      }
      .ai-bot-bubble {
        background: var(--blue-50);
        color: var(--gray-800);
        border: 1px solid var(--blue-100);
      }
      .ai-bot-bubble strong {
        color: var(--blue-700);
        display: block;
        margin-bottom: 8px;
      }
      .ai-bot-bubble ul {
        display: flex;
        flex-direction: column;
        gap: 6px;
      }
      .ai-bot-bubble li {
        display: flex;
        align-items: center;
        gap: 7px;
        font-size: 13px;
        list-style: none;
      }
      .ai-bot-bubble li app-icon {
        color: var(--success);
        flex-shrink: 0;
      }
      .ai-input-area {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 12px 16px;
        background: var(--gray-100);
        border-radius: var(--radius-md);
      }
      .ai-input-placeholder {
        font-size: 13px;
        color: var(--gray-400);
      }
      .ai-send {
        display: flex;
        color: var(--blue-500);
      }
      @media (max-width: 880px) {
        .ai-card {
          grid-template-columns: 1fr;
          gap: 36px;
          padding: 36px;
        }
      }
      @media (max-width: 480px) {
        .ai-card {
          padding: 28px 20px;
        }
      }
    `,
  ],
})
export class AiAssistantSectionComponent {}
