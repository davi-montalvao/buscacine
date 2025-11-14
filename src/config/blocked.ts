// Lista centralizada de IDs de filmes bloqueados localmente
const BLOCKED_IDS = new Set<number>([
  1231813, // removido por conteúdo impróprio
])

export function isBlockedMovie(id: number) {
  return BLOCKED_IDS.has(id)
}

export default BLOCKED_IDS
