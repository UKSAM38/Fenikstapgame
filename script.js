// HTML Elementleri
const appContainer = document.getElementById('app-container');
const bonusContainer = document.getElementById('bonus-container');
const menuEarn = document.getElementById('menu-earn');
const menuHome = document.getElementById('menu-home');
const claimBonusButton = document.getElementById('claim-bonus');
const bonusMessage = document.getElementById('bonus-message');
const backHomeButton = document.getElementById('back-home');
const bonusDays = document.querySelectorAll('.bonus-day');
const coinCounter = document.getElementById("coin-counter");
const energyBar = document.getElementById("energy-bar");
const energyText = document.getElementById("energy-text");
const phoenix = document.getElementById("phoenix");

let coins = 0;
let currentDay = 0;
let lastClaimDate = null;
let energy = 1000;
let maxEnergy = 1000;
let level = 1;
let earnPerTap = 1;

// Enerji güncelleme fonksiyonu
function updateEnergyDisplay() {
    energyBar.style.width = `${(energy / maxEnergy) * 100}%`;
    energyText.textContent = `Energy: ${energy} / ${maxEnergy}`;
}

// Feniks'e tıklama
phoenix.addEventListener("click", () => {
    if (energy > 0) {
        coins += earnPerTap;
        energy -= 1;
        coinCounter.textContent = coins;
        updateEnergyDisplay();
    }
});

updateEnergyDisplay();

// Earn butonuna basıldığında günlük bonus ekranını göster
menuEarn.addEventListener('click', () => {
    appContainer.style.display = 'none';
    bonusContainer.style.display = 'block';
    updateBonusDisplay();
});

// Home butonuna basıldığında ana ekrana dön
menuHome.addEventListener('click', () => {
    bonusContainer.style.display = 'none';
    appContainer.style.display = 'block';
});

// Back to Home butonuna basıldığında ana ekrana dön
backHomeButton.addEventListener('click', () => {
    bonusContainer.style.display = 'none';
    appContainer.style.display = 'block';
    bonusMessage.textContent = ''; // Mesajı sıfırla
});

// Bonus talep etme işlemi
claimBonusButton.addEventListener('click', () => {
    const today = new Date().toDateString();

    if (lastClaimDate === today) {
        bonusMessage.textContent = "You've already claimed your bonus today!";
        return;
    }

    if (currentDay >= bonusDays.length) {
        currentDay = 0; // Haftalık döngü başa dönüyor
    }

    // Bonus ödülünü al
    const bonus = (currentDay + 1) * 10;
    coins += bonus;
    coinCounter.textContent = coins;

    bonusMessage.textContent = `You claimed ${bonus} coins! Total Coins: ${coins}`;

    // Tarihi ve günü güncelle
    lastClaimDate = today;
    currentDay++;

    updateBonusDisplay();
});

// Günlük bonus ekranını güncelle
function updateBonusDisplay() {
    bonusDays.forEach((day, index) => {
        if (index < currentDay) {
            day.style.backgroundColor = '#444';
            day.style.color = '#aaa';
        } else {
            day.style.backgroundColor = '#222';
            day.style.color = '#ffcc00';
        }
    });
}

document.querySelectorAll('.bonus-day').forEach(button => {
    button.addEventListener('click', () => {
        if (!button.classList.contains('clicked')) {
            button.classList.add('clicked');
            button.style.animation = 'shake 0.3s ease';
        }
    });
});
