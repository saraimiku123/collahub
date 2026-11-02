import { Component, computed, inject, signal, effect } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { IconComponent } from "../shared/icon.component";
import { ModalService } from "../shared/modal.service";
import {
  nameValidator,
  textListValidator,
  noWhitespaceValidator,
  positiveNumberValidator,
} from "../shared/validators";

@Component({
  selector: "app-publish-modal",
  imports: [ReactiveFormsModule, IconComponent],
  template: `
    @if (modal.publishOpen()) {
      <div class="modal-backdrop" (click)="onBackdrop($event)">
        <div class="modal-panel publish-modal">
          <div class="modal-head">
            <div>
              <h2>{{ isProjectMode() ? "Proponer un proyecto" : "Busco colaborar" }}</h2>
              <p>
                {{
                  isProjectMode()
                    ? "Comparte tu idea y busca colaboradores para desarrollarla"
                    : "Cuénta qué sabes y qué tipo de proyecto buscas"
                }}
              </p>
            </div>
            <button class="close-btn" type="button" aria-label="Cerrar" (click)="modal.closePublish()">
              <app-icon name="x" [size]="20" />
            </button>
          </div>

          <!-- Tab toggle -->
          <div class="tab-toggle" role="tablist">
            <button
              type="button"
              role="tab"
              [class.active]="isProjectMode()"
              (click)="switchMode('project')"
            >
              <app-icon name="rocket" [size]="17" />
              Proponer un proyecto
            </button>
            <button
              type="button"
              role="tab"
              [class.active]="!isProjectMode()"
              (click)="switchMode('collaborator')"
            >
              <app-icon name="users" [size]="17" />
              Busco colaborar
            </button>
          </div>

          @if (submittedSuccess()) {
            <div class="success-state">
              <span class="success-icon">
                <app-icon name="check-circle" [size]="40" />
              </span>
              <h3>¡Publicación lista!</h3>
              <p>
                {{ successMessage() }}
              </p>
              <button class="btn btn-primary" type="button" (click)="close()">Entendido</button>
            </div>
          } @else {
            <form [formGroup]="form()" (ngSubmit)="submit()">
              @if (isProjectMode()) {
                <!-- Project fields -->
                <div class="field">
                  <label for="name">Nombre del proyecto <span class="req">*</span></label>
                  <input
                    id="name"
                    type="text"
                    formControlName="name"
                    placeholder="Ej. App de gestión de tareas"
                    maxlength="80"
                  />
                  @if (errorMsg('name')) {
                    <span class="error">{{ errorMsg('name') }}</span>
                  }
                </div>

                <div class="field">
                  <label for="description">Descripción <span class="req">*</span></label>
                  <textarea
                    id="description"
                    formControlName="description"
                    rows="3"
                    maxlength="500"
                    placeholder="Describe brevemente de qué trata el proyecto..."
                  ></textarea>
                  @if (errorMsg('description')) {
                    <span class="error">{{ errorMsg('description') }}</span>
                  }
                </div>

                <div class="field-row">
                  <div class="field">
                    <label for="technologies">Tecnologías <span class="req">*</span></label>
                    <input
                      id="technologies"
                      type="text"
                      formControlName="technologies"
                      maxlength="200"
                      placeholder="Java, Spring Boot, Angular..."
                    />
                    @if (errorMsg('technologies')) {
                      <span class="error">{{ errorMsg('technologies') }}</span>
                    }
                  </div>
                  <div class="field">
                    <label for="level">Nivel <span class="req">*</span></label>
                    <select id="level" formControlName="level">
                      <option value="">Selecciona...</option>
                      <option value="Principiante">Principiante</option>
                      <option value="Principiante-intermedio">Principiante-intermedio</option>
                      <option value="Intermedio">Intermedio</option>
                      <option value="Avanzado">Avanzado</option>
                    </select>
                    @if (errorMsg('level')) {
                      <span class="error">{{ errorMsg('level') }}</span>
                    }
                  </div>
                </div>

                <div class="field-row">
                  <div class="field">
                    <label for="rolesNeeded">Perfiles buscados <span class="req">*</span></label>
                    <input
                      id="rolesNeeded"
                      type="text"
                      formControlName="rolesNeeded"
                      maxlength="200"
                      placeholder="Backend, Frontend, Diseño..."
                    />
                    @if (errorMsg('rolesNeeded')) {
                      <span class="error">{{ errorMsg('rolesNeeded') }}</span>
                    }
                  </div>
                  <div class="field">
                    <label for="maxCollaborators">Plazas disponibles <span class="req">*</span></label>
                    <input
                      id="maxCollaborators"
                      type="number"
                      formControlName="maxCollaborators"
                      min="1"
                      max="20"
                      placeholder="4"
                    />
                    @if (errorMsg('maxCollaborators')) {
                      <span class="error">{{ errorMsg('maxCollaborators') }}</span>
                    }
                  </div>
                </div>
              } @else {
                <!-- Collaborator fields -->
                <div class="field">
                  <label for="collName">Tu nombre <span class="req">*</span></label>
                  <input
                    id="collName"
                    type="text"
                    formControlName="collName"
                    maxlength="60"
                    placeholder="Tu nombre completo"
                  />
                  @if (errorMsg('collName')) {
                    <span class="error">{{ errorMsg('collName') }}</span>
                  }
                </div>

                <div class="field">
                  <label for="collRole">Perfil profesional <span class="req">*</span></label>
                  <input
                    id="collRole"
                    type="text"
                    formControlName="collRole"
                    maxlength="60"
                    placeholder="Ej. Desarrollador backend"
                  />
                  @if (errorMsg('collRole')) {
                    <span class="error">{{ errorMsg('collRole') }}</span>
                  }
                </div>

                <div class="field-row">
                  <div class="field">
                    <label for="knows">Tecnologías que conoces <span class="req">*</span></label>
                    <input
                      id="knows"
                      type="text"
                      formControlName="knows"
                      maxlength="200"
                      placeholder="Java, SQL, Git..."
                    />
                    @if (errorMsg('knows')) {
                      <span class="error">{{ errorMsg('knows') }}</span>
                    }
                  </div>
                  <div class="field">
                    <label for="wantsToLearn">Qué quieres aprender <span class="req">*</span></label>
                    <input
                      id="wantsToLearn"
                      type="text"
                      formControlName="wantsToLearn"
                      maxlength="200"
                      placeholder="Spring Boot, Docker..."
                    />
                    @if (errorMsg('wantsToLearn')) {
                      <span class="error">{{ errorMsg('wantsToLearn') }}</span>
                    }
                  </div>
                </div>

                <div class="field">
                  <label for="projectType">Tipo de proyecto que buscas <span class="req">*</span></label>
                  <textarea
                    id="projectType"
                    formControlName="projectType"
                    rows="3"
                    maxlength="500"
                    placeholder="Describe el tipo de proyecto en el que te gustaría participar..."
                  ></textarea>
                  @if (errorMsg('projectType')) {
                    <span class="error">{{ errorMsg('projectType') }}</span>
                  }
                </div>
              }

              <div class="form-note">
                <app-icon name="info" [size]="14" />
                Esta es una demostración. La publicación no se guarda en un servidor.
              </div>

              <div class="form-actions">
                <button class="btn btn-ghost" type="button" (click)="modal.closePublish()">Cancelar</button>
                <button
                  class="btn btn-primary"
                  type="submit"
                  [disabled]="submitting() || form().invalid"
                >
                  @if (submitting()) {
                    <app-icon name="loader" [size]="18" />
                  }
                  {{ isProjectMode() ? "Publicar proyecto" : "Publicar perfil" }}
                </button>
              </div>
            </form>
          }
        </div>
      </div>
    }
  `,
  styles: [
    `
      .publish-modal {
        max-width: 560px;
      }
      .modal-head {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 16px;
        padding: 28px 28px 0;
      }
      .modal-head h2 {
        font-size: 22px;
        margin-bottom: 6px;
      }
      .modal-head p {
        font-size: 14.5px;
        color: var(--gray-500);
      }
      .close-btn {
        flex-shrink: 0;
        width: 40px;
        height: 40px;
        border-radius: var(--radius-md);
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--gray-500);
        transition: all 0.2s;
      }
      .close-btn:hover {
        background: var(--gray-100);
        color: var(--gray-800);
      }
      .tab-toggle {
        display: flex;
        gap: 6px;
        padding: 6px;
        margin: 20px 28px 0;
        background: var(--gray-100);
        border-radius: var(--radius-md);
      }
      .tab-toggle button {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 7px;
        padding: 10px 14px;
        border-radius: var(--radius-sm);
        font-size: 14px;
        font-weight: 600;
        color: var(--gray-600);
        transition: all 0.25s var(--ease);
      }
      .tab-toggle button.active {
        background: #fff;
        color: var(--blue-700);
        box-shadow: var(--shadow-sm);
      }
      form {
        padding: 24px 28px 28px;
        display: flex;
        flex-direction: column;
        gap: 18px;
      }
      .field {
        display: flex;
        flex-direction: column;
        gap: 7px;
      }
      .field-row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 16px;
      }
      label {
        font-size: 13.5px;
        font-weight: 600;
        color: var(--gray-700);
      }
      .req {
        color: var(--error);
      }
      input,
      textarea,
      select {
        padding: 12px 14px;
        border: 1.5px solid var(--gray-200);
        border-radius: var(--radius-md);
        font-size: 14.5px;
        color: var(--gray-800);
        background: #fff;
        transition: all 0.2s;
        width: 100%;
        font-family: inherit;
      }
      input:focus,
      textarea:focus,
      select:focus {
        outline: none;
        border-color: var(--blue-400);
        box-shadow: 0 0 0 3px var(--blue-100);
      }
      input.ng-invalid.ng-touched,
      textarea.ng-invalid.ng-touched,
      select.ng-invalid.ng-touched {
        border-color: var(--error);
        box-shadow: 0 0 0 3px var(--error-soft);
      }
      textarea {
        resize: vertical;
        min-height: 70px;
      }
      .error {
        font-size: 12.5px;
        color: var(--error);
        font-weight: 500;
        display: flex;
        align-items: center;
        gap: 4px;
      }
      .error::before {
        content: "⚠";
        font-size: 11px;
      }
      .form-note {
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 12.5px;
        color: var(--gray-400);
        padding: 10px 14px;
        background: var(--gray-50);
        border-radius: var(--radius-md);
      }
      .form-note app-icon {
        color: var(--gray-400);
      }
      .form-actions {
        display: flex;
        justify-content: flex-end;
        gap: 10px;
        margin-top: 4px;
      }
      .form-actions .btn:disabled {
        opacity: 0.5;
        cursor: not-allowed;
        transform: none !important;
      }
      .success-state {
        text-align: center;
        padding: 48px 28px 40px;
      }
      .success-icon {
        display: inline-flex;
        color: var(--success);
        margin-bottom: 16px;
      }
      .success-state h3 {
        font-size: 22px;
        margin-bottom: 10px;
      }
      .success-state p {
        font-size: 14.5px;
        color: var(--gray-500);
        margin-bottom: 24px;
        max-width: 360px;
        margin-left: auto;
        margin-right: auto;
        line-height: 1.6;
      }
      @media (max-width: 520px) {
        .field-row {
          grid-template-columns: 1fr;
        }
        .modal-head,
        .tab-toggle,
        form {
          padding-left: 20px;
          padding-right: 20px;
        }
        .tab-toggle {
          margin-left: 20px;
          margin-right: 20px;
        }
        .form-actions {
          flex-direction: column-reverse;
        }
        .form-actions .btn {
          width: 100%;
        }
      }
    `,
  ],
})
export class PublishModalComponent {
  modal = inject(ModalService);
  private fb = inject(FormBuilder);

