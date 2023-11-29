import React, { useState } from "react";
import "./videos.css";

// Define or import your allVideos array
const allVideos = [
  // Your video data here
];

function Videos({ searchQuery }) {
  const videosPerPage = 6; // Number of videos to display per page
  const [currentPage, setCurrentPage] = useState(1);

  const allVideos = [
    {
      title: "Push Ups",
      url: "https://www.youtube.com/embed/IODxDxX7oi4",
    },
    {
      title: "Incline Bench Press",
      url: "https://www.youtube.com/embed/ajdFwa-qM98",
    },
    {
      title: "Bench Press",
      url: "https://www.youtube.com/embed/4T9UQ4FBVXI?si=NiViPRBdxEqE0-kb",
    },
    {
      title: "Cable Cross",
      url: "https://www.youtube.com/embed/taI4XduLpTk?si=KopWEkjJLa1BwdpN",
    },
    {
      title: "Dumbbell Flyes",
      url: "https://www.youtube.com/embed/QENKPHhQVi4?si=J0gFTFYeTbkl0LMx",
    },
    {
      title: "DeadLift",
      url: "https://www.youtube.com/embed/4AObAU-EcYE?si=rr8aOJe80QkzlgDh",
    },
    {
      title: "Bent Over Rows",
      url: "https://www.youtube.com/embed/FWJR5Ve8bnQ?si=0aDw47IpWIrWSG77",
    },
    {
      title: "Lat Pulldowns",
      url: "https://www.youtube.com/embed/SALxEARiMkw?si=4dk7up3pYU7XArcs",
    },
    {
      title: "Pull-Ups",
      url: "https://www.youtube.com/embed/sIvJTfGxdFo?si=_B9JcL3WrQIeo4TQ",
    },
    {
      title: "T-Bar Rows",
      url: "https://www.youtube.com/embed/m2KAkQV7pdA?si=uT8yImuu_qNIAvLI",
    },
    {
      title: "Military Press",
      url: "https://www.youtube.com/embed/QAQ64hK4Xxs?si=3Xdi5TXI7Afm33qA",
    },
    {
      title: "Lateral Raises",
      url: "https://www.youtube.com/embed/q9LhHrHShs4?si=abfuCDgQTao66OmP",
    },
    {
      title: "Front Raises",
      url: "https://www.youtube.com/embed/DiNYcgchguo?si=I6j9e_TPOgrY351C",
    },
    {
      title: "Upright Rows",
      url: "https://www.youtube.com/embed/Fq67opsS_hc?si=EOyz7aIYwuepIxp5",
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

  // Calculate the index range for the current page
  const startIndex = (currentPage - 1) * videosPerPage;
  const endIndex = startIndex + videosPerPage;

  // Filter and paginate the videos
  const filteredVideos = allVideos.filter((video) =>
    video.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const paginatedVideos = filteredVideos.slice(startIndex, endIndex);

  // Calculate the total number of pages
  const totalPages = Math.ceil(filteredVideos.length / videosPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
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

  return (
    <div>
      <div className="video-container">
        {paginatedVideos.map((video, index) => (
          <div key={index} className="video-item">
            <h3>{video.title}</h3>
            <iframe
              title={video.title}
              width="320"
              height="200"
              src={`${video.url}?modestbranding=1&rel=0`}
              allowFullScreen
            ></iframe>
          </div>
        ))}
      </div>
      {/* Pagination */}
      <div className="pagination">
        <button onClick={handlePreviousPage}>&lt; Previous</button>
        <button onClick={handleNextPage}>Next &gt;</button>
      </div>
    </div>
  );
}

export default Videos;
