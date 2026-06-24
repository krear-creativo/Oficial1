/**
 * KREÄR — Google Apps Script
 * Recibe los datos del formulario de contacto, envía un email de notificación
 * a Kreär y guarda los datos en Google Sheets como respaldo.
 *
 * INSTRUCCIONES DE DEPLOY (una sola vez):
 * 1. Abrí: https://script.google.com
 * 2. Creá un nuevo proyecto ("Nuevo proyecto") y pegá todo este código
 * 3. Opcional: reemplazá SHEET_ID con el ID de tu Google Sheet si querés guardar los datos
 *    (el ID está en la URL del Sheet: docs.google.com/spreadsheets/d/ESTE_ES_EL_ID/edit)
 *    Si no tenés sheet, dejalo vacío y los datos solo llegarán por email.
 * 4. Hacé clic en "Implementar" → "Nueva implementación"
 * 5. Tipo: "Aplicación web"
 * 6. Ejecutar como: "Yo (tu cuenta de Google)"
 * 7. Quién tiene acceso: "Cualquier persona"
 * 8. Hacé clic en "Implementar" y copiá la URL que aparece (termina en /exec)
 * 9. Pegá esa URL en script.js reemplazando el valor de CONTACT_ENDPOINT
 */

const EMAIL_DESTINO = 'krear.creativo@gmail.com';
const SHEET_ID = ''; // Opcional: ID de tu Google Sheet para guardar registros
const SHEET_NAME = 'Consultas';

function doPost(e) {
  try {
    const params = e.parameter;

    const nombre   = params.nombre   || '(sin nombre)';
    const telefono = params.telefono || '(sin teléfono)';
    const email    = params.email    || '(sin email)';
    const consulta = params.consulta || '(sin mensaje)';
    const pagina   = params.source_page_url || '';
    const timestamp = new Date().toLocaleString('es-AR', {
      timeZone: 'America/Argentina/Salta',
      day: '2-digit', month: '2-digit', year: 'numeric',
      hour: '2-digit', minute: '2-digit',
    });

    // 1. Enviar email de notificación
    const asunto = `Nueva consulta de ${nombre} — Kreär`;
    const cuerpo = [
      '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
      'NUEVA CONSULTA — krearestudiocreativo.com',
      '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
      '',
      `Nombre:    ${nombre}`,
      `Teléfono:  ${telefono}`,
      `Email:     ${email}`,
      `Fecha:     ${timestamp}`,
      pagina ? `Página:    ${pagina}` : '',
      '',
      '── Consulta ──',
      consulta,
      '',
      '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
      'Para responder, respondé este email directamente.',
      '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
    ].filter(l => l !== null).join('\n');

    MailApp.sendEmail({
      to: EMAIL_DESTINO,
      subject: asunto,
      body: cuerpo,
      replyTo: email,
    });

    // 2. Guardar en Google Sheets (opcional — solo si SHEET_ID está configurado)
    if (SHEET_ID) {
      try {
        const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
        if (sheet && sheet.getLastRow() === 0) {
          sheet.appendRow(['Fecha', 'Nombre', 'Teléfono', 'Email', 'Consulta', 'Página']);
          sheet.getRange(1, 1, 1, 6).setFontWeight('bold');
        }
        if (sheet) {
          sheet.appendRow([timestamp, nombre, telefono, email, consulta, pagina]);
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

// Función de prueba — ejecutar desde el editor para verificar que funciona
function testDoPost() {
  const fakeEvent = {
    parameter: {
      nombre: 'Juan Pérez',
      telefono: '543624522359',
      email: 'juan@empresa.com',
      consulta: 'Quiero información sobre sus planes de suscripción.',
      source_page_url: 'https://krearestudiocreativo.com/',
    }
  };
  const result = doPost(fakeEvent);
  Logger.log(result.getContent());
}