  submitting = signal(false);
  submittedSuccess = signal(false);

  isProjectMode = computed(() => this.modal.publishType() === "project");

  private projectForm = this.fb.group({
    name: ["", [Validators.required, noWhitespaceValidator(), Validators.minLength(3), Validators.maxLength(80)]],
    description: ["", [Validators.required, noWhitespaceValidator(), Validators.minLength(20), Validators.maxLength(500)]],
    technologies: ["", [Validators.required, noWhitespaceValidator(), textListValidator(), Validators.maxLength(200)]],
    level: ["", [Validators.required]],
    rolesNeeded: ["", [Validators.required, noWhitespaceValidator(), textListValidator(), Validators.maxLength(200)]],
    maxCollaborators: [4, [Validators.required, positiveNumberValidator(), Validators.min(1), Validators.max(20)]],
  });

  private collaboratorForm = this.fb.group({
    collName: ["", [Validators.required, noWhitespaceValidator(), nameValidator(), Validators.minLength(2), Validators.maxLength(60)]],
    collRole: ["", [Validators.required, noWhitespaceValidator(), Validators.minLength(2), Validators.maxLength(60)]],
    knows: ["", [Validators.required, noWhitespaceValidator(), textListValidator(), Validators.maxLength(200)]],
    wantsToLearn: ["", [Validators.required, noWhitespaceValidator(), textListValidator(), Validators.maxLength(200)]],
    projectType: ["", [Validators.required, noWhitespaceValidator(), Validators.minLength(10), Validators.maxLength(500)]],
  });

