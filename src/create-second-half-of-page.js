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

// AGREGAR LA SUMA DEL BALANCE.
// Me gustaría hacer mejor este códgio.
function addBalanceTotal() {
  // DIV CON TODO EL CONTENIDO.
  const allContent = document.getElementsByClassName("all-content-wrapper");

  const balanceTotal = new Array(2);
  balanceTotal[0] = document.createElement('div');
  balanceTotal[0].className = "table--row--element";
  balanceTotal[0].innerHTML = "Total";
  balanceTotal[0].style.padding = "0 42px 0 18px";
  balanceTotal[0].style.width = "unset";

  balanceTotal[1] = document.createElement('div');
  balanceTotal[1].className = "table--row--element";

  // toLocaleString()
  // Así el número se separa dependiendo de las oopciones del sistema del
  // usuario que lo ve. Como separado por comas, por ejemplo.
  // toLocaleString("en-US") <- Así se ponen comas en lugar de puntos.
  // FUENTE: https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
  balanceTotal[1].innerHTML = `$${getBalanceValues().toLocaleString("en-US")}`;
  balanceTotal[1].style.padding = "0 42px 0 18px";
  balanceTotal[1].style.width = "unset";

  // METER EN UN DIV ESOS ELEMENTOS PARA ACOMODARLOS.
  const balanceWrapper = document.createElement('div');
  // balanceWrapper.className = "table--row";
  balanceWrapper.style.marginTop = "24px";
  balanceWrapper.style.marginLeft = "auto";
  balanceWrapper.style.fontWeight = "800";
  balanceWrapper.style.width = "100%";
  balanceWrapper.style.display = "flex";
  balanceWrapper.style.placeContent = "flex-end";

  // Agregamos el texto y el número al total.
  balanceWrapper.appendChild(balanceTotal[0]);
  balanceWrapper.appendChild(balanceTotal[1]);

  // Agregar el wrapper al final de todo el contenido.
  allContent[0].appendChild(balanceWrapper);
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

function addAllJSElements() {
  // Agregamos la tabla.
  addTable();

  // Hay que agregar el total del balance en la esquina inferior derecha.
  addBalanceTotal();
}

// CUANDO SE TERMINE DE CARGAR EL BODY SE HARÁ ESTE PROCESO.
// document.body.onload = addAllJSElements;
