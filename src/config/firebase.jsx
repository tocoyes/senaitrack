import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

//SENAI2TRACK@GMAIL
const firebaseConfig = {
  apiKey: 'AIzaSyBUYanLvZ9s9YaAZQBEWFP0xN4NYcB_neY',
  authDomain: 'senaitrack-42fd5.firebaseapp.com',
  projectId: 'senaitrack-42fd5',
  storageBucket: 'senaitrack-42fd5.appspot.com',
  messagingSenderId: '655642791621',
  appId: '1:655642791621:web:490f3ab32bc498a3ac6aac',
};

//CONTA PESSOAL
// const firebaseConfig = {
//   apiKey: 'AIzaSyClnWdhmJbeMuj44Ll_PXZV1VuQxf7aHT4',
//   authDomain: 'senaitrack-2872c.firebaseapp.com',
//   projectId: 'senaitrack-2872c',
//   storageBucket: 'senaitrack-2872c.appspot.com',
//   messagingSenderId: '562479990833',
//   appId: '1:562479990833:web:7fabda7d1b02ab516ead10',
// };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
