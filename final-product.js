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

$('#Result').on('click', function () {
    // テーブル要素を取得
    const table = document.querySelector('table');
    const tbody = document.querySelector('tbody');
    // 全てのセレクト要素を一度に取得
    const selectElements = tbody.querySelectorAll('select');;
    // 列ごとの選択値を格納する配列の配列
    const selectedValuesByColumn = [];
    // テーブルの列数を取得（仮定: すべての行のセル数が同じ）
    const columnCount = tbody.rows[0].cells.length;
    console.log(columnCount);
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

    function findMatchingParentIndex(array, columnNames) {
        // 比較対象となる配列 (27番目と28番目) を取得
        const targetArrays = [array[27], array[28]];
        // 一致する親配列のインデックスと対応する列名を格納する配列
        const matchingColumns = [];
        // 各ターゲット配列に対して、すべての要素と比較 (0番目から26番目まで)
        targetArrays.forEach((targetArray, targetIndex) => {
            const targetLength = targetArray.length;
            const targetElements = [...targetArray];
            for (let i = 0; i < array.length - 2 - targetIndex; i++) {
                const currentArray = array[i];
                // 要素数が一致しない場合はスキップ
                if (currentArray.length !== targetLength) continue;
                // 各要素を比較
                let isMatch = true;
                for (let j = 0; j < targetLength; j++) {
                    if (currentArray[j] !== targetElements[j]) {
                        isMatch = false;
                        break;
                    }
                }
                // 一致した場合、対応する列名を格納
                if (isMatch) {
                    matchingColumns.push(columnNames[i]);
                }
            }
        });
        // 一致する親配列の番号を表示
        const importantDiv = document.getElementById('important');
        importantDiv.textContent = [...new Set(matchingColumns)].join(', ');
        
    }
    const columnNames = ['Cell','D','C','E','c','e','f','Cw','V','K','k','kpa','kpb','Jsa','Jsb','Fya','Fyb','Jka','Jkb','Xga','Lea','Leb','S','s','M','N','P1','Sal','IAT'];
    // 関数を呼び出す
    findMatchingParentIndex(selectedValuesByColumn, columnNames);
    
});