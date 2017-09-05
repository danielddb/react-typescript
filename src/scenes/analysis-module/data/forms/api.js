export const getForms = (productPrefix, entityCode) =>
  fetch(`/mocks/products/${productPrefix}/entities/${entityCode}/forms?delayResponse=500`)
    .then(response => response.json())
