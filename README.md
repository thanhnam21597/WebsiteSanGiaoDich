----------------------------Phần mêm-------------------------------
B1: Cài đặt chương trình
Cài đặt Visual Studio Code Version 1.47.2(user setup)
Cài đặt MongoDB Compass Community Version 1.21.2

----------------------------CSDL-------------------------------
B1: Click button CREATE DATABASE 
B2: Nhập Database Name có tên CoinDatabase1
B3: Tạo Collection Name bằng cách nhập tên các bảng 
	+ AccountUser
	+ Admin
	+ BuyExchanged(đăng mua)
	+ Customer(Khách hàng)
	+ MoneyRate(Lãi xuất)
	+ MoneyType(Thể loại tiền)
	+ SellExchanged(Đăng bán)
	+ TransactionHistory(Lịch sử giao dịch)
	+ Wallet(Ví Tiền)
	+ WalletAmmount(Số Tiền trong Ví)
B4: Chọn Button ADD DATA -> Chọn Import File (Json) trong tệp Database
	+ AccountUser
	+ Admin
	+ BuyExchanged(đăng mua)
	+ Customer(Khách hàng)
	+ MoneyRate(Lãi xuất)
	+ MoneyType(Thể loại tiền)
	+ SellExchanged(Đăng bán)
	+ TransactionHistory(Lịch sử giao dịch)
	+ Wallet(Ví Tiền)
	+ WalletAmmount(Số Tiền trong Ví)
----------------------------Hướng dẫn chạy chương trình-------------------------------
Phần 1 : Vào file Client -> Mở tệp my-app (Client) bằng Visual code 
	B1: Chọn Terminal -> Chọn New Terminal 
	B2: Nhập lệnh npm start

Phần 2 : Vào file Server -> Mở tệp Server_EJS(Server) bằng Visual code 
	B1: Chọn Terminal -> Chọn New Terminal 
	B2: Nhập lệnh npm run dev
	
----------------------------Thông tin đăng nhập-------------------------------
+ Tài khoản Khách hàng
	Nhập Tài khoản (Email) : thanhnam@gmail.com
	Mật khẩu : 123

+ Tài khoản Admin
	Nhập Tài khoản (Email) : thanhnam@gmail.com
	Mật khẩu : 123
