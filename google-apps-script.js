/*
 * KREAR - Google Apps Script
 * Recibe el formulario de contacto, envia un email a Krear y guarda en Sheets.
 *
 * INSTRUCCIONES DE DEPLOY:
 * 1. Abrí: https://script.google.com
 * 2. Nuevo proyecto -> pegar TODO este código (reemplazando lo que haya)
 * 3. Implementar -> Nueva implementacion
 *    - Tipo: Aplicacion web
 *    - Ejecutar como: Yo (tu cuenta)
 *    - Quien tiene acceso: Cualquier persona
 * 4. Implementar -> autorizar -> copiar la URL (termina en /exec)
 * 5. Pegar esa URL en script.js reemplazando CONTACT_ENDPOINT
 */

var EMAIL_DESTINO = 'krear.creativo@gmail.com';
var SHEET_ID = '';       // Opcional: ID de Google Sheet para guardar registros
var SHEET_NAME = 'Consultas';

function doPost(e) {
  try {
    var params   = e.parameter;
    var nombre   = params.nombre            || '(sin nombre)';
    var telefono = params.telefono          || '(sin telefono)';
    var email    = params.email             || '(sin email)';
    var consulta = params.consulta          || '(sin mensaje)';
    var pagina   = params.source_page_url   || '';
    var fecha    = new Date().toLocaleString('es-AR');

    // 1. Enviar email de notificacion
    var asunto = 'Nueva consulta de ' + nombre + ' - Krear';

    var cuerpo =
      'NUEVA CONSULTA - krearestudiocreativo.com\n' +
      '==========================================\n\n' +
      'Nombre:    ' + nombre   + '\n' +
      'Telefono:  ' + telefono + '\n' +
      'Email:     ' + email    + '\n' +
      'Fecha:     ' + fecha    + '\n' +
      (pagina ? 'Pagina:    ' + pagina + '\n' : '') +
      '\n-- Mensaje --\n' +
      consulta + '\n\n' +
      '==========================================\n' +
      'Responde este email para contactar al cliente.';

    MailApp.sendEmail({
      to: EMAIL_DESTINO,
      subject: asunto,
      body: cuerpo,
      replyTo: email
    });

    // 2. Guardar en Google Sheets (solo si SHEET_ID esta configurado)
    if (SHEET_ID) {
      try {
        var sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
        if (sheet) {
          if (sheet.getLastRow() === 0) {
            sheet.appendRow(['Fecha', 'Nombre', 'Telefono', 'Email', 'Consulta', 'Pagina']);
            sheet.getRange(1, 1, 1, 6).setFontWeight('bold');
          }
          sheet.appendRow([fecha, nombre, telefono, email, consulta, pagina]);
        }
      } catch (sheetErr) {
        // No interrumpir el flujo si el Sheet falla
      }
    }

    return ContentService
      .createTextOutput(JSON.stringify({ result: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'error', message: error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Funcion de prueba - ejecutar desde el editor para verificar que llega el email
function testDoPost() {
  var fakeEvent = {
    parameter: {
      nombre: 'Juan Perez',
      telefono: '543624522359',
      email: 'juan@empresa.com',
      consulta: 'Quiero informacion sobre los planes de suscripcion.',
      source_page_url: 'https://krearestudiocreativo.com/'
    }
  };
  var result = doPost(fakeEvent);
  Logger.log(result.getContent());
}
