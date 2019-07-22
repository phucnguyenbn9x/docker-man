# docker-man

### Install Docker Before install Docker Man
### Windows
Open Docker Setting
    - In General: Enable Expose  Daemon on tcp://localhost:2375
    - In Shared Drives: Share drive C: for Docker
    - In Daemon: add 118.70.171.246:30555 into Insecure registries
Finally, quit and restart docker
### Install Docker Man
Download file settup in ""

Note: I2G Local yêu cầu chạy Hyper-V service. Vì vậy, những phần mềm bên thứ 3 khác mà yêu cầu tắt Hyper-V sẽ tạm thời không sử dụng được.
Để bật tắt Hyper-V, truy cập đường dẫn: C:\Program File (x86)\Docker Man\init
Run hyper-v.bat
1. Disable Hyber-V: Khi chọn option này, bạn sẽ không sử dụng được I2G Local và sử dụng được các phần mềm bên thứ 3 khác
2. Enable Hyoer-V: Khi chọn option này, bạn sẽ sử dụng I2G Local và không sử dụng được 1 số phần mềm bên thứ 3 khác yêu cầu tắt Hyper-V


HƯỚNG DẪN TẠO FILE EXE:
1. Chạy npm install
2. CHạy npm run package-windows
3. Chạy npm run 
4. Chạy npm run build
5. Vào folder native-app: copy file init vào trong file windows vừa sinh
6. Sửa link trong file Dockerman - thanh.iss
7. Chạy file dockerman-thanh.iss bằng innoSetup
