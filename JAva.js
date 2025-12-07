// ==== CONTRACT CONFIG ====
const CONTRACT_ADDRESS = "0xf8e81D47203A594245E36C48e151709F0C19fBe8";

const CONTRACT_ABI = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "internalType": "address", "name": "student", "type": "address" },
      { "indexed": false, "internalType": "bool", "name": "eligible", "type": "bool" }
    ],
    "name": "EligibilityChecked",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "internalType": "address", "name": "sender", "type": "address" },
      { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }
    ],
    "name": "FundsReceived",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "internalType": "address", "name": "student", "type": "address" },
      { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }
    ],
    "name": "ScholarshipReleased",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "internalType": "address", "name": "student", "type": "address" },
      { "indexed": false, "internalType": "uint8", "name": "marks", "type": "uint8" },
      { "indexed": false, "internalType": "uint8", "name": "attendance", "type": "uint8" }
    ],
    "name": "StudentRegistered",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "MIN_ATTENDANCE",
    "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "MIN_MARKS",
    "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "admin",
    "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "deposit",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getBalance",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "address", "name": "_student", "type": "address" }],
    "name": "getStudent",
    "outputs": [
      { "internalType": "uint8", "name": "marks", "type": "uint8" },
      { "internalType": "uint8", "name": "attendance", "type": "uint8" },
      { "internalType": "bool", "name": "eligible", "type": "bool" },
      { "internalType": "bool", "name": "received", "type": "bool" },
      { "internalType": "uint256", "name": "appliedAt", "type": "uint256" },
      { "internalType": "uint256", "name": "releasedAt", "type": "uint256" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getTotalStudents",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "address", "name": "_student", "type": "address" }],
    "name": "manualRelease",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "scholarshipAmount",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "name": "studentList",
    "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "address", "name": "", "type": "address" }],
    "name": "students",
    "outputs": [
      { "internalType": "address", "name": "walletAddress", "type": "address" },
      { "internalType": "uint8", "name": "marks", "type": "uint8" },
      { "internalType": "uint8", "name": "attendance", "type": "uint8" },
      { "internalType": "bool", "name": "isEligible", "type": "bool" },
      { "internalType": "bool", "name": "hasReceived", "type": "bool" },
      { "internalType": "uint256", "name": "appliedAt", "type": "uint256" },
      { "internalType": "uint256", "name": "releasedAt", "type": "uint256" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "uint8", "name": "_marks", "type": "uint8" },
      { "internalType": "uint8", "name": "_attendance", "type": "uint8" }
    ],
    "name": "submitApplication",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "address", "name": "_newAdmin", "type": "address" }],
    "name": "transferAdmin",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "_amount", "type": "uint256" }],
    "name": "withdraw",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "stateMutability": "payable",
    "type": "receive"
  }
];

// ==== GLOBALS ====
let provider;
let signer;
let contract;
let currentAccount = null;

// 🎯 eligibility thresholds (will be updated from contract if possible)
let MIN_MARKS_REQ = 85;
let MIN_ATTENDANCE_REQ = 75;

// ==== DOM ELEMENTS ====
const walletDiv      = document.getElementById("wallet");
const marksInput     = document.getElementById("marks");
const attendanceInput= document.getElementById("attendance");
const submitBtn      = document.getElementById("submitBtn");
const statusBox      = document.getElementById("status");
const progressFill   = document.getElementById("progressFill");

// ==== HELPER: Update status message ====
function setStatus(message, type = "info") {
  statusBox.textContent = message;
  statusBox.classList.remove("error", "success", "info");
  statusBox.classList.add(type);
}

// ==== HELPER: Update progress bar ====
function updateProgress() {
  const marks = Number(marksInput.value) || 0;
  const attendance = Number(attendanceInput.value) || 0;

  // Simple average of marks & attendance
  let progress = (marks + attendance) / 2;
  if (progress > 100) progress = 100;
  if (progress < 0) progress = 0;

  progressFill.style.width = progress + "%";
}

// Attach input listeners to update progress bar
marksInput?.addEventListener("input", updateProgress);
attendanceInput?.addEventListener("input", updateProgress);

