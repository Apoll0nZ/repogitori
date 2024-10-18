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
        //1入力で+選択
        const selectedElements = document.querySelectorAll('.selected');
        selectedElements.forEach(select => {
            select.addEventListener('keydown', function (event) {
                if (event.key === '1') {
                    const plusOption = this.querySelector('option[value="+"]');
                    if (plusOption) {
                        plusOption.selected = true;
                    }
                }
            });
        });
        table.appendChild(newRow);
    }
};
function pluscloneRow() {
    const table = document.getElementById("myTable");
    const lastRow = table.rows[table.rows.length - 1];
    const lastCellNumber = parseInt(lastRow.cells[0].textContent);
    const newRow = lastRow.cloneNode(true);
    //newRow.cells[0].textContent = lastCellNumber + 1; // セル番号を12から順に増やす
    const selectElements = newRow.querySelectorAll("select");
    selectElements.forEach(select => {
        // selectのidを12から順に増やす
        select.id = select.id.substring(0, 7) + (lastCellNumber + 1);
    });
    //1入力で+選択
    const selectedElements = document.querySelectorAll('.selected');
    selectedElements.forEach(select => {
        select.addEventListener('keydown', function (event) {
            if (event.key === '1') {
                const plusOption = this.querySelector('option[value="+"]');
                if (plusOption) {
                    plusOption.selected = true;
                }
            }
        });
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

    // 一致する親配列のインデックスと対応する列名を格納する配列
    const matchingColumns = [];
    function findMatchingParentIndex(array, columnNames) {
        // 比較対象となる配列 (27番目と28番目) を取得
        const targetArrays = [array[27], array[28]];

        // 各ターゲット配列に対して、すべての要素と比較 (0番目から26番目まで)
        targetArrays.forEach((targetArray, targetIndex) => {
            const targetLength = targetArray.length;
            const targetElements = [...targetArray];
            for (let i = 0; i < array.length - 2; i++) {
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
    const columnNames = ['Cell', 'D', 'C', 'E', 'c', 'e', 'f', 'Cw', 'V', 'K', 'k', 'kpa', 'kpb', 'Jsa', 'Jsb', 'Fya', 'Fyb', 'Jka', 'Jkb', 'Xga', 'Lea', 'Leb', 'S', 's', 'M', 'N', 'P1'];
    // 関数を呼び出す
    findMatchingParentIndex(selectedValuesByColumn, columnNames);
    const notMatchingColumns = [];
    function findMatchingParents(parentArray, columnNames, skipPairs) {
        const targetArray = parentArray[28];
        const matchingPairs = [];
        for (let [i, k] of skipPairs) {
            const subArrayLength = Math.min(targetArray.length, parentArray[i].length, parentArray[k].length);
            for (let j = 0; j < subArrayLength; j++) {
                if (targetArray[j] === "0" && parentArray[i][j] === "+" && parentArray[k][j] === "+") {
                    matchingPairs.push([i, j])
                    matchingPairs.push([k, j])
                }
            }
        }
        for (let i = 0; i < 27; i++) {
            const subArrayLength = Math.min(targetArray.length, parentArray[i].length);
            for (let j = 0; j < subArrayLength; j++) {
                // マッチング済みかどうか確認
                if (matchingPairs.some(pair => pair[0] === i && pair[1] === j)) {
                    continue; // マッチング済みならスキップ
                }
                if (targetArray[j] === "0" && parentArray[i][j] === "+") {
                    matchingPairs.push([i, j]);
                    notMatchingColumns.push(columnNames[i]);
                    break;
                }
            }
        }
    }
    // スキップするペアの配列
    const skipPairs = [[2, 4], [3, 5], [15, 16], [17, 18], [22, 23], [24, 25]];
    // 関数の呼び出し
    const result = findMatchingParents(selectedValuesByColumn, columnNames, skipPairs);

    // 新しい配列を作成し、columnNames の要素を全てコピー
    const remainingColumns = [...columnNames];
    // 0番目の要素を削除
    remainingColumns.splice(0, 1);
    // notMatchingColumns の要素を新しい配列から削除
    remainingColumns.splice(0, remainingColumns.length, ...remainingColumns.filter(column => !notMatchingColumns.includes(column)));
    // matchingColumns の要素を新しい配列から削除
    remainingColumns.splice(0, remainingColumns.length, ...remainingColumns.filter(column => !matchingColumns.includes(column)));
    // 残った要素を結合し、重複を削除
    const uniqueRemainingColumns = [...new Set(remainingColumns)];
    // HTML の div に表示
    const nDeniedDiv = document.getElementById('nDenied');
    nDeniedDiv.textContent = uniqueRemainingColumns.join(', ');
});