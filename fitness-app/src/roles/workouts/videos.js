import React, { useState } from "react";
import "./videos.css";

function Videos({ searchQuery }) {
  const videosPerPage = 9; 
  const [currentPage, setCurrentPage] = useState(1);
  const [goToPage, setGoToPage] = useState("");

  const allVideos = [
    {
      title: "Push Ups",
      url: "https://www.youtube.com/embed/IODxDxX7oi4",
      description: `Push-ups are a bodyweight exercise targeting the chest, shoulders, and triceps. 
        Start in a plank position, lower your body towards the ground by bending your elbows, and then push back up`,
      muscleGroup: "chest",
      equipment: "None",
    },
    {
      title: "Incline Bench Press",
      url: "https://www.youtube.com/embed/ajdFwa-qM98",
      description: `This is a chest exercise performed on an inclined bench. It targets
      the upper chest muscles. User a barbell or dumbbells and press them upwards
      while laying on the incline bench`,
      muscleGroup: "chest",
      equipment: "inlcine bench, barbell or dumbbells",
    },
    {
      title: "Bench Press",
      url: "https://www.youtube.com/embed/4T9UQ4FBVXI?si=NiViPRBdxEqE0-kb",
      description: `A classic chest exercise involving pressing a barbell away from the chest.
       It Works the chest, shouders, and triceps.`,
      muscleGroup: "chest",
      equipment: "flat bench, barbell",
    },
    {
      title: "Cable Cross",
      url: "https://www.youtube.com/embed/taI4XduLpTk?si=KopWEkjJLa1BwdpN",
      description: `Cable crowssovers target the chest muscles by pulling cables 
        from opposite sides, crowssing them in front of the body.`,
      muscleGroup: "chest",
      equipment: "cable machine",
    },
    {
      title: "Dumbbell Flyes",
      url: "https://www.youtube.com/embed/QENKPHhQVi4?si=J0gFTFYeTbkl0LMx",
      description: `Dumbbell flyes are an isolation exercise that targets the chest muscles. Lie on a flat bench with a dumbbell in each hand, arms extended upward. Lower the weights in a wide arc, feeling a stretch in your chest, then bring them back up to the starting position.`,
      muscleGroup: "chest",
      equipment: "dumbells",
    },
    {
      title: "DeadLift",
      url: "https://www.youtube.com/embed/4AObAU-EcYE?si=rr8aOJe80QkzlgDh",
      description: `The deadlift is a compound movement that engages multiple muscle groups, including the hamstrings, glutes, lower back, and core. Stand in front of a loaded barbell, bend at the hips and knees, grasp the bar, and lift it by straightening your hips and knees.`,
      muscleGroup: "back",
      equipment: "barbell"
    },
    {
      title: "Bent Over Rows",
      url: "https://www.youtube.com/embed/FWJR5Ve8bnQ?si=0aDw47IpWIrWSG77",
      description: `Bent over rows target the muscles in the upper and middle back. Bend at the hips, keep your back straight, and pull the weight (barbell or dumbbells) towards your lower chest while keeping your elbows close to your body.`,
      muscleGroup: "back",
      equipment: "barbell, dumbells"
    },
    {
      title: "Lat Pulldowns",
      url: "https://www.youtube.com/embed/SALxEARiMkw?si=4dk7up3pYU7XArcs",
      description: `Lat pulldowns focus on the latissimus dorsi muscles. Sit at a cable machine, grasp the bar with a wide grip, and pull it down towards your chest, engaging your back muscles.`,
      muscleGroup: "back",
      equipment: "cable machine"
    },
    {
      title: "Pull-Ups",
      url: "https://www.youtube.com/embed/sIvJTfGxdFo?si=_B9JcL3WrQIeo4TQ",
      description:`Pull-ups are a bodyweight exercise targeting the upper back and arms. Hang from a bar with an overhand grip, then pull your body upward until your chin is above the bar.`,
      muscleGroup: "back",
      equipment: "pull-up bar",
    },
    {
      title: "T-Bar Rows",
      url: "https://www.youtube.com/embed/m2KAkQV7pdA?si=uT8yImuu_qNIAvLI",
      description: `T-Bar rows involve using a T-Bar row machine or attaching a barbell to a landmine. Bend at the hips, grip the handle, and row the weight towards your chest.`,
      muscleGroup: "back",
      equipment: "t-bar row machine"
    },
    {
      title: "Military Press",
      url: "https://www.youtube.com/embed/QAQ64hK4Xxs?si=3Xdi5TXI7Afm33qA",
      description: `The military press targets the deltoid muscles. While standing or sitting, press the weight (barbell or dumbbells) overhead from shoulder height.`,
      muscleGroup: "shoulder",
      equipment: "barbell, dumbells"
    },
    {
      title: "Lateral Raises",
      url: "https://www.youtube.com/embed/q9LhHrHShs4?si=abfuCDgQTao66OmP",
      description: `Lateral raises isolate the side deltoids. Hold a dumbbell in each hand by your sides and lift them out to the sides until your arms are parallel to the ground.`,
      muscleGroup: "shoulder",
      equipment: "dumbells"
   },
    {
      title: "Front Raises",
      url: "https://www.youtube.com/embed/DiNYcgchguo?si=I6j9e_TPOgrY351C",
      description: `Front raises target the front deltoids. Hold a dumbbell in each hand, arms straight, and lift the weights forward until they reach shoulder height.`,
      muscleGroup:" shoulder",
      equipment: "dumbbells"
    },
    {
      title: "Upright Rows",
      url: "https://www.youtube.com/embed/Fq67opsS_hc?si=EOyz7aIYwuepIxp5",
      description: ` Upright rows work the upper traps and deltoids. Lift the weight (barbell or dumbbells) vertically towards your chin, keeping it close to your body.`,
      muscleGroup: "shoulders",
      equipment: "barbell, dumbbells"
    },
    {
      title: "Shrugs",
      url: "https://www.youtube.com/embed/C6sYjDFuq9I?si=I4LuQRCn7Wbv15mL",
      description: ` Shrugs primarily target the trapezius muscles. Lift your shoulders toward your ears in a controlled manner, focusing on contracting your traps at the top of the movement.`,
      muscleGroup: 'arms',
      equipment: "barbell, dumbbells"
    },
    {
      title: "Bicep Curls",
      url: "https://www.youtube.com/embed/i1YgFZB6alI?si=BRrYn296aOomlNB4",
      description: `Bicep curls isolate the biceps. Hold a barbell or dumbbells, keeping your elbows stationary, and curl the weight toward your shoulders by contracting your biceps.`,
      muscleGroup: "arms",
      equipment: 'barbell, dumbbells'
    },
    {
      title: "Hammer Curls",
      url: "https://www.youtube.com/embed/7jqi2qWAUJk?si=XJ-IHtrCIOezXl1z",
      description: ` Hammer curls target the brachialis muscle in the biceps. Hold dumbbells with a neutral grip (palms facing each other) and curl the weights toward your shoulders.`,
      muscleGroup: "arms",
      equipment: "dumbbells" 
    },
    {
      title: "Tricep Dips",
      url: "https://www.youtube.com/embed/Tw0axi-Jlqc?si=4HLWHgv57vlYr_9d",
      description: `Tricep dips are a bodyweight exercise targeting the triceps. Position yourself between parallel bars or on a bench, lower your body by bending your elbows, and then push back up.`,
      muscleGroup: "arms",
      equipment: "parallel bars, bench"
    },
    {
      title: "Tricep Pushdowns",
      url: "https://www.youtube.com/embed/yftl1tBWmKk?si=rL54boxJ74P2jvfW",
      description: `Tricep pushdowns use a cable machine with a straight bar. Stand facing the cable machine, grip the bar with an overhand grip, and push the bar down, extending your elbows.`,
      muscleGroup: "arms",
      equipment: "cable machine"
    },
    {
      title: "Skull Crushers",
      url: "https://www.youtube.com/embed/8t2a93BjDec?si=o-Z-Whek7LjjQxId",
      description: `Skull crushers (also known as lying tricep extensions) focus on the triceps. Lie on a bench, hold a barbell or EZ curl bar, and lower it toward your forehead, then extend your arms to lift the weight back up.`,
      muscleGroup: "arms",
      equipment:" barbell, EZ curl bar"
    },
    {
      title: "Squats",
      url: "https://www.youtube.com/embed/sdeQjm7avi8?si=r7GUmzacgB86RPDz",
      description: `Squats are a compound exercise targeting the lower body. With a barbell on your shoulders, lower your body by bending your knees and hips, then push back up to the starting position.`,
      muscleGroup: "legs",
      equipment: "babrbell",
    },
    {
      title: "Romanian Deadlifts",
      url: "https://www.youtube.com/embed/_oyxCn2iSjU?si=rmeTjSmK9raHow_v",
      description: `Romanian deadlifts involve hinging at the hips while keeping your legs mostly straight. Hold a barbell or dumbbells, push your hips back, and lower the weight until you feel a stretch in your hamstrings, then return to the upright position.`,
      muscleGroup: "legs",
      equipment: "barbell, dumbbells"
    },
    {
      title: "Leg Press",
      url: "https://www.youtube.com/embed/s9-zeWzPUmA?si=TEQ3XjKYaNa1ALh5",
      description: `Leg press targets the lower body. Sit on a leg press machine, place your feet on the platform, and press the weight away by extending your knees.`,
      muscleGroup: "legs",
      equipment: "leg press machine"
    },
    {
      title: "Lunges",
      url: "https://www.youtube.com/embed/ASdqJoDPMHA?si=r0DBbQOOSYQ6W_fj",
      description: `Lunges are a bodyweight or weighted exercise. Step forward with one leg, lower your body until both knees are bent, and then push back up to the starting position.`,
      muscleGroup: "legs",
      equipment: "bodyweight"
    },
    {
      title: "Leg Extensions",
      url: "https://www.youtube.com/embed/ljO4jkwv8wQ?si=VnwpEexEZmttWcHb",
      description: `Leg extensions target the quadriceps. Sit on a leg extension machine, lift the weight by extending your knees, and then lower it back down.`,
      muscleGroup: "legs",
      equipment: "leg extension machine"
    },
    {
      title: "Leg Curls",
      url: "https://www.youtube.com/embed/G7BQlXgLdOI?si=Cyrfjy-JPJn5hM4Y",
      description: ` Leg curls target the hamstrings. Lie face down on a leg curl machine, position your legs under the pad, and curl the weight by flexing your knees.`,
      muscleGroup: "legs",
      equipment: "leg curl machine"
    },
    {
      title: "Glute Bridges",
      url: "https://www.youtube.com/embed/JpDDoINkrog?si=fzj4ZU9HwjeDgRZp",
      description: ` Glute bridges focus on the glutes. Lie on your back, bend your knees, and lift your hips towards the ceiling, squeezing your glutes at the top of the movement.`,
      muscleGroup: "legs",
      equipment: "bodyweight"
    },
    {
      title: "Hip Thrusts",
      url: "https://www.youtube.com/embed/qCObDXTe4KY?si=qMKZOK7C8XlIjIru",
      description: ` Hip thrusts target the glutes. Sit on the ground with your upper back against a bench, place a barbell or dumbbells on your hips, and thrust your hips upward, extending your hips at the top.`,
      muscleGroup: "glutes, hamstrings",
      equipment: "bench, barbell, dumbbells"
    },
    {
      title: "Cable Pull-Throughs",
      url: "https://www.youtube.com/embed/OkcryKUZTZs?si=_vtXUubb0j5tRxJT",
      description: `Cable pull-throughs engage the glutes and hamstrings. Stand facing away from the cable machine, attach a rope to the low pulley, and pull the rope through your legs by extending your hips.`,
      muscleGroup: "glutes, hamstrings",
      equipment: "cable machine"
    },
    {
      title: "Bulgarian Split Squats",
      url: "https://www.youtube.com/embed/gso8KF6DiJM?si=cs62bg6xtNQuPAlW",
      description: `Bulgarian split squats are a single-leg exercise. Stand a few feet in front of a bench, place one foot behind you on the bench, and lower your body into a lunge position, then push back up.`,
      muscleGroup: "quadriceps, glutes",
      equipment: "bodyweight, dumbbell"
    },
    {
      title: "Planks",
      url: "https://www.youtube.com/embed/F-nQ_KJgfCY?si=NB9hdXplqWTu5YWl",
      description: `Planks are a core exercise. Assume a push-up position with your arms straight, engage your core, and hold a straight line from head to heels.`,
      muscleGroup: "core",
      equipment: "bodyweight"
    },
    {
      title: "Russian Twists",
      url: "https://www.youtube.com/embed/NmzEBlYTR0s?si=gnWcMKIHSfocvu2H",
      description: `Russian twists work the obliques. Sit on the ground, lean back slightly, and rotate your torso, touching the ground on each side with or without holding a weight.`,
      muscleGroup: "core",
      equipment: "bodyweight"
    },
    {
      title: "Bicycle Crunches",
      url: "https://www.youtube.com/embed/9FGilxCbdz8?si=nDbpLhmMjdOUN0yX",
      description:`Bicycle crunches target the entire abdominal area. Lie on your back, lift your legs off the ground, and bring your opposite elbow to the opposite knee in a cycling motion.`,
      muscleGroup: "core",
      equipment: "bodyweight",
    },
    {
      title: "Leg Raises",
      url: "https://www.youtube.com/embed/Zr-PtqcpeWM?si=W_Uw7MW7TSavevA7",
      description: `Leg raises focus on the lower abdominals. Lie on your back, lift your legs toward the ceiling, and lower them back down without letting them touch the ground.`,
      muscleGroup: "core",
      equipment: "bodyweight"
    },
    {
      title: "Woodchoppers",
      url: "https://www.youtube.com/embed/DoACGlPyQTI?si=5UQDpUsiwH8V185V",
      description: `Woodchoppers target the obliques. Stand sideways to a cable machine, grab the handle with both hands, and pull the handle diagonally across your body, engaging your core. Alternatively, you can perform this exercise with a medicine ball.`,
      muscleGroup: "core",
      equipment: "cable machine, medicine ball"
    },
    {
      title: "Hanging Leg Raises",
      url: "https://www.youtube.com/embed/RuIdJSVTKO4?si=ZP_mSOTcZSv2TwIj",
      description: `Hanging leg raises focus on the lower abdominals. Hang from a pull-up bar and lift your legs straight in front of you, then lower them back down without swinging.`,
      muscleGroup: "core",
      equipment: "pull-up bar"
    },
    {
      title: "Running",
      url: "https://www.youtube.com/embed/_kGESn8ArrU?si=DmtjNOhaKwKxpk4F",
      description: `Running is a cardiovascular exercise that engages the entire body. It helps improve cardiovascular health, stamina, and leg muscles. You can run outdoors or on a treadmill.`,
      muscleGroup: "full-body",
      equipment: "bodyweight"
    },
    {
      title: "Cycling",
      url: "https://www.youtube.com/embed/8PJMYSB1kxQ?si=OSmOZJMIxFHbzBvU",
      description: `Cycling is a cardiovascular exercise that primarily targets the lower body muscles, including quadriceps, hamstrings, and calves. You can cycle outdoors or use a stationary bike.`,
      muscleGroup: "lowerbody",
      equipment: "bicycle"
    },
    {
      title: "Jump Rope",
      url: "https://www.youtube.com/embed/1BZM2Vre5oc?si=DvMXQDeZN1YtVKCi",
      description: `Jump rope is a cardiovascular exercise that engages the entire body. It improves coordination, stamina, and works the calves, thighs, and shoulders.`,
      muscleGroup: "full-body",
      equipment: "jumprope"
    },
    {
      title: "Stair Climbing",
      url: "https://www.youtube.com/embed/gzj4980UvzY?si=CG2PKOxkPgJMxxtj",
      description: ` Stair climbing targets the lower body and cardiovascular system. Use stairs or a stair climber machine to ascend and descend, engaging muscles in the legs and buttocks.`,
      muscleGroup: "lower-body",
      equipment: "stairs, stair climber machine"
    },
    {
      title: "Yoga Poses",
      url: "https://www.youtube.com/embed/GLy2rYHwUqY?si=rf7txveokNz5Dnyo",
      description: `Yoga poses engage various muscle groups, depending on the specific pose. Yoga improves flexibility, balance, and overall strength. Common poses include Downward Dog, Warrior Poses, and Tree Pose.`,
      muscleGroup: "fullbody",
      equipment: "yoga mat"
    },
    {
      title: "Stretching Exercises",
      url: "https://www.youtube.com/embed/aO1boUJhjvk?si=RX2K5Za35MlvdyGa",
      description: ` Stretching exercises help improve flexibility and reduce muscle tension. Perform static stretches for different muscle groups, holding each stretch for 15-30 seconds.`,
      muscleGroup: "fullbody",
      equipment: "exercise mat"
    },
    {
      title: "Foam Rolling",
      url: "https://www.youtube.com/embed/vRZdDalRz0U?si=gcHIBxqnDO92E_tB",
      description: `Foam rolling is a self-myofascial release technique. Roll the foam roller over different muscle groups to release tension, improve flexibility, and promote blood flow.`,
      muscleGroup: "fullbody",
      equipment: "foam roller"
    },
  ];

  const startIndex = (currentPage - 1) * videosPerPage;
  const endIndex = startIndex + videosPerPage;

  const filteredVideos = allVideos.filter((video) =>
    video.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const paginatedVideos = filteredVideos.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredVideos.length / videosPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    setGoToPage(""); 
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  const handleGoToPage = () => {
    const pageNumber = parseInt(goToPage, 10);
    if (!isNaN(pageNumber) && pageNumber >= 1 && pageNumber <= totalPages) {
      handlePageChange(pageNumber);
    }
  };

  return (
    <div className="video-container">
      {paginatedVideos.map((video, index) => (
        <div key={index} className="video-item">
          <iframe
            title={video.title}
            width="320"
            height="200"
            src={`${video.url}?modestbranding=1&rel=0`}
            allowFullScreen
          ></iframe>
          <h3>{video.title}</h3>
        </div>
      ))}
      <div className="pagination">
        <button onClick={handlePreviousPage}>&lt; Previous</button>
        <span>
          Page {currentPage} of {totalPages} | Total Videos: {filteredVideos.length}
        </span>
        <span>
          Go to Page:
          <input
            type="number"
            value={goToPage}
            onChange={(e) => setGoToPage(e.target.value)}
          />
          <button onClick={handleGoToPage}>Go</button>
        </span>
        <button onClick={handleNextPage}>Next &gt;</button>

      </div>
    </div>
  );
}

export default Videos;
