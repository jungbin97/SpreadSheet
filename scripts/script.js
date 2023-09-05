const rows = 10;
const cols = 10;
const table = document.querySelector('.spreadsheet');
const btnExport = document.querySelector(".btn_export");
const cellPosition = document.getElementById("cell_position");

// 테이블 헤더 생성
const headerRow = table.insertRow(0);
headerRow.insertCell(0);
headerRow.style.backgroundColor = '#f2f2f2';

for(let i = 1; i <=cols; i++){
    const cell = headerRow.insertCell(i);
    cell.style.backgroundColor = "#f2f2f2";
    cell.innerText = String.fromCharCode(64 + i);  // ASCII 코드로 문자 변환
}

function attachFocusListener(input, i, j) {
    input.addEventListener('focus', function() {
        const colHeader = table.rows[0].cells[j];
        const rowHeader = table.rows[i].cells[0];

        colHeader.style.backgroundColor = 'skyblue';
        rowHeader.style.backgroundColor = 'skyblue';

        const position = `${colHeader.innerText}${rowHeader.innerText}`;
        cellPosition.innerText = position;

        this.addEventListener('blur', function() {
            colHeader.style.backgroundColor = '#f2f2f2';
            rowHeader.style.backgroundColor = '#f2f2f2';
        }, { once: true });
    });
}

for(let i = 1; i<=rows; i++){
    const row = table.insertRow(i);
    const headCell = row.insertCell(0);
    headCell.innerText = i;
    headCell.style.backgroundColor = "#f2f2f2";

    for (let j = 1; j<=cols; j++){
        const cell = row.insertCell(j);
        const input = document.createElement('input');
        cell.appendChild(input);

        attachFocusListener(input, i, j);
    }
}

function exportToExcel() {
    // input 요소의 값을 해당 셀에 복사
    for (let i = 1; i <= rows; i++) {
        for (let j = 1; j <= cols; j++) {
            const input = table.rows[i].cells[j].querySelector('input');
            if (input) {
                table.rows[i].cells[j].innerText = input.value;
            }
        }
    }

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.table_to_sheet(table);
    XLSX.utils.book_append_sheet(wb, ws, "sheet1");
    XLSX.writeFile(wb, "spreadsheet.xlsx");

    // 다시 input 요소를 셀에 추가 및 기존의 focus 이벤트 리스너 추가
    for (let i = 1; i <= rows; i++) {
        for (let j = 1; j <= cols; j++) {
            const cell = table.rows[i].cells[j];
            if (!cell.querySelector('input')) {
                const input = document.createElement('input');
                cell.innerText = ''; // 셀의 내용 초기화
                cell.appendChild(input);
                attachFocusListener(input, i, j);
            }
        }
    }
}

btnExport.addEventListener('click', exportToExcel);