  form = computed<FormGroup>(() =>
    this.isProjectMode() ? this.projectForm : this.collaboratorForm,
  );

  successMessage = signal("");

  constructor() {
    effect(() => {
      if (this.modal.publishOpen()) {
        this.submittedSuccess.set(false);
        this.projectForm.reset({
          name: "",
          description: "",
          technologies: "",
          level: "",
          rolesNeeded: "",
          maxCollaborators: 4,
        });
        this.collaboratorForm.reset({
          collName: "",
          collRole: "",
          knows: "",
          wantsToLearn: "",
          projectType: "",
        });
        this.projectForm.markAsPristine();
        this.projectForm.markAsUntouched();
        this.collaboratorForm.markAsPristine();
        this.collaboratorForm.markAsUntouched();
      }
    });
  }

  errorMsg(field: string): string | null {
    const ctrl = this.form().get(field);
    if (!ctrl || !ctrl.invalid || (!ctrl.touched && !ctrl.dirty)) return null;

    if (ctrl.errors) {
      if (ctrl.errors["required"] || ctrl.errors["whitespace"]) {
        return "Este campo es obligatorio";
      }
      if (ctrl.errors["minlength"]) {
        const min = ctrl.errors["minlength"].requiredLength;
        return `Debe tener al menos ${min} caracteres`;
      }
      if (ctrl.errors["maxlength"]) {
        const max = ctrl.errors["maxlength"].requiredLength;
        return `No puede superar ${max} caracteres`;
      }
      if (ctrl.errors["invalidName"]) {
        return "Solo se permiten letras, acentos y espacios";
      }
      if (ctrl.errors["invalidText"]) {
        return "Contiene caracteres no permitidos";
      }
      if (ctrl.errors["notPositive"] || ctrl.errors["min"]) {
        return "Debe ser un número mayor que 0";
      }
      if (ctrl.errors["max"]) {
        return "El valor es demasiado grande";
      }
      if (ctrl.errors["notANumber"]) {
        return "Debe ser un número válido";
      }
    }
    return "El campo no es válido";
  }

