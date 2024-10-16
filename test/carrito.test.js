import { Selector, fixture } from 'testcafe';

// Especifica la URL de la página del carrito de compras
const cartUrl = 'http://localhost:3000/carrito';

fixture `Carga inicial de productos en el carrito`
    .page(cartUrl)
    .beforeEach(async t => {
        // Aquí puedes añadir acciones que se ejecuten antes de cada prueba,
        // por ejemplo, asegurarte de que hay productos en el carrito para el usuario de prueba
    });

test('Los productos se cargan correctamente en el carrito', async t => {
    // Espera a que aparezca en el DOM el selector que indica que hay productos cargados
    await t.expect(Selector('.shoping__cart__table').exists).ok();

    // Verifica que el número de productos en el carrito sea el esperado
    const productCount = Selector('tbody tr').count;
    await t.expect(productCount).gte(1); // Confirma que hay al menos un producto

    // Opcionalmente, puedes verificar algunos detalles del producto cargado, como el nombre o el precio
    const firstProductName = Selector('tbody tr').nth(0).find('h5').innerText;
    await t.expect(firstProductName).contains('Nombre del producto esperado');

    // Verifica que el total y subtotal se calculen y muestren correctamente
    const subtotal = Selector('.shoping__checkout ul li').nth(0).find('span').innerText;
    await t.expect(subtotal).contains('$'); // Asegura que el subtotal contiene el signo de dólar

    // Verifica que el botón de pago está presente
    const pagarButton = Selector('button').withText('PAGAR');
    await t.expect(pagarButton.exists).ok();
});

// Aquí puedes añadir más pruebas según sea necesario
