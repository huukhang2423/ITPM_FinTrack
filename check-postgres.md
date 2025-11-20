# Kiểm tra PostgreSQL

## Cách 1: Services (Windows)
1. Nhấn `Win + R`
2. Gõ: `services.msc`
3. Tìm "postgresql-x64-14" hoặc "PostgreSQL 14 Server"
4. Phải có status "Running"
5. Nếu "Stopped": Right-click → Start

## Cách 2: Task Manager
1. Nhấn `Ctrl + Shift + Esc`
2. Tab "Services"
3. Tìm "postgresql"
4. Phải có status "Running"

## Cách 3: Command Line
Mở PowerShell và chạy:
```powershell
Get-Service -Name postgresql*
```

Output mong muốn:
```
Status   Name               DisplayName
------   ----               -----------
Running  postgresql-x64-14  postgresql-x64-14 - PostgreSQL Server 14
```

## Nếu PostgreSQL không chạy:

### Start Service:
```powershell
Start-Service postgresql-x64-14
```

### Hoặc dùng GUI:
1. Services → Right-click "postgresql-x64-14"
2. Click "Start"

## Test kết nối sau khi database đã tạo:

Trong PowerShell, chạy:
```powershell
cd C:\Users\Admin\Desktop\ITPM_PROJ\server
npx prisma db pull
```

Nếu kết nối thành công, bạn sẽ không thấy lỗi "Can't reach database server"
