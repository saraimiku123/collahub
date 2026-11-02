import { Component, HostListener, signal, inject } from "@angular/core";
import { IconComponent } from "../shared/icon.component";
import { ModalService } from "../shared/modal.service";

interface NavLink {
  label: string;
  href: string;
}

@Component({
  selector: "app-navbar",
  imports: [IconComponent],
  template: `
    <header class="nav" [class.nav-scrolled]="scrolled()">
      <div class="nav-inner container">
        <a href="#inicio" class="logo" (click)="closeMenu()">
          <span class="logo-mark">
            <app-icon name="layers" [size]="20" />
          </span>
          <span class="logo-text">CollabHub</span>
        </a>

        <nav class="nav-links" [attr.aria-hidden]="!menuOpen()" aria-label="Navegación principal">
          @for (link of links; track link.href) {
            <a [href]="link.href" (click)="closeMenu()">{{ link.label }}</a>
          }
        </nav>

        <button
          class="nav-toggle"
          type="button"
          [attr.aria-expanded]="menuOpen()"
          aria-label="Abrir menú"
          (click)="toggleMenu()"
        >
          @if (!menuOpen()) {
            <app-icon name="menu" [size]="24" />
          } @else {
            <app-icon name="x" [size]="24" />
          }
        </button>
      </div>

      @if (menuOpen()) {
        <div class="nav-mobile">
          <nav aria-label="Navegación móvil">
            @for (link of links; track link.href) {
              <a [href]="link.href" (click)="closeMenu()">{{ link.label }}</a>
            }
          </nav>
          <div class="nav-mobile-actions">
            <button class="btn btn-secondary" type="button">Iniciar sesión</button>
            <button class="btn btn-primary" type="button" (click)="openPublishMobile()">
              <app-icon name="plus" [size]="18" />
              Publicar
            </button>
          </div>
        </div>
      }
    </header>
  `,
  styles: [
    `
      .nav {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 90;
        height: var(--nav-height);
        background: rgba(255, 255, 255, 0.7);
        backdrop-filter: blur(12px);
        border-bottom: 1px solid transparent;
        transition: all 0.3s var(--ease);
      }
      .nav-scrolled {
        background: rgba(255, 255, 255, 0.92);
        border-bottom-color: var(--gray-200);
        box-shadow: var(--shadow-sm);
      }
      .nav-inner {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 16px;
      }
      .logo {
        display: flex;
        align-items: center;
        gap: 10px;
        font-family: var(--font-heading);
        font-weight: 800;
        font-size: 20px;
        color: var(--gray-900);
        letter-spacing: -0.03em;
        flex-shrink: 0;
      }
      .logo-mark {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 36px;
        height: 36px;
        border-radius: var(--radius-md);
        background: linear-gradient(135deg, var(--blue-600), var(--blue-500));
        color: #fff;
        box-shadow: var(--shadow-violet);
      }
      .logo-text {
        background: linear-gradient(135deg, var(--blue-700), var(--blue-500));
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
      }
      .nav-links {
        display: flex;
        align-items: center;
        gap: 2px;
        flex: 1;
        justify-content: center;
      }
      .nav-links a {
        padding: 8px 14px;
        font-size: 14.5px;
        font-weight: 500;
        color: var(--gray-600);
        border-radius: var(--radius-md);
        transition: all 0.2s var(--ease);
        white-space: nowrap;
      }
      .nav-links a:hover {
        color: var(--blue-700);
        background: var(--blue-50);
      }
      .nav-actions {
        display: flex;
        align-items: center;
        gap: 10px;
        flex-shrink: 0;
      }
      .nav-login {
        padding: 9px 16px;
      }
      .nav-publish {
        padding: 9px 16px;
      }
      .nav-toggle {
        display: none;
        align-items: center;
        justify-content: center;
        width: 44px;
        height: 44px;
        border-radius: var(--radius-md);
        color: var(--gray-800);
        transition: background 0.2s;
        flex-shrink: 0;
      }
      .nav-toggle:hover {
        background: var(--gray-100);
      }
      .nav-mobile {
        display: none;
        flex-direction: column;
        padding: 12px 20px 24px;
        background: #fff;
        border-bottom: 1px solid var(--gray-200);
        box-shadow: var(--shadow-md);
        animation: slideDown 0.25s var(--ease);
      }
      @keyframes slideDown {
        from {
          opacity: 0;
          transform: translateY(-8px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      .nav-mobile nav {
        display: flex;
        flex-direction: column;
        gap: 2px;
      }
      .nav-mobile nav a {
        padding: 14px 16px;
        font-size: 16px;
        font-weight: 500;
        color: var(--gray-700);
        border-radius: var(--radius-md);
      }
      .nav-mobile nav a:hover {
        background: var(--blue-50);
        color: var(--blue-700);
      }
      .nav-mobile-actions {
        display: flex;
        gap: 10px;
        margin-top: 16px;
      }
      .nav-mobile-actions button {
        flex: 1;
      }

      @media (max-width: 920px) {
        .nav-links,
        .nav-actions {
          display: none;
        }
        .nav-toggle {
          display: flex;
        }
        .nav-mobile {
          display: flex;
        }
      }
    `,
  ],
})
export class NavbarComponent {
  private modal = inject(ModalService);
  scrolled = signal(false);
  menuOpen = signal(false);

  links: NavLink[] = [
    { label: "Inicio", href: "#inicio" },
    { label: "Explorar proyectos", href: "#explorar-proyectos" },
    { label: "Busco colaborar", href: "#busco-colaborar" },
    { label: "Cómo funciona", href: "#como-funciona" },
  ];

  @HostListener("window:scroll")
  onScroll() {
    this.scrolled.set(window.scrollY > 20);
  }

  toggleMenu() {
    this.menuOpen.set(!this.menuOpen());
  }

  closeMenu() {
    this.menuOpen.set(false);
  }

  openPublish() {
    this.menuOpen.set(false);
    this.modal.openPublish("project");
  }

  openPublishMobile() {
    this.closeMenu();
    this.modal.openPublish("project");
  }
}
