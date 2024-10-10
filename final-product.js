/**
 * $()
 *
 * $().on('click', function() {
 *
 * })
 *
 * const season = "";
 * let votesCount = "";
 */
window.onload = function() {
    cloneRow(10); // 初期表示で10行複製
};

function cloneRow(numberOfRows) {
    const table = document.getElementById("myTable");
    const lastRow = table.rows[table.rows.length - 1];

    for (let i = 0; i < numberOfRows; i++) {
        const newRow = lastRow.cloneNode(true);

        // Cell#の更新
        newRow.cells[0].textContent = parseInt(newRow.cells[0].textContent) + i + 1;

        // select idの更新
        const selectElements = newRow.querySelectorAll("select");
        selectElements.forEach(select => {
            select.id = select.id +(i+2);
        });

        table.appendChild(newRow);
    }
};
function pluscloneRow() {
    const table = document.getElementById("myTable");
    const lastRow = table.rows[table.rows.length - 1];
    const lastCellNumber = parseInt(lastRow.cells[0].textContent);
    const newRow = lastRow.cloneNode(true);
    newRow.cells[0].textContent = lastCellNumber + 1; // セル番号を12から順に増やす
    const selectElements = newRow.querySelectorAll("select");
    selectElements.forEach(select => {
      // selectのidを12から順に増やす
        select.id = select.id.substring(0, 7) + (lastCellNumber + 1);
    });
    table.appendChild(newRow);
}
