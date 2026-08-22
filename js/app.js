import { RaffleEngine } from './raffleEngine.js';
import { audioEngine } from './audio.js';
import { ConfettiFX } from './confetti.js';

class AppController {
  constructor() {
    this.engine = new RaffleEngine();
    this.confetti = new ConfettiFX('confetti-canvas');
    
    this.spinning = false;
    this.spinTimer = null;
    this.currentBatchResult = null;

    this.initDOMReferences();
    this.bindEvents();
    this.renderAll();
  }

  initDOMReferences() {
    this.tabs = document.querySelectorAll('.tab-btn');
    this.tabContents = document.querySelectorAll('.tab-content');

    this.stagePrizeList = document.getElementById('stage-prize-list');
    this.stageRuleAlert = document.getElementById('stage-rule-alert');
    this.stageArenaBox = document.getElementById('stage-arena-box');
    this.stageActiveBadge = document.getElementById('stage-active-badge');
    this.stageActivePrizeName = document.getElementById('stage-active-prize-name');
    
    this.spinnerNameDisplay = document.getElementById('spinner-name-display');
    this.spinnerSubDisplay = document.getElementById('spinner-sub-display');
    
    this.btnSpinStart = document.getElementById('btn-spin-start');
    this.btnResetStagePrize = document.getElementById('btn-reset-stage-prize');

    this.statEligibleCount = document.getElementById('stat-eligible-count');
    this.statTotalWinners = document.getElementById('stat-total-winners');

    this.navCountParticipants = document.getElementById('nav-count-participants');
    this.navCountWinners = document.getElementById('nav-count-winners');

    this.bulkInputText = document.getElementById('bulk-input-text');
    this.btnBulkAdd = document.getElementById('btn-bulk-add');
    this.btnImportSample = document.getElementById('btn-import-sample');
    this.btnImportExcel = document.getElementById('btn-import-excel');
    this.fileImportExcel = document.getElementById('file-import-excel');
    this.btnResetParticipants = document.getElementById('btn-reset-participants');
    this.searchParticipantInput = document.getElementById('search-participant-input');
    this.participantsTableBody = document.getElementById('participants-table-body');

    this.btnExportCSV = document.getElementById('btn-export-csv');
    this.btnResetWinners = document.getElementById('btn-reset-winners');
    this.winnersTableBody = document.getElementById('winners-table-body');

    this.winnerModal = document.getElementById('winner-modal');
    this.winnerCard = document.getElementById('winner-card');
    this.modalPrizeTag = document.getElementById('modal-prize-tag');
    this.modalWinnerCountSub = document.getElementById('modal-winner-count-sub');
    this.modalWinnerGrid = document.getElementById('modal-winner-grid');
    this.btnModalSave = document.getElementById('btn-modal-save');
    this.btnModalRedraw = document.getElementById('btn-modal-redraw');

    this.audioToggleBtn = document.getElementById('audio-toggle-btn');
  }

