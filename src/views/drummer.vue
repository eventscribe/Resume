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
  min-height: 100vh;
  align-items: center;
  justify-content: center;
}

.key {
  border: 0.4rem solid black;
  border-radius: 0.5rem;
  margin: 1rem;
  font-size: 1.5rem;
  padding: 1rem 0.5rem;
  transition: all 2s ease;
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
  box-shadow: 0 0 1rem red;
}

kbd {
  display: block;
  font-size: 4rem;
}

.sound {
  font-size: 1.2rem;
  text-transform: uppercase;
  letter-spacing: 0.1rem;
  color: #ffc600;
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
  </div>
</template>

<script>
export default {
  name: 'drummer',
  data() {
    return {
      formName: 'drummer',
      samples: [
        {
          letter: 'a',
          validKeys: [65, 97],
          pattern: 'BackBeat',
          src: require('../assets/sounds/BackBeat.wav'),
          isPlaying: false,
          duration: 6000,
        },
        {
          letter: 's',
          validKeys: [115, 83],
          pattern: 'BlastBeat',
          src: require('../assets/sounds/Blast.wav'),
          isPlaying: false,
          duration: 6000,
        },
        {
          letter: 'd',
          validKeys: [68, 100],
          pattern: 'D Bass',
          src: require('../assets/sounds/DoubleBass.wav'),
          isPlaying: false,
          duration: 6000,
        },
        {
          letter: 'f',
          validKeys: [70, 102],
          pattern: 'Freeze',
          src: require('../assets/sounds/Freezing.wav'),
          isPlaying: false,
          duration: 10000,
        },
        {
          letter: 'g',
          validKeys: [71, 103],
          pattern: 'Hammer',
          src: require('../assets/sounds/Hellhammer.wav'),
          isPlaying: false,
          duration: 13000,
        },
        {
          letter: 'h',
          validKeys: [72, 104],
          pattern: 'Pagan',
          src: require('../assets/sounds/Pagan1.wav'),
          isPlaying: false,
          duration: 6000,
        },
        {
          letter: 'j',
          validKeys: [74, 106],
          pattern: 'Varg',
          src: require('../assets/sounds/Varg1.wav'),
          isPlaying: false,
          duration: 6000,
        },
      ],
    };
  },
  mounted() {
    let vm = this;
    window.addEventListener('keypress', e => {
      console.log(e.keyCode);
      let sample = vm.samples.find(
        s => s.validKeys.findIndex(i => i === e.keyCode) >= 0
      );

      function resetTransition() {
        sample.isPlaying = false;
      }

      if (sample) {
        let audio = new Audio(sample.src);
        audio.currentTime = 0;
        audio.play();
        sample.isPlaying = true;
        //audio.addEventListener('ended', console.log('set is playing to false'));
        setTimeout(resetTransition, sample.duration);
      } else {
        console.log(String.fromCharCode(e.keyCode) + ' Not Found');
      }
    });
  },
};
</script>
