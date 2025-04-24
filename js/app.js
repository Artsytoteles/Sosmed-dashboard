document.getElementById("dataForm").addEventListener("submit", function (e) {
    e.preventDefault();
  
    const username = document.getElementById("username").value.trim();
    const followers = parseInt(document.getElementById("followers").value);
  
    if (!username || isNaN(followers)) {
      alert("Semua field wajib diisi!");
      return;
    }
  
    db.collection("pengguna").add({
      username: username,
      followers: followers,
      timestamp: new Date()
    })
    .then(() => {
      alert("Data berhasil disimpan!");
      tampilkanData();
      document.getElementById("dataForm").reset();
    })
    .catch(error => console.error("Error menyimpan:", error));
  });
  function tampilkanData() {
    const list = document.getElementById("dataList");
    list.innerHTML = "";
  
    db.collection("pengguna").orderBy("timestamp", "desc").get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          const data = doc.data();
          const card = document.createElement("div");
          card.className = "bg-white p-4 rounded shadow";
  
          card.innerHTML = `
            <h2 class="font-bold text-lg">${data.username}</h2>
            <p class="text-gray-600">${data.followers} Followers</p>
          `;
  
          list.appendChild(card);
        });
      });
  }
  
  tampilkanData();
    