import { Selector, fixture } from 'testcafe';

fixture`Product Details`.page`http://localhost:3000/`;

// Suponiendo que conocemos el ID de un producto específico y que hay un enlace directo a él en alguna parte de la página de inicio
test('Agregar producto al carrito exitosamente', async t => {
  await t
    // Navega a la página de detalles del producto. Ajusta la URL según sea necesario.
    .navigateTo('http://localhost:3000/product-details/1') 
    // Aquí puedes ajustar la cantidad si hay una opción para hacerlo. Esto es un ejemplo.
    .typeText('input[type="number"]', '1', { replace: true })
    // Hacer clic en el botón de agregar al carrito. Asegúrate de ajustar el selector según tu código HTML.
    .click('button.primary-btn')
    // Agrega una expectativa relevante, como ser redirigido al carrito o ver un mensaje de éxito.
    .expect(Selector('tuSelectorParaElMensajeDeÉxito').innerText).contains('Producto agregado al carrito');
});

// Test adicional para manejar casos donde el producto no puede ser agregado, por ejemplo, por falta de stock
test('Intento fallido de agregar producto al carrito por falta de stock', async t => {
  await t
    .navigateTo('http://localhost:3000/product-details/2') // Asume que este producto está fuera de stock
    .click('button.primary-btn') // Intenta agregar el producto
    // Verifica que aparece un mensaje indicando que el producto no está disponible.
    .expect(Selector('tuSelectorParaElMensajeDeError').innerText).contains('El producto no está disponible por falta de stock');
});
