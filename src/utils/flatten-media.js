'use strict';

/**
 * Flatten Strapi media objects to plain URL strings in-place over a response tree.
 *
 * Motivo: mantener compatibilidad con el shape que devolvia VTEX (ej. logo.src era
 * un string con la URL). Strapi v5, con campos type=media, devuelve un objeto
 * completo ({id, url, mime, ext, formats, ...}). Esta funcion recorre el arbol
 * y reemplaza cualquier objeto que sea un media-file por su .url string, asi
 * el frontend lee logo.src (o equivalente) como siempre lo hizo.
 *
 * Si en el futuro necesitas los formats/metadata, sacar el llamado a flattenMedia
 * del controller correspondiente.
 */

function isMediaObject(v) {
  return (
    v &&
    typeof v === 'object' &&
    !Array.isArray(v) &&
    typeof v.url === 'string' &&
    typeof v.mime === 'string' &&
    typeof v.ext === 'string'
  );
}

function flattenMedia(value) {
  if (Array.isArray(value)) return value.map(flattenMedia);
  if (isMediaObject(value)) return value.url;
  if (value && typeof value === 'object') {
    const out = {};
    for (const [k, v] of Object.entries(value)) out[k] = flattenMedia(v);
    return out;
  }
  return value;
}

module.exports = { flattenMedia };
