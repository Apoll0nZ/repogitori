window.onload = function () {
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
            select.id = select.id + (i + 2);
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

// 全てのセレクト要素を取得
const selectElements = document.querySelectorAll('table select');

// 列ごとに選択値を格納する配列の配列
const selectedValuesByColumn = [];

// テーブルの列数を取得（仮定: すべての行のセル数が同じ）
const columnCount = selectElements[0].parentNode.parentNode.children[0].children.length;

// 列ごとに処理
for (let i = 0; i < columnCount; i++) {
    selectedValuesByColumn[i] = []; // 各列の配列を初期化
    // i番目の列の全てのセレクト要素を取得
    const columnSelects = document.querySelectorAll(`table tr td:nth-child(${i + 1}) select`);
    // 各セレクト要素の値を配列に追加
    columnSelects.forEach(select => {
        selectedValuesByColumn[i].push(select.value);
    });
}

console.log(selectedValuesByColumn);