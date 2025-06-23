# WJ 電商網站（前端）

使用 Vue 3 + Pinia + Vue Router + Tailwind CSS + Axios 製作的簡易電商網站前端，支援會員登入、第三方登入（Google）、購物車、訂單紀錄，以及藍新金流（NewebPay）整合，模擬真實電商購物流程。

## 目前已完成功能

- [x] 網站原生登入、自動註冊 (輸入無註冊過的帳號密碼會自動註冊)
- [x] 第三方登入 (GOOGLE)
- [x] 增加、移除購物車
- [x] 第三方金流 (藍新金流)
- [x] 簡易訂單紀錄
- [x] 商品頁面排序功能
- [x] 儲存用戶購物資訊

## 網站畫面

![](https://live.staticflickr.com/65535/54607463182_53983c6980_b.jpg)
![](https://live.staticflickr.com/65535/54607463452_467e815aa7_b.jpg)
![](https://live.staticflickr.com/65535/54608551523_ae906e2b50_b.jpg)

## 安裝

以下將會引導你如何安裝此專案到你的電腦上。

### 取得專案

```
git clone https://github.com/Wandaihsien/WJ-frontend
```

### 移動到專案內

```
cd WJ-frontend
```

### 安裝套件

```
npm install
```

### 運行專案

```
npm run dev
```

### 開啟專案

運行後會自動開啟瀏覽器，或在瀏覽器輸入以下網址

```
http://localhost:5173/
```

## 資料夾

- views - 主要頁面
- components - 組件
- stores - pinia狀態管理
- assets - 靜態資源

## 環境變數

- VITE_API_URL="" #後端網址
- VITE_BASE_URL="" #前端網址
- VITE_GOOGLE_CLIENT_ID="" #GOOGLE CLIENT ID

## 聯絡作者

可以透過以下方式與我聯絡

- github :https://github.com/Wandaihsien
- email :graywolf7235@gmail.com
