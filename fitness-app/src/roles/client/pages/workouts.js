import ClientNavbar from "../../../components/navbar-visitor/clientnav";
import "../styling/workout.css";
import Cardio from "../../../roles/visitors/assets/cardio.png";

function Workouts() {
  return (
    <div className="body_1">
      <ClientNavbar />
      <header className="heading">
        <div className="header_2">
            <div className="title">
                <h1>WORKOUTS</h1>
                <h2>CARDIO</h2>
            </div>

          <p>
            Make the most of your workouts. Try some cardio and burn some fat.
            Or if you want you can check out some of the more popular options.
            Try anything but be consistent!
          </p>
          <button className="green">My Workout</button>
          <button className="red">Preview</button>
        </div>
        <img src={Cardio} />
      </header>
      <main>
        <div className="nav_2">
          <h2>Popular Exercise</h2>
          
        </div>
      </main>
    </div>
  );
}

export default Workouts;
