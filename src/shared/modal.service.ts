import { Injectable, signal } from "@angular/core";
import { Project, Collaborator } from "../data/models";

export type PublishType = "project" | "collaborator";

@Injectable({ providedIn: "root" })
export class ModalService {
  readonly publishOpen = signal(false);
  readonly publishType = signal<PublishType>("project");
  readonly activeProject = signal<Project | null>(null);
  readonly activeCollaborator = signal<Collaborator | null>(null);

  openPublish(type: PublishType = "project") {
    this.publishType.set(type);
    this.publishOpen.set(true);
  }

  closePublish() {
    this.publishOpen.set(false);
  }

  openProjectDetail(project: Project) {
    this.activeProject.set(project);
  }

  closeProjectDetail() {
    this.activeProject.set(null);
  }

  openCollaboratorDetail(collaborator: Collaborator) {
    this.activeCollaborator.set(collaborator);
  }

  closeCollaboratorDetail() {
    this.activeCollaborator.set(null);
  }
}
