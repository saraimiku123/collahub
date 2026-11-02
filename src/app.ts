import { Component } from "@angular/core";
import { NavbarComponent } from "./components/navbar.component";
import { HeroComponent } from "./components/hero.component";
import { ProjectListComponent } from "./components/project-list.component";
import { CollaborationListComponent } from "./components/collaboration-list.component";
import { HowItWorksComponent } from "./components/how-it-works.component";
import { AiAssistantSectionComponent } from "./components/ai-assistant-section.component";
import { BenefitsComponent } from "./components/benefits.component";
import { FooterComponent } from "./components/footer.component";
import { PublishModalComponent } from "./components/publish-modal.component";
import { DetailModalsComponent } from "./components/detail-modals.component";

@Component({
  selector: "app-root",
  imports: [
    NavbarComponent,
    HeroComponent,
    ProjectListComponent,
    CollaborationListComponent,
    HowItWorksComponent,
    AiAssistantSectionComponent,
    BenefitsComponent,
    FooterComponent,
    PublishModalComponent,
    DetailModalsComponent,
  ],
  template: `
    <app-navbar />
    <main>
      <app-hero />
      <app-project-list />
      <app-collaboration-list />
      <app-how-it-works />
      <app-ai-assistant />
      <app-benefits />
    </main>
    <app-footer />
    <app-publish-modal />
    <app-detail-modals />
  `,
})
export class App {}
