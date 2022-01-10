import http from "./httpService";
import { apiUrl } from "../config/config.json";

export function getAllCards() {
  return http.get(`${apiUrl}/cards/all-assets`);
}

export function deleteCard(cardId) {
  return http.delete(`${apiUrl}/cards/${cardId}`);
}

export function getCard(cardId) {
  return http.get(`${apiUrl}/cards/${cardId}`);
}

export function editCard(card) {
  const cardId = card._id;
  delete card._id;
  return http.put(`${apiUrl}/cards/${cardId}`, card);
}

export function getMyCards() {
  return http.get(`${apiUrl}/cards/my-assets`);
}

export function createCard(card) {
  return http.post(`${apiUrl}/cards`, card);
}

export function getFavoritesCards(cardId) {
  return http.get(`${apiUrl}/cards/favorites/${cardId}`);
}

// eslint-disable-next-line
export default {
  createCard,
  getMyCards,
  getCard,
  editCard,
  deleteCard,
  getAllCards,
  getFavoritesCards
};
