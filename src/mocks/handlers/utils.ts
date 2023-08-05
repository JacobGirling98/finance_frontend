export const toEntity = <T>(domain: T) => ({ id: crypto.randomUUID(), domain })