  switchMode(mode: "project" | "collaborator") {
    this.submittedSuccess.set(false);
    if (mode === "project") {
      this.projectForm.reset({
        name: "",
        description: "",
        technologies: "",
        level: "",
        rolesNeeded: "",
        maxCollaborators: 4,
      });
      this.projectForm.markAsPristine();
      this.projectForm.markAsUntouched();
    } else {
      this.collaboratorForm.reset({
        collName: "",
        collRole: "",
        knows: "",
        wantsToLearn: "",
        projectType: "",
      });
      this.collaboratorForm.markAsPristine();
      this.collaboratorForm.markAsUntouched();
    }
    this.modal.publishType.set(mode);
  }

  submit() {
    const f = this.form();
    f.markAllAsTouched();
    if (f.invalid) return;

    this.submitting.set(true);
    setTimeout(() => {
      this.submitting.set(false);
      this.submittedSuccess.set(true);
      this.successMessage.set(
        this.isProjectMode()
          ? "Tu proyecto se ha publicado con los datos de demostración. Pronto podrás compartirlo con la comunidad."
          : "Tu perfil de colaborador se ha publicado con los datos de demostración. Pronto podrás conectar con equipos.",
      );
      f.reset();
      f.markAsPristine();
      f.markAsUntouched();
    }, 700);
  }

  close() {
    this.submittedSuccess.set(false);
    this.modal.closePublish();
  }

  onBackdrop(e: Event) {
    if (e.target === e.currentTarget) {
      this.modal.closePublish();
    }
  }
}
