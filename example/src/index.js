import './app.css';
let audio = document.getElementById('audio');
import Recorder from 'record-audio-js';
let audioCtx = new AudioContext();
let source = audioCtx.createMediaElementSource(audio);
audio.onplay = function() {
  source.connect(audioCtx.destination);
  let rec = new Recorder(source);
  rec.record();
  setTimeout(createRecordAudio,10000);
  this.onplay = null;

  function createRecordAudio() {
    rec.stop();
    audio.pause();
    rec.exportWAV(function(blob){
      let url = URL.createObjectURL(blob);
      let audioBlock = document.createElement('div');
      let audioLabel = document.createElement('span');
      let newAudio = document.createElement('audio');
      audioBlock.classList = 'audio';
      audioLabel.classList = 'audio__label';
      audioLabel.innerHTML = 'recorded audio';
      newAudio.classList = 'audio__track';
      newAudio.src = url;
      newAudio.controls = true;
      audioBlock.appendChild(audioLabel);
      audioBlock.appendChild(newAudio);
      document.body.appendChild(audioBlock);
    });
  }
}
