import Login from '../components/screens/login';
import SplashScreen from '../components/screens/splashScreen';
import Swiper from '../components/screens/Swiper';
import CourseDetails from '../components/screens/CourseDetails/CourseDetails';
import Profile from '../components/screens/ProfileSettings/Profile';
import CourseContent from '../components/screens/CourseContent/ContentTabs';
import FreeVideosContent from '../components/screens/FreeVideos/FreeVideosContent';
import InitialSetup from '../components/screens/InitialSetup';

//sub routes of profile
import Accounts from '../components/screens/ProfileSettings/Accounts';
import PrivacyPolicy from '../components/screens/ProfileSettings/PrivacyPolicy';
import TermsAndCondition from '../components/screens/ProfileSettings/TermsAndCondition';
import AboutUs from '../components/screens/ProfileSettings/AboutUs';
import Signup from '../components/screens/Auth/Signup';
import PreferencePicker from '../components/screens/Auth/PreferencePicker';
import TeacherWaitingPage from '../components/screens/TeacherWaitingPage';
import Search from '../components/screens/Search';
import ForgotPassword from '../components/screens/ForgotPassword';
import Payment from '../components/payment';
import AddNewPassword from '../components/screens/AddNewPassword';
import CommentSection from '../components/screens/Comments';
import VideoPage from '../components/screens/VideoPage';
import ExamInstruction from '../components/screens/TestSeries/ExamInstruction';
import MyBoughtTests from '../components/screens/TestSeries/MyBoughtTests';
import ExamScreen from '../components/screens/TestSeries/ExamScreen';
import Results from '../components/screens/TestSeries/Results';
import LeaderBoard from '../components/screens/TestSeries/LeaderBoard';
import Report from '../components/screens/TestSeries/Report';
import TestSeriesList from '../components/screens/TestSeries/TestSeriesList';
import TestSeriesListView from '../components/screens/TestSeries/TestSeriesListView';
import AllTestSeriesList from '../components/screens/TestSeries/AllTestSeriesList';
import SearchTestSeries from '../components/screens/TestSeries/TestSeriesList';

export const SCREEN_ROUTES = [
  {
    name: 'CourseDetails',
    component: CourseDetails,
    header: false,
    backgroundColor: '',
  },
  {
    name: 'InitialSetup',
    component: InitialSetup,
    header: false,
    backgroundColor: '',
  },
  {
    name: 'TeacherWaitingPage',
    component: TeacherWaitingPage,
    header: false,
    backgroundColor: '',
  },
  {
    name: 'ForgotPassword',
    component: ForgotPassword,
    header: false,
    backgroundColor: '',
  },
  {
    name: 'Search',
    component: Search,
    header: false,
    backgroundColor: '',
  },
  {
    name: 'Splash',
    component: SplashScreen,
    header: false,
    backgroundColor: '#fff',
  },
  {
    name: 'VideoPage',
    component: VideoPage,
    header: false,
    backgroundColor: '#fff',
  },
  {
    name: 'Profile',
    component: Profile,
    header: true,
    backgroundColor: '#fff',
  },
  {
    name: 'Accounts',
    component: Accounts,
    header: true,
    backgroundColor: '#fff',
  },
  {
    name: 'Privacy Policy',
    component: PrivacyPolicy,
    header: true,
    backgroundColor: '#fff',
  },
  {
    name: 'AddNewPassword',
    component: AddNewPassword,
    header: false,
    backgroundColor: '#fff',
  },
  {
    name: 'Terms and condition',
    component: TermsAndCondition,
    header: true,
    backgroundColor: '#fff',
  },
  {
    name: 'About us',
    component: AboutUs,
    header: true,
    backgroundColor: '#fff',
  },
  {
    name: 'CourseContent',
    component: CourseContent,
    header: false,
    backgroundColor: '',
  },
  {
    name: 'FreeVideoContent',
    component: FreeVideosContent,
    header: false,
    backgroundColor: '',
  },
  {
    name: 'Login',
    component: Login,
    header: false,
    backgroundColor: '',
  },
  {
    name: 'Signup',
    component: Signup,
    header: false,
    backgroundColor: '',
  },
  {
    name: 'Preference',
    component: PreferencePicker,
    header: false,
    backgroundColor: '',
  },
  {
    name: 'Payment',
    component: Payment,
    header: true,
    backgroundColor: '',
  },
  {
    name: 'Comment',
    component: CommentSection,
    header: true,
    backgroundColor: '',
  },
  {
    name: 'Swiper',
    component: Swiper,
    header: false,
    backgroundColor: '#fff',
  },
  {
    name: 'Exam description',
    component: ExamInstruction,
    header: true,
    backgroundColor: '#fff',
  },
  {
    name: 'My tests',
    component: MyBoughtTests,
    header: true,
    backgroundColor: '#fff',
  },
  {
    name: 'ExamScreen',
    component: ExamScreen,
    header: false,
    backgroundColor: '#fff',
  },
  {
    name: 'Results',
    component: Results,
    header: false,
    backgroundColor: '#fff',
  },
  {
    name: 'Leaderboard',
    component: LeaderBoard,
    header: true,
    backgroundColor: '#fff',
  },
  {
    name: 'Report Question',
    component: Report,
    header: true,
    backgroundColor: '#fff',
  },
  {
    name: 'Test Series List',
    component: TestSeriesList,
    header: true,
    backgroundColor: '#fff',
  },
  {
    name: 'Test Series Description',
    component: TestSeriesListView,
    header: true,
    backgroundColor: '#fff',
  },
  {
    name: 'All Tests Series',
    component: AllTestSeriesList,
    header: true,
    backgroundColor: '#fff',
  },
  {
    name: 'Search Test Series',
    component: SearchTestSeries,
    header: true,
    backgroundColor: '#fff',
  },
];
