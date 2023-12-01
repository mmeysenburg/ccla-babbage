function submit() {
  let table = document.getElementById("tblFD");
  let f0 = document.getElementById("inpF0").value;
  let d1 = document.getElementById("inpD1").value;
  let d2 = document.getElementById("inpD2").value;
  let d3 = document.getElementById("inpD3").value;
  let d4 = document.getElementById("inpD4").value;
  let d5 = document.getElementById("inpD5").value;

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

    let row = table.insertRow(x);
    let cellF = row.insertCell(0);
    let cellD1 = row.insertCell(1);
    let cellD2 = row.insertCell(2);
    let cellD3 = row.insertCell(3);
    let cellD4 = row.insertCell(4);
    let cellD5 = row.insertCell(5);

    cellF.innerHTML = f0;
    cellD1.innerHTML = d1;
    cellD2.innerHTML = d2;
    cellD3.innerHTML = d3;
    cellD4.innerHTML = d4;
    cellD5.innerHTML = d5;
  } // for 
}

function reset() {
  console.log('Reset clicked');
}
