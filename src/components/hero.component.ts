import { Component, inject, signal } from "@angular/core";
import { IconComponent } from "../shared/icon.component";
import { ModalService } from "../shared/modal.service";

@Component({
  selector: "app-hero",
  imports: [IconComponent],
  template: `
    <section id="inicio" class="hero">
      <div class="hero-bg" aria-hidden="true">
        <span class="blob blob-1"></span>
        <span class="blob blob-2"></span>
        <span class="grid-pattern"></span>
      </div>

      <div class="container hero-grid">
        <div class="hero-content">
          <span class="hero-badge">
            <app-icon name="sparkles" [size]="14" />
            Comunidad para aprender creando
          </span>

          <h1>
            No necesitas tener experiencia<br />
            para empezar a crear
          </h1>

          <p class="hero-subtitle">
            Encuentra personas con tus mismos intereses, comparte tus ideas y
            colabora en proyectos que conviertan tus conocimientos en
            experiencia práctica.
          </p>

          <div class="hero-buttons">
            <a href="#explorar-proyectos" class="btn btn-primary btn-lg">
              Explorar proyectos
              <app-icon name="arrow-right" [size]="20" />
            </a>

            <button
              class="btn btn-secondary btn-lg"
              type="button"
              (click)="openPublish()"
            >
              <app-icon name="plus" [size]="20" />
              Compartir una idea
            </button>
          </div>

          <p class="hero-tagline">
            <app-icon name="zap" [size]="16" />
            Aprende colaborando. Construye algo real
          </p>
        </div>

        <!-- Composición visual -->
        <div class="hero-visual">
          <div class="visual-stage">
            <div
              class="hero-image-wrap"
              [class.tilted]="tilted()"
              (click)="toggleTilt()"
            >
              <img
                [src]="image()"
                alt="Equipo de desarrolladores colaborando"
                class="hero-img"
              />

              <div class="img-overlay"></div>

              <div class="img-badge">
                <app-icon name="users" [size]="14" />
                Colaboración en tiempo real
              </div>

              <!-- Tarjeta de proyecto -->
              <div class="float-card card-main">
                <div class="float-card-head">
                  <span class="fc-icon fc-primary">
                    <app-icon name="rocket" [size]="20" />
                  </span>

                  <span class="chip chip-blue">Proyecto</span>
                </div>

                <h3>Sistema de gestión de bibliotecas</h3>

                <p>
                  Aplicación para administrar libros, usuarios y préstamos.
                </p>

                <div class="fc-techs">
                  <span class="chip">Java</span>
                  <span class="chip">Spring Boot</span>
                  <span class="chip">Angular</span>
                </div>

                <div class="fc-foot">
                  <div class="fc-avatars">
                    <span
                      class="fc-avatar"
                      style="background: var(--blue-600)"
                    >
                      M
                    </span>

                    <span
                      class="fc-avatar"
                      style="background: var(--blue-400)"
                    >
                      C
                    </span>

                    <span class="fc-avatar fc-empty">+2</span>
                  </div>

                  <span class="fc-level level-principiante-intermedio">
                    Principiante-intermedio
                  </span>
                </div>
              </div>

              <!-- Tarjeta de personas -->
              <div class="float-card card-top">
                <div class="fc-mini">
                  <span class="fc-icon fc-blue">
                    <app-icon name="users" [size]="16" />
                  </span>

                  <div>
                    <strong>4 personas</strong>
                    <span>buscando equipo</span>
                  </div>
                </div>
              </div>

              <!-- Tarjeta de colaboradora -->
              <div class="float-card card-bottom">
                <div class="fc-collab">
                  <span
                    class="fc-avatar"
                    style="background: var(--sky-500)"
                  >
                    L
                  </span>

                  <div class="fc-collab-info">
                    <strong>Lucía Ramírez</strong>
                    <span>Desarrolladora backend</span>

                    <div class="fc-collab-tags">
                      <span class="chip chip-blue">Java</span>
                      <span class="chip chip-blue">SQL</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Píldoras flotantes -->
              <div class="float-pill pill-1">
                <app-icon name="check-circle" [size]="16" />
                Tarea completada
              </div>

              <div class="float-pill pill-2">
                <app-icon name="code" [size]="16" />
                Angular + TypeScript
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,

  styles: [
    `
      /* ===== Sección principal ===== */

      .hero {
        position: relative;
        padding: calc(var(--nav-height) + 60px) 0 80px;
        overflow: hidden;
        background: linear-gradient(180deg, var(--blue-50) 0%, #fff 60%);
      }

      .hero-bg {
        position: absolute;
        inset: 0;
        pointer-events: none;
        z-index: 0;
      }

      .blob {
        position: absolute;
        border-radius: 50%;
        filter: blur(80px);
        opacity: 0.4;
      }

      .blob-1 {
        width: 400px;
        height: 400px;
        background: var(--blue-300);
        top: -120px;
        right: -80px;
      }

      .blob-2 {
        width: 340px;
        height: 340px;
        background: var(--blue-200);
        bottom: -80px;
        left: -40px;
      }

      .grid-pattern {
        position: absolute;
        inset: 0;
        background-image: radial-gradient(
          circle,
          var(--gray-200) 1px,
          transparent 1px
        );
        background-size: 32px 32px;
        mask-image: linear-gradient(
          180deg,
          rgba(0, 0, 0, 0.4),
          transparent 70%
        );
        -webkit-mask-image: linear-gradient(
          180deg,
          rgba(0, 0, 0, 0.4),
          transparent 70%
        );
      }

      /* ===== Distribución del hero ===== */

      .hero-grid {
        position: relative;
        z-index: 1;
        display: grid;
        grid-template-columns: 1.05fr 0.95fr;
        gap: 48px;
        align-items: center;
      }

      .hero-content {
        min-width: 0;
        animation: fadeInUp 0.7s var(--ease-out);
      }

      .hero-badge {
        display: inline-flex;
        align-items: center;
        gap: 7px;
        padding: 6px 14px;
        border-radius: var(--radius-full);
        background: rgba(255, 255, 255, 0.8);
        border: 1px solid var(--blue-200);
        color: var(--blue-700);
        font-size: 13.5px;
        font-weight: 600;
        margin-bottom: 24px;
      }

      .hero-content h1 {
        font-size: clamp(28px, 5vw, 50px);
        font-weight: 800;
        line-height: 1.1;
        margin-bottom: 20px;
      }

      .hero-subtitle {
        font-size: clamp(15px, 2vw, 19px);
        color: var(--gray-600);
        max-width: 520px;
        line-height: 1.65;
        margin-bottom: 32px;
      }

      .hero-buttons {
        display: flex;
        flex-wrap: wrap;
        gap: 14px;
        margin-bottom: 24px;
      }

      .hero-tagline {
        display: inline-flex;
        align-items: center;
        gap: 7px;
        font-size: 15px;
        font-weight: 500;
        color: var(--blue-600);
      }

      .hero-tagline app-icon {
        color: var(--blue-400);
      }

      /* ===== Composición visual ===== */

      .hero-visual {
        width: 100%;
        min-width: 0;
        display: flex;
        justify-content: center;
        padding: 20px 0;
        animation: fadeInUp 0.9s var(--ease-out);
      }

      .visual-stage {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        max-width: 520px;
        min-height: 460px;
      }

      /* ===== Imagen central ===== */

      .hero-image-wrap {
        position: relative;
        width: 300px;
        max-width: 100%;
        height: 380px;
        margin: 0 auto;
        border: 4px solid #fff;
        border-radius: var(--radius-xl);
        box-shadow: var(--shadow-xl);
        cursor: pointer;
        overflow: visible;
        z-index: 2;
        transition:
          transform 0.4s var(--ease-out),
          box-shadow 0.4s var(--ease);
      }

      .hero-image-wrap:hover {
        transform: scale(1.02) translateY(-4px);
        box-shadow: 0 28px 64px rgba(37, 99, 235, 0.3);
      }

      .hero-image-wrap.tilted {
        transform: scale(1.03) rotate(-2deg);
      }

      .hero-img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
        border-radius: calc(var(--radius-xl) - 4px);
        transition: transform 0.6s var(--ease-out);
      }

      .hero-image-wrap:hover .hero-img {
        transform: scale(1.04);
      }

      .img-overlay {
        position: absolute;
        inset: 0;
        border-radius: calc(var(--radius-xl) - 4px);
        background: linear-gradient(
          180deg,
          transparent 50%,
          rgba(0, 0, 0, 0.35)
        );
        pointer-events: none;
      }

      .img-badge {
        position: absolute;
        bottom: 12px;
        left: 12px;
        display: flex;
        align-items: center;
        gap: 5px;
        padding: 5px 10px;
        border-radius: var(--radius-full);
        background: rgba(255, 255, 255, 0.9);
        backdrop-filter: blur(4px);
        font-size: 11.5px;
        font-weight: 600;
        color: var(--blue-700);
        z-index: 4;
      }

      /* ===== Tarjetas flotantes ===== */

      .float-card {
        position: absolute;
        background: #fff;
        border-radius: var(--radius-lg);
        box-shadow: var(--shadow-lg);
        border: 1px solid var(--gray-100);
        padding: 14px;
        z-index: 5;
      }

      /* Tarjeta de proyecto: lado izquierdo */

      .card-main {
        width: 190px;
        top: 15px;
        left: -100px;
        animation: floatY 5s ease-in-out infinite;
      }

      /* Tarjeta de personas: parte superior derecha */

      .card-top {
        top: 25px;
        right: -105px;
        padding: 10px 13px;
        animation: floatY 4s ease-in-out infinite 0.5s;
      }

      /* Tarjeta de colaboradora: parte inferior derecha */

      .card-bottom {
        width: 190px;
        bottom: 20px;
        right: -100px;
        animation: floatY 4.5s ease-in-out infinite 1s;
      }

      .float-card-head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
        margin-bottom: 10px;
      }

      .fc-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        border-radius: var(--radius-md);
      }

      .fc-primary {
        width: 32px;
        height: 32px;
        background: var(--blue-100);
        color: var(--blue-600);
      }

      .fc-blue {
        width: 28px;
        height: 28px;
        background: var(--blue-100);
        color: var(--blue-600);
      }

      .card-main h3 {
        font-size: 13.5px;
        font-weight: 700;
        margin-bottom: 4px;
      }

      .card-main p {
        font-size: 11.5px;
        color: var(--gray-500);
        margin-bottom: 10px;
        line-height: 1.4;
      }

      .fc-techs {
        display: flex;
        flex-wrap: wrap;
        gap: 4px;
        margin-bottom: 10px;
      }

      .fc-techs .chip {
        font-size: 10.5px;
        padding: 3px 8px;
      }

      .fc-foot {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 5px;
      }

      .fc-avatars {
        display: flex;
        flex-shrink: 0;
      }

      .fc-avatar {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        font-size: 10px;
        font-weight: 700;
        border: 2px solid #fff;
        margin-left: -7px;
        flex-shrink: 0;
      }

      .fc-avatar:first-child {
        margin-left: 0;
      }

      .fc-empty {
        background: var(--gray-200);
        color: var(--gray-600);
      }

      .fc-level {
        font-size: 9.5px;
        font-weight: 600;
        padding: 3px 7px;
        border-radius: var(--radius-full);
      }

      /* ===== Tarjeta de personas ===== */

      .fc-mini {
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .fc-mini strong {
        display: block;
        font-size: 12.5px;
        color: var(--gray-900);
      }

      .fc-mini div > span {
        display: block;
        font-size: 10.5px;
        color: var(--gray-500);
      }

      /* ===== Tarjeta de colaboradora ===== */

      .fc-collab {
        display: flex;
        gap: 8px;
        align-items: flex-start;
      }

      .fc-collab .fc-avatar {
        width: 32px;
        height: 32px;
        font-size: 13px;
        border: none;
        margin: 0;
      }

      .fc-collab-info {
        min-width: 0;
      }

      .fc-collab-info strong {
        display: block;
        font-size: 12px;
        color: var(--gray-900);
        margin-bottom: 1px;
      }

      .fc-collab-info > span {
        display: block;
        font-size: 10.5px;
        color: var(--gray-500);
      }

      .fc-collab-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 4px;
        margin-top: 5px;
      }

      .fc-collab-tags .chip {
        font-size: 9.5px;
        padding: 2px 7px;
      }

      /* ===== Píldoras flotantes ===== */

      .float-pill {
        position: absolute;
        display: flex;
        align-items: center;
        gap: 6px;
        padding: 7px 11px;
        background: #fff;
        border: 1px solid var(--gray-100);
        border-radius: var(--radius-full);
        box-shadow: var(--shadow-md);
        font-size: 11.5px;
        font-weight: 600;
        color: var(--gray-700);
        white-space: nowrap;
        z-index: 6;
      }

      .pill-1 {
        /* Se coloca debajo de la tarjeta del proyecto para no tapar los avatares */
        bottom: 55px;
        left: -65px;
        color: var(--success);
        animation: floatY 3.5s ease-in-out infinite 1.5s;
      }

      .pill-2 {
        /* Se sube para que no tape la tarjeta de la colaboradora */
        bottom: 135px;
        right: -70px;
        color: var(--blue-600);
        animation: floatY 4s ease-in-out infinite 0.8s;
      }

      /* ===== Tablet horizontal ===== */

      @media (max-width: 1100px) {
        .hero-grid {
          gap: 30px;
        }

        .visual-stage {
          max-width: 460px;
        }

        .hero-image-wrap {
          width: 260px;
          height: 330px;
        }

        .card-main {
          left: -55px;
        }

        .card-top {
          right: -55px;
        }

        .card-bottom {
          right: -55px;
        }

        .pill-1 {
          left: -30px;
        }

        .pill-2 {
          right: -30px;
        }
      }

      /* ===== Tablet vertical ===== */

      @media (max-width: 920px) {
        .hero-grid {
          grid-template-columns: 1fr;
          gap: 40px;
        }

        .hero-content {
          text-align: center;
        }

        .hero-badge,
        .hero-tagline {
          justify-content: center;
        }

        .hero-buttons {
          justify-content: center;
        }

        .hero-subtitle {
          margin-left: auto;
          margin-right: auto;
        }

        .visual-stage {
          max-width: 520px;
        }

        .hero-image-wrap {
          width: 280px;
          height: 350px;
        }

        .card-main {
          left: 0;
        }

        .card-top {
          right: 0;
        }

        .card-bottom {
          right: 0;
        }

        .pill-1 {
          left: 10px;
        }

        .pill-2 {
          right: 10px;
        }
      }

      /* ===== Móviles ===== */

      @media (max-width: 768px) {
        .hero {
          padding-top: calc(var(--nav-height) + 35px);
          padding-bottom: 50px;
        }

        .visual-stage {
          min-height: auto;
          padding: 15px 0;
        }

        .hero-image-wrap {
          width: 240px;
          max-width: 85%;
          height: 300px;
        }

        .card-main,
        .card-top,
        .card-bottom,
        .pill-1,
        .pill-2 {
          display: none;
        }
      }

      @media (max-width: 520px) {
        .hero-image-wrap {
          width: 200px;
          height: 260px;
        }

        .hero-buttons {
          flex-direction: column;
          align-items: stretch;
        }

        .hero-buttons .btn {
          justify-content: center;
        }

        .hero-content h1 {
          font-size: clamp(27px, 7vw, 36px);
        }
      }

      @media (max-width: 380px) {
        .hero-image-wrap {
          width: 170px;
          height: 220px;
        }

        .hero-badge {
          font-size: 12px;
        }

        .hero-subtitle {
          font-size: 14px;
        }
      }
    `,
  ],
})
export class HeroComponent {
  private modal = inject(ModalService);

  tilted = signal(false);

  image = signal(
    "https://images.pexels.com/photos/3182805/pexels-photo-3182805.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
  );

  toggleTilt() {
    this.tilted.set(!this.tilted());
  }

  openPublish() {
    this.modal.openPublish("project");
  }
}