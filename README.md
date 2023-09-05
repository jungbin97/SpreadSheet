# Spread Sheet만들기 (readme 작성중)

## [<결과물 링크(버그 수정중)>](https://jungbin97.github.io/SpreadSheet/)

![Aug-09-2023 16-56-50](https://github.com/jungbin97/SpreadSheet/assets/57621519/69372e11-51e4-42a0-ac73-ebc1081539f3)

# Spread Sheet 기능 분석
spreadsheet는 데이터 저장, 수식 처리, 드래그 앤 드롭, 셀 크기 조절 등 실제로 풍부한 기능을 가지고 있습니다. 하지만 이러한 기능을 모두 직접 구현하기에는 어려움이 있습니다.
최소한의 라이브러리로 구현하고자 상단 이미지에 해당하는 기능을 분석해 구현 해보도록 하겠습니다.

## 셀 생성
html로 작성해도 되지만 table안에 행과 열(셀)들이 반복되어 있고, 개수 확장에 용이하므로 반복문으로 DOM insertRow(), insertCell()메소드로 직접 삽입합니다.

![스크린샷 2023-09-06 오전 1 02 38](https://github.com/jungbin97/SpreadSheet/assets/57621519/40de267a-33eb-4847-bbc7-1ada5a10be76)

## 셀 내부에 값을 삽입
헤더 행, 열을 제외한 모든 셀에 input 엘리먼트를 추가해주어 입력값을 받을 수 있도록 합니다.
![image](https://github.com/jungbin97/SpreadSheet/assets/57621519/911e1f3a-b265-4653-8aee-6dc2435f9bcf)


## focusing된 셀의 위치를 반환 및 행 헤더, 열 헤더 색상 변경하기(하늘색)
`attachFocusListener(input, i, j)` i, j에 현재 셀의 행, 열 값이 들어가며, `input.addEventListener()`를 이용해 focus되었다면 하늘색으로 변경, blur 이벤트로 포커스 잃었을때 를 처리해줬습니다.
![image](https://github.com/jungbin97/SpreadSheet/assets/57621519/a0257677-a981-431e-8f28-066233053396)


## Export SpreadSheet버튼 눌러서 Excel파일 생성
- SheetJS의 xlsx 라이브러리 사용

---
# 버그 수정
## cell에 입력한 input 값이 반영되지 않는 버그
화면상의 셀 안에 입력이 되어도 값이 저장 되어 있지 않다는 사실을 까먹고 있었다. \<input>의 값을 테이블의 셀에 삽입한 후 엑셀로 변환해야 된다.
![image](https://github.com/jungbin97/SpreadSheet/assets/57621519/205bb070-6e1c-4e36-ad4f-dc48b3b78f28)

## 행 열 헤드(첫번째 행, 첫번째 열) 부분이 xlsx 파일에도 반영되는 버그(수정중)