// ==== CONNECT WALLET (called from HTML button) ====
async function connectWallet() {
  if (typeof window.ethereum === "undefined") {
    alert("MetaMask not detected. Please install it.");
    return;
  }

  try {
    // 1. Ask MetaMask for accounts
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts"
    });

    if (!accounts || accounts.length === 0) {
      setStatus("No account selected in MetaMask.", "error");
      return;
    }

    currentAccount = accounts[0];
    walletDiv.textContent = `Connected: ${currentAccount}`;

    // 2. Create ethers provider & signer (v5 syntax)
    provider = new ethers.providers.Web3Provider(window.ethereum);
    signer   = provider.getSigner();

    // 3. Create contract instance
    contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

    // 4. Optional: Check network
    const network = await provider.getNetwork();
    console.log("Network:", network);

    if (network.chainId !== 114) {
      setStatus(`Warning: Connected to chainId ${network.chainId}. Switch to Coston2 (114) if needed.`, "info");
    } else {
      setStatus("Wallet connected on the correct network. You can submit your application now.", "success");
    }

    // ⭐ 5. Read eligibility criteria from contract (if set there)
    try {
      const minMarksBN = await contract.MIN_MARKS();
      const minAttendanceBN = await contract.MIN_ATTENDANCE();
      MIN_MARKS_REQ = minMarksBN.toNumber();
      MIN_ATTENDANCE_REQ = minAttendanceBN.toNumber();
      console.log("Min criteria from contract:", MIN_MARKS_REQ, MIN_ATTENDANCE_REQ);
      setStatus(
        `Wallet connected. Min criteria → Marks ≥ ${MIN_MARKS_REQ}, Attendance ≥ ${MIN_ATTENDANCE_REQ}.`,
        "success"
      );
    } catch (innerErr) {
      console.warn("Could not read MIN_* from contract, falling back to defaults.", innerErr);
    }

    // 6. Enable form inputs & button
    marksInput.disabled = false;
    attendanceInput.disabled = false;
    submitBtn.disabled = false;

  } catch (err) {
    console.error("connectWallet error:", err);
    setStatus("Failed to connect wallet. Check console for details.", "error");
  }
}

// ==== SUBMIT APPLICATION (called from HTML button) ====
async function submitApplication() {
  if (!contract || !signer || !currentAccount) {
    setStatus("Connect your wallet first.", "error");
    return;
  }

  const marks = Number(marksInput.value);
  const attendance = Number(attendanceInput.value);

  if (
    isNaN(marks) || isNaN(attendance) ||
    marks < 0 || marks > 100 ||
    attendance < 0 || attendance > 100
  ) {
    setStatus("Please enter valid marks and attendance (0–100).", "error");
    return;
  }

  // ⭐ FRONTEND ELIGIBILITY CHECK (no transaction if not eligible)
  if (marks < MIN_MARKS_REQ || attendance < MIN_ATTENDANCE_REQ) {
    setStatus(
      `You are not eligible. Need at least Marks ≥ ${MIN_MARKS_REQ} and Attendance ≥ ${MIN_ATTENDANCE_REQ}.`,
      "error"
    );
    return; // ❌ do NOT send the transaction
  }

  try {
    setStatus("Sending transaction to submit your application...", "info");
    submitBtn.disabled = true;

    const tx = await contract.submitApplication(marks, attendance);
    console.log("TX sent:", tx.hash);
    setStatus(`Transaction sent: ${tx.hash} \nWaiting for confirmation...`, "info");

    const receipt = await tx.wait();
    console.log("TX confirmed:", receipt);

    setStatus(`Application submitted successfully! ✅\nBlock: ${receipt.blockNumber}`, "success");
  } catch (err) {
    console.error("submitApplication error:", err);
    setStatus("Error submitting application: " + (err?.message || err), "error");
  } finally {
    submitBtn.disabled = false;
  }
}

// ==== HANDLE ACCOUNT / NETWORK CHANGES ====
if (typeof window.ethereum !== "undefined") {
  window.ethereum.on("accountsChanged", (accounts) => {
    if (!accounts || accounts.length === 0) {
      currentAccount = null;
      walletDiv.textContent = "Wallet Not Connected";
      marksInput.disabled = true;
      attendanceInput.disabled = true;
      submitBtn.disabled = true;
      setStatus("MetaMask account disconnected.", "info");
    } else {
      currentAccount = accounts[0];
      walletDiv.textContent = `Connected: ${currentAccount}`;
      marksInput.disabled = false;
      attendanceInput.disabled = false;
      submitBtn.disabled = false;
      setStatus("Account switched in MetaMask.", "info");
    }
  });

  window.ethereum.on("chainChanged", (_chainId) => {
    // Simple solution: reload to reset provider/contract
    window.location.reload();
  });
}
