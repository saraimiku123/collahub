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

   /* =========================================
   CORRECCIÓN: TARJETAS SEPARADAS DE LA FOTO
========================================= */

/* Distribución general */
.visual-stage {
  position: relative;
  width: 100%;
  max-width: 620px;
  min-height: 500px;
  margin: 0 auto;
  overflow: visible;
}

/* Fotografía del chico de amarillo */
.hero-image-wrap {
  position: relative;
  width: 250px;
  height: 340px;
  margin: 0 auto;
  z-index: 2;
  overflow: visible;
}

/* Tarjeta del proyecto: izquierda */
.card-main {
  position: absolute;
  width: 190px;
  top: 15px;
  left: -210px;
  z-index: 5;
}

/* Tarjeta de personas: derecha superior */
.card-top {
  position: absolute;
  top: 25px;
  right: -210px;
  z-index: 5;
}

/* Tarjeta de colaboradora: derecha inferior */
.card-bottom {
  position: absolute;
  width: 190px;
  bottom: 20px;
  right: -210px;
  z-index: 5;
}

/* Tarea completada: lado izquierdo inferior */
.pill-1 {
  position: absolute;
  bottom: 55px;
  left: -210px;
  z-index: 6;
}

/* Angular + TypeScript: lado derecho */
.pill-2 {
  position: absolute;
  bottom: 135px;
  right: -210px;
  z-index: 6;
}

/* =========================================
   TABLETAS
========================================= */

@media (max-width: 920px) {
  .visual-stage {
    max-width: 100%;
    min-height: 380px;
  }

  .hero-image-wrap {
    width: 250px;
    height: 320px;
  }

  .card-main,
  .card-top,
  .card-bottom,
  .pill-1,
  .pill-2 {
    display: none;
  }
}

/* =========================================
   MÓVILES
========================================= */

@media (max-width: 768px) {
  .visual-stage {
    min-height: auto;
    padding: 20px 0;
  }

  .hero-image-wrap {
    width: 240px;
    max-width: 85%;
    height: 300px;
  }
}

@media (max-width: 520px) {
  .hero-image-wrap {
    width: 200px;
    height: 260px;
  }
}

@media (max-width: 380px) {
  .hero-image-wrap {
    width: 170px;
    height: 220px;
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