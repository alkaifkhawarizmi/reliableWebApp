import axios from 'axios'

const BASE_URL = import.meta.env

export async function adminSignIn({userName , password}) {
  
  try {
    
    const res = await axios.post(BASE_URL.VITE_BASE_URL_ADMIN_LOGIN , {userName , password})

    if (res.status === 200) {
      const adminData = res.data;
      console.log(adminData)
      // localStorage.setItem('token', adminData.token);
      return adminData;
    }

  } catch (error) {
    console.error(error);
    return false;
  }

}

export async function verifyAdmin(token){
  try {
    const response = await axios.get(BASE_URL.VITE_BASE_URL_PRINCIPAL_VERIFY, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response?.data;
  } catch (error) {
    console.error(error);
    return false;
  }
}