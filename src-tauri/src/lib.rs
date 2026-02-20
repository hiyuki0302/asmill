use std::collections::HashMap;
use std::fs;
use encoding_rs::SHIFT_JIS;

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn read_csv(path: String) -> Result<Vec<HashMap<String, String>>, String> {
    // ファイルをバイト列として読み込み、Shift-JIS → UTF-8 に変換
    let bytes = fs::read(&path)
        .map_err(|e| format!("Failed to read file: {}", e))?;
    let (utf8_str, _, _) = SHIFT_JIS.decode(&bytes);

    let mut reader = csv::Reader::from_reader(utf8_str.as_bytes());

    // CSVの1行目をカラムとする。 返り値はStringRecord。headers.get(0)でカラムを取得できる。
    // 後にreader.recordsで可変借用するため、.clone()を利用。
    let headers = reader
        .headers()
        .map_err(|e| format!("Failed to read headers: {}", e))?
        .clone();

    // 表示したいカラム名を指定
    let target_columns = vec!["USERNAME", "Example01"];

    // 対象カラムのインデックスとカラム名を取得
    let target_indices: Vec<(usize, String)> = headers
        .iter()
        .enumerate()
        .filter(|(_, col)| target_columns.contains(&col))
        .map(|(i, col)| (i, col.to_string()))
        .collect();

    // 1行目以降を取得。.map_err()で取り出しに成功した値のみrecordに入れる。
    // resultの返り値は<StringRecord, Error>なので、format!でStringにしている。
    // 対象カラムだけを取り出してHashMapに格納
    let mut records = Vec::new();
    for result in reader.records() {
        let record = result.map_err(|e| format!("Failed to read record: {}", e))?;
        let mut row = HashMap::new();
        for (i, key) in &target_indices {
            let value = record.get(*i).unwrap_or("").to_string();
            row.insert(key.clone(), value);
        }
        records.push(row);
    }

    Ok(records)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![greet, read_csv])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
