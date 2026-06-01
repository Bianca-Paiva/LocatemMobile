import { cpf, cnpj } from "cpf-cnpj-validator";

export const validateName = (name) => {
    const trimmedName = name.trim();

    const parts = trimmedName
        .split(" ")
        .filter(part => part.length > 0);

    return (
        parts.length >= 2 &&
        parts.every(part => part.length >= 2)
    );
};

export const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        email.trim()
    );
};

export const validatePassword = (password) => {
    return /^(?=.*[A-Za-z])(?=.*\d).{8,}$/.test(
        password
    );
};

export const validateCpf = (document) => {
    return cpf.isValid(document);
};

export const validateCnpj = (document) => {
    return cnpj.isValid(document);
};