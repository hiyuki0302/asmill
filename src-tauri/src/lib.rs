use std::collections::HashMap;

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn read_csv(path: String) -> Result<Vec<HashMap<String, String>>, String> {
    let mut reader = csv::Reader::from_path(&path)
        .map_err(|e| format!("Failed to open CSV: {}", e))?;
    
    // CSVの1行目をカラムとする。 返り値はStringRecord。headers.get(0)でカラムを取得できる。
    // 後にreader.recordsで可変借用するため、.clone()を利用。
    let headers = reader
        .headers()
        .map_err(|e| format!("Failed to read headers: {}", e))?
        .clone();

    
    // 1行目以降を取得。.map_err()で取り出しに成功した値のみrecordに入れる。
    // resultの返り値は<StringRecord, Error>なので、format!でStringにしている。
    let mut records = Vec::new();
    for result in reader.records() {
        let record = result.map_err(|e| format!("Failed to read record: {}", e))?;
        let mut row = HashMap::new();
        for (i, field) in record.iter().enumerate() {
            let key = headers.get(i).unwrap_or("").to_string();
            row.insert(key, field.to_string());
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
