window.onload = function () {
    cloneRow(10); // 初期表示で10行複製
};

$(function () {
    $(".inputBox1 td").each(function () {
        const $td = $(this);
        const $select = $td.find("select");
        const inputId = $select.attr("id") + "Input";
        // 既にinput要素が存在する場合、処理をスキップ
        if ($td.find(`#${inputId}`).length > 0) {
            return;
        }
        $select.before(`<input type="text" id="${inputId}">`);
        $(`#${inputId}`).autocomplete({
            source: ["+", "0"],
            select: function (event, ui) {
                $select.val(ui.item.value);
            }
        });
    });
});
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

    function findMatchingParentIndex(array) {
        // 比較対象となる配列 (27番目と28番目) を取得
        const targetArrays = [array[27], array[28]];
        // 一致する親配列のインデックスを格納する配列
        const matchingIndices = [];
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
                // すべての要素が一致した場合、インデックスを記録
                if (isMatch) {
                    matchingIndices.push(i + 1); // インデックスは1始まりなので+1する
                }
            }
        });
        // 一致する親配列の番号を表示
        const importantDiv = document.getElementById('important');
        importantDiv.textContent = matchingIndices.join(', ');
    }
    // 関数を呼び出す
    findMatchingParentIndex(selectedValuesByColumn);


});