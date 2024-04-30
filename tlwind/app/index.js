import React from 'react';
import { View ,Text} from 'react-native';
import { Router, Route, Link } from 'expo-router';

import Casher from './Home.js'; // تأكد من صحة مسار الاستيراد
import Items from './Item.js'; // تأكد من صحة مسار الاستيراد

export default function Page() {
  return (<Casher/>
  );
}
