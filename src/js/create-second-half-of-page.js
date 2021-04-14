// Martes, 13 de ABRIL del 2021
// Aquí se encontrará el código que hice de JS, aunque no lo retiré del HTML,
// sino que lo puse aquí para probar el ESLint con convenciones "airbnb".

// Obtener los valores de la tabla.
function getBalanceValues() {
  // Obtenemos todos los DIVS que están dentro de la tabla, es decir, que
  //  también habrá texto.
  // 2do VALOR = BALANCE, 4 VALORES POR TABLA.
  // let tableValues = document.getElementsByClassName("table--row--element");

  // Obtenemos todas las filas de la tabla para solo acceder al segundo elemento,
  //  en donde se encuentran los balances.
  const tableValues = document.getElementsByClassName("table--row");

  // console.log(tableValues);

  const balanceValues = new Array(tableValues.length - 1);

  // Acumulador de los valores del balance.
  let totalSum = 0;
  for (let i = 1; i <= balanceValues.length; i++) {
    // balanceValues[i - 1] = tableValues[i].childNodes[1].innerHTML.replace(/$[0-9]*,[0-9]/, "");
    // FUENTE: https://stackoverflow.com/questions/559112/how-to-convert-a-currency-string-to-a-double-with-jquery-or-javascript
    balanceValues[i - 1] = tableValues[i].childNodes[1].innerHTML.replace(/[$,]/g, "");
    // PASAR LA CADENA A ENTERO.
    // parseInt(cadena, radix parameter
    //                  [tipo de número: 10 -> decimal, 8 -> octal]
    //          )
    totalSum += parseInt(balanceValues[i - 1], 10);
    // console.log("\n - VALUE TO INT = " + balanceValues[i - 1] + ", SUM = " + totalSum);
  }

  return totalSum;
}

// CREAR LA ÚLTIMA FILA EN DONDE VIENE EL TOTAL Y LA SUMA DE LOS BALANCES.
// Son 2 columnas con varios datos e info. El método es para evitar ser
// redundante.
// Variable con un nombre "más simple" y la función con un nombre más complejo.
const createTotalBalanceRow = function createNewBalanceColumns(rowText) {
  // Las especificaciones de la última fila y sus columnas.
  const columnsInfo = new Array(2);

  for (let i = 0; i < rowText.length; i++) {
    // Esto aplica para las dos columnas.
    columnsInfo[i] = document.createElement('div');
    columnsInfo[i].className = "table--row--element";
    columnsInfo[i].style.padding = "0 42px 0 18px";
    columnsInfo[i].style.width = "unset";
    // El texto que dirán las columnas.
    columnsInfo[i].innerHTML = rowText[i];
    // console.log(`\n-> i = ${i}: ${rowText[i]},
    //                       columnsInfo[${i}]: ${columnsInfo[i].innerHTML}\n`);
  }

  return columnsInfo;
};

// AGREGAR LA SUMA DEL BALANCE.
// Me gustaría hacer mejor este códgio.
function addBalanceTotal() {
  // DIV CON TODO EL CONTENIDO.
  const allContent = document.getElementsByClassName("all-content-wrapper");
  const balanceRowText = [
    "Total",
    // toLocaleString()
    // Así el número se separa dependiendo de las oopciones del sistema del
    // usuario que lo ve. Como separado por comas, por ejemplo.
    // toLocaleString("en-US") <- Así se ponen comas en lugar de puntos.
    // FUENTE: https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
    `$${getBalanceValues().toLocaleString("en-US")}`,
  ];

  // Fila con las 2 columnas que indican el balance total. La obtenemos de la
  // función en la que mandamos el texto que habrá en cada una de las 2 columnas
  // de dicha fila.
  // Es un arreglo con las dos columnas.
  const totalBalanceRow = createTotalBalanceRow(balanceRowText);
  // console.log(`\n- Tamaño de arreglo: ${totalBalanceRow.length}`);

  // METER EN UN DIV CONTENEDOR LAS COLUMNAS DEL "Total" y la suma del balance.
  const totalBalanceRowWrapper = document.createElement('div');
  // totalBalanceRowWrapper.className = "table--row";
  totalBalanceRowWrapper.style.marginTop = "24px";
  totalBalanceRowWrapper.style.marginLeft = "auto";
  totalBalanceRowWrapper.style.fontWeight = "800";
  totalBalanceRowWrapper.style.width = "100%";
  totalBalanceRowWrapper.style.display = "flex";
  totalBalanceRowWrapper.style.placeContent = "flex-end";

  // Agregamos el texto y el número al total.
  totalBalanceRowWrapper.appendChild(totalBalanceRow[0]);
  totalBalanceRowWrapper.appendChild(totalBalanceRow[1]);

  // Agregar el wrapper al final de todo el contenido.
  allContent[0].appendChild(totalBalanceRowWrapper);
}

