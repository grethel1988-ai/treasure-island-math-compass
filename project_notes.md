# 專案開發筆記 - 第三學習階段數學遊戲題庫 (收工版)

## 完成事項
- 初始化專案 Git 倉庫，並設定 `main` 分支。
- 撰寫 `README.md`、`.gitignore`、`ANTIGRAVITY.md`。
- 從高年級 24 個指標中抽取 50 題，將情境成功改寫為《金銀島》名著主題（整合比利·蓬斯、吉姆·霍金斯、班·甘恩、西爾弗等角色及地標場景，並套用引號「」）。
- 實作 `generate_game_db.py`，並使用正則解析器自動將 `/` 分數轉換為 OMML (Office Math Markup Language) 垂直分數與帶分數方程式。
- 生成排版美觀且符合國小教科書標準的 `第三學習階段遊戲題庫.docx`。
- 透過自動化驗證腳本確認題目數（50 題）、指標數（24 個）與選項完整性。
- 所有的程式碼、筆記與成果皆已 staged 並進行 Git Commit 存檔。

## 踩坑紀錄 (Lessons Learned)
- **指標名稱拼寫一致性**：在 `generate_game_db.py` 中，如果同一個指標的名稱在不同的題目間有微小差異（例如一個用 `and`、另一個用 `和`），會導致生成 Word 時判定為不同指標而重複輸出指標標題。未來需確保資料字典的鍵值完全一致。
- **寫入衝突 (Permission Error)**：若使用者在 Microsoft Word 中開著生成的 `.docx` 檔案，Python 執行寫入時會拋出 `PermissionError`。已在程式中加入 try-except 進行異常處理，給予使用者友善的關閉提示，避免程式崩潰。
- **Word 方程式生成 (OMML)**：`python-docx` 預設不支援高階數學公式，需要手動構造與注入 OMML XML。使用正則表達式分離出常規文字與分數/帶分數格式，並利用 `parse_xml` 動態加入 `<m:oMath>`，是生成標準教科書格式的有效做法。

## 下一步計畫
- **匯入與測試**：若需將題庫匯入至特定線上測驗系統，可基於目前的 `generate_game_db.py` 擴充輸出格式（例如 JSON 或 Excel 格式）。
