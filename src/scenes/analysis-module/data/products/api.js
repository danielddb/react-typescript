export const getProducts = () =>
  fetch(`/mocks/products?delayResponse=200`)
    .then(response => response.json())
