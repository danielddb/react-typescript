export const getEntities = productPrefix =>
  fetch(`/mocks/products/${productPrefix}/entities?delayResponse=500`)
    .then(response => response.json())
