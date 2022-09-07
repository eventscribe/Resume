<style scoped>
html {
  font-size: 10px;
  background: url('https://i.imgur.com/b9r5sEL.jpg') bottom center;
  background-size: cover;
}

body,
html {
  margin: 0;
  padding: 0;
  font-family: sans-serif;
}

.keys {
  display: flex;
  flex: 1;
  min-height: 25vh;
  align-items: center;
  justify-content: center;
}

.key {
  border: 0.4rem solid black;
  border-radius: 0.5rem;
  margin: 1rem;
  font-size: 1.5rem;
  padding: 1rem 0.5rem;
  transition: all 1s ease;
  /* transition: all .07s ease; */
  width: 10rem;
  text-align: center;
  color: white;
  background: rgba(0, 0, 0, 0.4);
  text-shadow: 0 0 0.5rem black;
}

.playing {
  transform: scale(1.1);
  border-color: red;
  box-shadow: red;
}

kbd {
  display: block;
  font-size: 4rem;
}

.sound {
  font-size: 1.2rem;
  text-transform: uppercase;
  letter-spacing: 0.1rem;
  color: #1eff00;
}
</style>

<template>
  <div class="content-container">
    <div class="keys column is-11">
        <span
        class="key"
        v-for="sample in samples"
        :key="sample.validKeys[0]"
        :value="sample.letter"
        :class="[sample.isPlaying ? 'playing sound' : '']"
        >{{ sample.letter }}
        <br />
        <span class="sound">{{ sample.pattern }}</span>
      </span>
    </div>
    <div class="keys column is-11">
      <span
        class="key"
        v-for="note in notes"
        :key="note.validKeys[0]"
        :value="note.letter"
        :class="[note.isPlaying ? 'playing sound' : '']"
        >{{ note.letter }}
        <br />
        <span class="sound">{{ note.pattern }}</span>
      </span>
    </div>
    <div class="column is-2">
        <label class="label">Select a Synth</label>
            <div class="control">
                <div class="select" ref="synthSelect">
                      <select
                        v-model="selectedSynth"
                      >
                        <option
                          v-for="(synth, index) in synths"
                          :key="index"
                          :value="synth"
                          >{{ synth.name }}</option
                        >
                      </select>
                </div>
            </div>
    </div>
    </div>
</template>

<script>
import * as Tone from 'tone';
import drummer from './drummer.vue';
const filter = new Tone.Filter(400, 'lowpass').toDestination();
const feedbackDelay = new Tone.FeedbackDelay(0.5, 0.5).toDestination();
const dist = new Tone.Distortion(0.8).toDestination();
const phaser = new Tone.Phaser({
	frequency: 15,
	octaves: 5,
	baseFrequency: 1000
}).toDestination();
const fm = new Tone.FMSynth().toDestination().connect(dist);
const am = new Tone.AMSynth().toDestination().connect(dist);
const duo = new Tone.DuoSynth().toDestination().connect(dist);
const poly = new Tone.PolySynth().toDestination().connect(dist);

