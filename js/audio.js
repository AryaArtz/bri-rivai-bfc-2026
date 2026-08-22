

class AudioEngine {
  constructor() {
    this.ctx = null;
    this.muted = false;
  }

  init() {
    try {
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) {
          this.ctx = new AudioCtx();
        }
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume().catch(() => {});
      }
    } catch (e) {
      console.warn("AudioContext init error:", e);
    }
  }

  toggleMute() {
    this.muted = !this.muted;
    return this.muted;
  }

  createNoiseBuffer() {
    if (this.noiseBuffer) return this.noiseBuffer;
    if (!this.ctx) return null;
    try {
      const bufferSize = this.ctx.sampleRate * 0.5;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }
      this.noiseBuffer = buffer;
      return buffer;
    } catch (e) {
      return null;
    }
  }

  playTick(frequency = 440) {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;

      // 1. Snare rattle / stick impact (Filtered noise burst)
      const noise = this.createNoiseBuffer();
      if (noise) {
        const noiseSource = this.ctx.createBufferSource();
        noiseSource.buffer = noise;

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'highpass';
        filter.frequency.setValueAtTime(1000, now);

        const noiseGain = this.ctx.createGain();
        noiseGain.gain.setValueAtTime(0.18, now);
        noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

        noiseSource.connect(filter);
        filter.connect(noiseGain);
        noiseGain.connect(this.ctx.destination);

        noiseSource.start(now);
        noiseSource.stop(now + 0.04);
      }

      // 2. Drumhead tone body (Low pitch drop)
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(180, now);
      osc.frequency.exponentialRampToValueAtTime(60, now + 0.05);

      gain.gain.setValueAtTime(0.22, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.05);
    } catch (e) {
      console.warn("Audio tick error:", e);
    }
  }

  playStopClick() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;

      // Heavy Kick + Snare accent
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(160, now);
      osc.frequency.exponentialRampToValueAtTime(35, now + 0.12);

      gain.gain.setValueAtTime(0.5, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.12);

      // Crisp snare rimshot noise
      const noise = this.createNoiseBuffer();
      if (noise) {
        const noiseSource = this.ctx.createBufferSource();
        noiseSource.buffer = noise;

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(1800, now);

        const noiseGain = this.ctx.createGain();
        noiseGain.gain.setValueAtTime(0.35, now);
        noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

        noiseSource.connect(filter);
        filter.connect(noiseGain);
        noiseGain.connect(this.ctx.destination);

        noiseSource.start(now);
        noiseSource.stop(now + 0.09);
      }
    } catch (e) {
      console.warn("Audio stop click error:", e);
    }
  }

  playTension() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const duration = 1.6;
      const totalHits = 22;

      for (let i = 0; i < totalHits; i++) {
        const progress = i / totalHits;
        const hitTime = now + Math.pow(progress, 0.85) * duration;
        const vol = 0.05 + progress * 0.22;

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(170 + progress * 40, hitTime);
        osc.frequency.exponentialRampToValueAtTime(60, hitTime + 0.04);

        gain.gain.setValueAtTime(vol, hitTime);
        gain.gain.exponentialRampToValueAtTime(0.001, hitTime + 0.04);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(hitTime);
        osc.stop(hitTime + 0.04);
      }
    } catch (e) {
      console.warn("Audio tension error:", e);
    }
  }

  playFanfare() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const notes = [
        { note: 523.25, time: 0.0, duration: 0.15 }, 
        { note: 659.25, time: 0.15, duration: 0.15 }, 
        { note: 783.99, time: 0.30, duration: 0.15 }, 
        { note: 1046.50, time: 0.45, duration: 0.8 }  
      ];

      notes.forEach(({ note, time, duration }) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(note, now + time);

        gain.gain.setValueAtTime(0, now + time);
        gain.gain.linearRampToValueAtTime(0.3, now + time + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.001, now + time + duration);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + time);
        osc.stop(now + time + duration);
      });
    } catch (e) {
      console.warn("Audio fanfare error:", e);
    }
  }
}

export const audioEngine = new AudioEngine();
