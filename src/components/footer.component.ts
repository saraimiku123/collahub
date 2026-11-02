import { Component } from "@angular/core";
import { IconComponent, IconName } from "../shared/icon.component";

interface FooterLink {
  label: string;
  href: string;
}

@Component({
  selector: "app-footer",
  imports: [IconComponent],
  template: `
    <footer class="footer">
      <div class="container">
        <div class="footer-grid">
          <div class="footer-brand">
            <a href="#inicio" class="logo">
              <span class="logo-mark">
                <app-icon name="layers" [size]="20" />
              </span>
              <span class="logo-text">CollaHub</span>
            </a>
            <p class="footer-desc">
              Una comunidad donde estudiantes, recién egresados y entusiastas de la tecnología
              colaboran en proyectos reales para aprender creando.
            </p>
           
          </div>

          <div class="footer-col">
            <h4>Navegación</h4>
            @for (link of navLinks; track link.href) {
              <a [href]="link.href">{{ link.label }}</a>
            }
          </div>

          <div class="footer-col">
            <h4>Comunidad</h4>
            <a href="#normas">Normas de la comunidad</a>
            <a href="#explorar-proyectos">Explorar proyectos</a>
            <a href="#busco-colaborar">Busco colaborar</a>
          </div>

          <div class="footer-col">
            <h4>Contacto</h4>
            <a href="#" class="footer-contact">
              <app-icon name="mail" [size]="16" />
              Contacto
            </a>
            <a href="#" class="footer-contact">
              <app-icon name="message-square" [size]="16" />
              Soporte
            </a>
          </div>
        </div>

        <div class="footer-bottom">
          <p>© 2026 CollaHub. Todos los derechos reservados.</p>
        
        </div>
      </div>
    </footer>
  `,
  styles: [
    `
      .footer {
        background: var(--gray-900);
        color: var(--gray-400);
        padding: 64px 0 32px;
      }
      .footer-grid {
        display: grid;
        grid-template-columns: 2fr 1fr 1fr 1fr;
        gap: 40px;
        padding-bottom: 40px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      }
      .footer-brand .logo {
        display: flex;
        align-items: center;
        gap: 10px;
        font-family: var(--font-heading);
        font-weight: 800;
        font-size: 20px;
        color: #fff;
        margin-bottom: 16px;
      }
      .logo-mark {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 36px;
        height: 36px;
        border-radius: var(--radius-md);
        background: linear-gradient(135deg, var(--blue-500), var(--sky-500));
        color: #fff;
      }
      .logo-text {
        background: linear-gradient(135deg, var(--blue-300), var(--sky-300));
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
      }
      .footer-desc {
        font-size: 14px;
        line-height: 1.65;
        max-width: 360px;
        margin-bottom: 20px;
      }
      .footer-social {
        display: flex;
        gap: 10px;
      }
      .social-link {
        width: 40px;
        height: 40px;
        border-radius: var(--radius-md);
        background: rgba(255, 255, 255, 0.06);
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--gray-400);
        transition: all 0.25s var(--ease);
      }
      .social-link:hover {
        background: var(--blue-600);
        color: #fff;
        transform: translateY(-2px);
      }
      .footer-col h4 {
        color: #fff;
        font-size: 15px;
        font-weight: 700;
        margin-bottom: 16px;
      }
      .footer-col a {
        display: block;
        font-size: 14px;
        color: var(--gray-400);
        padding: 6px 0;
        transition: color 0.2s;
      }
      .footer-col a:hover {
        color: var(--blue-300);
      }
      .footer-contact {
        display: flex !important;
        align-items: center;
        gap: 8px;
      }
      .footer-bottom {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-top: 28px;
        flex-wrap: wrap;
        gap: 12px;
      }
      .footer-bottom p {
        font-size: 13.5px;
        color: var(--gray-500);
      }
      .footer-bottom-links {
        display: flex;
        gap: 20px;
      }
      .footer-bottom-links a {
        font-size: 13.5px;
        color: var(--gray-400);
        transition: color 0.2s;
      }
      .footer-bottom-links a:hover {
        color: var(--blue-300);
      }
      @media (max-width: 768px) {
        .footer-grid {
          grid-template-columns: 1fr 1fr;
          gap: 32px;
        }
        .footer-brand {
          grid-column: 1 / -1;
        }
      }
      @media (max-width: 480px) {
        .footer-grid {
          grid-template-columns: 1fr;
        }
        .footer-bottom {
          flex-direction: column;
          text-align: center;
        }
      }
    `,
  ],
})
export class FooterComponent {
  navLinks: FooterLink[] = [
    { label: "Inicio", href: "#inicio" },
    { label: "Explorar proyectos", href: "#explorar-proyectos" },
    { label: "Cómo funciona", href: "#como-funciona" },
  ];

  socials: { name: string; label: string; icon: IconName }[] = [
    { name: "github", label: "GitHub", icon: "github" },
    { name: "linkedin", label: "LinkedIn", icon: "linkedin" },
    { name: "twitter", label: "Twitter", icon: "twitter" },
  ];
}