  bindEvents() {
    this.tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const targetTabId = tab.getAttribute('data-tab');
        this.switchTab(targetTabId);
      });
    });

    this.btnSpinStart.addEventListener('click', () => {
      if (!this.spinning) {
        this.startSpin();
      } else if (!this.decelerating) {
        this.stopSpin();
      }
    });

    if (this.btnResetStagePrize) {
      this.btnResetStagePrize.addEventListener('click', () => {
        if (this.spinning) return;
        const activePrize = this.engine.getActivePrize();
        if (!activePrize) return;
        if (confirm(`Apakah Anda yakin ingin mereset pemenang khusus untuk kategori "${activePrize.name}"?`)) {
          this.engine.resetWinnersForPrize(activePrize.id);
          this.currentBatchResult = null;
          this.spinnerNameDisplay.textContent = 'SIAP DIUNDI';
          this.renderAll();
          alert(`Hasil pemenang untuk "${activePrize.name}" berhasil direset! Kuota dan status Pekerja telah dikembalikan.`);
        }
      });
    }

    document.addEventListener('keydown', (e) => {
      if (e.code === 'Space' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
        e.preventDefault();
        if (this.spinning) {
          if (!this.decelerating) {
            this.stopSpin();
          }
        } else {
          this.startSpin();
        }
      }
    });

    this.btnBulkAdd.addEventListener('click', () => {
      const text = this.bulkInputText.value;
      if (!text.trim()) return alert('Masukkan teks data Pekerja terlebih dahulu.');
      const count = this.engine.addBulkParticipants(text);
      this.bulkInputText.value = '';
      alert(`Berhasil menambahkan ${count} Pekerja baru!`);
      this.renderAll();
    });

    if (this.btnImportExcel && this.fileImportExcel) {
      this.btnImportExcel.addEventListener('click', () => {
        this.fileImportExcel.click();
      });

      this.fileImportExcel.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (evt) => {
          try {
            const data = new Uint8Array(evt.target.result);
            const workbook = window.XLSX.read(data, { type: 'array' });
            const firstSheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[firstSheetName];
            const jsonRows = window.XLSX.utils.sheet_to_json(worksheet, { header: 1 });
            
            let rowsToProcess = jsonRows;
            if (jsonRows.length > 0 && Array.isArray(jsonRows[0]) && typeof jsonRows[0][0] === 'string' && (jsonRows[0][0].toLowerCase().includes('nama') || jsonRows[0][0].toLowerCase().includes('no'))) {
              rowsToProcess = jsonRows.slice(1);
            }

            const added = this.engine.importFromParsedRows(rowsToProcess);
            alert(`Berhasil mengimpor ${added} data Pekerja dari file "${file.name}"!`);
            this.fileImportExcel.value = '';
            this.renderAll();
          } catch (err) {
            console.error("Excel import error:", err);
            alert("Gagal membaca file Excel/CSV. Pastikan format file valid.");
          }
        };
        reader.readAsArrayBuffer(file);
      });
    }

    this.btnImportSample.addEventListener('click', () => {
      if (confirm('Load ulang dengan 65 data sampel Pekerja lengkap?')) {
        this.engine.initDefaultData();
        this.renderAll();
      }
    });

    this.btnResetParticipants.addEventListener('click', () => {
      if (confirm('Hapus seluruh daftar Pekerja? (Data pemenang juga akan direset)')) {
        this.engine.participants = [];
        this.engine.winners = [];
        this.engine.saveState();
        this.renderAll();
      }
    });

    this.searchParticipantInput.addEventListener('input', () => {
      this.renderParticipantsTable();
    });

    this.btnExportCSV.addEventListener('click', () => {
      const success = this.engine.exportWinnersToCSV();
      if (!success) alert('Belum ada data pemenang untuk diunduh.');
    });

    this.btnResetWinners.addEventListener('click', () => {
      if (confirm('Apakah Anda yakin ingin mereset SELURUH rekap pemenang undian?')) {
        this.engine.resetWinnersOnly();
        this.currentBatchResult = null;
        this.spinnerNameDisplay.textContent = 'SIAP DIUNDI';
        this.renderAll();
        alert('Seluruh rekap pemenang undian berhasil direset! Kuota seluruh hadiah dan status Pekerja telah dikembalikan.');
      }
    });

    this.btnModalSave.addEventListener('click', () => {
      if (this.currentBatchResult) {
        const { selectedWinners, activePrize } = this.currentBatchResult;
        this.engine.confirmBatchWinners(selectedWinners, activePrize.id);
        this.closeWinnerModal();
        this.renderAll();
      }
    });

    this.btnModalRedraw.addEventListener('click', () => {
      this.closeWinnerModal();
      this.spinnerNameDisplay.textContent = 'SIAP DIUNDI';
    });

    this.audioToggleBtn.addEventListener('click', () => {
      const isMuted = audioEngine.toggleMute();
      this.audioToggleBtn.textContent = isMuted ? '🔇' : '🔊';
    });
  }

  switchTab(tabId) {
    this.tabs.forEach(t => t.classList.toggle('active', t.getAttribute('data-tab') === tabId));
    this.tabContents.forEach(c => c.classList.toggle('active', c.id === tabId));
  }

  renderAll() {
    this.renderStagePrizeList();
    this.renderStageArenaInfo();
    this.renderParticipantsTable();
    this.renderWinnersTable();

    const totalParticipants = this.engine.participants.length;
    const totalWinners = this.engine.winners.length;

    this.navCountParticipants.textContent = totalParticipants;
    this.navCountWinners.textContent = totalWinners;

    this.statTotalWinners.textContent = totalWinners;
  }

  getSessionInfo(prizeId) {
    // Sesi 1: Voucher MAP -> JETE TWS 1 (Hadiah 1-5)
    if (['prize_voucher', 'prize_bgi', 'prize_sandwich', 'prize_jete_spk', 'prize_tws1'].includes(prizeId)) {
      return { session: 1, title: 'SESI 1', colorClass: 'prize-color-orange' };
    }
    // Sesi 2: Kris Oven -> Magic Com By Jamkrindo (Hadiah 6-10)
    if (['prize_kris_oven', 'prize_air_fryer', 'prize_jete_mic', 'prize_fryer_oven', 'prize_magic_com'].includes(prizeId)) {
      return { session: 2, title: 'SESI 2', colorClass: 'prize-color-peach' };
    }
    // Sesi 3: Xiaomi Camera -> TV 40 Inch (Hadiah 11-14)
    if (['prize_xiaomi_cam', 'prize_dispenser', 'prize_vacum', 'prize_tv40'].includes(prizeId)) {
      return { session: 3, title: 'SESI 3', colorClass: 'prize-color-yellow' };
    }
    // Sesi Hadiah Utama: Sepeda Listrik & Motor (Hadiah 15-16)
    if (['prize_sepeda', 'prize_motor'].includes(prizeId)) {
      return { session: 4, title: 'SESI HADIAH UTAMA', colorClass: 'prize-color-green' };
    }
    return { session: 1, title: 'SESI 1', colorClass: 'prize-color-orange' };
  }

  getPrizeColorClass(prizeId) {
    return this.getSessionInfo(prizeId).colorClass;
  }

  renderStagePrizeList() {
    this.stagePrizeList.innerHTML = '';
    
    let currentSession = null;

    this.engine.prizes.forEach(prize => {
      const sessionInfo = this.getSessionInfo(prize.id);
      
      if (currentSession !== sessionInfo.session) {
        currentSession = sessionInfo.session;
        const headerEl = document.createElement('div');
        headerEl.className = 'session-header-divider';
        headerEl.innerHTML = `<span>${sessionInfo.title}</span>`;
        this.stagePrizeList.appendChild(headerEl);
      }

      const isSelected = prize.id === this.engine.activePrizeId;
      const colorClass = sessionInfo.colorClass;
      const el = document.createElement('div');
      el.className = `prize-item-option ${colorClass} ${isSelected ? 'active' : ''} ${prize.isGrandPrize ? 'is-grand-prize' : ''}`;
      
      const isFull = prize.wonCount >= prize.quota;

      el.innerHTML = `
        <div class="prize-name">${prize.name}</div>
        <div class="prize-meta">
          <span>Kuota: <strong>${prize.quota} Unit</strong> (Terundi: ${prize.wonCount})</span>
          <span style="color: ${isFull ? 'var(--danger)' : '#34D399'}">
            ${isFull ? '● Selesai' : '● Tersedia'}
          </span>
        </div>
      `;

      el.addEventListener('click', () => {
        if (this.spinning) return;
        this.engine.setActivePrize(prize.id);
        this.renderAll();
      });

      this.stagePrizeList.appendChild(el);
    });
  }

  renderStageArenaInfo() {
    const activePrize = this.engine.getActivePrize();
    const eligiblePool = this.engine.getEligibleParticipants();

    this.statEligibleCount.textContent = eligiblePool.length;

    if (!activePrize) {
      this.stageActivePrizeName.textContent = 'Belum ada hadiah';
      return;
    }

    const remainingQuota = activePrize.quota - activePrize.wonCount;
    this.stageActivePrizeName.textContent = `${activePrize.name} (${remainingQuota} Unit)`;

    if (activePrize.isGrandPrize) {
      this.stageArenaBox.classList.add('grand-mode');
      this.stageActiveBadge.textContent = '★ KATEGORI: HADIAH UTAMA MOTOR ★';
      this.stageRuleAlert.className = 'rule-alert grand-alert';
      this.stageRuleAlert.innerHTML = `
        ⭐ <strong>Aturan Hadiah Utama (MOTOR):</strong><br>
        Seluruh Pekerja (termasuk yang <strong>sudah memenangkan hadiah sebelumnya</strong>) berhak kembali untuk diundi memenangkan MOTOR!
      `;
    } else {
      this.stageArenaBox.classList.remove('grand-mode');
      this.stageActiveBadge.textContent = 'KATEGORI: HADIAH REGULER';
      this.stageRuleAlert.className = 'rule-alert';
      this.stageRuleAlert.innerHTML = `
        ℹ️ <strong>Aturan Hadiah Reguler:</strong> Pekerja yang sudah memenangkan hadiah biasa akan diistirahatkan pada pengundian hadiah reguler berikutnya.
      `;
    }

    if (!this.spinning) {
      this.spinnerNameDisplay.textContent = 'SIAP DIUNDI';
      this.btnSpinStart.disabled = false;
      this.btnSpinStart.classList.remove('btn-danger', 'btn-stop-glowing', 'is-stop-mode');
      if (activePrize && activePrize.isGrandPrize) {
        this.btnSpinStart.className = 'btn btn-gold btn-lg';
      } else {
        this.btnSpinStart.className = 'btn btn-primary btn-lg';
      }
      this.btnSpinStart.querySelector('span').textContent = '✨ ACAK NAMA SEKARANG';
      if (this.btnResetStagePrize) this.btnResetStagePrize.disabled = false;
    }
  }

  startSpin() {
    try {
      const batchResult = this.engine.drawBatchWinners();
      this.currentBatchResult = batchResult;

      this.spinning = true;
      this.decelerating = false;

      this.btnSpinStart.disabled = false;
      this.btnSpinStart.className = 'btn btn-danger btn-lg btn-stop-glowing is-stop-mode';
      this.btnSpinStart.querySelector('span').textContent = '⏹ BERHENTI';
      if (this.btnResetStagePrize) this.btnResetStagePrize.disabled = true;

      const eligiblePool = this.engine.getEligibleParticipants();
      let index = 0;
      let tickDelay = 45;

      const shuffleLoop = () => {
        if (!this.spinning || this.decelerating) return;

        if (Array.isArray(eligiblePool) && eligiblePool.length > 0) {
          const candidate = eligiblePool[index % eligiblePool.length];
          if (candidate && candidate.name) {
            this.spinnerNameDisplay.textContent = candidate.name;
          }
        }

        try {
          audioEngine.playTick(380 + (index % 12) * 25);
        } catch (e) {}
        index++;

        this.spinTimer = setTimeout(shuffleLoop, tickDelay);
      };

      shuffleLoop();

    } catch (err) {
      alert(err.message);
      this.spinning = false;
      this.decelerating = false;
      this.renderStageArenaInfo();
    }
  }

  stopSpin() {
    if (!this.spinning || this.decelerating) return;

    if (this.spinTimer) {
      clearTimeout(this.spinTimer);
      this.spinTimer = null;
    }
    
    this.decelerating = true;
    this.btnSpinStart.disabled = true;
    this.btnSpinStart.querySelector('span').textContent = '⏳ BERHENTI...';

    try {
      audioEngine.playStopClick();
    } catch (e) {}

    let eligiblePool = this.engine.getEligibleParticipants();
    if (!eligiblePool || eligiblePool.length === 0) {
      eligiblePool = this.engine.participants;
    }

    if (this.currentBatchResult) {
      this.autoDecelerate(eligiblePool, this.currentBatchResult);
    } else {
      this.spinning = false;
      this.decelerating = false;
      this.renderStageArenaInfo();
    }
  }

  autoDecelerate(eligiblePool, batchResult) {
    let steps = 0;
    const maxSteps = 12;
    const { selectedWinners, activePrize } = batchResult || {};

    try {
      audioEngine.playTension();
    } catch (e) {}

    const decelerate = () => {
      steps++;
      
      let candidateName = 'PEMENANG';
      if (selectedWinners && selectedWinners.length > 0 && steps >= maxSteps - 1) {
        if (selectedWinners.length === 1) {
          candidateName = selectedWinners[0] ? selectedWinners[0].name : 'PEMENANG';
        } else {
          candidateName = `${selectedWinners.length} PEMENANG TERPILIH!`;
        }
      } else if (Array.isArray(eligiblePool) && eligiblePool.length > 0) {
        const candidate = eligiblePool[Math.floor(Math.random() * eligiblePool.length)];
        if (candidate && candidate.name) {
          candidateName = candidate.name;
        }
      }

      this.spinnerNameDisplay.textContent = candidateName;

      if (steps >= maxSteps) {
        this.spinning = false;
        this.decelerating = false;

        this.renderStageArenaInfo();

        setTimeout(() => {
          if (selectedWinners && activePrize) {
            this.showBatchWinnerModal(selectedWinners, activePrize);
          }
        }, 500);

      } else {
        try {
          audioEngine.playTick(200 + steps * 20);
        } catch (e) {}
        const delay = 50 + Math.pow(steps, 1.7) * 10;
        setTimeout(decelerate, delay);
      }
    };

    decelerate();
  }

  showBatchWinnerModal(selectedWinners, prize) {
    this.modalPrizeTag.textContent = prize.name;
    this.modalWinnerCountSub.textContent = `SELAMAT UNTUK ${selectedWinners.length} PEMENANG 🎉`;

    if (prize.isGrandPrize) {
      this.winnerCard.classList.add('is-grand-prize');
    } else {
      this.winnerCard.classList.remove('is-grand-prize');
    }

    this.modalWinnerGrid.innerHTML = '';
    if (selectedWinners.length === 1) {
      this.modalWinnerGrid.className = 'batch-winner-grid single-winner';
    } else {
      this.modalWinnerGrid.className = 'batch-winner-grid';
    }

    selectedWinners.forEach((winner, index) => {
      const chip = document.createElement('div');
      chip.className = 'batch-winner-chip';
      chip.style.animationDelay = `${index * 0.05}s`;

      chip.innerHTML = `
        <div class="winner-num-badge">${index + 1}</div>
        <div class="winner-chip-details">
          <div class="winner-chip-name">${winner.name}</div>
          <div class="winner-chip-dept">${winner.dept || 'Unit Kerja'}${winner.position ? ' • ' + winner.position : ''}</div>
        </div>
      `;

      this.modalWinnerGrid.appendChild(chip);
    });

    this.winnerModal.classList.add('open');
    this.confetti.burst(selectedWinners.length > 5 ? 200 : 120, prize.isGrandPrize);
    audioEngine.playFanfare();
  }

  closeWinnerModal() {
    this.winnerModal.classList.remove('open');
    this.confetti.stop();
  }

  renderParticipantsTable() {
    const query = (this.searchParticipantInput.value || '').toLowerCase().trim();
    this.participantsTableBody.innerHTML = '';

    const filtered = this.engine.participants.filter(p => {
      return p.name.toLowerCase().includes(query) || 
             (p.dept && p.dept.toLowerCase().includes(query)) ||
             (p.position && p.position.toLowerCase().includes(query));
    });

    if (filtered.length === 0) {
      this.participantsTableBody.innerHTML = `<tr><td colspan="7" style="text-align:center; color: var(--text-muted); padding: 2rem;">Belum ada data Pekerja</td></tr>`;
      return;
    }

    filtered.forEach((p, idx) => {
      const hasWonRegular = p.wonPrizes.length > 0;
      
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${idx + 1}</td>
        <td style="font-weight: 700;">${p.name}</td>
        <td>${p.dept || '-'}</td>
        <td style="color: var(--text-sky); font-weight: 600;">${p.position || '-'}</td>
        <td>
          <span class="status-badge ${hasWonRegular ? 'won' : 'active'}">
            ${hasWonRegular ? '🏆 Sudah Menang (Tersaring)' : '✓ Aktif (Bisa Diundi)'}
          </span>
        </td>
        <td>
          <span class="status-badge active" style="background: rgba(251, 186, 21, 0.15); color: #FBBA15; border-color: rgba(251, 186, 21, 0.4);">
            ⭐ Always Active (MOTOR)
          </span>
        </td>
        <td>
          <button class="btn btn-danger btn-icon" title="Hapus Pekerja" style="width: 32px; height: 32px;">✕</button>
        </td>
      `;

      tr.querySelector('.btn-danger').addEventListener('click', () => {
        if (confirm(`Hapus Pekerja "${p.name}"?`)) {
          this.engine.deleteParticipant(p.id);
          this.renderAll();
        }
      });

      this.participantsTableBody.appendChild(tr);
    });
  }

  renderWinnersTable() {
    this.winnersTableBody.innerHTML = '';

    if (this.engine.winners.length === 0) {
      this.winnersTableBody.innerHTML = `<tr><td colspan="8" style="text-align:center; color: var(--text-muted); padding: 2rem;">Belum ada pemenang yang diundi</td></tr>`;
      return;
    }

    this.engine.winners.forEach((w, idx) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${idx + 1}</td>
        <td style="font-weight: 700; color: #fff;">${w.participantName}</td>
        <td>${w.dept || '-'}</td>
        <td style="color: var(--text-sky); font-weight: 600;">${w.position || '-'}</td>
        <td style="font-weight: 700; color: var(--primary-bright);">${w.prizeName}</td>
        <td>${w.isGrandPrize ? '<span class="status-badge won">★ Hadiah Utama MOTOR</span>' : '<span class="status-badge active">Hadiah Reguler</span>'}</td>
        <td style="color: var(--text-muted); font-size: 0.85rem;">${w.wonAt}</td>
        <td>
          <button class="btn btn-danger btn-icon" title="Hapus Pemenang Ini" style="width: 32px; height: 32px;">✕</button>
        </td>
      `;

      tr.querySelector('.btn-danger').addEventListener('click', () => {
        if (confirm(`Batalkan pemenang "${w.participantName}" untuk hadiah "${w.prizeName}"?`)) {
          this.engine.deleteSingleWinner(w.id);
          this.renderAll();
        }
      });

      this.winnersTableBody.appendChild(tr);
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.app = new AppController();
});
