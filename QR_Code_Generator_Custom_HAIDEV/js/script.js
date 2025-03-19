// Lấy các phần tử từ DOM
const container = document.querySelector(".container");
const userInput = document.getElementById("userInput");
const submitBtn = document.getElementById("submit");
const downloadBtn = document.getElementById("download");
const sizeOptions = document.querySelector(".sizeOptions");
const BGColor = document.getElementById("BGColor");
const FGColor = document.getElementById("FGColor");

let sizeChoice = 100;
let BGColorChoice = "#ffffff";
let FGColorChoice = "#377dff";

// Gán giá trị mặc định cho các chọn lựa
window.onload = () => {
  container.innerHTML = "";
  sizeOptions.value = sizeChoice;
  userInput.value = "";
  BGColor.value = BGColorChoice;
  FGColor.value = FGColorChoice;
  submitBtn.disabled = true;
  downloadBtn.classList.add("hide");
  downloadBtn.disabled = true;
};

// Khi người dùng chọn kích thước
sizeOptions.addEventListener("change", () => {
  sizeChoice = parseInt(sizeOptions.value);
});

// Khi chọn màu nền
BGColor.addEventListener("input", () => {
  BGColorChoice = BGColor.value;
});

// Khi chọn màu QR
FGColor.addEventListener("input", () => {
  FGColorChoice = FGColor.value;
});

// Khi người dùng nhập vào input
userInput.addEventListener("input", () => {
  const value = userInput.value.trim();
  submitBtn.disabled = value.length < 1;
  if (value.length < 1) {
    downloadBtn.classList.add("hide");
    downloadBtn.disabled = true;
  }
});

// Hàm format input nếu cần
const inputFormatter = (value) => {
  return value.replace(/[^a-z0-9A-Z]+/g, "");
};

// Khi click Generate
submitBtn.addEventListener("click", () => {
  container.innerHTML = "";

  new QRCode(container, {
    text: userInput.value,
    width: sizeChoice,
    height: sizeChoice,
    colorDark: FGColorChoice,
    colorLight: BGColorChoice,
  });

  // Đợi render QR xong rồi bật nút Download
  setTimeout(() => {
    const canvas = container.querySelector("canvas");
    if (canvas) {
      downloadBtn.classList.remove("hide");
      downloadBtn.disabled = false;
    }
  }, 300);
});

// Khi click Download
downloadBtn.addEventListener("click", () => {
  const canvas = container.querySelector("canvas");
  if (!canvas) return;

  const imageData = canvas.toDataURL("image/png");

  // Tạo thẻ a ẩn để thực hiện tải
  const link = document.createElement("a");
  link.href = imageData;

  // Tạo tên file QRCode-năm-tháng-ngày.png
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  const filename = `QRCode-${yyyy}-${mm}-${dd}.png`;

  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
});
