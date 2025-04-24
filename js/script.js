// SIDEBAR TOGGLE

let sidebarOpen = false;
const sidebar = document.getElementById('sidebar');

function openSidebar() {
  if (!sidebarOpen) {
    sidebar.classList.add('sidebar-responsive');
    sidebarOpen = true;
  }
}

function closeSidebar() {
  if (sidebarOpen) {
    sidebar.classList.remove('sidebar-responsive');
    sidebarOpen = false;
  }
}

document.getElementById("dataForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const followers = parseInt(document.getElementById("followers").value);

  db.collection("pengguna").add({
    username: username,
    followers: followers,
    timestamp: new Date()
  })
  .then(() => {
    alert("Data tersimpan!");
    tampilkanData();
    document.getElementById("dataForm").reset();
  })
  .catch((error) => {
    console.error("Error simpan data:", error);
  });
});

function tampilkanData() {
  const list = document.getElementById("dataList");
  list.innerHTML = "";

  db.collection("pengguna").orderBy("timestamp", "desc").get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        const data = doc.data();
        const item = document.createElement("div");
        item.innerHTML = `<strong>${data.username}</strong> - ${data.followers} followers`;
        list.appendChild(item);
      });
    });
}

// Jalankan saat halaman dimuat
tampilkanData();
