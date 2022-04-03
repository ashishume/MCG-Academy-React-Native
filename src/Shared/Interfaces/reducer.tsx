export interface StateInterface {
  login: {
    login: boolean;
    userData: {};
  };
  loader: false;
  courses: {
    courses: [];
    myCourses: [];
    myCourseIds: [];
    oneCourse: '';
    featured: [];
  };
  visible: {
    videoBody: '';
    freeVideos: [];
  };
  library: {
    library: [];
  };
  category: {
    category: [
      {
        _id: string;
        name: string;
      },
    ];
  };
  images: {
    images: [];
  };
  testSeries: {
    testCategories: [];
    testSeriesData: [];
    testExams: [];
    testQuestions: [];
    myTestSeries: [];
    leaderboard: [];
  };
}
