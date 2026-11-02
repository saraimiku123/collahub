import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

/** Solo letras (incluye acentos y ñ), espacios y guiones. Nada de numeros ni simbolos. */
export function nameValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = (control.value ?? "").toString().trim();
    if (!value) return null;
    const valid = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/.test(value);
    return valid ? null : { invalidName: true };
  };
}

/** Solo letras, acentos, ñ, espacios, comas y puntos (para tecnologias, roles, etc.). */
export function textListValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = (control.value ?? "").toString().trim();
    if (!value) return null;
    const valid = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s,.\-+#.]+$/.test(value);
    return valid ? null : { invalidText: true };
  };
}

/** Evita que el contenido sean solo espacios en blanco. */
export function noWhitespaceValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = (control.value ?? "").toString();
    if (!value) return null;
    return value.trim().length === 0 ? { whitespace: true } : null;
  };
}

/** Email con formato valido. */
export function emailValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = (control.value ?? "").toString().trim();
    if (!value) return null;
    const valid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
    return valid ? null : { invalidEmail: true };
  };
}

/** Contrasena: minimo 8 caracteres, al menos una letra y un numero. */
export function passwordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = (control.value ?? "").toString();
    if (!value) return null;
    if (value.length < 8) return { passwordLength: true };
    if (!/[a-zA-Z]/.test(value)) return { passwordLetter: true };
    if (!/[0-9]/.test(value)) return { passwordNumber: true };
    return null;
  };
}

/** Numero entero mayor que cero. */
export function positiveNumberValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (value === null || value === undefined || value === "") return null;
    const num = Number(value);
    if (isNaN(num)) return { notANumber: true };
    if (num <= 0) return { notPositive: true };
    return null;
  };
}
