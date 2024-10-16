import { Selector, fixture } from 'testcafe';


fixture`Login`.page`http://localhost:3000/login`; 

test('Inicio de sesión exitoso', async t => {
  await t
    .typeText('input[name="email"]', '20210680@uthh.edu.mx')
    .typeText('input[name="password"]', '20210680@uthh.edu.mX')
    .click('button[type="submit"]')
    .expect(Selector('.card-body h5.card-title').innerText).eql('Verifica tu identidad');
});

test('Mostrar mensaje de error en caso de credenciales incorrectas', async t => {
  await t
    .typeText('input[name="email"]', '20210720@uthh.edu.mx')
    .typeText('input[name="password"]', 'contraseñaincorrecta')
    .click('button[type="submit"]')
    .expect(Selector('.alert-danger').exists).ok();
});

