function Pokemon(props) {
  let secondTypeTag;
  if (props.secondType) {
    secondTypeTag = (
      <h1 className={props.secondType}>
        {" "}
        {UpperCaseFirstLetter(props.secondType)}{" "}
      </h1>
    );
  }
  return (
    <div className={`pokemon_card ${props.firstType}`}>
      <img src={props.sprite} alt="" />
      <h1> No.{props.id}</h1>
      <h1 className="pokemon_name"> {UpperCaseFirstLetter(props.name)} </h1>
      <div className="types_container">
        <h1 className={props.firstType}>
          {" "}
          {UpperCaseFirstLetter(props.firstType)}{" "}
        </h1>
        {secondTypeTag}
      </div>
      <button
        type=""
        className="stats-button"
        onClick={(e) => {
          const pokemonCard = e.target.parentNode;
          const showButtonText = e.target.innerText;
          const statsContainer = pokemonCard.querySelector(".pokemon-stats");
          const statsNodeList = statsContainer.querySelectorAll(".indicator");
          setBarColor(statsNodeList);
          statsContainer.hidden = !statsContainer.hidden;

          e.target.innerText = showButtonText.includes("more")
            ? "Hide"
            : "Show more";
        }}
      >
        Show more
      </button>
      <div hidden className="pokemon-stats">
        <div className="stat-container">
          <h1>HP</h1>
          <div
            className="indicator"
            id="hp-indicator"
            data-stat={props.hp}
          ></div>
          <h1 className="stat-number">{props.hp}</h1>
        </div>
        <div className="stat-container">
          <h1>ATK</h1>
          <div
            className="indicator"
            id="atk-indicator"
            data-stat={props.attack}
          ></div>
          <h1 className="stat-number">{props.attack}</h1>
        </div>
        <div className="stat-container">
          <h1>SP.ATK</h1>
          <div
            className="indicator"
            id="spatk-indicator"
            data-stat={props.specialAttack}
          ></div>
          <h1 className="stat-number">{props.specialAttack}</h1>
        </div>
        <div className="stat-container">
          <h1>DEF</h1>
          <div
            className="indicator"
            id="def-indicator"
            data-stat={props.defense}
          ></div>
          <h1 className="stat-number">{props.defense}</h1>
        </div>
        <div className="stat-container">
          <h1>SP.DEF</h1>
          <div
            className="indicator"
            id="spdef-indicator"
            data-stat={props.specialDefense}
          ></div>
          <h1 className="stat-number">{props.specialDefense}</h1>
        </div>
        <div className="stat-container">
          <h1>SPEED</h1>
          <div
            className="indicator"
            id="speed-indicator"
            data-stat={props.speed}
          ></div>
          <h1 className="stat-number">{props.speed}</h1>
        </div>
        <p className="pokemon-description">{props.description}</p>
      </div>
    </div>
  );
}

function UpperCaseFirstLetter(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function setBarColor(statsNodeList) {
  console.log(statsNodeList);
  for (const stat of statsNodeList) {
    const statNum = parseInt(stat.getAttribute("data-stat"));
    const barColor = getBarColor(statNum);
    console.log(barColor);
    stat.style.backGroundColor = barColor;
  }
}

function getBarColor(statNum) {
  statNum = Math.min(100, Math.max(0, statNum));

  const red = 255 - statNum * 2.55;
  const green = statNum * 2.55;

  const color = `rgb(${red}, ${green}, 0)`;
  return color;
}

function PlayCry(src) {
  const audio = new Audio(src);
  audio.volume = 0.2;
  audio.play();
}
export default Pokemon;
