/**
 * KREÄR — Google Apps Script
 * Recibe los datos del formulario de contacto y los guarda en Google Sheets.
 *
 * INSTRUCCIONES DE CONFIGURACIÓN:
 * 1. Abrí: https://script.google.com
 * 2. Creá un nuevo proyecto y pegá este código
 * 3. Reemplazá SHEET_ID con el ID de tu Google Sheet
 *    (está en la URL: docs.google.com/spreadsheets/d/ESTE_ES_EL_ID/edit)
 * 4. Ir a "Implementar" → "Nueva implementación"
 * 5. Tipo: "Aplicación web"
 * 6. Ejecutar como: "Yo (tu cuenta)"
 * 7. Quién tiene acceso: "Cualquier persona"
 * 8. Hacer clic en "Implementar" y copiar la URL generada
 * 9. Pegar esa URL en script.js donde dice: SHEETS_ENDPOINT = 'TU_URL_DE_APPS_SCRIPT_AQUI'
 */

const SHEET_ID = 'PEGAR_ID_DE_TU_GOOGLE_SHEET_AQUI';
const SHEET_NAME = 'Consultas'; // Nombre de la pestaña donde se guardarán los datos

function doPost(e) {
    try {
        const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);

        // Si la hoja está vacía, agregar encabezados
        if (sheet.getLastRow() === 0) {
            sheet.appendRow(['Timestamp', 'Nombre', 'Número', 'Email', 'Consulta']);
            sheet.getRange(1, 1, 1, 5).setFontWeight('bold');
        }

        // Obtener los datos del formulario
        const params = e.parameter;
        const timestamp = params.timestamp || new Date().toISOString();
        const nombre = params.nombre || '';
        const numero = params.numero || '';
        const email = params.email || '';
        const consulta = params.consulta || '';

        // Agregar fila con los datos
        sheet.appendRow([timestamp, nombre, numero, email, consulta]);

        // Responder con éxito
        return ContentService
            .createTextOutput(JSON.stringify({ result: 'success' }))
            .setMimeType(ContentService.MimeType.JSON);

    } catch (error) {
        return ContentService
            .createTextOutput(JSON.stringify({ result: 'error', message: error.message }))
            .setMimeType(ContentService.MimeType.JSON);
    }
}

// Esta función permite probar el script manualmente desde el editor
function testDoPost() {
    const fakeEvent = {
        parameter: {
            timestamp: new Date().toISOString(),
            nombre: 'Test Usuario',
            numero: '+54 362 000 0000',
            email: 'test@test.com',
            consulta: 'Esta es una consulta de prueba desde el editor.'
        }
    };
    const result = doPost(fakeEvent);
    Logger.log(result.getContent());
}
