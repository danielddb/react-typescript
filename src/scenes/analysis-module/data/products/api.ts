export function getProducts() {
  return fetch(`/mocks/products?delayResponse=200`)
    .then((response: Response) => response.json())
}
