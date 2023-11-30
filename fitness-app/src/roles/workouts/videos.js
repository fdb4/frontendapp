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
      
    },
    {
      title: "Bicep Curls",
      url: "https://www.youtube.com/embed/i1YgFZB6alI?si=BRrYn296aOomlNB4",
    },
    {
      title: "Hammer Curls",
      url: "https://www.youtube.com/embed/7jqi2qWAUJk?si=XJ-IHtrCIOezXl1z",
    },
    {
      title: "Tricep Dips",
      url: "https://www.youtube.com/embed/Tw0axi-Jlqc?si=4HLWHgv57vlYr_9d",
    },
    {
      title: "Tricep Pushdowns",
      url: "https://www.youtube.com/embed/yftl1tBWmKk?si=rL54boxJ74P2jvfW",
    },
    {
      title: "Skull Crushers",
      url: "https://www.youtube.com/embed/8t2a93BjDec?si=o-Z-Whek7LjjQxId",
    },
    {
      title: "Squats",
      url: "https://www.youtube.com/embed/sdeQjm7avi8?si=r7GUmzacgB86RPDz",
    },
    {
      title: "Romanian Deadlifts",
      url: "https://www.youtube.com/embed/_oyxCn2iSjU?si=rmeTjSmK9raHow_v",
    },
    {
      title: "Leg Press",
      url: "https://www.youtube.com/embed/s9-zeWzPUmA?si=TEQ3XjKYaNa1ALh5",
    },
    {
      title: "Lunges",
      url: "https://www.youtube.com/embed/ASdqJoDPMHA?si=r0DBbQOOSYQ6W_fj",
    },
    {
      title: "Leg Extensions",
      url: "https://www.youtube.com/embed/ljO4jkwv8wQ?si=VnwpEexEZmttWcHb",
    },
    {
      title: "Leg Curls",
      url: "https://www.youtube.com/embed/G7BQlXgLdOI?si=Cyrfjy-JPJn5hM4Y",
    },
    {
      title: "Glute Bridges",
      url: "https://www.youtube.com/embed/JpDDoINkrog?si=fzj4ZU9HwjeDgRZp",
    },
    {
      title: "Hip Thrusts",
      url: "https://www.youtube.com/embed/qCObDXTe4KY?si=qMKZOK7C8XlIjIru",
    },
    {
      title: "Cable Pull-Throughs",
      url: "https://www.youtube.com/embed/OkcryKUZTZs?si=_vtXUubb0j5tRxJT",
    },
    {
      title: "Bulgarian Split Squats",
      url: "https://www.youtube.com/embed/gso8KF6DiJM?si=cs62bg6xtNQuPAlW",
    },
    {
      title: "Planks",
      url: "https://www.youtube.com/embed/F-nQ_KJgfCY?si=NB9hdXplqWTu5YWl",
    },
    {
      title: "Russian Twists",
      url: "https://www.youtube.com/embed/NmzEBlYTR0s?si=gnWcMKIHSfocvu2H",
    },
    {
      title: "Bicycle Crunches",
      url: "https://www.youtube.com/embed/9FGilxCbdz8?si=nDbpLhmMjdOUN0yX",
    },

    {
      title: "Leg Raises",
      url: "https://www.youtube.com/embed/Zr-PtqcpeWM?si=W_Uw7MW7TSavevA7",
    },

    {
      title: "Woodchoppers",
      url: "https://www.youtube.com/embed/DoACGlPyQTI?si=5UQDpUsiwH8V185V",
    },

    {
      title: "Hanging Leg Raises",
      url: "https://www.youtube.com/embed/RuIdJSVTKO4?si=ZP_mSOTcZSv2TwIj",
    },

    {
      title: "Running",
      url: "https://www.youtube.com/embed/_kGESn8ArrU?si=DmtjNOhaKwKxpk4F",
    },

    {
      title: "Cycling",
      url: "https://www.youtube.com/embed/8PJMYSB1kxQ?si=OSmOZJMIxFHbzBvU",
    },

    {
      title: "Jump Rope",
      url: "https://www.youtube.com/embed/1BZM2Vre5oc?si=DvMXQDeZN1YtVKCi",
    },

    {
      title: "Stair Climbing",
      url: "https://www.youtube.com/embed/gzj4980UvzY?si=CG2PKOxkPgJMxxtj",
    },
    {
      title: "Yoga Poses",
      url: "https://www.youtube.com/embed/GLy2rYHwUqY?si=rf7txveokNz5Dnyo",
    },
    {
      title: "Stretching Exercises",
      url: "https://www.youtube.com/embed/aO1boUJhjvk?si=RX2K5Za35MlvdyGa",
    },
    {
      title: "Foam Rolling",
      url: "https://www.youtube.com/embed/vRZdDalRz0U?si=gcHIBxqnDO92E_tB",
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
