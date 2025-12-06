<!-- Load ABI from GitHub Gist (RAW link!) -->
<script src="https://gist.githubusercontent.com/kushalchalla981-tech/3a6b62052516b07bed769c8b75a99f71/raw/abi.js"></script>

<script>
const contractAddress = "0xfE44C4AceEC49c31c44894733662E47E521904F0";

let account;

// Connect Wallet
async function connectWallet() {
  if (!window.ethereum) return alert("MetaMask not installed");

  try {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    account = accounts[0];
    document.getElementById("wallet").innerText = "Connected: " + account;
  } catch (err) {
    console.error(err);
    alert("Wallet connection failed.");
  }
}

// Submit application
async function releaseScholarship() {
  const marksInput = document.getElementById("marks");
  const attendanceInput = document.getElementById("attendance");
  const statusEl = document.getElementById("status");

  let marks = Number(marksInput.value);
  let attendance = Number(attendanceInput.value);

  if (!account) return (statusEl.innerText = "❌ Connect wallet first.");
  if (!marksInput.value || !attendanceInput.value)
    return (statusEl.innerText = "❌ Fill both values.");
  if (
    isNaN(marks) ||
    isNaN(attendance) ||
    marks < 0 ||
    marks > 100 ||
    attendance < 0 ||
    attendance > 100
  )
    return (statusEl.innerText = "❌ Values must be 0–100.");

  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    // ⭐ ABI loaded from Gist
    const contract = new ethers.Contract(contractAddress, contractABI, signer);

    statusEl.innerText = "⏳ Sending transaction...";

    const tx = await contract.submitApplication(marks, attendance);

    statusEl.innerText = "⏳ Waiting for confirmation...";

    await tx.wait();

    statusEl.innerText = "✅ Application submitted on-chain!";
  } catch (err) {
    console.error(err);
    statusEl.innerText = "❌ Transaction failed.";
  }
}
</script>
