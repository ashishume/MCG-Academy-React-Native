import {ToastAndroid} from 'react-native';
import Share from 'react-native-share';

/**
 *
 * @param name
 * @param imageUrl
 * @param shareCategory
 * @param id
 */
export const onShareHandler = async (name, imageUrl, shareCategory, id) => {
  try {
    const blob = await (await fetch(imageUrl)).blob();
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = async function () {
      const base64String = reader.result;
      const image = `data:image/png;base64,` + base64String.split(',')[1];
      await Share.open({
        message: `Check ${name}: https://www.mcgacademy.in/${shareCategory}/${id}
You can download the MCG Academy app from ${'https://play.google.com/store/apps/details?id=com.mcgeducation'}`,
        url: image,
      })
        .then((resp) => {})
        .catch((e) => {});
    };
  } catch (error) {
    ToastAndroid.show(error.message, ToastAndroid.SHORT);
  }
};
