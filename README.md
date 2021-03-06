# record-audio-js

### Install
	npm install record-audio-js --save-dev

### Syntax

#### Constructor
	import Recorder from 'record-audio-js';
 	let rec = new Recorder(source [, config])

Creates a recorder instance.

- **source** - The node whose output you wish to capture
- **config** - (*optional*) A configuration object (see **config** section below)

---------
#### Config

- **workerPath** - Path to recorder.js worker script. Defaults to 'js/recorderjs/recorderWorker.js'
- **bufferLen** - The length of the buffer that the internal JavaScriptNode uses to capture the audio. Can be tweaked if experiencing performance issues. Defaults to 4096.
- **callback** - A default callback to be used with `exportWAV`.
- **type** - The type of the Blob generated by `exportWAV`. Defaults to 'audio/wav'.

---------
#### Instance Methods

    rec.record()
    rec.stop()

Pretty self-explanatory... **record** will begin capturing audio and **stop** will cease capturing audio. Subsequent calls to **record** will add to the current recording.

    rec.clear()

This will clear the recording.

    rec.exportWAV([callback][, type])

This will generate a Blob object containing the recording in WAV format. The callback will be called with the Blob as its sole argument. If a callback is not specified, the default callback (as defined in the config) will be used. If no default has been set, an error will be thrown.

In addition, you may specify the type of Blob to be returned (defaults to 'audio/wav').

    rec.getBuffer([callback])

This will pass the recorded stereo buffer (as an array of two Float32Arrays, for the separate left and right channels) to the callback. It can be played back by creating a new source buffer and setting these buffers as the separate channel data:

	function getBufferCallback( buffers ) {
		var newSource = audioContext.createBufferSource();
		var newBuffer = audioContext.createBuffer( 2, buffers[0].length, audioContext.sampleRate );
		newBuffer.getChannelData(0).set(buffers[0]);
		newBuffer.getChannelData(1).set(buffers[1]);
		newSource.buffer = newBuffer;

		newSource.connect( audioContext.destination );
		newSource.start(0);
	}

This sample code will play back the stereo buffer.


    rec.configure(config)

This will set the configuration for Recorder by passing in a config object.

#### Utility Methods (static)

    Recorder.forceDownload(blob[, filename])

This method will force a download using the new anchor link *download* attribute. Filename defaults to 'output.wav'.
