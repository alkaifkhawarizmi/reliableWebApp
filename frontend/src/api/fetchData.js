import axios from 'axios'

const BASE_URL = import.meta.env.VITE_BASE_ADMIN_ALL_MEDIA

export async function gettAllMedia() {
  try {
    
    const res = await axios.get(BASE_URL)

    if(res.status === 200){
      return res.data
    }

  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: "An error occurred while fetching media",
      error: error.message,
    });
  }
}