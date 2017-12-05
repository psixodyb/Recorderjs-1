import {Recorder} from './recorder.js';
let audio = document.getElementById('audio');
let audioCtx = new AudioContext();
let source = audioCtx.createMediaElementSource(audio);
audio.oncanplay = () => {
  source.connect(audioCtx.destination);
  let rec = new Recorder(source);
  rec.record();
  audio.onpause = () => {
    rec.stop();
    rec.exportWAV(function(blob){
      let url = URL.createObjectURL(blob);
      let newAudio = document.createElement('audio');
      newAudio.src = url;
      newAudio.controls = true;
      document.body.appendChild(newAudio);
    });
  }
}
