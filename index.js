
const audioClips = [
  {
    keyCode: 81,
    keyTrigger: 'Q',
    id: 'Heater-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
  },
  {
    keyCode: 87,
    keyTrigger: 'W',
    id: 'Heater-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
  },
  {
    keyCode: 69,
    keyTrigger: 'E',
    id: 'Heater-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
  },
  {
    keyCode: 65,
    keyTrigger: 'A',
    id: 'Heater-4',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
  },
  {
    keyCode: 83,
    keyTrigger: 'S',
    id: 'Clap',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
  },
  {
    keyCode: 68,
    keyTrigger: 'D',
    id: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
  },
  {
    keyCode: 90,
    keyTrigger: 'Z',
    id: "Kick-n'-Hat",
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
  },
  {
    keyCode: 88,
    keyTrigger: 'X',
    id: 'Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
  },
  {
    keyCode: 67,
    keyTrigger: 'C',
    id: 'Closed-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
  }
];

function App(){

  const [volume, setVolume] = React.useState(1);
  const [recording, setRecording] = React.useState("");

  const playRecording = () => {
    
    let index = 0;
    let recordArray = recording.split(" ");
    
    const interval = setInterval(() => {
      const audioTag = document.getElementById(recordArray[index]);
      audioTag.volume = volume;
      audioTag.currentTime = 0;
      audioTag.play();
      index++;
    }, 350);

    setTimeout(() => clearInterval(interval), 300 * recordArray.length-1)
  };

  return(
    <div id="drum-machine" className="bg-info min-vh-100 text-white p-5">
      <div className="text-center p-5">
        <h1 id="header" className="p-5">Drum Machine</h1>
        <div className="container">
          {audioClips.map(clip => (
            <Pad key={clip.id} clip={clip} volume={volume} setRecording={setRecording}/>
          ))}
        </div>
        <br />
        <div id="display" className="display bg-secondary">{recording.at(-1)}</div>
        <br />
        <h4>Volume: {Math.round(volume * 100)}</h4>
        <input className="w-50" type="range" step="0.01" onChange={(e) => setVolume(e.target.value)} min="0" max="1" value={volume} />
        <h3>{recording}</h3>
        {recording && (
          <>
          <button onClick={playRecording} className="btn btn-success m-1">Play</button>
          <button onClick={() => setRecording("")} className="btn btn-danger m-1">Clear</button>
          </>
        )}
      </div>
    </div>
  )
}

function Pad({clip, volume, setRecording}){

  const [active, setActive] = React.useState(false);

  React.useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.addEventListener("keydown", handleKeyPress);
    }
  }, [])

  const handleKeyPress = (e) => {
    if (e.keyCode === clip.keyCode){
      playSound();
    }
  }

  const playSound = () => {
    const audioTag = document.getElementById(clip.keyTrigger);
    setActive(true);
    setTimeout(() => setActive(false), 200)
    audioTag.volume = volume;
    audioTag.currentTime = 0;
    audioTag.play();
    setRecording((prev) => prev + " " + clip.keyTrigger);
  }; 

  return(
      <div id={clip.id} onClick={playSound} className={`drum-pad btn p-4 m-3 ${active ? "btn-warning" : "btn-dark" }`}>
        <audio className="clip" id={clip.keyTrigger} src={clip.url}></audio>
        {clip.keyTrigger}
      </div>
  );
}

ReactDOM.render(<App/>, document.getElementById("root"))