export default {
  components: { drummer },
  name: 'synth',
  data() {
    return {
      formName: 'synth',
      notes: [
        {
          letter: 'a',
          validKeys: [65, 97],
          pattern: 'D',
          isPlaying: false,
          note: 'D1',
          noteDuration: 1,
          styleDuration: 500,
        },
        {
          letter: 's',
          validKeys: [115, 83],
          pattern: 'D#',
          isPlaying: false,
          note: 'D#1',
          noteDuration: 1,
          styleDuration: 500,
        },
        {
          letter: 'd',
          validKeys: [68, 100],
          pattern: 'E',
          isPlaying: false,
          note: 'E1',
          noteDuration: 1,
          styleDuration: 500,
        },
        {
          letter: 'f',
          validKeys: [70, 102],
          pattern: 'F',
          isPlaying: false,
          note: 'F1',
          noteDuration: 1,
          styleDuration: 500,
        },
        {
          letter: 'g',
          validKeys: [71, 103],
          pattern: 'D',
          isPlaying: false,
          note: 'D2',
          noteDuration: 1,
          styleDuration: 500,
        },
        {
          letter: 'h',
          validKeys: [72, 104],
          pattern: 'D#',
          isPlaying: false,
          note: 'D#2',
          noteDuration: 1,
          styleDuration: 500,
        },
        {
          letter: 'j',
          validKeys: [74, 106],
          pattern: 'E',
          isPlaying: false,
          note: 'E2',
          noteDuration: 1,
          styleDuration: 500,
        },
      ],
      samples: [
        {
          letter: 'q',
          validKeys: [81, 113],
          isPlaying: false,
          pattern: 'Warp Core',
          url: require('../assets/sounds/synth_warp_core1.wav'),
          styleDuration: 15000,
        },
        {
          letter: 'w',
          validKeys: [87, 119],
          isPlaying: false,
          pattern: 'Mars',
          url: require('../assets/sounds/martin_sounds_1.wav'),
          styleDuration: 20000,
        },
        {
          letter: 'e',
          validKeys: [69, 101],
          isPlaying: false,
          pattern: 'Gong',
          url: require('../assets/sounds/madgong.wav'),
          styleDuration: 12000,
        },
        {
          letter: 'r',
          validKeys: [82, 114],
          isPlaying: false,
          pattern: 'Theremin',
          url: require('../assets/sounds/gurgling_theremin_1.wav'),
          styleDuration: 9000,
        },
        {
          letter: 't',
          validKeys: [84, 116],
          isPlaying: false,
          pattern: 'Ghost',
          url: require('../assets/sounds/ghost_1.wav'),
          styleDuration: 8000,
        },
      ],
      selectedSynth: { name: 'FMSynth', value: 'FM' },
      synths: [
            { name: 'FMSynth', value: 1 },
            { name: 'AMSynth', value: 2 },
            { name: 'DuoSynth', value: 3 },
            { name: 'PolySynth', value: 4 },
          ],
    };
  },
  mounted() {
    let vm = this;
    window.addEventListener('keypress', e => {
      //console.log(e.keyCode);
      //Get the keyboard inputs for the notes row
      let note = vm.notes.find(
        s => s.validKeys.findIndex(i => i === e.keyCode) >= 0
      );

    //Get the keyboard inputs for the samples row
    let sample = vm.samples.find(
        s => s.validKeys.findIndex(i => i === e.keyCode) >= 0
      );

    //Get value of currently selected synth
    let selectedSynth = vm.selectedSynth.value;
    //console.log(selectedSynth);

    // Reset property for CSS transition on notes row
      function resetNoteTransition() {
        note.isPlaying = false;
      }

    // Reset property for CSS transition on samples row
      function resetSampleTransition() {
        sample.isPlaying = false;
      }

      //toggle focus on synth input
      function focusInput() {
        vm.$refs.synthSelect.focus();
      }

    // Play a note given the set duration, start css effect
      if (note && selectedSynth == 1) {
        focusInput();
        var instrument = fm.triggerAttackRelease(note.note, note.noteDuration);
        //Kick off CSS effects
        note.isPlaying = true;
        setTimeout(resetNoteTransition, note.styleDuration);
      } 
      else if (note && selectedSynth == 2) {
        var instrument = am.triggerAttackRelease(note.note, note.noteDuration);
        //Kick off CSS effects
        note.isPlaying = true;
        setTimeout(resetNoteTransition, note.styleDuration);
      } else if (note && selectedSynth == 3){
        var instrument = duo.triggerAttackRelease(note.note, note.noteDuration);
        //Kick off CSS effects
        note.isPlaying = true;
        setTimeout(resetNoteTransition, note.styleDuration);
      } else if (note && selectedSynth == 4) {
        var instrument = poly.triggerAttackRelease([note.note, 'A4', 'D#3'], note.noteDuration);
        //Kick off CSS effects
        note.isPlaying = true;
        setTimeout(resetNoteTransition, note.styleDuration);
      }

      // Play audio sample and start CSS effect for the property's duration
      const player = new Tone.Player(sample.url).toDestination();
      Tone.loaded().then(() => {
        player.start();
        // connect the player to the feedback delay and filter in parallel
        player.connect(filter);
        player.connect(feedbackDelay);
        sample.isPlaying = true;
        setTimeout(resetSampleTransition, sample.styleDuration);
      });
    });
  },
};
</script>
