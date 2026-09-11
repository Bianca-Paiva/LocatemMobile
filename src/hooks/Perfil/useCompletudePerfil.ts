import { useMemo } from 'react';
import type { Usuario } from '../../types/usuario.types';

interface CriterioPerfil {
  peso: number;
  acao: string;
  atendido: (usuario: Usuario) => boolean;
}

const CRITERIOS: CriterioPerfil[] = [
  { peso: 17, acao: 'complete seu nome', atendido: u => Boolean(u.nome?.trim()) },
  { peso: 17, acao: 'informe seu e-mail', atendido: u => Boolean(u.email?.trim()) },
  { peso: 17, acao: 'informe seu telefone', atendido: u => Boolean(u.telefone?.trim()) },
  { peso: 17, acao: 'informe seu documento', atendido: u => Boolean(u.documento?.trim()) },
  { peso: 17, acao: 'informe seu endereço', atendido: u => Boolean(u.endereco?.trim()) },
  { peso: 8, acao: 'adicione uma foto', atendido: u => Boolean(u.fotoUrl) },
  { peso: 7, acao: 'verifique seu e-mail', atendido: u => u.emailVerificado },
];

export function useCompletudePerfil(usuario: Usuario | null) {
  return useMemo(() => {
    if (!usuario) return { percentual: 0, completo: false, mensagemDica: '' };

    const faltando = CRITERIOS.filter(c => !c.atendido(usuario));
    const percentual = CRITERIOS.reduce((total, c) => total + (c.atendido(usuario) ? c.peso : 0), 0);
    const completo = faltando.length === 0;
    const acoes = faltando.slice(0, 2).map(c => c.acao);
    const frase = acoes.length === 2 ? acoes.join(' e ') : acoes[0];
    const mensagemDica = completo
      ? 'Seu perfil está completo!'
      : `${frase.charAt(0).toUpperCase()}${frase.slice(1)} para chegar a 100%.`;

    return { percentual, completo, mensagemDica };
  }, [usuario]);
}
