import axios from 'axios';

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const createOrGetUser = async (googleUser: any, addUser: any) => {
  const user = {
    _id: googleUser.sub,
    _type: 'user',
    userName: `${googleUser.family_name.toLowerCase()}${googleUser.given_name.toLowerCase()}`,
    image: googleUser.picture,
  };

  addUser(user);

  await axios.post(`${BASE_URL}/api/auth`, user).then((response) => {
    if (response.status === 200) {
        console.log("Login successful");
    }
  });

};