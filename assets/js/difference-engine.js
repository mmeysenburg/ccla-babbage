function submit() {
  let table = document.getElementById("tblFD");
  let f0 = Number(document.getElementById("inpF0").value);
  let d1 = Number(document.getElementById("inpD1").value);
  let d2 = Number(document.getElementById("inpD2").value);
  let d3 = Number(document.getElementById("inpD3").value);
  let d4 = Number(document.getElementById("inpD4").value);
  let d5 = Number(document.getElementById("inpD5").value);

  for(let x = 1; x <= 100; x++) {
    let d4_1 = d4 + d5;
    let d3_1 = d3 + d4;
    let d2_1 = d2 + d3;
    let d1_1 = d1 + d2;
    let f0_1 = f0 + d1;

    f0 = f0_1;
    d1 = d1_1;
    d2 = d2_1;
    d3 = d3_1;
    d4 = d4_1;

    let row = table.insertRow(x + 1);
    let cellX = row.insertCell(0);
    let cellF = row.insertCell(1);
    let cellD1 = row.insertCell(2);
    let cellD2 = row.insertCell(3);
    let cellD3 = row.insertCell(4);
    let cellD4 = row.insertCell(5);
    let cellD5 = row.insertCell(6);

    cellX.innerHTML = x;
    cellX.style.textAlign = 'center';
    cellF.innerHTML = f0;
    cellF.style.textAlign = 'center';
    cellD1.innerHTML = d1;
    cellD1.style.textAlign = 'center';
    cellD2.innerHTML = d2;
    cellD2.style.textAlign = 'center';
    cellD3.innerHTML = d3;
    cellD3.style.textAlign = 'center';
    cellD4.innerHTML = d4;
    cellD4.style.textAlign = 'center';
    cellD5.innerHTML = d5;
    cellD5.style.textAlign = 'center';
  } // for 
}

function reset() {
  let table = document.getElementById("tblFD");
  let rows = table.rows.length;
  for(let row = rows - 1; row > 1; row--) {
    table.deleteRow(row);
  }
}
