/**
 * Utilitario puro: centraliza formatacao, validacao ou transformacao de dados reutilizada no app.
 */
import { cpf, cnpj } from "cpf-cnpj-validator";

/** Exige nome composto por ao menos duas palavras com duas letras cada. */
export const validateName = (name: string): boolean => {
    const trimmedName = name.trim();

    const parts = trimmedName
        .split(" ")
        .filter(part => part.length > 0);

    return (
        parts.length >= 2 &&
        parts.every(part => part.length >= 2)
    );
};

/** Verifica se o email tem uma estrutura basica de endereco valido. */
export const validateEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        email.trim()
    );
};

/** Exige uma senha com pelo menos oito caracteres, uma letra e um numero. */
export const validatePassword = (password: string): boolean => {
    return /^(?=.*[A-Za-z])(?=.*\d).{8,}$/.test(
        password
    );
};

/** Valida os digitos verificadores do CPF informado. */
export const validateCpf = (document: string): boolean => {
    return cpf.isValid(document);
};

/** Valida os digitos verificadores do CNPJ informado. */
export const validateCnpj = (document: string): boolean => {
    return cnpj.isValid(document);
};