// AGREGAR TODAS LAS FILAS A LA TABLA Y LUEGO LA TABLA AL HTML.
function appendRowsToTable(rowsArray) {
  const tableContainer = document.createElement('div');
  tableContainer.className = "table-wrapper";

  for (let i = 0; i < rowsArray.length; i++)
    tableContainer.appendChild(rowsArray[i]);

  return tableContainer;
}

// INICIALIZAR EL ARREGLO BIDIMENSIONAL.
function initialize2DArray(rows, cols) {
  const bidimensionalArray = new Array(rows);

  for (let i = 0; i < rows; i++)
    bidimensionalArray[i] = new Array(cols);

  return bidimensionalArray;
}

// Se crea una fila de la tabla con los elementos que recibe.
// Recibe la fila actual, el arreglo con los valores de cada elemento en la
// tabla y el color de la fila.
function createRow(textArray, rowColor) {
  const row = document.createElement('div');
  const elements = new Array(3);

  row.className = "table--row";
  // PRIMERA FILA DE OTRO COLOR.
  // row.style.backgroundColor = "#e8ecfc";
  row.style.backgroundColor = rowColor;

  // CREAMOS CADA ELEMENTO CON SU TEXTO CORRESPONDIENTE.
  for (let i = 0; i < textArray.length; i++) {
    elements[i] = document.createElement('div');
    elements[i].className = "table--row--element";
    elements[i].innerHTML = textArray[i];
    row.appendChild(elements[i]);
  }

  return row;
}

// Crear la tabla con cada uno de los elementos y valores que se requieren.
function addTable() {
  // ARREGLO DE FILAS
  const rowsArray = [5];
  const auxDateGetter = new Date();
  // Fecha con elementos: mes/día/año
  const date = {
    // Hay que sumar 1 para obtener el mes actual.
    month: auxDateGetter.getMonth() + 1,
    day: auxDateGetter.getDate(),
    year: auxDateGetter.getFullYear(),
  };

  // console.log(`month: ${date.month}, day: ${date.day}, year: ${date.year}`);

  // DIV CON TODO EL CONTENIDO.
  const allContent = document.getElementsByClassName("all-content-wrapper");
  // 4 DATOS POR FILA.
  let rowText = [4];
  let rowColor;

  /* --------------------------------------------- PRIMERA FILA */
  // PRIMERA FILA DE OTRO COLOR.
  rowText = ["Name", "Balance", "Date", ""];
  // CREAR LA FILA CON LOS DATOS.
  rowsArray[0] = createRow(rowText, "#e8f8fc");
  // Esta es más alta que las otras.
  rowsArray[0].id = "top-table-row";

  /* --------------------------------------------- 2 FILA */
  rowText = [
    "Juan Perez",
    "$10,000",
    `${date.month}/${date.day}/${date.year}`,
    "",
  ];

  rowColor = "#ffffff";

  // CREAR LA FILA CON LOS DATOS.
  rowsArray[1] = createRow(rowText, rowColor);

  /* --------------------------------------------- 3 FILA */
  rowText = [
    "Armando Juárez",
    "$19,320",
    `${date.month}/${date.day}/${date.year}`,
    "",
  ];

  rowColor = "#f0ecec";

  rowsArray[2] = createRow(rowText, rowColor);
  /* --------------------------------------------- 4  FILA */
  rowText = [
    "Francisco Octavio",
    "$3,420",
    `${date.month}/${date.day}/${date.year}`,
    "",
  ];

  rowColor = "#ffffff";

  rowsArray[3] = createRow(rowText, rowColor);
  /* --------------------------------------------- 5 FILA */
  rowText = [
    "Carmela López",
    "$81,597",
    // FORMATED STRINGS
    `${date.month}/${date.day}/${date.year}`,
    "",
  ];

  rowColor = "#f0ecec";

  rowsArray[4] = createRow(rowText, rowColor);

  // AGREGAR LA TABLA YA JUNTA AL HTML.
  allContent[0].appendChild(appendRowsToTable(rowsArray));
}

// FUNCIÓN QUE AGREGARÁ LA TABLA UNA VEZ CREADA
// Y AGREGA LA FILA DEL BALANCE TOTAL.
function addAllJSElements() {
  // Agregamos la tabla.
  addTable();

  // Hay que agregar el total del balance en la esquina inferior derecha.
  addBalanceTotal();
}

// CUANDO SE TERMINE DE CARGAR EL BODY SE HARÁ ESTE PROCESO.
// document.body.onload = addAllJSElements;
